const ProductService = require("../services/product-service");
const UserAuth = require("./middlewares/auth");
const { PublishMessage } = require("../utils");
const { CUSTOMER_BINDING_KEY, SHOPPING_BINDING_KEY } = require("../config");

module.exports = (app, channel) => {
  const service = new ProductService();

  app.post("/product/create", async (req, res, next) => {
    try {
      const { name, desc, type, unit, price, available, suplier, banner } =
        req.body;
      // validation
      const { data } = await service.CreateProduct({
        name,
        desc,
        type,
        unit,
        price,
        available,
        suplier,
        banner,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/category/:type", async (req, res, next) => {
    const type = req.params.type;

    try {
      const { data } = await service.GetProductsByCategory(type);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/:id", async (req, res, next) => {
    const productId = req.params.id;

    try {
      const { data } = await service.GetProductDescription(productId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/ids", async (req, res, next) => {
    try {
      const { ids } = req.body;
      const products = await service.GetSelectedProducts(ids);
      return res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  });

  app.put("/wishlist", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const product = await service.GetProductById(req.body._id);

      // customer servisine haber gönder
      const message = {
        event: "ADD_TO_WISHLIST",
        data: {
          userId: _id,
          product,
        },
      };

      // kuyruğuna mesaj yayınla
      await PublishMessage(channel, CUSTOMER_BINDING_KEY, message);

      return res.status(200).json(product);
    } catch (err) {}
  });

  app.delete("/wishlist/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;
    const productId = req.params.id;

    try {
      const product = await service.GetProductById(productId);

      // customer servisine haber gönder
      const message = {
        event: "REMOVE_FROM_WISHLIST",
        data: {
          userId: _id,
          product,
        },
      };

      await PublishMessage(channel, CUSTOMER_BINDING_KEY, message);

      return res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  });

  app.put("/cart", UserAuth, async (req, res, next) => {
    const { _id: userId } = req.user;
    const { _id, qty } = req.body;

    try {
      const product = await service.GetProductById(_id);

      // mesajı hazırla
      const message = {
        event: "ADD_TO_CART",
        data: {
          userId,
          product,
          qty,
        },
      };

      // mesajı  customer kuyruğuna yayınla
      await PublishMessage(channel, CUSTOMER_BINDING_KEY, message);

      // mesajı shopping kuyruğuna yayınla
      await PublishMessage(channel, SHOPPING_BINDING_KEY, message);

      return res.status(200).json(product);
    } catch (err) {
      console.log("HATA", err);
      next(err);
    }
  });

  app.delete("/cart/:id", UserAuth, async (req, res, next) => {
    const { _id } = req.user;

    try {
      const product = await service.GetProductById(req.params.id);

      // customer servisine haber gönder
      const message = {
        event: "REMOVE_FROM_CART",
        data: {
          userId: _id,
          product,
          qty: 0,
        },
      };

      // her iki servisine de mesaj yayınla
      await PublishMessage(channel, CUSTOMER_BINDING_KEY, message);
      await PublishMessage(channel, SHOPPING_BINDING_KEY, message);

      return res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  });

  //get Top products and category
  app.get("/", async (req, res, next) => {
    //check validation
    try {
      const { data } = await service.GetProducts();
      return res.status(200).json(data);
    } catch (error) {
      next(err);
    }
  });
};
