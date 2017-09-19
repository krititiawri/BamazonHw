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
  console.log("Connected!");
  // connection.query("CREATE DATABASE bamazon if not exist", function (err, result) {
  //   if (err) throw err;
  //   console.log("Database created");
  // Insert();
  selectProduct();
  // start();
  });

function Insert(){
connection.query("INSERT INTO products (item_id, product_name,product_sales,department_name,price,stock_quantity) VALUES(1,'Jeans',0,'Appearl',40,58),(2,'Tops',0,'Appearl',30,98),(3,'Iphone',0,'Electronic',400,188),(4,'Tv',0,'Electronic',1000,28),(5,'Dresses',0,'Appearl',90,89),(6,'Stawberry',0,'fruits',20,100),(7,'Banana',0,'fruits',10,110),(8,'Plates',0,'Kitchen',500,90),(9,'Handbag',0,'Bags',1000,99),(10,'Apples',0,'Fruits',40,223)",function(err,result){
    if(err) throw err;
    console.log(result);
  });
  }



// To show the products table 
function selectProduct(){
  connection.query("SELECT * from products",function(err,res){
    if(err) throw err;
    console.log(res);
     console.log(res.length + " matches found!");
       var table = new Table({
          head:['Item_id','Product_name','Product_sales','Department_name','Price','Stock_quantity']
          // style: {
          //   head: ['blue'],
          //   compact: false,
          //   colAligns: ['center'],
          // }

        });

          //loops through each item in the mysql database and pushes that information into a new row in the table
       for(var i = 0; i < res.length; i++){
         table.push(
         [res[i].item_id, res[i].product_name, res[i].product_sales,res[i].department_name,res[i].price,res[i].stock_quantity]
         );
       }
  console.log(table.toString());

  // });
  // Inquirer for the user to select the item to buy
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
      message: "How many would you like to buy?",
      // choices: ["POST", "BID"]
    }
    ])
    .then(function(answer) {
     var chosenItem ;
       for (var i = 0; i < res.length; i++) {
          if (res[i].item_id === parseInt(answer.productsale)) {
            chosenItem = res[i];
            console.log(chosenItem);
          }
        }
        // To determine if the product is availaible in inventory or not
        if (chosenItem.stock_quantity > parseInt(answer.productbuy)){
          console.log(answer.productbuy);
          // console.log()
          console.log("choosen item id is"+chosenItem.item_id);
          // console.log(item_id);
          console.log("stock_quantity is:"+chosenItem.stock_quantity);

          var newStock_quantity = chosenItem.stock_quantity- parseInt(answer.productbuy);
          var price_new = chosenItem.price* answer.productbuy;
          console.log("The price is:"+price_new)
          console.log("Remmainig quantity is:"+newStock_quantity);
// Updating the database with new stock_quantity and price

var query = 'UPDATE products SET stock_quantity = '+newStock_quantity+', product_sales = '+price_new+' WHERE item_id='+chosenItem.item_id;
console.log(query)
            connection.query(query,function(error,res) {
              if (error) throw err;
              console.log(res)
              console.log("Stock_quantity updated sucessfully!");
              // start();
              start();
            })
         
        } 
        else{
          console.log("insufficient quantity");
          // selectProduct1();
        }
    });
  // start();

});
}

function start(){
  connection.query("SELECT * from products",function(err,res){
    if(err) throw err;
    console.log(res);
     console.log(res.length + " matches found!");
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
});
  selectProduct();
}