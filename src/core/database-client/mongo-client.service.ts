import { setTimeout } from 'node:timers/promises';
import { inject, injectable } from 'inversify';
import mongoose, { Mongoose } from 'mongoose';
import { DatabaseClientInterface } from './database-client.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import { Retry } from '../../consts/database.js';
import { ApplicationComponent } from '../../types/application-component.enum.js';


@injectable()
export default class MongoClientService implements DatabaseClientInterface {
  private isConnected = false;
  private mongooseInstance: Mongoose | null = null;


  constructor(
    @inject(ApplicationComponent.LoggerInterface) private readonly logger: LoggerInterface
  ) {
  }


  private async _connect(uri: string): Promise<void> {
    this.mongooseInstance = await this._connectWithRetry(uri);
    this.isConnected = true;
  }


  private async _connectWithRetry(uri: string): Promise<Mongoose> {
    let attemptTry = 0;

    while (attemptTry < Retry.CountLimit) {
      try {
        return await mongoose.connect(uri);
      } catch (error) {
        attemptTry++;
        this.logger.error(`Failed to connect to the database (MongoDB): ${error}. Attempt number: ${attemptTry}`);
        await setTimeout(Retry.Timeout); // TODO seems timeout is not working (waiting time lasts way more than set in the constant)
      }
    }

    this.logger.error(`Failed to connect to the database (MongoDB) after ${attemptTry} attempts.`);
    throw new Error('Failed to connect to the database (MongoDB).');
  }


  private async _disconnect(): Promise<void> {
    await this.mongooseInstance?.disconnect();
    this.isConnected = false;
    this.mongooseInstance = null;
  }


  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error('MongoDB client already connected.');
    }

    this.logger.info('Trying to connect to MongoDB...');
    await this._connect(uri);
    this.logger.info('Database connection established.');
  }


  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Not connected to the database');
    }

    await this._disconnect();
    this.logger.info('Database connection closed.');
  }

}
