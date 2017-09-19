var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');
// var inquirer = require("inquirer");
// var csv = require('csv'),
//   Table = require('cli-table');
// var Table = require('cli-table2');
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Kartik@01",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "QUIT"
       
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          productSale();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addProduct();
          break;
        case "QUIT":
          console.log("Good Bye")
          break; 
        
      }
    });
}
// To display all product for sale
function productSale() {
  inquirer
    .prompt({
      name: "itemSale",
      type: "input",
      message: "Press enter to view Products for Sale "
    })
    .then(function(answer) {
      
      connection.query("SELECT * from products ", function(err, res) {
        console.log(res);
        console.log(res.length + " matches found!");
        console.log("Products for sale are: ")

        var table = new Table({
           head:['Item_id','Product_name','Product_sales','Department_name','Price','Stock_quantity']
      
        });

          //loops through each item in the mysql database and pushes that information into a new row in the table
       for(var i = 0; i < res.length; i++){
         table.push(
         [res[i].item_id, res[i].product_name, res[i].product_sales,res[i].department_name,res[i].price,res[i].stock_quantity]
         );
       }
  console.log(table.toString());

        runSearch();
      });
    });
}
// To list all items with an inventory count lower than five
function lowInventory() {
  inquirer
    .prompt({
      name: "itemCount",
      type: "input",
      message: "Press enter to view item with low Inventory "
    })
    .then(function(answer) {
      
      connection.query("SELECT * from products where stock_quantity < 5", function(err, res) {
        console.log(res);
        console.log(res.length + " matches found!");
        console.log("Products in inventory with count lower than 5: ")

        var table = new Table({
           head:['Item_id','Product_name','Product_sales','Department_name','Price','Stock_quantity']
      
        });

          //loops through each item in the mysql database and pushes that information into a new row in the table
       for(var i = 0; i < res.length; i++){
         table.push(
         [res[i].item_id, res[i].product_name, res[i].product_sales,res[i].department_name,res[i].price,res[i].stock_quantity]
         );
       }
  console.log(table.toString());

        runSearch();
      });
    });
}
// To add more of any item currently in the Store
function addInventory() {
  inquirer
    .prompt([
    { 
      name: "productsale",
      type: "input",
      message: "what is the Id of item you would like to buy?",
      // choices: ["POST", "BID"]
    },
    { 
      name: "productbuy",
      type: "input",
      message: "How many would you like to add?",
      // choices: ["POST", "BID"]
    }
    ])
    .then(function(answer) {
     
       connection.query("SELECT * from products ", function(err, res) {
        console.log(res);
        console.log(res.length + " matches found!");
        console.log("Products in inventory with count lower than 5: ")

        var table = new Table({
           head:['Item_id','Product_name','Product_sales','Department_name','Price','Stock_quantity']
      
        });

          //loops through each item in the mysql database and pushes that information into a new row in the table
       for(var i = 0; i < res.length; i++){
         table.push(
         [res[i].item_id, res[i].product_name, res[i].product_sales,res[i].department_name,res[i].price,res[i].stock_quantity]
         );
       }
  console.log(table.toString());
      
var chosenItem ;
       for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === parseInt(answer.productsale)) {
            chosenItem = res[i];
            console.log(chosenItem);
          }
        }
        // var new_quantity = ans+chosenItem.stock_quantity;
         // var new_quantity = chosenItem.stock_quantity+parseInt(answer.productbuy);
        console.log("Current stock stock_quantity"+chosenItem.stock_quantity);
        console.log("stock_quantity by user"+parseInt(answer.productbuy));
        var new_quantity = chosenItem.stock_quantity+parseInt(answer.productbuy);
        console.log("new stock_quantity is "+new_quantity);
        // runSearch();
         connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: new_quantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Item added successfully");
              // start();
            }
          );
        connection.query("SELECT * from products ", function(err, res) {
        console.log(res);
        console.log(res.length + " matches found!");
        console.log("More item successfully added to alredy existing items ")

        var table = new Table({
           head:['Item_id','Product_name','Product_sales','Department_name','Price','Stock_quantity']
      
        });

          //loops through each item in the mysql database and pushes that information into a new row in the table
       for(var i = 0; i < res.length; i++){
         table.push(
         [res[i].item_id, res[i].product_name, res[i].product_sales,res[i].department_name,res[i].price,res[i].stock_quantity]
         );
       }
  console.log(table.toString());
     runSearch();
      });
       
  
    });

});
    // });
}

// To add more of any item currently in the Store

function addProduct(){
   inquirer
    .prompt([
    { 
      name: "productName",
      type: "input",
      message: "what is the name of product you would like to add?",
      // choices: ["POST", "BID"]
    },
    { 
      name: "department",
      type: "list",
      message: "which department does this product falls into?",
      choices: [
        "Appearl",
        "Electronic",
        "Fruits",
        "Kitchen",
        "Bags"
      ],
     },
    { 
      name: "productCost",
      type: "input",
      message: "How much does it cost?",
      // choices: ["POST", "BID"]
    },
     { 
      name: "productQuantity",
      type: "input",
      message: "How many do we have?",
      // choices: ["POST", "BID"]
    },
      // choices: ["POST", "BID"]
    
    ])
    .then(function(answer) {
         connection.query(
        "INSERT INTO products SET ?",
        {
          // item_name: answer.item,
          // category: answer.category,
          // starting_bid: answer.startingBid,
          // highest_bid: answer.startingBid


          product_name : answer.productName,
          department_name: answer.department,
          price:answer.productCost,
          stock_quantity: answer.productQuantity

        },
        function(err) {
          if (err) throw err;
          console.log("Product added successfully!");
          // re-prompt the user for if they want to bid or post
          // runSearch();
        }
      );
         connection.query("SELECT * from products ", function(err, res) {
        console.log(res);
        console.log(res.length + " matches found!");
        console.log("More item successfully added to alredy existing items ")

        var table = new Table({
           head:['Item_id','Product_name','Product_sales','Department_name','Price','Stock_quantity']
      
        });

          //loops through each item in the mysql database and pushes that information into a new row in the table
       for(var i = 0; i < res.length; i++){
         table.push(
         [res[i].item_id, res[i].product_name, res[i].product_sales,res[i].department_name,res[i].price,res[i].stock_quantity]
         );
       }
  console.log(table.toString());
     runSearch();
      });
       
  
    });
    // });
}
// function quit(){
//   inquirer
//     .prompt([
//     { 
//       name: "complete",
//       type: "input",
//       message: "Do yo want to Quit?"
//       // choices: ["POST", "BID"]
//     }
//     ])
//     .then(function(answer) {
//       if(answer.complete === "Yes")
//       {
//         console.log("Goodbye")
//       }

//     })
// }

