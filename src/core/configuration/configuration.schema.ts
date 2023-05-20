import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);


export type ConfigurationOptions = {
  DB_SERVER_ADDRESS: string;
  INCOMING_TCP_PORT: number;
  PASSWORD_HASH_SALT: string;
}

export const ConfigurationSchema = convict<ConfigurationOptions>({
  DB_SERVER_ADDRESS: {
    doc: 'IP address of the MongoDB database server',
    format: 'ipaddress',
    env: 'DB_SERVER_ADDRESS',
    default: '127.0.0.1'
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
