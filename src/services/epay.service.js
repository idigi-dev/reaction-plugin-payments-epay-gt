import fetch from "node-fetch";
import { EpayConstant } from "../constants/index.js";

export default async (body, action = 1) => {
  const invoiceUrl = process.env.INVOICE_URL;
  const res = await fetch(
    `${invoiceUrl}/api/epay?action=${action}`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" }
    }
  );
  if (!res.ok) {
    throw new Error("Error en la comunicación");
  }
  const data = await res.json();
  const error = EpayConstant[data.responseCode];
  if (error) {
    throw new Error(error);
  } else if (data.responseCode !== "00") {
    throw new Error("error desconocido en el sistema de cobros");
  }
  return data;
};
