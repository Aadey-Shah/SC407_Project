const express = require(`express`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const productRoute = require(`./routes/products`);

const app = express();

const port = 5000;

mongoose
  .connect("mongodb://127.0.0.1/ie403")
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