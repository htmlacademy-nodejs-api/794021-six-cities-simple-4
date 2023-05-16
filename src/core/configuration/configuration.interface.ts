export interface ConfigurationInterface<U> {
  get<T extends keyof U>(key: T): U[T];
}
