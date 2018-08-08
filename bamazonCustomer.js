var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

connection.query('SELECT * FROM products', function(err, res){
    for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
    }

    var start = function() {
        inquirer.prompt([{
            name: "itemID",
            type: "input",
            message: "What is the ID of the item you'd like to purchase?",
            validate: function(value) {
                if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            name: "howMany",
            type: "input",
            message: "How many would you like to purchase?",
            validate: function(value) {
                if(isNaN(value)) {
                    return false;
                } else {
                    return true;
                }
            }
        }]).then (function(answer) {
        var productID = (answer.itemID);
        var quantity = parseInt(answer.howMany);
        var total = parseFloat((res.price) * quantity);

         if(res.stock_quantity >= quantity) {
             connection.query('UPDATE products SET ? WHERE ?', [
                 {stock_quantity: (res.stock_quantity - quantity)},
                 {item_id: answer.itemID}
             ], function(err, res) {
                 if (err) throw err;
                 console.log("Your Total is $" + total.toFixed(2));
                 start();
             });
             } else {
                 console.log("Apologies, we do not have enough inventory to fulfill your order.");
                 start();
            }
        }).catch(function(err) {
            console.log(err)
        });
}
start();
})