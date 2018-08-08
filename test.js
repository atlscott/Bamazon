var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root", 
    password: "root",
    database: "bamazon_DB"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
})

connection.query('SELECT * FROM products', function(err, res){
  console.log("----------------------------");
  for (var i = 0; i < res.length; i++) {
    console.log(res[i].item_id + " | " + res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity + " | ");
  }
  console.log("----------------------------");

var start = function(){
      console.log('\n-------------------------------------');
      inquirer.prompt([{
        name: "idBuy",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
          return true;
        } else{
          return false;
        }
      }
    }, {
        name: "numUnits",
        type: "input",
        message: "What is the number of units you would like to buy?",
        validate: function(value){
        if(isNaN(value)){
          return false;
        } else{
          return true;
      }
      }
  }]).then(function(answer) {
        var productID = (answer.idBuy);
        var numberOfUnits = parseInt(answer.numUnits);
        var total = parseFloat((res[product_name].price)*numberOfUnits);

        if(res[product_name].stock_quantity >= numberOfUnits){

          connection.query('UPDATE products SET ? WHERE ?', [
            {StockQuantity: (res[product_name].stock_quantity - numberOfUnits)},
            {ID: answer.idBuy}
          ], function(err, res){

            if(err) throw err;
            console.log('\n-------------------------------------');
            console.log("\nYour total is $" + total.toFixed(2));
            console.log('-------------------------------------');
            start();
          });

        } else {
          console.log('\n-------------------------------------');
          console.log("Sorry, not enough units in stock!");
          console.log('\n-------------------------------------');
          start();
        }
        // start();
        });
}

start();
})
