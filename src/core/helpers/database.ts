const getMongoURI = (
    host: string,
    port: string,
    username: string,
    password: string,
    databaseName: string,
): string => `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;

export const getDatabaseURI = getMongoURI;
