var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = new Schema(
  {
    category: { type: String, required: true, minlength: 3, maxlength: 100}
  }
);

// Virtual for bookinstance's URL
CategorySchema
.virtual('url')
.get(function () {
  return '/Category/' + this._id;
});

//Export model
module.exports = mongoose.model('Category', CategorySchema);