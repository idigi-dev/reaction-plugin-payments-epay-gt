export default (shopperIP, auditNumber = "", email="", cardNumber = "", cardExpiry = "", amount = 0, cvv2 = "", cardName = "") => {
  let pan = cardNumber && cardNumber.replace(/ /g,"");
  cardExpiry = cardExpiry.replace(/[^\d]/g, '');
  let expvalues = cardExpiry && `${cardExpiry[2]}${cardExpiry[3]}${cardExpiry[0]}${cardExpiry[1]}`;
  let expdate =  expvalues;
  let metaPan = pan.replace( /\d(?=\d{4})/gm, 'x');
  const _epayModel = { shopperIP, pan, expdate, amount, cvv2, auditNumber, email, cardName, metadata:{
    pan: metaPan,
    cardName,
    amount,
    email
  } };
  return _epayModel;
};
