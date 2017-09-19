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
        "View Products Sales by Department",
        "Create New Department",
        "QUIT"
       
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products Sales by Department":
          productByDepartment();
          break;

        case "Create New Department":
          createDepartment();
          break;

        case "QUIT":
          console.log("Good Bye")
          break; 
        
      }
    });
}

function productByDepartment(){
   connection.query("select department_id,departments.department_name,over_head_costs,products.product_sales,(products.product_sales-departments.over_head_costs) as profit from products right join departments on products.department_name = departments.department_name  ", function(err, res) {
        var table = new Table({
           head:['department_id','department_name','over_head_costs','productsale','Profit']
      
        });

          // loops through each item in the mysql database and pushes that information into a new row in the table
       for(var i = 0; i < res.length; i++){
         table.push(
         [res[i].department_id, res[i].department_name, res[i].over_head_costs,res[i].product_sales,res[i].profit]
         );
       }
  console.log(table.toString());
});
}

function createDepartment(){
  inquirer
    .prompt([
    { 
      name: "departmentName",
      type: "input",
      message: "what is the name of Department?",
    },
    { 
      name: "cost",
      type: "input",
      message: "what is the overhead cost of the department?",
    }
     
    ])
    .then(function(answer) {
         connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name : answer.departmentName,
          over_head_costs:answer.cost

        },
        function(err) {
          if (err) throw err;
          console.log("Department added successfully!");
          productByDepartment();
          runSearch();
        }
      );

});
}
