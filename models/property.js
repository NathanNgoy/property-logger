let mongoose = require("mongoose");
var moment = require('moment');
let Schema = mongoose.Schema;

let PropertySchema = new Schema({
    title: {type: String, required: true},
    brand: {type: String, required: true},
    cost: {type: Number, default: 0},
    date_purchase: {type: Date, default: Date.now()},
    quality: {type: String},
    description: {type: String},
    pictures: {data: Buffer, type: String},
    category: {type:Schema.Types.ObjectId, ref: "Category"},
});

PropertySchema
.virtual("url")
.get(function() {
    return '/property/' + this._id;
})

module.exports = mongoose.model("Property", PropertySchema);
