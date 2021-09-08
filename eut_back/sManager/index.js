const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const path = require('path');
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;
const fs = require('fs');
//const multer = require('multer');
//require('dotenv').config();
app.use(express.json());

//const { ConnectionPolicyContext } = require("twilio/lib/rest/voice/v1/connectionPolicy");
//const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
//var nodemailer = require('nodemailer')
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(session({
  key: "customer_id",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // expires:60*60*24,
  },
}));

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'furniture',
});


//Server

app.listen(3001,()=>{
    console.log("Yey, your server is running on port 3001");
});

//Dashboard


//Orders

app.get('/sales_loadOrders',(req,res)=>{
    db.query('SELECT orders.order_id, orderitem.quantity,DATE_FORMAT(orders.o_date,"%d-%m-%y") AS o_date,DATE_FORMAT(orders.order_last_date,"%d-%m-%y") AS order_last_date,orders.status,orderitem.total,orders.customer_id FROM orders INNER JOIN orderitem ON orders.order_id = orderitem.order_id ORDER BY orders.order_id  DESC;', (err, results, fields) => {
        if(err) throw err;
        res.send(results);
      });
})

app.get('/sales_employeeDetail',(req,res) => {
    db.query('SELECT * FROM orders', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
        }
    });
});

app.get('/sales_viewOrder',(req,res)=>{
    order_id=req.params.order_id;
    db.query("SELECT * FROM orders WHERE order_id=?",[req.query.order_id],(err,result)=>{
      console.log(req.query.order_id);
      res.send(result);
    });
    
  });

  app.put('/sales_updateOrderDate', (req,res) => {
    const order_id=req.body.order_id;
    const order_last_date=req.body.order_last_date;
    db.query("UPDATE orders SET order_last_date=? WHERE order_id = ?", 
    [order_last_date,order_id], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

//Promotions

app.post("/sales_customization",(req,res)=> {
   
    const image=req.body.image;
    const name=req.body.name;
    const price=req.body.price;
    const description=req.body.description;
    const start_date=req.body.start_date;
    const end_date=req.body.end_date;
    const material=req.body.material; 
    
      db.query(
        "INSERT INTO promotions(description,price, start_date,end_date,name,material,image) VALUES (?,?,?,?,?,?,?)",[description,price, start_date, end_date,name,material,image],
        (err,result) =>{
            if(err){
                console.log(err)
            }else{
                res.send("values sended");
            }
        }
        );
    
        
      
    })

//Payments

app.get('/sales_pposts',(req,res)=>{
    db.query('SELECT orders.order_id,orders.total_price,payment.payment_id,payment.payment_status,payment.payment_method FROM orders INNER JOIN payment ON orders.order_id = payment.order_id ORDER BY orders.order_id  DESC;',
    (err,results,fields)=>{
        if(err) throw err;
        res.send(results);
    });
});

//ManageCustomer

app.get('/sales_load',(req,res)=>{
    db.query('SELECT * FROM customer',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
})

app.get('/sales_employees',(req,res) => {
    db.query('SELECT * FROM customer', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
        }
    });
});

app.get('/sales_view',(req,res)=>{
    customer_id=req.params.customer_id;
    db.query("SELECT * FROM customer WHERE customer_id=?",[req.query.customer_id],(err,result)=>{
      console.log(req.query.customer_id);
      res.send(result);
    });
    
  });

  app.put('/sales_updateEmployee', (req,res) => {
    const customer_id=req.body.customer_id;
    const fname = req.body.fname;
    const email=req.body.email;
    const address=req.body.address;
    const phone=req.body.phone;
    db.query("UPDATE customer SET fname = ?, email=?, address=?, phone=? WHERE customer_id = ?", 
    [fname,email,address,phone,customer_id], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

//AddCustomer and AddOrder

app.post('/sales_create', (req,res) => {
    const id = req.body.id;
    const email = req.body.email;
    const fname = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;

    db.query('INSERT INTO customer (email, phone, address, fname) VALUES (?,?,?,?)', 
    [email, phone, address, fname], (err, result) => {
        if (err) {
            console.log(err)
        } else{
            res.send("Values Inserted")
        }
      }
    );
});

app.post('/sales_create_order', (req,res) => {
    const customer_id = req.body.customer_id;
    const o_date = req.body.o_date;
    const order_last_date = req.body.order_last_date;
    const order_description = req.body.order_description;
    const total_price = req.body.total_price;
   

    db.query('INSERT INTO orders(customer_id, o_date, order_last_date, order_description, total_price) VALUES (?,?,?,?,?)',
    [customer_id, o_date, order_last_date, order_description, total_price], (err, result) => {
        if (err) {
            console.log(err)
        } else{
            res.send("Values Inserted")
        }
      }
    );
});


//Report

//Order Analytics
app.get('/sales_OrderAnalyze',(req,res) => {
    db.query('SELECT EXTRACT(MONTH FROM o_date) AS month, COUNT(order_id) AS count FROM orders GROUP BY month', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
            // console.log(result);
            
        }
    });
  });

  //return items
app.get('/sales_ReturnCount',(req,res) => {
    db.query('SELECT category.name,COUNT(return_item.return_id) AS count FROM ((orderitem INNER JOIN (orders INNER JOIN return_item ON orders.order_id=return_item.order_id) ON orderitem.order_id=orders.order_id) INNER JOIN (products INNER JOIN category ON products.category_id=category.category_id) ON orderitem.product_id=products.product_id) WHERE EXTRACT(MONTH FROM return_item.return_date) = MONTH(CURRENT_TIMESTAMP) GROUP BY (category.category_id)', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
            // console.log(result);
            
        }
    });
  });
  
  //moving items
  app.get('/sales_MovingItems',(req,res) => {
    const currentmonth=req.body.month;
    db.query('SELECT SUM(orderitem.quantity) AS count, category.name FROM ((orderitem INNER JOIN (products INNER JOIN category ON products.category_id=category.category_id) ON orderitem.product_id=products.product_id)INNER JOIN orders ON orderitem.order_id=orders.order_id) WHERE EXTRACT(MONTH FROM orders.o_date)=? AND category.name NOT IN("Gift","customized products") GROUP BY products.category_id',[req.query.month], (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
            // console.log(result);
            
        }
    });
  });

  //customized order pie chart
app.get('/sales_Cus_OrderChart',(req,res) => {
    db.query('SELECT SUM(quantity) AS quantity, category_name FROM customized_products GROUP BY category_name', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
            // console.log(result);
            
        }
    });
  });

  app.get('/sales_CategoryNoChart',(req,res) => {
    db.query('SELECT SUM(products.quantity) AS quantity, category.name FROM products INNER JOIN category ON products.category_id=category.category_id GROUP BY products.category_id', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
            // console.log(result);
            
        }
    });
  });


  app.get('/sales_CustomerCount',(req,res) => {
    db.query('SELECT date, COUNT(customer_id) AS count FROM customer GROUP BY date', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
            // console.log(result);
            
        }
    });
  });

  //OrderChart
app.get('/sales_OrderChart',(req,res) => {
    db.query('SELECT orders.o_date, SUM(orderitem.quantity) AS count FROM orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id GROUP BY orders.o_date', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
            // console.log(result);
            
        }
    });
  });

  //OrderChart
app.get('/sales_ReturnItemReport',(req,res) => {
    db.query('SELECT products.product_name,return_item.reason,return_item.return_id,return_item.return_date,return_item.reschedule_date,return_item.return_status FROM ((orderitem INNER JOIN (orders INNER JOIN return_item ON orders.order_id=return_item.order_id)ON orderitem.order_id=orders.order_id)INNER JOIN products ON orderitem.product_id=products.product_id) WHERE EXTRACT(MONTH FROM return_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
            // console.log(result);
            
        }
    });
  });
  
  
  //employeeCount
  app.get('/sales_EmployeeCount',(req,res) => {
    db.query('SELECT COUNT(id) AS count FROM employee', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
            
        }
    });
  });
  
  //customerCount
  app.get('/sales_CustomerNumber',(req,res) => {
    db.query('SELECT COUNT(customer_id) AS count FROM customer', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  
  //orderCount
  app.get('/sales_OrderCount',(req,res) => {
    db.query('SELECT COUNT(order_id) AS ordcount FROM orders WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  
  //productCount
  app.get('/sales_ProductCount',(req,res) => {
    db.query('SELECT COUNT(product_id) AS procount FROM products', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  
  //categoryCount
  app.get('/sales_CategoryCount',(req,res) => {
    db.query('SELECT COUNT(category_id) AS catcount FROM category', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  
  //
  app.get('/sales_CustomizedReport',(req,res) => {
    db.query('SELECT customized_products.cus_product_id,customized_products.design,customized_products.product_name,customer.fname FROM customized_products INNER JOIN customer ON customized_products.customer_id=customer.customer_id', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  
  //returnCount
  app.get('/sales_ReturnItemCount',(req,res) => {
    db.query('SELECT COUNT(return_id) AS returncount FROM return_item', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  
  //deliverCount
  app.get('/sales_DeliverCount',(req,res) => {
    db.query('SELECT COUNT(id) AS deliver_count FROM employee WHERE role="Delivery Person"', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  
  //deliverCount
  app.get('/sales_DeliveryStatus',(req,res) => {
    db.query('SELECT COUNT(status) AS count FROM orders WHERE status="Completed"', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  
  //OrderReport
  app.get('/sales_OrderReport',(req,res) => {
    db.query('SELECT orders.order_id,products.product_name,orders.o_date,orderitem.quantity,orders.total_price FROM ((orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id) INNER JOIN products ON orderitem.product_id=products.product_id) WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  
  //CustomerReport
  app.get('/sales_CustomerReport',(req,res) => {
    db.query('SELECT customer_id, fname,lname,email,address,phone,points,order_frequency,date FROM customer WHERE EXTRACT(MONTH FROM date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  
  //DeliveryReport
  app.get('/DeliveryReport',(req,res) => {
    db.query('SELECT products.product_name, orders.order_id,orders.order_last_date,orders.status FROM ((orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id)INNER JOIN products ON orderitem.product_id=products.product_id) WHERE EXTRACT(MONTH FROM orders.o_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  
  
//income
app.get('/sales_TotalIncome',(req,res) => {
    db.query('SELECT SUM(total_price) AS income FROM orders WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  
  //order analytics
  app.get('/sales_OrderByDate',(req,res) => {
   
    const currentmonth=req.body.month;
    db.query('SELECT products.name,customer.name AS cus_name,orders.o_date,orders.total_price FROM ((orders INNER JOIN products ON orders.product_id=products.product_id) INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE orders.o_date BETWEEN )', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });




  app.get("/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });



app.post('/login', (req, res) => {

	const email = req.body.email
	const password = req.body.password
    
    console.log(email)
    console.log(password)
	db.query
	("SELECT * FROM userlogin WHERE u_email = ?;", 
	email, 
	(err, result)=> {

		if(err){
			res.send({err: err})
		}
        if(result){
            console.log(result);
			if (result.length > 0) {
				bcrypt.compare(password, result[0].u_password, (error, response)=>{
                    console.log(response);
                    if(response){
                        req.session.user = result;
						res.send(result);
					}else{
						res.send({message:"Invalid Username or Password!"})
					}
				})
			}else{
				res.send({message:"User doesn't exist"});
			}

            
		}}
	);
});

 

 



 

 