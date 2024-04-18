const product = require(`../models/product`);
const request = require(`request`);

const accessToken = `ff6F39-Iyr3I2XhROKfUEOi9E00v-Rfax-_2Mn278mKWFq66jwPDXQ9k1_ihjuyb`;

const handleQRGenerator = async(req, res) => {
    const itemid = `0001`;
    request.post(
        `https://api.qr-code-generator.com/v1/create?access-token=${accessToken}`,
        { json: { 
            frame_name: "no-frame",
            qr_code_text: `localhost:5000/generate/${itemid}`,
            image_format: "SVG",
            qr_code_logo: "scan-me-square" 
        } },
        function (error, response, body) {
            if (!error) {
                console.log(body);
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
                            max-height: 70vh;
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
}

module.exports = {handleQRGenerator};