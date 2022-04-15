import Random from "@reactioncommerce/random";
import { EpayService } from "../services/index.js";
import { EpayModel } from "../models/index.js";
import {
  EPAY_PACKAGE_NAME,
  PAYMENT_METHOD_NAME,
  PROCESSOR,
} from "./constants.js";

const METHOD = "credit";

/**
 * @summary As an example and for demos, this non-production payment method creates a payment
 *   without charging any credit card
 * @param {Object} context The request context
 * @param {Object} input Input necessary to create a payment
 * @returns {Object} The payment object in schema expected by the orders plugin
 */
export default async function exampleCreateAuthorizedPayment(context, input) {
  const {
    amount,
    billingAddress,
    shopId,
    email,
    paymentData: { cardNumber, cardExpiry, cardCVV, cardName },
  } = input;
  const model = EpayModel(
    "190.56.108.46",
    "0",
    email,
    cardNumber,
    cardExpiry,
    amount,
    cardCVV,
    cardName
  );
  const res = await EpayService(model, 1);
  return {
    _id: Random.id(),
    address: billingAddress || null,
    amount,
    createdAt: new Date(),
    data: {
      ...res,
      ...model.metadata,
      gqlType: "EPayGtPaymentData", // GraphQL union resolver uses this
    },
    displayName: `Pago con tarjeta`,
    method: METHOD,
    mode: "authorize",
    name: PAYMENT_METHOD_NAME,
    paymentPluginName: EPAY_PACKAGE_NAME,
    processor: PROCESSOR,
    riskLevel: "normal",
    shopId,
    status: "created",
    transactionId: res.auditNumber,
    transactions: [],
  };
}
