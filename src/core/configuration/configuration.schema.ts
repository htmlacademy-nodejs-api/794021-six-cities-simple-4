import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);


export type ConfigurationOptions = {
  DB_ADDRESS: string;
  DB_PORT: string;
  DB_LOGIN: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  INCOMING_TCP_PORT: number;
  PASSWORD_HASH_SALT: string;
}

export const ConfigurationSchema = convict<ConfigurationOptions>({
  DB_ADDRESS: {
    doc: 'IP address of the database server',
    format: 'ipaddress',
    env: 'DB_ADDRESS',
    default: '127.0.0.1'
  },


  DB_PORT: {
    doc: 'Port to connect to the database',
    format: 'port',
    env: 'DB_PORT',
    default: '27017',
  },

  DB_LOGIN: {
    doc: 'User login to connect to the database',
    format: String,
    env: 'DB_LOGIN',
    default: null,
  },

  DB_PASSWORD: {
    doc: 'Password to connect to the database',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },

  DB_NAME: {
    doc: 'Database name',
    format: String,
    env: 'DB_NAME',
    default: null
  },

  INCOMING_TCP_PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'INCOMING_TCP_PORT',
    default: 4000
  },

  PASSWORD_HASH_SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'PASSWORD_HASH_SALT',
    default: null
  },
});
