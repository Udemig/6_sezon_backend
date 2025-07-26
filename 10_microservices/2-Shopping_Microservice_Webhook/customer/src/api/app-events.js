const CustomerService = require("../services/customer-service");

// Microservis mimarisinde servisler arasında iletişim sağlamamı gereken durumlar olabilir.
// Bu durumda farklı servislerden gelen api isteklerinin içeriğine bağlı olarak gerekli işlemleri yapabiliyoruz
module.exports = (app) => {
  const service = new CustomerService();

  app.use("/app-events", async (req, res) => {
    // isteğin body içerisinde gelen payload verisine eriş
    const { payload } = req.body;

    // farklı servisden gelen payload'ın tipine göre gerekli işlemi yapıcak fonksiyon
    await service.SubscribeEvents(payload);

    console.log("========= Customer Servisine Haber Geldi =============");

    // istek atan servise cevap veriyoruz
    return res.status(200).json(payload);
  });
};
