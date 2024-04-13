export default () => ({
    port: parseInt(process.env.PORT, 10),
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT, 10),
});