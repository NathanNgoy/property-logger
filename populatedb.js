#! /usr/bin/env node

console.log('This script populates some test board games and categories to your database.');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Product = require('./models/property')
var Category = require('./models/category')

var mongoose = require('mongoose');
const category = require('./models/category');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = []
var categories = []

function productCreate(title, brand, cost, quality, description, category, cb) {
  productDetail = { 
    title: title, 
    brand: brand, 
    cost: cost, 
    quality: quality, 
    description: description,
    category: category};
  
  var product = new Product(productDetail);
       
  product.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Product: ' + product);
    products.push(product)
    cb(null, product);
  }  );
}

function categoryCreate(name, cb) {
  var category = new Category({ category: name });
       
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category);
  }   );
}

function createCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate("Living Room", 
          callback);
        },
        function(callback) {
          categoryCreate("Kitchen", 
          callback);
        },
        function(callback) {
          categoryCreate("Bathroom", 
          callback);
        },
        function(callback) {
          categoryCreate("Bedroom", 
          callback);
        }
        ],
        cb);
}


function createProducts(cb) {
    async.parallel([
        function(callback) {
          productCreate(
          "Television", 
          "Samsung",
          1000, 
          "Like New", 
          "Samsung oLED LCD 47 inch bought from Costco", 
          categories[0],
          callback);
        },
        function(callback) {
          productCreate("Kitchen Table", 
          "Ikea",
          540, 
          "Used", 
          "Marbled counter, 6 years old",  
          categories[1],
          callback);
        },
        function(callback) {
          productCreate(
          "Chairs", 
          "Ikea",
          300, 
          "Worn", 
          "5 dinner chairs, 6 years old, leather and worn down", 
          categories[1],
          callback);
        },
        function(callback) {
          productCreate(
          "Mechanical Keyboard", 
          "Self made",
          500, 
          "New", 
          "KBD aluminum case, holy pandas switches, sakura keycaps, everclear stabalizers", 
          categories[4],
          callback);
        }
        ],
        // optional callback
        cb);
}

console.log("Inserting into database");
async.series([
    createCategories,
    createProducts
],
// Optional callback
function(err, results) {
  console.log(products)

  console.log(categories)

    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
      console.log("Inserted")
    }
    // All done, disconnect from database
    mongoose.connection.close();
});