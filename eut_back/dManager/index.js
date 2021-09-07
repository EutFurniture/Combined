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
  key: "customer_id",
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
    database:"eut_furniture",
    multipleStatements:true
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


app.post('/addDelivers',(req,res)=>{
    
    const fullname = req.body.fullname
    const NIC = req.body.NIC
    const email = req.body.email
    const address = req.body.address
    const mobile = req.body.mobile
    const password = req.body.password
    const cpassword = req.body.cpassword

    var transport = nodemailer.createTransport(
        {
            service:'gmail',
            auth: {
                user: 'eutfurniture.group45@gmail.com',
                pass:'eutgroup45@#'
            }
        }
    )
    const otp = Math.floor(100000 + Math.random() * 900000);
    const head = 'otp code';
    const mess = `Dear ${fullname}, 

                    Your otp code is ${otp}
                    Use this code to verify your Account.

                With regrads,
                Eut Furniture Team`;
    
    var mailOptions = {
        from : 'eutfurniture.group45@gmail.com',
        to: email,
        subject: head,
        text: mess
    }
    
    transport.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
        }
        else{
            console.log('Email sent' + info.response)
            bcrypt.hash(password,saltRounds,(err,hash)=>{
        
                if(err){
                    console.log(err);
                }
          
                db.query("INSERT INTO employee(name, NIC, email, phone_no, job_start_date, address, role) VALUES ( ?, ?, ?, ?,NOW(), ?,'Deliver'); INSERT INTO userlogin (u_email, u_name, u_password,user_role,u_otp,u_verify) VALUES (?,?,?,'Deliver',?,'0') ;", 
                [fullname,NIC,email ,mobile ,address,email,fullname,hash,otp],(err,result)=>{
                    if(err){
                        console.log(err)
                      }else{
                        console.log(result);
                        res.send({message:"Email has been Sent"});
                      }
                })
              
              })
            
        }
    })    
});

app.post('/otpCheck', (req, res) => {

    const email = req.body.email
    const otp = req.body.otp

    console.log(email)
    console.log(otp)
    db.query
    ("SELECT * FROM userlogin WHERE u_email = ? AND u_otp = ?;", 
    [email,otp], 
    (err, result)=> {

        if(err){
            res.send({err: err})
        }
        if(result){
            console.log(result);
            if (result.length > 0) {
                
                db.query("UPDATE userlogin SET u_verify=? WHERE u_email = ? AND u_otp = ?", 
                [1,email,otp], 
                (err, result) => {

                    if (err) {
                        console.log(err);
                    } else {
                        res.send({message:"OTP code verified Successfully"});
                    }
                }
                );
                
            }else{
                res.send({message:"Wrong otp code"});
            }

            
        }}
    );
});


app.post('/forget',(req,res)=>{
    const email = req.body.email
    console.log(email)
    db.query
    ("SELECT * FROM userlogin WHERE u_email = ?;", 
    [email], 
    (err, result)=> {

        if(err){
            res.send({err: err})
        }
        if(result){
            if (result.length > 0) {
                var transport = nodemailer.createTransport(
                    {
                        service:'gmail',
                        auth: {
                            user: 'eutfurniture.group45@gmail.com',
                            pass:'eutgroup45@#'
                        }
                    }
                )
                const otp = Math.floor(100000 + Math.random() * 900000);
                const head = 'Forget Password'
                const mess = `Dear User, 
            
                Use this OTP code for Reset Your Password.
                Your OTP code is ${otp}
                
            
                With regrads,
                Eut Furniture Team`;
                
                var mailOptions = {
                    from : 'eutfurniture.group45@gmail.com',
                    to: email,
                    subject: head,
                    text: mess
                }
                
                transport.sendMail(mailOptions,function(error,info){
                    if(error){
                        console.log(error)
                    }
                    else{
                        console.log('Email sent' + info.response)       
                
                        db.query("UPDATE userlogin SET reset_otp = ? WHERE u_email=?", 
                        [otp,email],(err,result)=>{
                 
                     
                        if(result){
                            console.log(result);
                            res.send({message:"Check your Email to Reset Password"}); 
                        }
                     })
                    }
                })
                
            }else{
                res.send({message:"Email Doesn't Exist"});
            }

            
        }}
    );
      
});



app.post('/ResetPassword', (req,res) => {

    const otp = req.body.otp;
    const password = req.body.password;
    const c_password = req.body.c_password;
    console.log(password)
    console.log(c_password)
    console.log(otp)

    db.query
    ("SELECT * FROM userlogin WHERE reset_otp = ?;", 
    [otp], 
    (err, result)=> {

        if(err){
            res.send({err: err})
        }
        if(result){
            console.log(result);
            if (result.length > 0) {
                bcrypt.hash(password,saltRounds,(err,hash)=>{

                    if(err){
                        console.log(err);
                    }

                db.query("UPDATE userlogin SET u_password=? WHERE reset_otp=?", 
                [hash,otp], 
                (err, result) => {

                    if (err) {
                        console.log(err);
                    } else {
                        
                        res.send({message:"Password Updated Successfully"});
                    }
                }
                )
                });
            }}
  });
});

{/*
    customer
    
    app.post('/addDelivers',(req,res)=>{
    
    const fullname = req.body.fullname
    const NIC = req.body.NIC
    const email = req.body.email
    
    const address = req.body.address
    const mobile = req.body.mobile
    const password = req.body.password
    const cpassword = req.body.cpassword
   
    bcrypt.hash(password,saltRounds,(err,hash)=>{
        
      if(err){
          console.log(err);
      }

      db.query("INSERT INTO customer (c_name, c_nic, c_email, c_phone_no, c_date,c_address, c_password, c_c_password) VALUES ( ?, ?, ?, ?,NOW(), ?, ?, ?); INSERT INTO userlogin (u_email,u_password,user_role) VALUES (?,?,'Customer') ;", 
      [fullname,NIC,email,mobile,address,hash,hash,email,hash],(err,result)=>{
       
            console.log(err);
       if(result){
         res.send({message:"Successfully added"});
       }
      })
    
    })
    
});

*/}


app.get("/delivers", (req, res) => {
    db.query("SELECT * FROM employee WHERE role='Deliver' ", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/orderstatus", (req, res) => {
    db.query("SELECT DISTINCT status FROM orders WHERE NOT status ='Processing'", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/paymentstatus", (req, res) => {
    db.query("SELECT DISTINCT payment_status FROM payment", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/delivername", (req, res) => {
    db.query("SELECT name FROM employee WHERE role='Deliver'", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/deliverid", (req, res) => {
    db.query("SELECT id,name FROM employee WHERE role='Deliver'", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/delivery", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, orders.status,customer.fname,customer.address,payment.payment_method FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id INNER JOIN payment ON payment.order_id=orders.order_id WHERE orders.status='Ready to deliver' OR orders.status='Completed' OR orders.status='Returned' OR orders.status='Pending' OR orders.status='R_Pending' ORDER BY orders.order_id DESC;", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/deliverys", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, orders.status,customer.fname,customer.address FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE  (orders.status='Completed' OR  orders.status='Returned')  AND EXTRACT(MONTH FROM order_last_date) = MONTH(CURRENT_TIMESTAMP)  ORDER BY orders.order_id DESC LIMIT 8", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/Assign", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date,customer.address FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE orders.employee_id=0 AND orders.status='Ready to deliver'", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/viewStatus", (req, res) => {
    db.query("SELECT employee.id,employee.name,employee.address AS e_address,customer.address,orders.order_last_date,COUNT(orders.status) AS pending FROM employee INNER JOIN orders ON orders.employee_id=employee.id INNER JOIN customer ON customer.customer_id=orders.customer_id WHERE (orders.status='Pending' OR orders.status='R_Pending') GROUP BY orders.order_last_date ORDER BY employee.id;", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/getPriority", (req, res) => {
    db.query("SELECT orders.employee_id,orders.order_id,orders.order_last_date,orders.status,orders.o_priority FROM orders WHERE orders.status='Pending' OR orders.status='R_Pending' ORDER BY employee_id  ", (err, result, fields) => {
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

app.get("/cashOnDelivery", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.total_price,orders.advance_price,payment.payment_status,orders.status FROM orders INNER JOIN payment ON orders.order_id=payment.order_id WHERE payment.payment_method='cash on delivery' ORDER BY orders.order_id DESC", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/totalcashOnDelivery", (req, res) => {
    db.query("SELECT SUM(orders.total_price) AS total,orders.order_last_date, SUM(orders.advance_price) AS advance FROM orders INNER JOIN payment ON orders.order_id = payment.order_id WHERE (payment.payment_method = 'cash on delivery' AND payment.payment_status='Paid') AND EXTRACT(MONTH FROM order_last_date) = MONTH(CURRENT_TIMESTAMP)", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});


app.delete("/deleteDeliver/:email",(req,res)=>{
    const email = req.params.email;

    db.query("DELETE FROM employee WHERE email=?; DELETE FROM userlogin WHERE u_email = ? AND user_role='Deliver';",
    [email,email],(err,result)=>{
      if(err) {
          console.log(err);
      }
    });
  });




    app.get("/viewDeliver",(req,res)=>{
        id=req.params.id;
        db.query("SELECT * FROM employee WHERE id=?",[req.query.id],(err,result)=>{
          console.log(req.query.id);
          res.send(result);
        });
        
      });

app.get("/viewDeliveryDetails",(req,res)=>{
    order_id=req.params.order_id;
    
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, orders.order_description,orders.o_d_date,orders.status,orders.o_date,customer.fname,customer.address,customer.email,customer.phone FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE orders.order_id=?",[req.query.order_id],(err,result)=>{
        console.log(req.query.order_id);
        res.send(result);
    });
        
});

app.get("/viewReturnDetails",(req,res)=>{
    order_id=req.params.order_id;
    db.query("SELECT order_id,employee_id,return_date,reason,return_status FROM return_item WHERE order_id=?",[req.query.order_id],(err,result)=>{
        console.log(req.query.order_id);
        res.send(result);
    });
        
});

app.get("/viewPriorityDetails",(req,res)=>{
    order_id=req.params.order_id;
    db.query("SELECT orders.order_id,orders.o_priority FROM orders WHERE orders.order_id=?",[req.query.order_id],(err,result)=>{
        console.log(req.query.order_id);
        res.send(result);
    });
        
});

app.get("/viewDeliveryManager",(req,res)=>{
    id=req.params.id;

    db.query("SELECT * FROM employee WHERE role='DeliveryManager'",[req.query.id],(err,result)=>{
        console.log(req.query.id);
        res.send(result);
    });
        
});


app.get("/CashOnDeliveryDetails",(req,res)=>{
    order_id=req.params.order_id;
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date,orders.customer_id,orders.total_price,orders.advance_price,payment.payment_status,orders.status FROM orders INNER JOIN payment ON orders.order_id=payment.order_id WHERE orders.order_id=?",[req.query.order_id],(err,result)=>{
        console.log(req.query.order_id);
        res.send(result);
    });
        
});

app.put('/updateDeliveryStatus', (req,res) => {
    const order_id=req.body.order_id;
    const status = req.body.status;
    const Deliver_id= req.body.Deliver_id;

    db.query("UPDATE orders SET status=?, employee_id=? WHERE order_id = ?", 
    [status,Deliver_id,order_id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.put('/AssignDeliver', (req,res) => {
    const order_id=req.body.order_id;
    const Deliver_id= req.body.Deliver_id;
    

    db.query("UPDATE orders SET  employee_id=?, status='Pending'  WHERE order_id = ?", 
    [Deliver_id,order_id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
            
        }
       }
    );
  });

  app.put('/AssignPriority', (req,res) => {
    const order_id=req.body.order_id;
    const Priority_number= req.body.Priority_number;
    

    db.query("UPDATE orders SET o_priority=?  WHERE order_id = ? ; UPDATE return_item SET o_priority=? WHERE order_id=?;", 
    [Priority_number,order_id,Priority_number,order_id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.put('/ReturnSchedule', (req,res) => {
    const order_id=req.body.order_id;
    const Schedule_date= req.body.Schedule_date;

    db.query("UPDATE return_item SET reschedule_date=?,return_status='R_Pending' WHERE order_id=?; UPDATE orders SET order_last_date=?,status='R_Pending' WHERE order_id=?", 
    [Schedule_date,order_id,Schedule_date,order_id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.put('/updateCashStatus', (req,res) => {
    const order_id=req.body.order_id;
    const status = req.body.status;
    const Payment= req.body.Payment;

    db.query("UPDATE payment SET payment_status=? WHERE order_id = ?; UPDATE orders SET status=? WHERE order_id = ?", 
    [Payment,order_id,status,order_id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });



  app.put('/updateReturnStatus', (req,res) => {
    const order_id=req.body.order_id;
    const status = req.body.status;

    db.query("UPDATE orders SET status=? WHERE order_id = ?; UPDATE return_item SET return_status=? WHERE order_id=?", 
    [status,order_id,status,order_id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.put('/UpdateDelivers', (req,res) => {
    const id=req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    db.query("UPDATE employee SET name=?,email=?,phone_no=?,address=? WHERE id = ?; ", 
    [name,email,phone,address,id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });


  app.put('/EditDeliveryManager', (req,res) => {
    const id=req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const emp_img = req.body.emp_img;
    const phone = req.body.phone;
    const address = req.body.address;
   
    db.query("UPDATE employee SET name = ?,email=?,emp_img=?,phone_no=?,address=? WHERE id=?; ", 
    [name,email,emp_img,phone,address,id], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });
  //UPDATE userlogin SET u_name,u_email WHERE u_email=?

  app.get("/viewDeliverySchedule", (req, res) => {
    db.query("SELECT order_id, employee_id, o_date, order_last_date FROM orders ORDER BY order_last_date DESC", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/orderstatuscount", (req, res) => {
    db.query("SELECT COUNT(order_id) AS count,status FROM orders WHERE NOT status='Processing'  AND  orders.order_last_date BETWEEN ? AND ? GROUP BY status ORDER BY status", 
    [req.query.from_date,req.query.to_date],
    (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

app.get("/totalordercnt", (req, res) => {
    db.query("SELECT COUNT(orders.order_id) AS t_count  FROM orders WHERE orders.order_last_date BETWEEN ? AND ?",
    [req.query.from_date,req.query.to_date],
     (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

app.get("/returnordercnt", (req, res) => {
    db.query("SELECT COUNT(orders.order_id) AS r_count FROM orders INNER JOIN return_item ON orders.order_id = return_item.order_id WHERE return_item.return_date BETWEEN ? AND ?;",
    [req.query.from_date,req.query.to_date],
     (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

app.get("/ordervsdate", (req, res) => {
    db.query("SELECT COUNT(order_id) AS count,order_last_date FROM orders  WHERE order_last_date BETWEEN ? AND ? GROUP BY order_last_date",
    [req.query.from_date,req.query.to_date],
     (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

app.get("/pricevsdate", (req, res) => {
    db.query("SELECT order_last_date,SUM(total_price) AS total FROM orders WHERE EXTRACT(MONTH FROM order_last_date) = MONTH(CURRENT_TIMESTAMP) GROUP BY order_last_date;", 
    
    (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});
  
app.get("/paymentdonut", (req, res) => {
    db.query("SELECT COUNT(payment.order_id) AS count,payment.payment_status,orders.order_last_date FROM payment INNER JOIN orders ON payment.order_id = orders.order_id WHERE payment_method='cash on delivery' AND  orders.order_last_date BETWEEN ? AND ? GROUP BY payment_status",
    [req.query.from_date,req.query.to_date],
     (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

app.get("/delivervsorder", (req, res) => {
    db.query("SELECT employee.name,COUNT(orders.order_id) AS count FROM employee LEFT JOIN orders ON employee.id=orders.employee_id WHERE employee.role = 'Deliver'  AND orders.order_last_date BETWEEN ? AND ? GROUP BY employee.name", 
    [req.query.from_date,req.query.to_date],
    (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

//image add 

const storage = multer.diskStorage({
    destination(req,file,cb){
      cb(null,'../eut_front/public/')
    },
    filename(req,file,cb){
      cb(
        null,
        `${file.originalname.split('.')[0]}.jpg`
      )
    }
  })
  
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


//Notifications
app.get('/cashPaymentnotifyCount',(req,res)=>{
    db.query('SELECT COUNT(order_id) AS count FROM payment WHERE payment_method="cash on delivery" AND active=1',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

    //cash payment set deactive
app.get('/cashpaymentnotifyDeactive', (req,res) => {
    db.query("UPDATE payment SET active=0 WHERE payment_method ='cash on delivery' AND active=1", 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.get('/paymentnotifymess',(req,res)=>{
    db.query('SELECT COUNT(order_id) AS count FROM payment WHERE payment_status="Advance Paid" AND pBill_image <>" "',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

  app.get('/returnnotifyCount',(req,res)=>{
    db.query('SELECT COUNT(order_id) AS r_count FROM orders WHERE status="R_Pending" AND active=1',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

  app.get('/returnnotifyDeactive', (req,res) => {
    db.query("UPDATE orders SET active=0 WHERE status ='R_Pending' AND active=1", 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.get('/returnnotifymess',(req,res)=>{
    db.query('SELECT COUNT(order_id) AS r_count FROM orders WHERE status="R_Pending" AND Bill_image <>" "',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

  app.get('/ordernotifyCount',(req,res)=>{
    db.query('SELECT COUNT(order_id) AS o_count FROM orders WHERE status="Pending" AND active=1',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

  app.get('/ordernotifyDeactive', (req,res) => {
    db.query("UPDATE orders SET active=0 WHERE status ='Pending' AND active=1", 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.get('/ordernotifymess',(req,res)=>{
    db.query('SELECT COUNT(order_id) AS o_count FROM orders WHERE status="Pending" AND Bill_image <>" "',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

  app.get("/viewpaymentNotification", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, customer.fname,customer.NIC,payment.pBill_image FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id INNER JOIN payment ON payment.order_id=orders.order_id WHERE (orders.status='Pending'  OR orders.status='R_Pending') AND payment.payment_status='Advance Paid' AND pBill_image<>'';", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

   app.get("/viewreturnNotification", (req, res) => {
     db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date,payment.payment_method,payment.payment_status, customer.fname,customer.NIC,orders.Bill_image FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id INNER JOIN payment ON payment.order_id=orders.order_id WHERE orders.status='R_Pending'  AND Bill_image<>'';", (err, result, fields) => {
         if (err) {
             console.log(err);
         } else{
           res.send(result);
         }
     });
 });

 app.get("/vieworderNotification", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, customer.fname,customer.NIC, payment.payment_method,payment.payment_status, orders.Bill_image FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id INNER JOIN payment ON payment.order_id=orders.order_id WHERE orders.status='Pending'  AND Bill_image<>'';", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
          res.send(result);
        }
    });
});

app.get("/deliveryReport", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, orders.status,customer.fname,customer.address,payment.payment_method FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id INNER JOIN payment ON payment.order_id=orders.order_id WHERE (orders.status='Ready to deliver' OR orders.status='Completed' OR orders.status='Returned' OR orders.status='Pending' OR orders.status='R_Pending') AND orders.order_last_date BETWEEN ? AND ?;",
    [req.query.from_date,req.query.to_date],
    (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/CashOnDeliveryReport", (req, res) => {
    db.query("SELECT payment.order_id,payment.payment_status, orders.order_last_date,orders.total_price,orders.advance_price,customer.fname FROM orders INNER JOIN payment ON payment.order_id=orders.order_id INNER JOIN customer ON orders.customer_id = customer.customer_id WHERE payment.payment_method='cash on delivery' AND orders.order_last_date BETWEEN ? AND ? ORDER BY orders.order_id ASC", 
    [req.query.from_date,req.query.to_date],
    (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            console.log(result)
            res.send(result);
        }
    });
});

app.get("/ReturnReport", (req, res) => {
    db.query("SELECT order_id, return_date,reason, return_status FROM return_item WHERE return_date BETWEEN ? AND ? ORDER BY order_id ASC", 
    [req.query.from_date,req.query.to_date],
    (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            console.log(result)
            res.send(result);
        }
    });
});

app.get("/DeliverReport", (req, res) => {
    db.query("SELECT employee.name,COUNT(orders.order_id) AS count FROM employee LEFT JOIN orders ON employee.id=orders.employee_id WHERE employee.role = 'Deliver'  AND orders.order_last_date BETWEEN ? AND ? GROUP BY employee.id",
    [req.query.from_date,req.query.to_date],
     (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});