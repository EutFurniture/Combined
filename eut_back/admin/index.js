const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const { name } = require('ejs');
const bcrypt = require('bcrypt');
const bodyParser =  require('body-parser')

const cookieParser = require("cookie-parser");
const session = require("express-session");

const { response } = require('express');
const multer = require('multer');
const fs = require('fs');
const saltRounds = 10;


//const fileUpload = require('express-fileupload');

app.use(cors());
app.use(express.json());
app.set("view engine","ejs");

const db = mysql.createConnection({
    user : 'root',
    host : 'localhost',
    password: '',
    database: 'eut_furniture',
    multipleStatements:true
});

// app.post('/login',(req,res)=>{
//   const email = req.body.email;
//   const password = req.body.password;
   
//   db.query(
//       "SELECT * FROM employee WHERE email=?;",
//       email,
//       (err,result)=>{
//           if(err)
//           { 
//               res.send({err:err})
//           } 
//           if(result.length > 0){
//               bcrypt.compare(password, result[0].password,(error,response)=>{
//                 if(response){
//                   res.send(result)
//                 } else{
//                   res.send({message:'Username or password incorrect'});
//                 }
//               })
//           } else{
//                res.send({message:"User Doesn't Exist"});
//              }
//           }
         
//       )
//   })




app.post('/register',(req,res)=>{
    
    const name = req.body.name;
    const NIC = req.body.NIC;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const job_start_date = req.body.job_start_date;
    const confirm_password = req.body.confirm_password;
    const address = req.body.address;
    const role = req.body.role;
    const password = req.body.password;
   
    bcrypt.hash(password,saltRounds,(err,hash)=>{
        
      if(err){
          console.log(err);
      }

    db.query("INSERT INTO employee (name,NIC,email,phone_no,job_start_date,confirm_password,address,role,password) VALUES (?,?,?,?,?,?,?,?,?)",
    [name,NIC,email,phone_no,job_start_date,hash,address,role,hash],(err,result)=>{
       
            console.log(err);
       if(result){
         res.send({message:"Successfully added"});
       }
      })
    
    })
    
});

app.post('/adddeliver',(req,res)=>{
    
  const name = req.body.name;
  const NIC = req.body.NIC;
  const email = req.body.email;
  const phone_no = req.body.phone_no;
  const job_start_date = req.body.job_start_date;
  const confirm_password = req.body.confirm_password;
  const address = req.body.address;
  const role = req.body.role;
  const password = req.body.password;
 
  bcrypt.hash(password,saltRounds,(err,hash)=>{
      
    if(err){
        console.log(err);
    }

  db.query("INSERT INTO employee (name,NIC,email,phone_no,job_start_date,confirm_password,address,role,password) VALUES (?,?,?,?,?,?,?,?,?)",
  [name,NIC,email,phone_no,job_start_date,hash,address,role,hash],(err,result)=>{
     
          console.log(err);
     if(result){
       res.send({message:"Successfully added"});
     }
    })
  
  })
  
});

app.post('/login',(req,res)=>{
  
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  console.log(password)
  db.query(
      "SELECT *FROM employee WHERE email=?;",
     email,
      (err,result)=>{
          if(err)
          { 
              res.send({err:err})
          } 
          if(result){
          if(result.length > 0){
            bcrypt.compare(password,result[0].password,(error, response) =>{
                if(response){
                 res.send(result);
                }
                else{
                 res.send({message:"Invalid Username or Password"});
                }
            })
         }
         else{
             res.send({message:"Invalid Username or Password"});
         }
     }
    }
 );
});


app.post('/AddCategory',(req,res)=>{
  console.log(req.body)
  const name = req.body.name;
  const date = req.body.date;
  
 
 
  db.query("INSERT INTO category (name,date) VALUES (?,?)",
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
  db.query('SELECT products.name,products.product_img,orders.total_price FROM orders INNER JOIN products ON orders.product_id=products.product_id ORDER BY orders.order_last_date DESC LIMIT 5 ',(err,result,fields)=>{
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
  db.query('SELECT products.product_id,products.product_img,products.name,products.quantity,products.price FROM products INNER JOIN category ON products.category_id=category.category_id WHERE category.name="Gift"',(err,results,fields)=>{
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
  db.query("SELECT customized_products.cus_product_id,customized_products.product_name,customized_products.price,customized_products.delivery_date,customer.name FROM customized_products INNER JOIN customer ON customized_products.customer_id=customer.customer_id ",(err,result,fields)=>{
    if(!err)
    res.send(result);
    else
    console.log(err);
  })
})

app.get('/loadPayment',(req,res)=>{
  db.query("SELECT payment.payment_id,payment.payment_method,payment.payment_status,product.product_name,orders.advance_price,orders.total_price,orders.order_id FROM ((payment INNER JOIN product ON payment.product_id=product.product_id) INNER JOIN orders ON payment.order_id=orders.order_id) ",(err,result,fields)=>{
    if(!err)
    res.send(result);
    else
    console.log(err);
  })
})



app.get('/loadCustomer',(req,res)=>{
  db.query('SELECT customer_id, name,email,address,phone_no,points,order_frequency FROM customer',(err,rows,fields)=>{
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
  db.query("SELECT product_id,name,quantity,price,product_img FROM products WHERE product_id=?",[req.query.product_id],(err,result)=>{
    console.log(req.query.ID);
    res.send(result);
  });
  
});

//view customized order
app.get("/ViewCusOrder",(req,res)=>{
  cus_product_id=req.params. cus_product_id;
  
  db.query("SELECT customer.name,customized_products.cus_product_id,customized_products.customer_id,customized_products.product_name,customized_products.description,customized_products.material,customized_products.color,customized_products.measurement,customized_products.design FROM customized_products INNER JOIN customer ON customized_products.customer_id=customer.customer_id WHERE customized_products.cus_product_id=?  ",[req.query.cus_product_id],(err,result)=>{
    console.log(req.query.cus_product_id);
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

const storage = multer.diskStorage({
  destination(req,file,cb){
    cb(null,'../client/public/')
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

app.post('/addProducts',(req,res)=>{
  
  console.log(req.body)
const product_img =req.body.image;
const name = req.body.name;
const price = req.body.price;
const material = req.body.material;
const quantity = req.body.quantity;
const category_id=req.body.category_id;
const description=req.body.description;

db.query(
  "INSERT INTO products(name,price,product_img,material,quantity,category_id,description) VALUES (?,?,?,?,?,?,?)",[name,price,product_img,material,quantity,category_id,description],
  (err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send("Values added")
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
const name = req.body.name;
const price = req.body.price;
const quantity = req.body.quantity;
const category_id=req.body.category_id;

db.query(
  "INSERT INTO products(product_img,name,category_id,price,quantity) VALUES (?,?,?,?,?)",[product_img,name,category_id,price,quantity],
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
app.put('/InsertCustomized', (req,res) => {
  
  const cus_product_id=req.body.cus_product_id;
  const delivery_date = req.body.delivery_date;
  const advanced_payment = req.body.advanced_payment;
  const total_payment = req.body.total_payment;
  db.query("UPDATE customized_products SET delivery_date = ?,advanced_payment=?,total_payment=? WHERE cus_product_id = ?", 
  [delivery_date,advanced_payment,total_payment,cus_product_id], 
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
  
  db.query("UPDATE customized_products SET active = 0 WHERE cus_product_id=?", 
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
  const name = req.body.name;
  const price = req.body.price;
  const product_img = req.body.product_img;
  const quantity = req.body.quantity;
  db.query("UPDATE products SET name = ?,price=?,product_img=?,quantity=? WHERE product_id = ?", 
  [name,price,product_img,quantity,product_id], 
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
  db.query('SELECT SUM(quantity) AS quantity, category_name FROM customized_products GROUP BY category_name', (err, result) => {
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
app.get('/CustomerCount',(req,res) => {
  db.query('SELECT EXTRACT(MONTH FROM date) AS month, COUNT(customer_id) AS count FROM customer GROUP BY month', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//return items
app.get('/ReturnCount',(req,res) => {
  db.query('SELECT category.name,COUNT(return_item.returned_id) AS count FROM ((products INNER JOIN category ON products.category_id=category.category_id) INNER JOIN return_item ON products.product_id=return_item.product_id) GROUP BY (category.category_id)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//moving items
app.get('/MovingItems',(req,res) => {
  const month=req.body.month;
  db.query('SELECT category.name, COUNT(orders.product_id) AS count FROM ((orders INNER JOIN products ON orders.product_id=products.product_id)INNER JOIN category ON products.category_id=category.category_id) WHERE EXTRACT(MONTH FROM orders.order_last_date) =? GROUP BY orders.product_id',[req.query.month], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
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

//returnCount
app.get('/ReturnItemCount',(req,res) => {
  db.query('SELECT COUNT(returned_id) AS returncount FROM return_item', (err, result) => {
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
  db.query('SELECT products.name,customer.name AS cus_name,orders.o_date,orders.total_price FROM ((orders INNER JOIN products ON orders.product_id=products.product_id) INNER JOIN customer ON orders.customer_id=customer.customer_id)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//order details
app.get("/OrderDetails",(req,res)=>{
  todate=req.params.todate;
  fromdate=req.params.fromdate;
  db.query('SELECT products.name,customer.name,orders.o_date,orders.total_price FROM ((orders INNER JOIN products ON orders.product_id=products.product_id) INNER JOIN customer ON orders.customer_id=customer.customer_id) WHERE orders.o_date BETWEEN o_date=? AND "o_date=?"',[req.query.fromdate],[req.query.todate],(err,result)=>{
    console.log(req.query.id);
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

app.listen(3001,()=>{
    console.log("Your server is running on port 3001");
});