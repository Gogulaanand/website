"use strict";
const { sanitizeEntity } = require("strapi-utils");
const stripe = require("stripe")(process.env.STRIPE_SK);
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const fromDecimalToInt = (number) => parseInt(number * 100);

module.exports = {
  // method to return only orders specific to a user
  async find(ctx) {
    const { user } = ctx.state; // magic user

    let entities;

    if (ctx.query._q) {
      entities = await strapi.services.order.search({
        ...ctx.query,
        user: user.id,
      });
    } else {
      entities = await strapi.services.order.find({
        ...ctx.query,
        user: user.id,
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.order })
    );
  },

  // method to return an order specific to a user
  async findOne(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const entity = await strapi.services.order.findOne({ id, user: user.id });
    return sanitizeEntity(entity, { model: strapi.models.order });
  },

  // method to create an order and setup stripe checkout session for frontend
  async create(ctx) {
    const { products } = ctx.request.body;

    if (!products) {
      return ctx.throw(400, "Please specify a product");
    }

    const getProductdetails = async () => {
      let realProducts = [];
      let ids = [];
      let totalAmount = 0;
      for (const product of products) {
        const data = await strapi.services.product.findOne({
          id: product.id,
        });

        realProducts = [
          ...realProducts,
          {
            price_data: {
              currency: "inr",
              product_data: {
                name: data.name,
              },
              unit_amount: fromDecimalToInt(data.price),
            },
            quantity: product.quantity,
          },
        ];

        ids = [...ids, product.id];
        totalAmount += data.price * product.quantity;
      }
      return [ids, realProducts, totalAmount];
    };

    const createSessionOrder = async () => {
      const { user } = ctx.state;

      const BASE_URL = ctx.request.headers.origin || "http://localhost:3000";

      const [ids, items, totalAmount] = await getProductdetails();

      if (!items) {
        return ctx.throw(404, "No product found with such id");
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: user.email,
        mode: "payment",
        success_url: `${BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: BASE_URL,
        line_items: items,
      });

      await strapi.services.order.create({
        user: user.id,
        products: ids,
        total: totalAmount,
        status: "unpaid",
        checkout_session: session.id,
      });

      return { id: session.id };
    };

    return createSessionOrder();
  },

  async confirm(ctx) {
    const { checkout_session } = ctx.request.body;
    const session = await stripe.checkout.sessions.retrieve(checkout_session);

    if (session.payment_status === "paid") {
      //Update order
      await strapi.services.order.update(
        {
          checkout_session,
        },
        {
          status: "paid",
        }
      );

      return strapi.services.order
        .findOne({ checkout_session })
        .then((data) => {
          return { order_id: data.id };
        })
        .catch((err) => console.log(err));
    } else {
      ctx.throw(
        400,
        "It seems like the order wasn't verified, please contact support"
      );
    }
  },
};
