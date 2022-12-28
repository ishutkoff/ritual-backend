export default () => ({
  port: process.env.PORT,
  secret_jwt: process.env.SECRET,
  mongodbUrl: process.env.MONGODB_URL,
});
