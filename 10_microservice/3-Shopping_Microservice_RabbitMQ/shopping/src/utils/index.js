const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");

const {
  APP_SECRET,
  RABBITMQ_URI,
  EXCHANGE_NAME,
  QUEUE_NAME,
} = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
  enteredPassword,
  savedPassword,
  salt
) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

//! RabbitMQ
//! kanal oluştur
module.exports.CreateChannel = async () => {
  try {
    // rabbitmq sunucuna bağlan
    const connection = await amqp.connect(RABBITMQ_URI);

    // kanal oluştur
    const channel = await connection.createChannel();

    // exchange oluştur
    // exhange: kanala gelen mesajları alıp kuyruğa yönlendirir.
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);

    // kanalı return et
    return channel;
  } catch (error) {
    throw error;
  }
};

//! mesaj yayınla
module.exports.PublishMessage = async (channel, binding_key, message) => {
  try {
    await channel.publish(
      EXCHANGE_NAME,
      binding_key,
      Buffer.from(JSON.stringify(message))
    );
    console.log("💥 Message kanala gönderildi", binding_key);
  } catch (error) {
    throw error;
  }
};

//! mesaj kuyruğuna abone ol
module.exports.SubscribeMessage = async (channel, binding_key, service) => {
  try {
    // yeni bir kuyruk oluştur
    const appQueue = channel.assertQueue(QUEUE_NAME);

    // kuyuruğu kanala bağla
    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, binding_key);

    // kuyruktaki mesajlara abone ol
    channel.consume(
      appQueue.queue,
      (data) => {
        console.log("💥 Mesaj kuyruğundan alındı");
        service.SubscribeEvents(JSON.parse(data.content.toString()));
      },
      { noAck: true } // mesajı okunduğunda kuyruktan silmek için
    );
  } catch (error) {
    throw error;
  }
};
