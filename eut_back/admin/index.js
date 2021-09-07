const express = require("express");
const mysql=require("mysql");
const cors=require("cors");
const app=express();
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;
const fs=require('fs');
const multer=require('multer');
require('dotenv').config();
app.use(express.json());

//const { ConnectionPolicyContext } = require("twilio/lib/rest/voice/v1/connectionPolicy");
const cookieParser=require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer')
app.use(cors({
  origin:["http://localhost:3000"],
  methods:["GET","POST","PUT"],
  credentials:true 
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  key:"customer_id",
  secret:"subscribe",
  resave:false,
  saveUninitialized:false,
  cookie:{
   // expires:60*60*24,
  },
}));
app.set("view engine","ejs");

const db=mysql.createConnection({
  user:"root",
  host:"localhost",
  password:"",
  database:"eut_furniture",
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


 
      
const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'../client/public/')
    },
    filename(req,file,cb) {
       console.log(file)
        cb(null,
            `${file.originalname.split('.')[0]}.jpg`
            )
    }
})
const upload=multer({storage,
   fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(jpeg|jpg|png)$/i)){
      return  cb(new Error('pleaseupload image with type of'))
    }
    cb(undefined,true)
}
})



app.post("/upload",upload.single('file'),(req,res)=> {
   
})




// app.post('/adddeliver',(req,res)=>{
    
//   const name = req.body.name;
//   const NIC = req.body.NIC;
//   const email = req.body.email;
//   const phone_no = req.body.phone_no;
//   const job_start_date = req.body.job_start_date;
//   const confirm_password = req.body.confirm_password;
//   const address = req.body.address;
//   const role = req.body.role;
//   const password = req.body.password;
 
//   bcrypt.hash(password,saltRounds,(err,hash)=>{
      
//     if(err){
//         console.log(err);
//     }

//   db.query("INSERT INTO employee (name,NIC,email,phone_no,job_start_date,confirm_password,address,role,password) VALUES (?,?,?,?,?,?,?,?,?)",
//   [name,NIC,email,phone_no,job_start_date,hash,address,role,hash],(err,result)=>{
     
//           console.log(err);
//      if(result){
//        res.send({message:"Successfully added"});
//      }
//     })
  
//   })
  
// });

// app.post('/login',(req,res)=>{
  
//   const email = req.body.email;
//   const password = req.body.password;
//   console.log(email)
//   console.log(password)
//   db.query(
//       "SELECT *FROM employee WHERE email=?;",
//      email,
//       (err,result)=>{
//           if(err)
//           { 
//               res.send({err:err})
//           } 
//           if(result){
//           if(result.length > 0){
//             bcrypt.compare(password,result[0].password,(error, response) =>{
//                 if(response){
//                  res.send(result);
//                 }
//                 else{
//                  res.send({message:"Invalid Username or Password"});
//                 }
//             })
//          }
//          else{
//              res.send({message:"Invalid Username or Password"});
//          }
//      }
//     }
//  );
// });



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



app.get("/gift",(req,res) =>{
    db.query("SELECT * FROM products WHERE category_id=5",(err,result) =>{
     
            if(err) throw err;
                   res.send(result);
                 });
        
   
})


 

  app.post('/addNewEmployee',(req,res)=>{
    
    const name = req.body.name;
    const NIC = req.body.NIC;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const job_start_date = req.body.job_start_date;
    const confirm_password = req.body.confirm_password;
    const address = req.body.address;
    const role = req.body.role;
    const password = req.body.password;
  
   
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
  const mess = `Dear ${name}, 

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

              const sqlAdd="INSERT INTO employee(name, NIC, email, phone_no, job_start_date,address, role,password) VALUES ( ?, ?, ?, ?, ?, ?,?, ?) ";
              const values =[name,NIC,email ,phone_no ,job_start_date,address,role,hash];
              db.query(sqlAdd,values,(err,result)=>{
       
      if(err){
        console.log(err)
      }else{
        const sqlUser="INSERT INTO userlogin(u_email, u_name, u_password,user_role,u_otp,u_verify) VALUES ( ?, ?, ?,?,?,'0') ";
              const valuesu =[name,email,hash,role,otp ];
              db.query(sqlUser,valuesu,(err,result)=>{
        res.send({message:"Email has been Sent"});
              })
      }
})

})

}
})    
});

// app.post('/otpCheck', (req, res) => {

  // const email = req.body.email
  // const otp = req.body.otp

  // console.log(email)
  // console.log(otp)
  // db.query
  // ("SELECT * FROM userlogin WHERE u_email = ? AND u_otp = ?;", 
  // [email,otp], 
  // (err, result)=> {

      // if(err){
          // res.send({err: err})
      // }
      // if(result){
          // console.log(result);
          // if (result.length > 0) {
              
              // db.query("UPDATE userlogin SET u_verify=? WHERE u_email = ? AND u_otp = ?", 
              // [1,email,otp], 
              // (err, result) => {

                  // if (err) {
                      // console.log(err);
                  // } else {
                      // res.send({message:"OTP code verified Successfully"});
                  // }
              // }
              // );
              
          // }else{
              // res.send({message:"Correct otp code"});
          // }

          
      // }}
  // );
// });

app.post('/AddCategory',(req,res)=>{
  console.log(req.body)
  const name = req.body.name;
  const date = req.body.date;
  
 
 
  db.query("INSERT INTO category (name,date) VALUES (?,NOW())",
  [name,date],(err,result)=>{
      if(err){
          console.log(err);
      } else{
          res.send("values inserted");
      }
  
  })
  
});

app.post('/AddCustomizedOrder',(req,res)=>{
 customer_id=req.body.customer_id;
  const total_payment = req.body.total_payment;
  const advanced_payment = req.body.advanced_payment;
  const delivery_date = req.body.delivery_date;
  
 
 
  db.query("INSERT INTO customized_products (delivery_date,total_payment,advanced_payment) VALUES (?,?,?) WHERE customer_id=?",
  [delivery_date,total_payment,advanced_payment,customer_id],(err,result)=>{
      if(err){
          console.log(err);
      } else{
          res.send("values inserted");
      }
  
  })
  
});

app.get('/load',(req,res)=>{
    db.query('SELECT * FROM employee WHERE NOT role="admin" ',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
})

app.get('/loadEmployee',(req,res)=>{
  db.query('SELECT name,role,emp_img FROM employee WHERE NOT role="admin" ',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

app.get('/recentOrders',(req,res)=>{
  db.query('SELECT products.product_name,products.product_img,orders.total_price FROM ((orderitem INNER JOIN products ON orderitem.product_id=products.product_id) INNER JOIN orders ON orderitem.order_id=orders.order_id) GROUP BY products.product_id ORDER BY orders.o_date DESC LIMIT 5',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

app.get('/loadCategory',(req,res)=>{
  db.query('SELECT * FROM category ',(err,result,fields)=>{
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

app.get('/loadcusorder',(req,res)=>{
  db.query('SELECT customer_id,delivery_date,advanced_payment,total_payment FROM customized_products WHERE active=1 ',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

app.get('/loadProduct',(req,res)=>{
  db.query('SELECT * FROM products ;',(err,results,fields)=>{
     if(err) throw err;
     res.send(results);
  })
})

app.get('/loadGift',(req,res)=>{
  db.query('SELECT products.product_id,products.product_img,products.product_name,products.quantity,products.price FROM products INNER JOIN category ON products.category_id=category.category_id WHERE category.name="Gift"',(err,results,fields)=>{
     if(err) throw err;
     res.send(results);
  })
})

app.get('/loadCategoryType',(req,res)=>{
  db.query('SELECT category_id,name FROM category ;',(err,results,fields)=>{
     if(err) throw err;
     res.send(results);
  })
})


app.get('/loadCustomizedOrder',(req,res)=>{
  db.query("SELECT customer.fname,customized_products.cus_product_id,customized_products.product_name,customized_products.material,customized_products.color,customized_products.design FROM customized_products INNER JOIN customer ON customized_products.customer_id=customer.customer_id",(err,result,fields)=>{
    if(!err)
    res.send(result);
    else
    console.log(err);
  })
})

app.get('/loadPayment',(req,res)=>{
  db.query("SELECT payment.payment_id,payment.payment_method,payment.payment_status,customer.fname,orders.advance_price,orders.total_price,orders.order_id FROM ((orders INNER JOIN customer ON orders.customer_id=customer.customer_id) INNER JOIN payment ON orders.order_id=payment.order_id)",(err,result,fields)=>{
    if(!err)
    res.send(result);
    else
    console.log(err);
  })
})



app.get('/loadCustomer',(req,res)=>{
  db.query('SELECT customer_id, fname,lname,email,address,phone,points,order_frequency FROM customer',(err,rows,fields)=>{
      if(!err)
      res.send(rows);
      else
      console.log(err);
  })
})

app.get("/employeesLoad/:id", (req, res) => {
    db.query("SELECT * FROM employee WHERE id=?", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get('/employees',(req,res) => {
    db.query('SELECT * FROM employee', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
        }
    });
});

//Customized orders
app.get('/Customized',(req,res) => {
  db.query('SELECT * FROM customized_products WHERE status="Pending"', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
      }
  });
});


  // app.put("/update", (req, res) => {
  //   const id = req.body.id;
   
  //   db.query(
  //     "UPDATE employee SET name = ?, NIC=?, email=?, role=?, address=?, job_start_date=?, phone_no=? WHERE id = ?",
  //     [name,NIC,email,role,address,job_start_date,phone_no],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.send(result);
  //       }
  //     }
  //   );
  // });

  //delete 
  app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
    const sqlDelete="DELETE FROM employee WHERE id=?";

    db.query(sqlDelete,id,(err,result)=>{
      if(err) console.log(err);
    });
  });

  //delete 
  app.delete("/deleteCustomized/:cus_product_id",(req,res)=>{
    const cus_product_id = req.params.cus_product_id;
    const sqlDelete="DELETE FROM employee WHERE cus_product_id=?";

    db.query(sqlDelete,id,(err,result)=>{
      if(err) console.log(err);
    });
  });

  app.get('/loadEmp/:id',(req,res)=>{
    const id = req.params.id;
    db.query('SELECT * FROM employee WHERE id=?',(err,result)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
    })
})

  app.delete("/deleteCategory/:category_id",(req,res)=>{
    const category_id = req.params.category_id;
    const sqlDelete="DELETE FROM category WHERE category_id=?";

    db.query(sqlDelete,category_id,(err,result)=>{
      if(err) console.log(err);
    
    });
  });

  //view details
  app.get("/view",(req,res)=>{
    id=req.params.id;
    db.query("SELECT * FROM employee WHERE id=?",[req.query.id],(err,result)=>{
      console.log(req.query.id);
      res.send(result);
    });
    
  });

//view product
app.get("/viewProduct",(req,res)=>{
  product_id=req.params.product_id;
  db.query("SELECT * FROM products WHERE product_id=?",[req.query.product_id],(err,result)=>{
    console.log(req.query.product_id);
    res.send(result);
  });
  
});

//view category
app.get("/viewCategory",(req,res)=>{
  category_id=req.params.category_id;
  db.query("SELECT * FROM category WHERE category_id=?",[req.query.category_id],(err,result)=>{
    console.log(req.query.category_id);
    res.send(result);
  });
  
});


//view customorder
app.get("/updateCustomized",(req,res)=>{
  customer_id=req.params.customer_id;
  db.query("SELECT * FROM customized_products WHERE customer_id=? AND active=1",[req.query.customer_id],(err,result)=>{
    console.log(req.query.customer_id);
    res.send(result);
  });
  
});



//view gift
app.get("/viewGift",(req,res)=>{
  product_id=req.params.product_id;
  db.query("SELECT product_id, product_name,quantity,price,product_img FROM products WHERE product_id=?",[req.query.product_id],(err,result)=>{
    console.log(req.query.ID);
    res.send(result);
  });
  
});

//view customized order
app.get("/ViewCusOrder1",(req,res)=>{
  cus_product_id=req.params.cus_product_id;
  
  db.query("SELECT customer.fname,customized_products.cus_product_id,customized_products.customer_id,customized_products.product_name,customized_products.description,customized_products.material,customized_products.color,customized_products.measurement,customized_products.design FROM customized_products INNER JOIN customer ON customized_products.customer_id=customer.customer_id WHERE customized_products.cus_product_id=?  ",[req.query.cus_product_id],(err,result)=>{
    // console.log(req.query.cus_product_id);
    res.send(result);
  });
  
});


//view customized order
app.get("/ViewCustomizedOrder1",(req,res)=>{
  cus_product_id=req.params.cus_product_id;
  
  db.query("SELECT customer.fname,customized_products.cus_product_id,customized_products.customer_id,customized_products.product_name,customized_products.description,customized_products.material,customized_products.color,customized_products.measurement,customized_products.design FROM customized_products INNER JOIN customer ON customized_products.customer_id=customer.customer_id WHERE customized_products.cus_product_id=?  ",[req.query.cus_product_id],(err,result)=>{
    // console.log(req.query.cus_product_id);
    res.send(result);
  });
  
});

app.get("/ViewCustomerOrder",(req,res)=>{
  customer_id=req.params.customer_id;
  // console.log(req.query.customer_id);
  db.query("SELECT * FROM customer WHERE customer_id=? ",[req.query.customer_id],(err,result)=>{
    
    res.send(result);
  });
  
});

//admin
app.get('/GetAdmin',(req,res) => {
  db.query('SELECT * FROM employee WHERE role="admin"', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
      }
  });
});


//update
app.put("/update/:id",(req,res)=>{
  const id = req.params.id;
  const name = req.params.name;
  const sqlUpdate="UPDATE employee SET name=? WHERE id=?";

  db.query(sqlUpdate,[name,id],(err,result)=>{
    if(err) console.log(err);
  })
});

app.put('/updateEmployee/:id', (req,res) => {
  console.log(id);
  //const id = req.body.id;
  const name = req.body.name;
  const sqlUpdate = "UPDATE SET employee name=? WHERE id=?";

  db.query(sqlUpdate,[name,id],(err,result)=>{
    if(err) console.log(err);
  })
});

//show a single record
app.get("/viewEmp",(req,res)=>{
    db.query( "SELECT *FROM employee WHERE id=?",[req.params.id],(err,rows,fields)=>
   {
        if(!err)
        res.send(rows);
        else
        console.log(err);
   })
});


app.get('/edit/:id',(req, res) => {
  const id = req.params.userId;
  let sql = `Select * from employee where id = ${id}`;
  let query = connection.query(sql,(err, result) => {
      if(err) throw err;
      res.render('user_edit', {
          title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
          user : result[0]
      });
  });
});

app.post('/update',(req, res) => {
  const userId = req.body.id;
  let sql = "update employee SET name='"+req.body.name+"',  email='"+req.body.email+"',  phone_no='"+req.body.phone_no+"' where id ="+id;
  let query = connection.query(sql,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});





app.post("/imageUpload",upload.single('file'),(req,res)=> {
   
})

app.post('/addProducts',(req,res)=>{
  
  console.log(req.body)
const product_img =req.body.image;
const product_name = req.body.product_name;
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

app.get('/addCustomizedProduct1',(req,res)=>{
  
 
const product_img =req.query.product_img;
const product_name = req.query.product_name;
const material = req.query.material;
const price=req.query.price;
const description=req.query.description;
const color=req.query.color;
// const quantity = 1;
// const category_id=7;


db.query(
  "INSERT INTO products(product_name,product_img,material,quantity,category_id,description,price,color) VALUES (?,?,?,1,7,?,?,?)",[product_name,product_img,material,description,price,color],
  (err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result);
    }
  }
);
})

app.get('/InsertCustomizedToOrderItem',(req,res)=>{

  db.query("INSERT INTO orderitem (order_id,product_id,total,quantity) VALUES(71,69,1000,1)",
    (err,result)=>{
      if(err){
        console.log(err)
      }else{
        res.send(result)
        console.log('success');
      
      }
    }
  ); 
 
  })


// app.post('/addGift',(req,res)=>{
  
//   console.log(req.body)
// const gift_img =req.body.image;
// const name = req.body.name;
// const price = req.body.price;
// const quantity = req.body.quantity;

// db.query(
//   "INSERT INTO gift(gift_img,name,price,quantity) VALUES (?,?,?,?)",[gift_img,name,price,quantity],
//   (err,result)=>{
//     if(err){
//       console.log(err)
//     }else{
//       res.send("Values added")
//     }
//   }
// );
// })

app.post('/addGift',(req,res)=>{
  
  console.log(req.body)
const product_img =req.body.image;
const product_name = req.body.product_name;
const price = req.body.price;
const quantity = req.body.quantity;
const category_id=req.body.category_id;

db.query(
  "INSERT INTO products(product_img,product_name,category_id,price,quantity) VALUES (?,?,?,?,?)",[product_img,product_name,category_id,price,quantity],
  (err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send("Values added")
    }
  }
);
})

//update category
app.put('/updateCategory', (req,res) => {
  const category_id=req.body.category_id;
  const name = req.body.name;
  const date = req.body.date;
  db.query("UPDATE category SET name = ?,date=? WHERE category_id = ?", 
  [name,date,category_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//add customized order
app.get('/InsertCustomizedOrder1', (req,res) => {
  const customer_id=req.query.customer_id;
  const total = req.query.total;
  // console.log(req.query.advance);
  
  db.query("INSERT INTO orders(customer_id,o_date,advance_price,total_price,order_type) VALUES (?,NOW(),?,?,'customized')",[req.query.customer_id,total*(0.2),total], 
   
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
          
      }
     }
  );
});


app.get('/getorder_id',(req,res) =>{
 customer_id=req.params.customer_id;
  db.query("SELECT order_id FROM orders WHERE customer_id=? AND order_type='customized' ORDER BY order_id DESC LIMIT 1 ",[req.query.customer_id],(err,result)=>{
    
    res.send(result);
    console.log(result);
  });

 
})

app.get('/getproductid',(req,res) =>{
  db.query("SELECT product_id FROM products WHERE category_id=7 ORDER BY product_id DESC LIMIT 1 ",(err,result)=>{
    
    res.send(result);
     console.log(result);
  });
});

//add customized order
app.get('/insertCustomizeditem', (req,res) => {
  const total=req.body.total;
 const order_id=req.params.order_id;
  const product_id=req.params.product_id;
  db.query("INSERT INTO orderitem(order_id,product_id,quantity) VALUES (?,?,1)",[req.query.order_id,req.query.product_id], 
   
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
  // console.log(req.query.order_id);
  // console.log(req.query.product_id);
});

//Get Order ID
app.get('/Get_OrderID1',(req,res) =>{
  customer_id=req.params.customer_id;
   db.query("SELECT order_id FROM orders orders WHERE customer_id= ? AND order_type='customized' ORDER BY order_id DESC LIMIT 1 ",[req.query.customer_id],(err,result)=>{
     
     res.send(result);
     console.log(result);
   });
 
  
 })

 //Get PRoduct ID
 app.get('/Get_ProductID1',(req,res) =>{
  db.query("SELECT product_id FROM products WHERE category_id=7 ORDER BY product_id DESC LIMIT 1 ",(err,result)=>{
    
    res.send(result);
    
  });
  console.log(result);
});


// order status
app.get('/OrderStatus', (req,res) => {
  
  const cus_product_id=req.params.cus_product_id;
  
 
  db.query("UPDATE customized_products SET status='Confirm' WHERE cus_product_id = ?", 
  [req.query.cus_product_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

// order status
app.get('/OrderStatusReject', (req,res) => {
  
  const cus_product_id=req.params.cus_product_id;
  
 
  db.query("UPDATE customized_products SET status='Reject' WHERE cus_product_id = ?", 
  [req.query.cus_product_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

// order status
app.get('/OrderStatusAccept', (req,res) => {
  
  const cus_product_id=req.params.cus_product_id;
  
 
  db.query("UPDATE customized_products SET status='Accept' WHERE cus_product_id = ?", 
  [req.query.cus_product_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});


// order active
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

//DElete Customized order
app.put('/DeleteCustomizedOrder', (req,res) => {
  cus_product_id=req.params. cus_product_id;
  
  db.query("UPDATE customized_products SET active = 0 AND status='Reject' WHERE cus_product_id=?", 
  [req.query.cus_product_id], 
  (err, result) => {
    if(err) console.log(err);
     }
  );
  console.log(cus_product_id);
});


//update Gift
app.put('/updateGift', (req,res) => {
  const product_id=req.body.product_id;
  const  product_name = req.body. product_name;
  const price = req.body.price;
  const product_img = req.body.product_img;
  const quantity = req.body.quantity;
  db.query("UPDATE products SET  product_name = ?,price=?,product_img=?,quantity=? WHERE product_id = ?", 
  [ product_name,price,product_img,quantity,product_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//update Gift
app.put('/updateProduct', (req,res) => {
  const product_id=req.body.product_id;
  const name = req.body.name;
  const price = req.body.price;
  const product_img = req.body.product_img;
  const quantity = req.body.quantity;
  const material = req.body.material;
  const category_id=req.body.category_id;
  db.query("UPDATE products SET name = ?,price=?,product_img=?,material=?,category_id=?,quantity=? WHERE product_id = ?", 
  [name,price,product_img,material,category_id,quantity,product_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//update Profile
app.put('/updateProfile', (req,res) => {
  const id=req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const emp_img = req.body.emp_img;
  const phone_no = req.body.phone_no;
  const address = req.body.address;
 
  db.query("UPDATE employee SET name = ?,email=?,emp_img=?,phone_no=?,address=? WHERE role = 'admin'", 
  [name,email,emp_img,phone_no,address], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//update Employee
app.put('/updateEmployee', (req,res) => {
  const id=req.body.id;
  const name = req.body.name;
 const role=req.body.role;
 const email=req.body.email;
 const address=req.body.address;
 const NIC=req.body.NIC;
 const phone_no=req.body.phone_no;
 const job_start_date=req.body.job_start_date;
  db.query("UPDATE employee SET name = ?,role=?,email=?,address=?,NIC=?,phone_no=?,job_start_date=? WHERE id = ?", 
  [name,role,email,address,NIC,phone_no,job_start_date,id], 
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
  db.query('SELECT SUM(products.quantity) AS quantity, category.name FROM products INNER JOIN category ON products.category_id=category.category_id GROUP BY products.category_id', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//customized order pie chart
app.get('/Cus_OrderChart',(req,res) => {
  db.query('SELECT SUM(quantity) AS quantity, category_name FROM customized_products WHERE date BETWEEN ? AND ? GROUP BY category_name',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//customer analytics
//customized order pie chart
app.get('/CustomerCount1',(req,res) => {
  db.query('SELECT date, COUNT(customer_id) AS count FROM customer WHERE date BETWEEN ? AND ? GROUP BY date',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//return items
app.get('/ReturnCount1',(req,res) => {
  db.query('SELECT category.name,COUNT(return_item.return_id) AS count FROM ((orderitem INNER JOIN (orders INNER JOIN return_item ON orders.order_id=return_item.order_id) ON orderitem.order_id=orders.order_id) INNER JOIN (products INNER JOIN category ON products.category_id=category.category_id) ON orderitem.product_id=products.product_id) WHERE return_item.return_date BETWEEN ? AND ? GROUP BY (category.category_id)',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//Cus with Date
app.get('/CusWithDate',(req,res) => {
   const todate=req.body.to_date;
   const fromdate=req.body.from_date;

  db.query("SELECT customer_id,fname,address,phone FROM customer WHERE date BETWEEN ? AND ? ",[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
        console.log(result);
          
      }
  });
});


//moving items
app.get('/MovingItems',(req,res) => {
  const currentmonth=req.body.month;
  db.query('SELECT SUM(orderitem.quantity) AS sum, products.product_name FROM ((orderitem INNER JOIN products ON orderitem.product_id=products.product_id) INNER JOIN orders ON orderitem.order_id=orders.order_id) WHERE EXTRACT(MONTH FROM orders.o_date)=? GROUP BY orderitem.product_id',[req.query.month], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
  console.log(req.query.month);
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

//Max Analytics
app.get('/MaxItem',(req,res) => {
  const currentmonth=req.body.month;
  db.query('SELECT SUM(orderitem.quantity) AS sum, products.product_name FROM ((orderitem INNER JOIN products ON orderitem.product_id=products.product_id)INNER JOIN orders ON orderitem.order_id=orders.order_id) WHERE EXTRACT(MONTH FROM orders.o_date)=? GROUP BY orderitem.product_id ORDER BY sum DESC LIMIT 1',[req.query.month],(err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//Max Analytics
app.get('/MinItem',(req,res) => {
  db.query('SELECT SUM(orderitem.quantity) AS sum, products.product_name FROM ((orderitem INNER JOIN products ON orderitem.product_id=products.product_id)INNER JOIN orders ON orderitem.order_id=orders.order_id) WHERE EXTRACT(MONTH FROM orders.o_date)=? GROUP BY orderitem.product_id ORDER BY sum ASC LIMIT 1',[req.query.month], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//OrderChart
app.get('/OrderChart',(req,res) => {
  db.query('SELECT orders.o_date, SUM(orderitem.quantity) AS count FROM orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id WHERE orders.o_date BETWEEN ? AND ? GROUP BY orders.o_date',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//OrderChart
app.get('/ReturnItemReport',(req,res) => {
  db.query('SELECT products.product_name,return_item.reason,return_item.return_id,return_item.return_date,return_item.reschedule_date,return_item.return_status FROM ((orderitem INNER JOIN (orders INNER JOIN return_item ON orders.order_id=return_item.order_id)ON orderitem.order_id=orders.order_id)INNER JOIN products ON orderitem.product_id=products.product_id) WHERE return_item.return_date BETWEEN ? AND ?', [req.query.from_date,req.query.to_date],(err, result) => {
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
  db.query('SELECT COUNT(id) AS count FROM employee', (err, result) => {
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
  db.query('SELECT COUNT(order_id) AS ordcount FROM orders WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//productCount
app.get('/ProductCount',(req,res) => {
  db.query('SELECT COUNT(product_id) AS procount FROM products', (err, result) => {
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

//
app.get('/CustomizedReport1',(req,res) => {
  db.query('SELECT customized_products.cus_product_id,customized_products.design,customized_products.product_name,customer.fname FROM customized_products INNER JOIN customer ON customized_products.customer_id=customer.customer_id WHERE customized_products.date BETWEEN ? AND ?', [req.query.from_date,req.query.to_date], (err, result) => {
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
  db.query('SELECT COUNT(id) AS deliver_count FROM employee WHERE role="Delivery Person"', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//deliverCount
app.get('/DeliveryStatus1',(req,res) => {
  db.query('SELECT COUNT(status) AS count FROM orders WHERE status="Completed" AND orders.order_last_date BETWEEN ? AND ?',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//OrderReport
app.get('/OrderReport1',(req,res) => {
  db.query('SELECT orders.order_id,products.product_name,orders.o_date,orderitem.quantity,orders.total_price FROM ((orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id) INNER JOIN products ON orderitem.product_id=products.product_id) WHERE orders.o_date BETWEEN ? AND ?',[req.query.from_date,req.query.to_date] ,(err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//CustomerReport
app.get('/CustomerReport1',(req,res) => {
  db.query("SELECT customer_id, fname,lname,email,address,phone,points,order_frequency,date FROM customer WHERE date BETWEEN ? AND ? ",[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//DeliveryReport
app.get('/DeliveryReport1',(req,res) => {
  db.query('SELECT products.product_name, orders.order_id,orders.order_last_date,orders.status FROM ((orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id)INNER JOIN products ON orderitem.product_id=products.product_id) WHERE orders.order_last_date BETWEEN ? AND ? ',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});


//income
app.get('/TotalIncome',(req,res) => {
  db.query('SELECT SUM(total_price) AS income FROM orders WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//order analytics
app.get('/OrderByDate',(req,res) => {
 
  const currentmonth=req.body.month;
  db.query('SELECT products.name,customer.name AS cus_name,orders.o_date,orders.total_price FROM ((orders INNER JOIN products ON orders.product_id=products.product_id) INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE orders.o_date BETWEEN )', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//order details
app.get("/OrderDetails",(req,res)=>{
  const month=req.body.month;
  db.query('SELECT products.product_name,customer.fname AS cus_name,orders.o_date,orders.total_price FROM ((orders INNER JOIN products ON orders.product_id=products.product_id) INNER JOIN customer ON orders.customer_id=customer.customer_id) WHERE EXTRACT(MONTH FROM orders.o_date) =?',[req.query.month],(err,result)=>{
    console.log(req.query.month);
    res.send(result);
  });
  
});

//view Admin
app.get("/viewAdmin",(req,res)=>{
  id=req.params.id;

  db.query("SELECT * FROM employee WHERE role='admin'",[req.query.id],(err,result)=>{
      console.log(req.query.id);
      res.send(result);
  });
      
});
  
    
app.listen(3001,() => {
    console.log("running sever");
});