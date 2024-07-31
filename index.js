const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

const receipts = {};

const totalPoints = (receiptDetails) => {
  let points = 0;
  const retailerName = receiptDetails.retailer || "";
  const totalPrice = parseFloat(receiptDetails.total || "0");
  const itemList = receiptDetails.items || [];
  const purchaseDate = receiptDetails.purchaseDate.split("-") || "";
  const day = parseInt(purchaseDate[2]);
  const purchaseTime = receiptDetails.purchaseTime.split(":");
  const purchaseHour = parseInt(purchaseTime[0]);

  points += parseInt(retailerName.match(/[a-zA-Z0-9]/g).length || 0);

  if (totalPrice % 1 === 0) points += 50;

  if (totalPrice % 0.25 === 0) points += 25;

  if (itemList.length != 0) {
    points += Math.floor(itemList.length / 2) * 5;
  }

  if (day % 2 !== 0) points += 6;

  if (purchaseHour >= 14 && purchaseHour < 16) points += 10;
  for (item of itemList) {
    const itemDesc = item.shortDescription.trim().length;
    if (itemDesc % 3 === 0) points += Math.ceil(item.price * 0.2);
  }

  return points;
};

//post the receipts and get id
app.post(`/receipts/process`, (req, res) => {
  const receipt = req.body;
  const id = uuid();

  const points = totalPoints(receipt);
  receipts[id] = points;

  res.json({ id: id });
});

//GET points for the receipt Id

app.get(`/receipts/:id/process/`, (req, res) => {
  const id = req.params.id;

  const points = receipts[id];
  if (points != undefined) res.json({ points: points });
  else res.status(404).json({ error: "Receipt is not found" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
