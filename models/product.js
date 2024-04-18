const mongoose = require(`mongoose`);

const productSchema = new mongoose.Schema({
    itemid: {
        type: String
    },
    itemname: {
        type: String
    },
    Producttype: {
        type: String
    },
    carbonFootprint: {
        type: String
    },
    treeEquivalent: {
        type: String
    },
    recyclability: {
        type: String
    },
    remarks: {
        type: String
    },
});

const product = mongoose.model("products", productSchema);
module.exports = product;