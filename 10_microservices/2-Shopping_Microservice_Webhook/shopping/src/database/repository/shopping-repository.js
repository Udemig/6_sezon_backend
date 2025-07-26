const { CartModel, OrderModel } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { APIError, STATUS_CODES } = require("../../utils/app-errors");

//Dealing with data base operations
class ShoppingRepository {
  // payment

  async Orders(customerId) {
    try {
      const orders = await OrderModel.find({ customerId });
      return orders;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Orders"
      );
    }
  }

  async CreateNewOrder(customerId, txnId) {
    //check transaction for payment Status
    try {
      const cart = await CartModel.findOne({ customerId });

      if (cart) {
        let amount = 0;

        let cartItems = cart.items;

        if (cartItems.length > 0) {
          //process Order
          cartItems.map((item) => {
            amount += parseInt(item.product.price) * parseInt(item.unit);
          });

          const orderId = uuidv4();

          const order = new OrderModel({
            orderId,
            customerId,
            amount,
            txnId,
            status: "received",
            items: cartItems,
          });

          cart.items = [];

          const orderResult = await order.save();

          await cart.save();

          return orderResult;
        }
      }

      return {};
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Category"
      );
    }
  }

  async GetCart(customerId) {
    try {
      const cart = await CartModel.findOne({ customerId });
      console.log("cart", cart);
      return cart;
    } catch (err) {
      throw new APIError("API Error", 500, "Unable to Find Cart");
    }
  }

  async UpdateCart(customerId, product, qty, isRemove) {
    const cart = await CartModel.findOne({ customerId });
    const { _id } = product;

    if (cart) {
      // kullanıcnın sepeti varsa:
      let isExist = false;
      let cartItems = cart.items;

      if (cartItems.length > 0) {
        cartItems = cartItems
          .map((item) => {
            if (item.product?._id.toString() === _id.toString()) {
              if (isRemove) {
                // isRemove true ise ürünü sil
                return null;
              } else {
                // isRemove false ise ürünün miktarını güncelle
                isExist = true;
                return { ...item, unit: qty };
              }
            }

            return item;
          })
          .filter(Boolean);
      }

      // eğer ürün mevcut değilse ve silme işlemi yapılmayacaksa ürünü sepete ekle
      if (!isExist && !isRemove) {
        cartItems.push({
          product,
          unit: qty,
        });
      }

      // veritbanına güncellemeyi kaydet
      cart.items = cartItems;
      return await cart.save();
    } else {
      // sepet yoksa: kullanıcı için bir sepet oluştur
      return await CartModel.create({
        customerId,
        items: [{ product, unit: qty }],
      });
    }
  }
}

module.exports = ShoppingRepository;
