export default () => ({
  jwt: {
    secret: process.env.JWTSECRET,
    expiresIn: parseInt(process.env.JWTEXPIRESIN, 10),
  },
});
