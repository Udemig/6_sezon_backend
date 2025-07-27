const dotEnv = require("dotenv");

if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  RABBITMQ_URI: process.env.RABBITMQ_URI,
  EXCHANGE_NAME: "ECOMMERCE_EXCHANGE",
  SHOPPING_BINDING_KEY: "SHOPPING_BINDING_KEY",
  CUSTOMER_BINDING_KEY: "CUSTOMER_BINDING_KEY",
};
