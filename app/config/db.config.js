module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "postgresDB",
    DB: "test",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};