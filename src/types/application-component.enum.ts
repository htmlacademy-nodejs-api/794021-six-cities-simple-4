export const ApplicationComponent = {
  Application: Symbol.for('Application'),

  ConfigurationInterface: Symbol.for('ConfigurationInterface'),

  CityModel: Symbol.for('CityModel'),
  CityServiceInterface: Symbol.for('CityServiceInterface'),

  CommentServiceInterface: Symbol.for('CommentServiceInterface'),
  CommentModel: Symbol.for('CommentModel'),

  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),

  LoggerInterface: Symbol.for('LoggerInterface'),

  OfferModel: Symbol.for('OfferModel'),
  OfferServiceInterface: Symbol.for('OfferServiceInterface'),

  UserModel: Symbol.for('UserModel'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
} as const;
