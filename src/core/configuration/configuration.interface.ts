export interface ConfigurationInterface<EnvSchema> {
  get<VarName extends keyof EnvSchema>(key: VarName): EnvSchema[VarName];
}
