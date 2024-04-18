const express = require(`express`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const productRoute = require(`./routes/products`);

const app = express();

const port = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://aadeyshah55:yIabtOSlvWyzPH2W@cluster0.hmwo8xm.mongodb.net/"
  )
  .then(console.log("MongoDB Connected Successfully"))
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(`/`, productRoute);

app.listen(port, () => {
  console.log(`app is listening to ${port}.....`);
});
