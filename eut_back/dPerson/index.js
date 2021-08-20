const express = require('express') ;
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser");
const { response } = require('express');
const saltRounds = 10
const { name } = require('ejs');
const bcrypt = require('bcrypt');
const cookieParser=require('cookie-parser');
const session = require('express-session');

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","PUT"],
    credentials:true     
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.use(cookieParser());
app.use(session({
    key:"employee_id",
    secret:"subscribe",
    resave:false,
    saveUninitialized:false,
    cookie:{
     expires:60*60*24,
    },
  }));
app.set("view engine","ejs");



const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "", 
    database: "eut_furnitures",
    multipleStatements:true

})

        // LOG IN SESSION
app.get("/login",(req,res)=>{
    if(req.session.user){
      res.send({loggedIn:true,user:req.session.user});
    }else{
      res.send({loggedIn:false});
    }
   });
     
        // LOG INTO THE SYSTEM
app.post('/login',(req,res)=>{
  
    const email = req.body.email;
    const password = req.body.password;
   
    db.query(
        "SELECT *FROM employee WHERE email=? ;",
       email,
        (err,result)=>{
            console.log(result)
            
            
            if(err)
            { 
                res.send({err:err})
            } 
            if(result.length > 0){
                
             if(password==result[0].password) {
               req.session.user=result;
                console.log(req.session.user);    
                   res.send(result);
                  }
                  else{
                   
                   res.send({message:"Invalid Username or Password"});
                  
                  }
              }
           })
          
        });


 
  // INSERT RETURN ITEMS
app.post('/create', (req, res) => {
    console.log(req.body);
  
    const order_id = req.body.order_id;
    const product_id = req.body.product_id;
    const return_date = req.body.return_date;
    const reason = req.body.reason;

    db.query("INSERT INTO return_item ( order_id, product_id, return_date, reason) VALUES (?,?,?,?)" ,
     [ order_id, product_id, return_date, reason],
      (err,result) => {
          if(err){
          console.log(err)
          }else {
              res.send(result)
          }
     });
});

    //UPDATE RETURN ITEMS
  app.put('/updateReturn/:order_id', (req,res) => {

    const order_id = req.params.order_id;
    const product_id = req.body.product_id;
    const return_date = req.body.return_date;
    const reason = req.body.reason;
    const sqlUpdate = "UPDATE   return_item   SET product_id=?, return_date=?, reason=? WHERE order_id = ?";
  
    db.query(sqlUpdate,[product_id, return_date,reason,order_id],(err,result)=>{
      if(err) console.log(err);
    })
  });
 
  //UPDATE DELIVERY STATUS
  app.put('/confirmdelivery/:order_id', (req,res) => {

    const order_id = req.params.order_id;
    const o_status = req.body.o_status;

    const sqlUpdates = "UPDATE orders  SET o_status =?  WHERE order_id = ?";
  
    db.query(sqlUpdates,[o_status,order_id],(err,result)=>{
      if(err) console.log(err);
    })
  });

   // VIEW DELIVERY TO CHANGE ORDER_STATUS
  app.get('/ConfirmDeliveryFetch', (req, res) => {
    db.query("SELECT  * FROM orders WHERE order_id=?",[req.query.order_id], (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
    
   });


     //UPDATE PAYMENT STATUS
 

   // VIEW CASH ON  DELIVERY TO CHANGE PAYMENT_STATUS
  app.get('/ConfirmCashonFetch', (req, res) => {
    db.query("SELECT orders.order_id, orders.total_price, orders.advance_price, payment.payment_status FROM payment LEFT JOIN orders ON orders.order_id = payment.order_id  WHERE payment_method = 'cash on delivery'",[req.query.order_id], (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
    
   });


    // VIEW RETURN ITEMS
app.get("/returnItem", (req, res) => {
    const sqlSelect = "SELECT * FROM return_item";
        db.query(sqlSelect, (err, result) => {
            res.send(result);
        } 
       
    );
    });



     // VIEW CASH ON DELIVERIES TO CONFIRM
app.get("/viewcashOnDelivery", (req, res) => {
   const sql_Select = " SELECT orders.order_id, orders.total_price, orders.advance_price, payment.payment_status FROM orders LEFT JOIN payment ON orders.order_id = payment.order_id  WHERE payment_method = 'cash on delivery'";
   db.query(sql_Select, (err, result) => {
    res.send(result);
    } 
    );      
    });

        // VIEW AVAILABLE DELIVERIES
 app.get("/viewAvailableDelivery", (req, res) => {
        const sql_View = "SELECT orders.order_id, orders.employee_id, orders.order_last_date,customer.address,customer.fname, customer.phone  FROM orders LEFT JOIN customer ON orders.customer_id=customer.customer_id    ";
        db.query(sql_View, (err, result,fields) => {
            res.send(result);
        } 
        );      
        });

       // VIEW  DELIVERY TO CONFIRM
app.get("/viewConfirmDelivery", (req, res) => {
            const sql_condelivery = " SELECT order_id, o_status FROM orders  ";
            db.query(sql_condelivery, (err, result) => {
             res.send(result);
             } 
             );      
             });


        
   //VIEW RETURN ITEMS INFO
  app.get('/ReturnItemview', (req, res) => {
    db.query("SELECT * FROM return_item WHERE order_id=?",[req.query.order_id], (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
    
   });

//  VIEW EMPLOYEE

   app.get('/employee', (req, res) => {
    db.query("SELECT * FROM employee WHERE employee_id=?",[req.query.employee_id], (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
    
   });



app.get('/dpprofile/:employee_id', (req, res) => {
    employee_id=req.params.employee_id;
    db.query("SELECT * FROM employee WHERE employee_id=? ",[req.query.employee_id], (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
   console.log(req.query.employee_id);
   });

   //       VIEW RETURN ITEM DETAILS
   app.get("/ReturnedDetails",(req,res)=>{
    order_id=req.params.order_id;
    db.query("SELECT order_id, employee_id,return_date,reason,product_id FROM return_item WHERE order_id=?",[req.query.order_id],(err,result)=>{
        console.log(req.query.order_id);
        res.send(result);
    });
        
});

    //VIEW DELIVERY DETAILS
app.get("/DeliveryDetails",(req,res)=>{
    order_id=req.params.order_id;
    db.query("SELECT *  FROM orders    WHERE order_id=? ",[req.query.order_id],(err,result)=>{
        console.log(req.query.order_id);
        res.send(result);
    });
        
});
//DELETE RETURN ITMES

app.delete("/deleteReturnitem/:order_id",(req,res)=>{
    const order_id = req.params.order_id;
    const sqlDelete="DELETE FROM return_item WHERE order_id=?";

    db.query(sqlDelete,order_id,(err,result)=>{
      if(err) console.log(err);
    });
  });


  app.get('/CountReturnItems',(req,res) => {
    db.query('SELECT COUNT(return_id) AS returncount FROM return_item', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });

  app.get('/TotalcashonIncome',(req,res) => {
    db.query("SELECT SUM(total_price) AS income FROM orders JOIN payment ON orders.order_id= payment.order_id WHERE payment.payment_method = 'cash on delivery'", (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
           
        }
    });
  });
  



//DELIVERY MANAGER

app.get("/", (req, res) => {
    db.query("SELECT * FROM employee WHERE role='Delivery Person' ", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});


app.get("/viewReturn", (req, res) => {
    db.query("SELECT order_id,employee_id,return_date,reason,reschedule_date,return_status FROM return_item ORDER BY order_id DESC", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

//VIEW DELIVERY FOR DELIVERY MANAGER

app.get("/delivery", (req, res) => {
  db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, orders.o_status,customer.fname,customer.address FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE orders.o_status='Ready to deliver' OR orders.o_status='Completed' OR  orders.o_status='Returned' OR orders.o_status='Pending' OR orders.o_status='Scheduled' ", (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
      }
  });
});


//ASSIGN DELIVERS

app.get("/Assign", (req, res) => {
  db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date,customer.address FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE orders.employee_id=0 ", (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
      }
  });
});
 //SELECT DELIVER EMPLOYEE ID 
app.get("/deliverid", (req, res) => {
  db.query("SELECT employee_id FROM employee WHERE role='Delivery Person'", (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
      }
  });
});



app.get("/deliverys", (req, res) => {
  db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, orders.o_status,customer.name,customer.address FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE  orders.o_status='Completed' OR  orders.o_status='Returned' OR orders.o_status='Scheduled' ORDER BY orders.order_id DESC LIMIT 8", (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
      }
  });
});

app.get("/viewStatus", (req, res) => {
  db.query("SELECT employee.employee_id,employee.e_name, COUNT(orders.o_status) AS pending FROM employee LEFT JOIN orders ON orders.employee_id=employee.employee_id WHERE (orders.o_status='Pending' OR orders.o_status='Scheduled' OR orders.o_status='Returned') AND employee.e_role='Deliver' GROUP BY employee.employee_id", (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
      }
  });
});

//VIEW RETURN ITEMS FOR DELIVERY MANAGER
app.get("/viewReturn", (req, res) => {
  db.query("SELECT order_id,employee_id,return_date,reason,reschedule_date,return_status FROM return_item ORDER BY order_id DESC", (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
      }
  });
});

//VIEW CASH ON DELIVRY FOR DELIVERY MANAGER
app.get("/cashOnDelivery", (req, res) => {
  db.query("SELECT orders.order_id,orders.employee_id,orders.total_price,orders.advance_price,payment.payment_status,orders.o_status FROM orders LEFT JOIN payment ON orders.order_id=payment.order_id WHERE payment.payment_method='cash on delivery' ORDER BY orders.order_id DESC", (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
      }
  });
});

  //CASH ON DELIVERY DETAILS
app.get("/CashOnDeliveryDetails",(req,res)=>{
  order_id=req.params.order_id;
  db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date,orders.customer_id,orders.total_price,orders.advance_price,payment.payment_status,orders.o_status FROM orders INNER JOIN payment ON orders.order_id=payment.order_id WHERE orders.order_id=?",[req.query.order_id],(err,result)=>{
      console.log(req.query.order_id);
      res.send(result);
  });
      
});


//VIEW DELIVERY PERSON
app.get("/viewDeliver",(req,res)=>{
  employee_id=req.params.employee_id;
  db.query("SELECT * FROM employee WHERE employee_id=?",[req.query.employee_id],(err,result)=>{
    console.log(req.query.employee_id);
    res.send(result);
  });
  
});
  

app.get("/delivers", (req, res) => {
  db.query("SELECT * FROM employee WHERE role='Delivery Person' ", (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
      }
  });
});

app.put('/UpdateDelivers', (req,res) => {
  const employee_id=req.body.employee_id;
  const e_name = req.body.e_name;
  const email = req.body.email;
  const e_phone = req.body.e_phone;
  const e_address = req.body.e_address;

  db.query("UPDATE employee SET e_name=?,email=?,e_phone=?,e_address=? WHERE employee_id = ?", 
  [e_name,email,e_phone,e_address,employee_id], 
  (err, result) => {

      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});


app.get("/viewDeliveryDetails",(req,res)=>{
order_id=req.params.order_id;
db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, orders.o_description,orders.o_d_date,orders.o_status,orders.o_date,customer.c_name,customer.c_address,customer.c_email,customer.c_phone_no FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE orders.order_id=?",[req.query.order_id],(err,result)=>{
  console.log(req.query.order_id);
  res.send(result);
});
  
});




//CUSTOMER
app.get('/customer', (req, res) => {
    db.query("SELECT * FROM customer WHERE customer_id=?",[req.query.customer_id], (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
    
   });



app.post("/register",(req,res) => {
    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const phone=req.body.phone;
    const address=req.body.address;
    const password=req.body.password;
    const cpassword=req.body.cpassword;
   
  
   if(password == cpassword){
    
     db.query(
         "INSERT INTO customer(fname,lname,email,phone,address,password,proimg) VALUES (?,?,?,?,?,?,'/user.jpg')",[fname,lname,email,phone,address,password],
         (err,result) =>{
             if(err){
                 console.log(err)
             }else{
                 res.send({message:"values sended"});
             }
         }
         );
     }
     else{
         res.send({message:"check password"})
     }
       
  }); 



  app.post('/loginc',(req,res)=>{
 
    const email = req.body.email;
    const password = req.body.password;
   
    db.query(
        "SELECT *FROM customer WHERE email=?;",
       email,
        (err,result)=>{
            console.log(result)
            
            
            if(err)
            { 
                res.send({err:err})
            } 
            if(result.length > 0){
                
             if(password==result[0].password) {
                   req.session.user=result;
                  // console.log(req.session.user);   
                   res.send(result);
                  }
                  else{
                   
                   res.send({message:"Invalid Username or Password"});
                  
                  }
              }
           })
          
        });


 //ADMIN 


 app.get('/recentOrders',(req,res)=>{
  db.query('SELECT product.product_name,product.product_img,orders.total_price FROM orders INNER JOIN product ON orders.product_id=product.product_id ORDER BY orders.order_last_date DESC LIMIT 5 ',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

//Notification Count
app.get('/CustomizedOrderCount',(req,res)=>{
  db.query('SELECT COUNT(cus_product_id) AS count FROM customized_products WHERE status="Pending" AND active=1',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

app.get('/NoficationActive', (req,res) => {
  
  db.query("UPDATE customized_products SET active=0 WHERE status ='Pending' ", 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//Charts
app.get('/CategoryNoChart',(req,res) => {
  db.query('SELECT SUM(product.quantity) AS quantity, category.c_name FROM product INNER JOIN category ON product.category_id=category.category_id GROUP BY product.category_id', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});


//employeeCount
app.get('/EmployeeCount',(req,res) => {
  db.query('SELECT COUNT(employee_id) AS count FROM employee', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          
      }
  });
});


//customerCount
app.get('/CustomerNumber',(req,res) => {
  db.query('SELECT COUNT(customer_id) AS count FROM customer', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//orderCount
app.get('/OrderCount',(req,res) => {
  db.query('SELECT COUNT(order_id) AS ordcount FROM orders', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//productCount
app.get('/ProductCount',(req,res) => {
  db.query('SELECT COUNT(product_id) AS procount FROM product', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//categoryCount
app.get('/CategoryCount',(req,res) => {
  db.query('SELECT COUNT(category_id) AS catcount FROM category', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//returnCount
app.get('/ReturnItemCount',(req,res) => {
  db.query('SELECT COUNT(return_id) AS returncount FROM return_item', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//deliverCount
app.get('/DeliverCount',(req,res) => {
  db.query('SELECT COUNT(employee_id) AS deliver_count FROM employee WHERE role="Delivery Person"', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//income
app.get('/TotalIncome',(req,res) => {
  db.query('SELECT SUM(total_price) AS income FROM orders', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//order analytics
app.get('/Order',(req,res) => {
  db.query('SELECT products.product_name,customer.fname AS cus_name,orders.o_date,orders.total_price FROM ((orders INNER JOIN product ON orders.product_id=product.product_id) INNER JOIN customer ON orders.customer_id=customer.customer_id)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//Order Analytics
app.get('/OrderAnalyze',(req,res) => {
    db.query('SELECT EXTRACT(MONTH FROM o_date) AS month, COUNT(order_id) AS count FROM orders GROUP BY month', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
            // console.log(result);
            
        }
    });
  });
  
app.get('/loadEmployee',(req,res)=>{
  db.query('SELECT e_name,role,e_image FROM employee WHERE NOT role="admin" ',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

app.get('/GetAdmin',(req,res) => {
    db.query('SELECT * FROM employee WHERE role="admin"', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
        }
    });
  });


  app.get("/viewAdmin",(req,res)=>{
    id=req.params.id;
  
    db.query("SELECT * FROM employee WHERE role='admin'",[req.query.id],(err,result)=>{
        console.log(req.query.id);
        res.send(result);
    });
        
  });


  app.post('/addProducts',(req,res)=>{
  
    console.log(req.body)
  const product_img =req.body.image;
  const product_name = req.body.name;
  const price = req.body.price;
  const material = req.body.material;
  const quantity = req.body.quantity;
  const category_id=req.body.category_id;
  const description=req.body.description;
  
  db.query(
    "INSERT INTO products(product_name,price,product_img,material,quantity,category_id,description) VALUES (?,?,?,?,?,?,?)",[product_name,price,product_img,material,quantity,category_id,description],
    (err,result)=>{
      if(err){
        console.log(err)
      }else{
        res.send("Values added")
      }
    }
  );
  })

app.listen(3001,  () => {
    console.log("Hi Your Server is connected!");

});
