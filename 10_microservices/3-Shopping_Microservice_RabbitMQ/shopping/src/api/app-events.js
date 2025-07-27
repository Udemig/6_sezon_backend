// Webhook
// Microservis mimarisinde servisler arasında haberleşmeyi sağlar
// Farklı servislerden gelen api isteklerini handle eder

const ShoppingService = require("../services/shopping-service");

module.exports = (app) => {
  // shopping servis kurulum
  const service = new ShoppingService();

  app.use("/app-events", async (req, res, next) => {
    // isteğin body kısmında event detaylarını al
    const { payload } = req.body;

    // evente göre gerekli işlmleri yapıcak methodu çağır
    await service.SubscribeEvents(payload);

    console.log("====== Shopping Servisine Haber Geldi ======");

    return res.status(200).json(payload);
  });
};
