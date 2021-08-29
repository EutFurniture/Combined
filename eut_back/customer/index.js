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
  multipleStatements:true
});


//Customer BackEnd


app.post("/customerRegister",(req,res) => {
  const fname=req.body.fname;
  const email=req.body.email;
  const phone=req.body.phone;
  const address=req.body.address;
  const password=req.body.password;
  const cpassword=req.body.cpassword;
  const post=req.body.post;
  const city=req.body.city;
  const otp=req.body.otp;

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
            if(password == cpassword){
  
              db.query(
                  "UPDATE customer SET postalcode=?,city=?,phone=?,address=?,password=? WHERE email=?;UPDATE userlogin SET u_verify=1 ,u_password=? WHERE u_email = ? AND u_otp = ?",[post,city,phone,address,password,email,password,email,otp],
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
              
              
              
          }else{
              res.send({message:"Wrong otp code"});
          }

          
      }}
  );
  
      
    
    

 
});

app.post("/insertotpcode",(req,res) => {
  const fname=req.body.fname;
  const email=req.body.email;

  db.query
  ("SELECT * FROM userlogin WHERE u_email = ? ;", 
  [email], 
  (err, result)=> {

      if(err){
          res.send({err: err})
      }
      if(result){
          console.log(result);
          if (result.length > 0) {
            res.send({message:"You already have an account"});
          }else{
  
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
const mess = `Dear ${fname}, 

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
     
  
        db.query(
            "INSERT INTO customer(fname,email,proimg,date,points) VALUES (?,?,'user.jpg',NOW(),0); INSERT INTO userlogin(u_email,u_otp,u_name,user_role) VALUES (?,?,?,'customer');",[fname,email,email,otp,fname],
            (err,result) =>{
                if(err){
                    console.log(err)
                }else{
                    res.send({message:"values sended"});
                }
            }
            );
           
      
          
      
  }
})    
 }}
})
 
});


app.get("/login",(req,res)=>{
 if(req.session.user){
   res.send({loggedIn:true,user:req.session.user});
 }else{
   res.send({loggedIn:false});
 }
});

app.post('/login',(req,res)=>{
 
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
app.get('/checkproduct',(req,res)=>{
 
  
  db.query(
    "SELECT *FROM cart WHERE product_id=? AND  customer_id=? AND date=CURDATE()",
  [ req.query.pid,req.query.cid], (err,result)=>{
    console.log(result.length);
    if(result.length == 0)
    {
      db.query("INSERT INTO `cart`(`customer_id`, `product_id`,`totalprice`, `quantity`,`date`) VALUES (?,?,?,1,NOW());",[req.query.cid , req.query.pid, req.query.price],(err, rest)=>{
        res.send(rest);

})
    }
   })
    
});


app.get('/ordergift',(req,res)=>{
  db.query("INSERT INTO orders(customer_id,total_price,advanced_price,date) VALUES (?,0,0,NOW());",[req.query.cid ],(err, result)=>{
    res.send(result);

});
})
app.get('/orderproduct',(req,res)=>{
  db.query("INSERT INTO orders(customer_id,total_price,advanced_price,date,status,order_type) VALUES (?,?,?,NOW(),'Pending','Normal');",[req.query.cid,req.query.total,req.query.advance ],(err, result)=>{
    res.send(result);

});
})

app.get('/ordergift_id',(req,res)=>{
db.query("SELECT *  FROM orders WHERE customer_id=? ORDER BY order_id DESC LIMIT 1; ",[req.query.cid], (err, results, fields) => {
  if(err) throw err;
  res.send(results);
});
})

app.get('/insertordergift',(req,res)=>{
db.query("INSERT INTO orderitem(order_id,product_id,quantity) VALUES (?,?,1);",[req.query.oid ,req.query.pid],(err, result)=>{
  res.send(result);

});
 
});
app.get('/insertorderproduct',(req,res)=>{
  db.query("INSERT INTO orderitem(order_id,product_id,quantity,total) VALUES (?,?,?,?);",[req.query.oid ,req.query.pid,req.query.quty,req.query.total],(err, result)=>{
    res.send(result);
  
  });
   
  });
  app.get('/getorderproduct',(req,res)=>{
    db.query("SELECT order_id,product_name,orderitem.product_id,orderitem.quantity,price,orderitem.total FROM orderitem INNER JOIN  products ON orderitem.product_id=products.product_id WHERE order_id=? ; ",[req.query.oid], (err, results, fields) => {
      if(err) throw err;
      res.send(results);
    });
    })

app.get('/decreasepoint',(req, res) =>{

  db.query("UPDATE customer SET points = points - ?  WHERE customer_id = ? ;",[req.query.price,req.query.cid ],(err, result)=>{
            res.send(result);

  }) 
 });

 
 app.get('/increasepoint',(req, res) =>{

  db.query("UPDATE customer SET points = points + ?  WHERE customer_id = ? ;",[req.query.price,req.query.cid ],(err, result)=>{
            res.send(result);

  }) 
 });


 app.get('/insertpayment',(req,res)=>{
  db.query("INSERT INTO payment(payment_method,advance_status,total_status,order_id) VALUES ('card','complete','pending',?);",[req.query.oid ],(err, result)=>{
    res.send(result);
  
  });
 })

 app.get('/insertfullpayment',(req,res)=>{
  db.query("INSERT INTO payment(payment_method,advance_status,total_status,order_id) VALUES ('card','complete','complete',?);",[req.query.oid ],(err, result)=>{
    res.send(result);
  
  });
 })

 app.get('/inventorybalance',(req, res) =>{

  db.query("UPDATE products SET quantity = quantity - ?  WHERE product_id = ? ;",[req.query.quty,req.query.pid ],(err, result)=>{
            res.send(result);

  }) 
 });

  app.get('/customer', (req, res) => {
       db.query("SELECT * FROM customer WHERE customer_id=?",[req.query.customer_id], (err, results, fields) => {
          if(err) throw err;
          res.send(results);
        });
       
      });

      app.get('/Allcustomer', (req, res) => {
        db.query("SELECT * FROM customer ", (err, results, fields) => {
           if(err) throw err;
           res.send(results);
         });
        
       });
      
      
const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'../client/public')
    },
    filename(req,file,cb) {
       console.log(file)
        cb(null,
            `${file.originalname.split('.')[0]}.jpg`
            )
    }
})
const upload=multer({
  storage,
  limits:{
    fileSize: 5000000
  },
   fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(jpeg|jpg|png)$/i)){
      return  cb(new Error('pleaseupload image with type of jpg ,png or jpeg'))
    }
    cb(undefined,true)
}
})

app.post("/customization",(req,res)=> {
   
    const image=req.body.image;
    const name=req.body.name;
    const description=req.body.description;
    const measurement=req.body.measurement;
    const color =req.body.color;
    const material=req.body.material; 
    const customer_id=req.body.customer_id; 
    console.log("custom"+customer_id);
      db.query(
        "INSERT INTO customized_products(description,color,product_name,measurement,material,design,status,customer_id) VALUES (?,?,?,?,?,?,'Pending',?)",[description,color,name,measurement,material,image,customer_id],
        (err,result) =>{
            if(err){
                console.log(err)
            }else{
                res.send("values sended");
            }
        }
        );
    
        
      
    })

app.post("/imageUpload",upload.single('file'),(req,res)=> {
   
})
app.get("/gift",(req,res) =>{
    db.query("SELECT * FROM products WHERE category_id=5",(err,result) =>{
     
            if(err) throw err;
                   res.send(result);
                 });
        
   
})

app.get('/profile', (req, res) => {
       
  db.query("SELECT * FROM customer WHERE customer_id=? ",[req.query.customer_id], (err, results, fields) => {
     if(err) throw err;
     res.send(results);
   });
 
 });
 app.get('/orderHistory', (req, res) => {
       
  db.query("SELECT orders.order_id,orderitem.quantity,products.product_img,orders.date,products.price,orders.status,products.product_name FROM orders Inner JOIN orderitem ON orders.order_id = orderitem.order_id JOIN products ON orderitem.product_id = products.product_id WHERE orders.customer_id=? ORDER BY orders.date  DESC;",[req.query.customer_id], (err, results, fields) => {
     if(err) throw err;
     res.send(results);
   });
 
 });
 
app.get("/feedback",(req,res) => {
    const star=req.body. currentValue;
    const discription=req.body. discript;
  
    db.query(
        "UPDATE customer SET star=? , feedback=? WHERE customer_id=?",[star,discription,req.query.customer_id],
        (err,result) =>{
            if(err){
                console.log(err)
            }
        }
        );
       
   
})

app.get('/customerNoficationActive', (req,res) => {
  
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

app.get('/confirmproduct', (req,res) => {
  
  db.query("SELECT orders.order_id,products.product_id,products.price,orderitem.quantity,products.product_img,orders.date,orderitem.total,orders.total_price,orders.advanced_price,orders.status,products.product_name FROM orders Inner JOIN orderitem ON orders.order_id = orderitem.order_id JOIN products ON orderitem.product_id = products.product_id WHERE orders.customer_id=? AND order_type='customized' AND status='Confirm' ORDER BY orders.date  DESC;",[req.query.customer_id], (err, results, fields) => {
    if(err) throw err;
    res.send(results);
  });
});

app.get('/increasecustquantity',(req, res) =>{
  db.query("UPDATE orderitem SET quantity = quantity +1 ,total=?*quantity WHERE order_id = ? AND product_id = ? ;",[req.query.price,req.query.oid , req.query.pid],(err, result)=>{
            res.send(result);

  }) 
  
 });
 app.get('/insertcustorder',(req, res) =>{

  console.log("adva"+req.query.advance);
  db.query("UPDATE orders SET total_price=? ,advanced_price=? WHERE order_id = ? ;",[req.query.total_price,req.query.advance,req.query.oid ],(err, result)=>{
            res.send(result);

  }) 
  
 });
 app.get('/decreasecustquantity',(req, res) =>{
  
    db.query("UPDATE orderitem SET quantity = quantity -1 ,total= ?*quantity WHERE order_id = ? AND product_id = ? ;",[req.query.price,req.query.oid , req.query.pid ],(err, result)=>{
       // console.log(result);
        res.send(result);

    })

})


app.get('/cartCount',(req,res)=>{
  db.query('SELECT COUNT(cart_id) AS count FROM cart WHERE customer_id=? AND active=1 AND date=CURDATE()',[req.query.customer_id],(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})
// app.post('/sendOTP', (req,res) =>{
//     const phone=req.body.phone;
//     const otp=Math.floor(100000 +Math.random()*900000)
//     const ttl=2*60*1000
//     const expires=Date.now()+ttl;
//     const data=`${phone}.${otp}.${expires}`;
//     const hash=crypto.createHmac('sha256',smsKey).update(data).digest('hex');
//     const fulhash=`${hash}.${expires}`;

//     // client.messages.create({
//     //     body:`Your verification code for Register EUT shop is  ${otp}`,
//     //     from:+13312561756,
//     //     to:phone
     
//     // }).then((messages) => console.log(messages)).catch((err) => console.error(err))
//  res.status(200).send({phone,hash:fulhash,otp});
// });

// app.post('/verifyOTP',(req,res) =>{
//     const phone=req.body.phone;
//     const hash=req.body.hash;
//     const otp=req.body.otp;
//     let[hashValue,expires]=hash.split('.')

//     let now=Date.now();
//     if(now >parseInt(expires)){
//         return res.status(504).send({msg:`Timeout pls Try again`});
//     }
//     const data=`${phone}.${otp}.${expires}`
//     const newCalculatedHash =crypto.createHmac('sha256',smsKey).update(data).digest('hex')

//     if(newCalculatedHash === hashValue){
//         return res.status(202).send({msg:`user confirmed`});
//         const accessToken =jwt.sign({data:phone} ,JWT_AUTH_TOKEN,{expiresIn:'30s'});
//         const refreshToken =jwt.sign({data:phone},JWT_REFRESH_TOKEN,{expiresIn:'30s'});
    
//     }else{
//         return res.status(400).send({verification :false,msg:`incorrect OTP`});
//     }
// })
 
   app.get('/chair', (req, res) => {
    db.query("SELECT * FROM products WHERE category_id=3 ;", (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
   });
   app.get('/dining', (req, res) => {
    db.query("SELECT * FROM products WHERE category_id=1 ;", (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
   });
   app.get('/table', (req, res) => {
    db.query("SELECT * FROM products WHERE category_id=2 ;", (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
   });
   app.get('/sofa', (req, res) => {
    db.query("SELECT * FROM products WHERE category_id=4 ;", (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
   });
   app.get('/Allproduct', (req, res) => {
     id=req.params.id;
    db.query("SELECT * FROM products WHERE product_id=?;",[req.query.id], (err, results, fields) => {
       if(err) throw err;
       res.send(results);
       console.log(req.query.id)
     });
   });

   
    
    app.get('/addtocart',(req, res) =>{
       db.query("INSERT INTO `cart`(`customer_id`, `product_id`,`totalprice`, `quantity`,`date`) VALUES (?,?,?,1,NOW());",[req.query.cid , req.query.pid, req.query.price],(err, result)=>{
                     res.send(result);
   
       })
   
   })
   app.get('/getcart',(req, res) =>{
    db.query("SELECT  cart.quantity,product_name,product_img,price,cart.customer_id,cart.totalprice,cart.product_id ,cart.totalprice FROM cart INNER JOIN products ON cart.product_id=products.product_id WHERE cart.customer_id=?  AND cart.date=CURDATE()",[req.query.customer_id],(err, result)=>{
        res.send(result);
      

    })

})


app.get('/qut', (req, res) => {
  db.query("SELECT * FROM cart WHERE product_id=?;",[req.query.pid], (err, results, fields) => {
     if(err) throw err;
     res.send(results);
   });
 });
app.get('/increasequantity',(req, res) =>{

   db.query("UPDATE cart SET quantity = quantity +1 ,totalprice=?*quantity WHERE customer_id = ? AND product_id = ?;",[req.query.price,req.query.cid , req.query.pid],(err, result)=>{
             res.send(result);

   }) 
  });
  app.get('/decreasequantity',(req, res) =>{
   
     db.query("UPDATE cart SET quantity = quantity -1 ,totalprice= ?*quantity WHERE customer_id = ? AND product_id = ? ;",[req.query.price,req.query.cid , req.query.pid],(err, result)=>{
        // console.log(result);
         res.send(result);
 
     })
 
 })

 app.get('/removeitem',(req, res) =>{
  
   db.query("DELETE FROM cart WHERE customer_id = ? AND product_id =?;",[req.query.cid , req.query.pid],(err, result)=>{
       res.send(result);

   })

})

app.get('/clearcart',(req, res) =>{
  
  db.query("DELETE FROM cart WHERE customer_id = ?;",[req.query.cid ],(err, result)=>{
      res.send(result);
      

})
});


   app.put('/updatecustomerimage', (req,res) => {
    const id=req.body.customer_id;
    const name = req.body.fname;

   const email=req.body.email;
   const address=req.body.address;
   const phone_no=req.body.phone;
   const password=req.body.password;
   const image=req.body.proimg;

    db.query("UPDATE customer SET fname = ?,  email=?,  address=?,phone=?,password=?,proimg=? WHERE customer_id = ?", 
    [name,email,address,phone_no,password,image,id], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });
  app.put('/updatecustomer', (req,res) => {
    const id=req.body.customer_id;
    const name = req.body.fname;

   const email=req.body.email;
   const address=req.body.address;
   const phone_no=req.body.phone;
   const password=req.body.password;
  

    db.query("UPDATE customer SET fname = ?,  email=?,  address=?,phone=?,password=? WHERE customer_id = ?", 
    [name,email,address,phone_no,password,id], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });
  

 

app.listen(3001,() => {
    console.log("Your server is running on port 3001");
});