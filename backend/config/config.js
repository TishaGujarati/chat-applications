module.exports = {
  PORT: process.env.PORT || 8000,
  MONGO_URI:
    process.env.MONGO_URI || "mongodb://0.0.0.0:27017/Chat-Application",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};
