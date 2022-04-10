export default () => ({
  database: {
    host: process.env.DBHOST,
    port: parseInt(process.env.DBPORT, 10),
    dbname: process.env.DBNAME,
    username: process.env.DBUSER,
    password: process.env.DBPASS,
  },
});
