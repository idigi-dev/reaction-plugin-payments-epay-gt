import { EpayService } from "../services/index.js";
import { EpayModel } from "../models/index.js";

/**
 * @name exampleCreateRefund
 * @method
 * @summary Create a refund for an order for example payment method
 * @param {Object} context an object containing the per-request state
 * @param {Object} payment object containing transaction ID
 * @param {Number} amount the amount to be refunded
 * @param {String} [reason] the reason for the refund
 * @returns {Object} refund result
 * @private
 */
 export default async function createRefund(context, payment, amount, reason) {
    const { currencyCode, transactionId, data } = payment;
    const model = EpayModel("190.56.108.46", transactionId, data.email, data.pan, '', data.amount, '', data.cardName);
    let metadata = await EpayService(model, 0);
    await context.collections.EpayPaymentRefunds.insertOne({
      amount,
      createdAt: new Date(),
      currencyCode,
      reason,
      transactionId,
      metadata
    });
    return { saved: true };
  }
