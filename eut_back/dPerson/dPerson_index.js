const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const { name } = require('ejs');
const bcrypt = require('bcrypt');
const bodyParser =  require('body-parser')
const { response } = require('express');
const multer = require('multer');
const saltRounds = 10;

const cookieParser = require('cookie-parser');
const session = require('express-session');

var nodemailer = require('nodemailer')

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
  }));



app.use(express.json());
app.set("view engine","ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  key: "id",
  secret: "subscribe",
  resave: false,
  saveUninitialized: false,
  cookie: {
    // expires:60*60*24,
  },
}));

const db = mysql.createConnection({
    user: "root",
    host:"localhost",
    password:"",
    database:"eut_furnitures",
    multipleStatements:true
});


app.get("/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });

  
     
        // LOG INTO THE SYSTEM

        app.post('/login', (req, res) => {

          const email = req.body.email;
          const password = req.body.password;
        
          db.query(
            "SELECT *FROM userlogin WHERE u_email=?;",
            email,
            (err, result) => {
              console.log(result)
        
        
              if (err) {
                res.send({ err: err })
              }
              if (result.length > 0) {
        
                if (password == result[0].u_password) {
                  req.session.user = result;
                  // console.log(req.session.user);   
                  res.send(result);
                }
                else {
        
                  res.send({ message: "Invalid Username or Password" });
        
                }
              }
            })
        
 });



const upload = multer({
        storage,
        limits:{
          fileSize: 5000000
        },
        fileFilter(req,file,cb){
          if(!file.originalname.match(/\.(jpeg|jpg|png)$/i)){
            return  cb(new Error('pleaseupload image with type of jpg or jpeg'))
        }
        cb(undefined,true)
      }
      })
      
app.post("/imageUpload",upload.single('file'),(req,res)=> {
         
})

app.get("/login",(req,res)=>{
    if(req.session.user){
      res.send({loggedIn:true,user:req.session.user});
    }else{
      res.send({loggedIn:false});
    }
   });
   


app.post('/create', (req, res) => {
    console.log(req.body);
  
    const order_id = req.body.order_id;
    const product_id = req.body.product_id;
    const employee_id = req.body.employee_id;
    const return_date = req.body.return_date;
    const reason = req.body.reason;

    db.query("INSERT INTO return_item ( order_id, product_id, employee_id, return_date, reason) VALUES (?,?,?,?,?)" ,
     [ order_id, product_id,employee_id, return_date, reason],
      (err,result) => {
          if(err){
          console.log(err)
          }else {
              res.send(result)
          }
     });
});    // VIEW RETURN ITEMS
app.get('/returnItem',(req, res) =>{
  db.query(" SELECT * FROM return_item WHERE employee_id=?  ", [req.query.employee_id],(err, results)=>
   { 
   console.log(req.query.employee_id);
    res.send(results);
   })
   
})

  //  EMPLOYEE SESSION 
app.get('/employee', (req, res) => {
    db.query("SELECT * FROM employee WHERE email=?",[req.query.email], (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
    
   });

    
        //VIEW DELIVERY DETAILS
app.get("/DeliveryDetails",(req,res)=>{
            order_id=req.params.order_id;
            db.query("SELECT *  FROM orders  INNER JOIN customer ON orders.customer_id=customer.customer_id  JOIN orderitem ON orders.order_id = orderitem.order_id WHERE orders.order_id=?  ",[req.query.order_id],(err,result)=>{
                console.log(req.query.order_id);
                res.send(result);
            });
                
 })


  
         // VIEW  DELIVERY TO CONFIRM
        
app.get('/viewConfirmDelivery',(req, res) =>{
     db.query("SELECT *  FROM orders  JOIN employee ON orders.employee_id = employee.id  WHERE orders.employee_id = ? AND orders.status <> 'Completed'  ", [req.query.employee_id],(err, results)=>
      { 
      console.log(req.query.employee_id);
       res.send(results);
      })
      
})


 app.get('/dpprofile', (req, res) => {
         
        db.query("SELECT * FROM employee WHERE id=? ",[req.query.id], (err, results, fields) => {
           if(err) throw err;
           res.send(results);
         });
       
});

       //       VIEW RETURN ITEM DETAILS
app.get("/ReturnedDetails",(req,res)=>{
        order_id=req.params.order_id;
        db.query("SELECT order_id, employee_id,return_date,reason,product_id FROM return_item WHERE order_id=?",[req.query.order_id],(err,result)=>{
            console.log(req.query.order_id);
            res.send(result);
        });
            
    });


  app.put('/confirmdelivery/:order_id', (req,res) => {

    const order_id = req.params.order_id;
    const Bill_image =  req.body.Bill_image;
    let active =  req.body.active;
    const sqlUpdates = "UPDATE orders SET Bill_image=?, active=? WHERE order_id=? ";
  
    db.query(sqlUpdates,[Bill_image, active=1, order_id],(err,result)=>{
      if(err) console.log(err);
    })
  });

  app.put('/confirmcashondelivery/:payment_id', (req,res) => {

    const payment_id = req.params.payment_id;
    const pBill_image =  req.body.pBill_image;
    let active =  req.body.active;
    const sqlUpdates = "UPDATE payment SET pBill_image=?, active =?  WHERE  payment_id=? ";
  
    db.query(sqlUpdates,[pBill_image, active=1, payment_id],(err,result)=>{
      if(err) console.log(err);
    })
  });

     // VIEW CASH ON  DELIVERY TO CHANGE PAYMENT_STATUS
app.get('/ConfirmCashonFetch', (req, res) => {
        db.query("SELECT * FROM payment  WHERE  payment_id =? ",[req.query.payment_id], (err, results, fields) => {
           if(err) throw err;
           res.send(results);
         });
        
       });

app.get('/ConfirmDeliveryFetch', (req, res) => {
        db.query("SELECT  * FROM orders WHERE order_id=?",[req.query.order_id], (err, results, fields) => {
           if(err) throw err;
           res.send(results);
         });
        
       });


app.put('/updateEmployeeProfile', (req,res) => {
        const id=req.body.id;
        const name = req.body.name;
        const address=req.body.address;
        const emp_img =  req.body.emp_img;
        const phone_no=req.body.phone_no;
    
db.query("UPDATE employee SET name=?,address=?, emp_img=?, phone_no=?  WHERE id = ?", 
          [name,address,emp_img,phone_no,id], 
          (err, result) => {
              if (err) {
                  console.log(err);
              } else {
                  res.send(result);
              }
             }
          );
});


app.get('/ReturnItemview', (req, res) => {
    db.query("SELECT * FROM return_item WHERE order_id=?",[req.query.order_id], (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
    
   });
  
       
          // VIEW AVAILABLE DELIVERIES
app.get('/viewAvailableDelivery',(req, res) =>{
   db.query("  SELECT orders.order_id,customer.fname, customer.address, customer.phone FROM orders  JOIN customer ON orders.customer_id=customer.customer_id JOIN employee ON orders.employee_id=employee.id  WHERE orders.employee_id=? AND orders.status <> 'Completed'  ", [req.query.employee_id],(err, results)=>
             { 
             console.log(req.query.employee_id);
              res.send(results);
             })
             
})

// VIEW CASH ON DELIVERIES TO CONFIRM
app.get('/viewcashOnDelivery',(req, res) =>{
  db.query("   SELECT *  FROM  payment  JOIN orders ON  payment.order_id = orders.order_id WHERE orders.employee_id=? AND payment.payment_method='cash on delivery' AND orders.status <> 'completed' ", [req.query.employee_id],(err, results)=>
   { 
   console.log(req.query.employee_id);
    res.send(results);
   })
   
})
           // VIEW  DELIVERY TO CONFIRM
        
        
app.get('/viewConfirmDelivery',(req, res) =>{
     db.query("SELECT *  FROM orders  JOIN employee ON orders.employee_id = employee.id  WHERE orders.employee_id = ? AND orders.status <> 'Completed'  ", [req.query.employee_id],(err, results)=>
      { 
      console.log(req.query.employee_id);
       res.send(results);
      })
      
})


      
          //VIEW PRODUCT DETAILS FOR DELIVERY PERSON
app.get("/viewproductFordeliver", (req, res) => {
            db.query("SELECT * FROM products  ", (err, result, fields) => {
                if (err) {
                    console.log(err);
                } else{
                    res.send(result);
                }
            });
        });






	  //CASH ON INCOME FOR AN EMPLOYEE
app.get('/empTotalcashonIncome', (req, res) => {
  db.query("SELECT SUM(total_price) AS eincome FROM orders JOIN payment ON orders.order_id= payment.order_id WHERE  orders.employee_id=?  AND payment.payment_method = 'cash on delivery' AND orders.status <> 'completed' ", [req.query.employee_id], (err, result, fields) => {
    if (!err)
      res.send(result);
    else
      console.log(err);
  })
})

app.get('/freeCount', (req, res) => {
  db.query("SELECT COUNT(order_id) AS freecount FROM orders WHERE employee_id=? AND orders.total_price > 50000  AND orders.status <> 'completed'", [req.query.employee_id], (err, result, fields) => {
    if (!err)
      res.send(result);
    else
      console.log(err);
  })
})


  
app.get('/empRecentOrders',(req, res) =>{
      db.query(" SELECT  orderitem.product_id,products.product_name, orders.total_price, orders.order_last_date  FROM orderitem INNER JOIN orders ON orders.order_id = orderitem.order_id   JOIN products ON orderitem.product_id = products.product_id WHERE orders.employee_id=? AND orders.status='Completed' ORDER BY orders.order_last_date DESC LIMIT 5  ", [req.query.employee_id],(err, results)=>
       { 
       console.log(req.query.employee_id);
        res.send(results);
       })
       
    })
    
app.get('/empCountReturnItems', (req, res) => {
        db.query('SELECT COUNT(return_id) AS returncount FROM return_item WHERE employee_id=?', [req.query.employee_id], (err, result, fields) => {
          if (!err)
            res.send(result);
          else
            console.log(err);
        })
      })

app.listen(3001, () => {
            console.log("yay your server is running on port 3001");
        });
        

           
