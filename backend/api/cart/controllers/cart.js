"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // store cart items of a single user
  async create(ctx) {
    let entity;
    entity = await strapi.services.cart.create(ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models.cart });
  },

  // fetch cart items of a single user
  async findOne(ctx) {
    const { email } = ctx.params;
    const entity = await strapi.services.cart.findOne({ email });
    return sanitizeEntity(entity, { model: strapi.models.cart });
  },

  // update cart items of a single user
  async update(ctx) {
    const { id } = ctx.params;
    let entity;
    entity = await strapi.services.cart.update({ id }, ctx.request.body);
    return sanitizeEntity(entity, { model: strapi.models.cart });
  },
};
