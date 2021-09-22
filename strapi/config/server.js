module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'cbef27593d6a6bd4dd3e1e9e8cf1cc9a'),
    },
  },
});
