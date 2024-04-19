const product = require(`../models/product`);
const request = require(`request`);

const accessToken = `ff6F39-Iyr3I2XhROKfUEOi9E00v-Rfax-_2Mn278mKWFq66jwPDXQ9k1_ihjuyb`;

const handleQRGenerator = async (req, res) => {
  try {
    const segments = req.url.split("/");
    const itemid = segments.pop() || segments.pop();
    request.post(
      `https://api.qr-code-generator.com/v1/create?access-token=${accessToken}`,
      {
        json: {
          frame_name: "no-frame",
          qr_code_text: `https://sc407.onrender.com/display/${itemid}`,
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
        },
      },
      function (error, response, body) {
        if (!error) {
          res.end(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Green Lens | QR Code Generator</title>
                        <style>
                        .container {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }
                        h1 {
                            font-size: 80px;
                            text-align: center;
                        }
                        .head {
                            display: flex;
                            justify-content: center;
                            gap: 20px;
                            align-items: center;
                        }
                        .head img {
                            height: 80px;
                        }
                        svg {
                            height: 60vh;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="head">
                                <h1>Green Lens</h1>
                                <img
                                src="https://icones.pro/wp-content/uploads/2021/06/symbole-de-la-loupe-vert.png"
                                alt=""
                                />
                            </div>
                            <div class="qr-code">
                                ${body}
                            </div>
                        </div>
                    </body>
                    </html>
                `);
        }
      }
    );
  } catch (error) {
    console.log(error, `\nQR Generate Error`);
  }
};

const getElement = async (similarProducts) => {
  return await similarProducts
    .map((e) => {
      return `<div class="link"><a href="https://sc407.onrender.com/display/${e.itemid}" target="_blank">${e.itemname}</a></div>`;
    })
    .join(``);
};

const getDetails = async (req, res) => {
  try {
    const segments = req.url.split("/");
    const itemid = segments.pop() || segments.pop();

    const targetProduct = await product.findOne({ itemid });
    console.log(targetProduct);
    if (targetProduct) {
      const similarProduct = await product.find({
        Producttype: targetProduct.Producttype,
      });
      console.log(similarProduct);
      const tags = await getElement(similarProduct);
      res.end(`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Green Lens | Product Details</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                  href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
                  rel="stylesheet"
                />
                <style>
                  * {
                    margin: 0;
                    padding: 0;
                  }
                  body {
                    background-color: black;
                    color: white;
                    font-family: "Montserrat", sans-serif;
                  }
                  .head {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 27px;
                    margin-top: 30px;
                    margin-bottom: 15px;
                  }
                  .title {
                    font-size: 80px;
                    font-weight: 500;
                  }
                  .logo {
                    height: 85px;
                  }
                  .logo img {
                    height: 100%;
                  }
                  .card {
                    background-color: rgb(58, 91, 58);
                    font-size: 40px;
                    width: 60%;
                    margin: 40px auto;
                    padding: 20px 30px;
                    border-radius: 25px;
                    text-align: center;
                  }
                  .details {
                    margin-top: 15px;
                  }
                  .sub-detail {
                    font-size: 23px;
                    display: flex;
                    justify-content: space-between;
                    width: 80%;
                    margin: auto;
                    padding: 20px 0px;
                  }
                  .remarks {
                    font-size: 23px;
                    width: 80%;
                    margin: 25px auto;
                    text-align: left;
                  }
                  #similar {
                    font-size: medium;
                    text-align: left;
                  }
                  .title2 {
                    font-size: 40px;
                    text-align: center;
                  }
                  a {
                    text-decoration: none;
                    color: rgb(155, 155, 255);
                    font-size: 23px;
                  }
                  .link {
                    margin : 15px 0px
                  }
                  #note {
                    width: 60%;
                  }
                  @media only screen and (max-width: 650px) {
                    .head {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 20px;
                      margin-top: 15px;
                      margin-bottom: 7.5px;
                    }
                    .title {
                      font-size: 35px;
                      font-weight: 500;
                    }
                    .logo {
                      height: 50px;
                    }
                    .card {
                      width: 84%;
                      margin: 25px auto;
                      font-size: 20px;
                      padding: 10px;
                      border-radius: 15px;
                    }
                    .details {
                      margin-top: 12px;
                    }
                    .sub-detail {
                      font-size: 12.5px;
                      display: flex;
                      justify-content: space-between;
                      width: 90%;
                      margin: auto;
                      padding: 10px 0px;
                    }
                    .remarks {
                      width: 90%;
                      margin-top: 12px;
                      font-size: 12.5px;
                    }
                    .title2 {
                      font-size: 20px;
                      text-align: center;
                    }
                    a {
                      text-decoration: none;
                      color: rgb(155, 155, 255);
                      font-size: 12.5px;
                    }
                    #note {
                      width: 84%;
                    }
                  }
                </style>
              </head>
              <body>
                <div class="head">
                  <div class="title">Green Lens</div>
                  <div class="logo">
                    <img
                      src="https://icones.pro/wp-content/uploads/2021/06/symbole-de-la-loupe-vert.png"
                      alt=""
                    />
                  </div>
                  </div>
                  <div class="card">
                    <div class="item-name">${targetProduct.itemname}</div>
                    <div class="details">
                      <div class="sub-detail">
                        <div class="label">Carbon Footprint</div>
                        <div class="value">${targetProduct.carbonFootprint}</div>
                      </div>
                      <div class="sub-detail">
                        <div class="label">Tree Equivalent</div>
                        <div class="value">${targetProduct.treeEquivalent}</div>
                      </div>
                      <div class="sub-detail">
                        <div class="label">recyclability</div>
                        <div class="value">${targetProduct.recyclability}</div>
                      </div>
                    </div>
                    <div class="remarks">Remarks - ${targetProduct.remarks}</div>
                  </div>
                </div>
            
                <div id="similar" class="card">
                  <div class="title2">Similar Products</div>
                  ${tags}
                </div>
                <div id="note" class="remarks" style="text-align:left">*Tree equivalent - number of trees needed to offset that much carbon emission in a year</div>
              </body>
            </html>
            `);
    } else {
      res.end(`Product Not Found`);
    }
  } catch (error) {
    res.end(`Something went wrong`);
    console.log(error, `\nGet Details Error`);
  }
};

module.exports = { handleQRGenerator, getDetails };
