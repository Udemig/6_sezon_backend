const { SHOPPING_BINDING_KEY } = require("../config");
const ShoppingService = require("../services/shopping-service");
const { PublishMessage, SubscribeMessage } = require("../utils");
const UserAuth = require("./middlewares/auth");

module.exports = (app, channel) => {
  const service = new ShoppingService();

  // Diğer servislerden gelen mesajlara abone ol
  SubscribeMessage(channel, SHOPPING_BINDING_KEY, service);

  app.post("/order", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const { txnNumber } = req.body;

    try {
      const { data } = await service.PlaceOrder({ _id, txnNumber });

      // customer servisine haber gönder
      const message = {
        event: "CREATE_ORDER",
        data: {
          userId: _id,
          order: data,
        },
      };

      // mesajı customer kuyruğuna yayınla
      await PublishMessage(channel, CUSTOMER_BINDING_KEY, message);

      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/orders", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await service.GetOrders(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/cart", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const { data } = await service.GetCart(_id);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });
};
