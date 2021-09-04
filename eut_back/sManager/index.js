const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'furniture',
});

app.post('/create', (req,res) => {
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

// add customers
app.get('/customers',(req,res) => {
    db.query('SELECT * FROM customers', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
        }
    });
});

//View deliverySchedule
app.get('/DeliverySchedule',(req,res) => {
    db.query('SELECT order_id, DATE_FORMAT(o_date,"%d-%m-%y") AS o_date, DATE_FORMAT(order_last_date,"%d-%m-%y") AS order_last_date FROM orders', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
        }
    });
});

//view payment
app.get('/pposts',(req,res)=>{
    db.query("SELECT * FROM payment;",
    (err,results,fields)=>{
        if(err) throw err;
        res.send(results);
    });
});

/*view orders
app.get('/OrdersUI',(req,res)=>{
    db.query("SELECT * FROM orders;",
    (err,results,fields)=>{
        if(err) throw err;
        res.send(results);
    });
});
*/
app.get('/OrdersUI', (req, res) => {
       
    db.query('SELECT orderitem.quantity,DATE_FORMAT(orders.o_date,"%d-%m-%y") AS o_date,DATE_FORMAT(orders.order_last_date,"%d-%m-%y") AS order_last_date,orders.status,orderitem.total,orders.customer_id FROM orders INNER JOIN orderitem ON orders.order_id = orderitem.order_id ORDER BY orders.order_id  DESC;', (err, results, fields) => {
       if(err) throw err;
       res.send(results);
     });
   
   });



app.get('/OrdersStatus',(req,res)=>{
    db.query('SELECT order_id, DATE_FORMAT(o_date,"%d-%m-%y") AS o_date, DATE_FORMAT(order_last_date,"%d-%m-%y") AS order_last_date, status, order_description FROM orders;',
    (err,results,fields)=>{
        if(err) throw err;
        res.send(results);
    });
});

//view notification
app.get('/NotificationUI',(req,res)=>{
    db.query("SELECT * FROM notification;",
    (err,results,fields)=>{
        if(err) throw err;
        res.send(results);
    });
});




//update

//update name
app.put('/updateName', (req,res) => {
    const id=req.body.id;
    const name = req.body.name;
    db.query("UPDATE customers SET name = ? WHERE id = ?", 
    [name, id], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
});

//update address
app.put('/updateAddress', (req,res) => {
    const id=req.body.id;
    const address = req.body.address;
    db.query("UPDATE customers SET address = ? WHERE id = ?", 
    [address, id], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
});

app.put('/updatePhone', (req,res) => {
    const id=req.body.id;
    const phone = req.body.phone;
    db.query("UPDATE customers SET phone = ? WHERE id = ?", 
    [phone, id], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
});



//delete
app.delete('/delete/:id', (req,res) => {
    const id = req.params.id
    db.query("DELETE FROM customers WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.listen(3001,()=>{
    console.log("Yey, your server is running on port 3001");
});

//promotions
app.post('/create_pro', (req,res) => {
    const name = req.body.name;
    const price = req.body.price;
    const brand = req.body.brand;
    const description = req.body.description;

    db.query('INSERT INTO promotions (name, price, brand, description) VALUES (?,?,?,?)', 
    [name, price, brand, description], (err, result) => {
        if (err) {
            console.log(err)
        } else{
            res.send("Values Inserted")
        }
      }
    );
});

app.post("/customization",(req,res)=> {
   
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







//load customer new


app.get('/load',(req,res)=>{
    db.query('SELECT * FROM customer',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
})

app.get('/loadEmployee',(req,res)=>{
    db.query('SELECT name FROM customer" ',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

  app.get("/employeesLoad/:customer_id", (req, res) => {
    db.query("SELECT * FROM customer WHERE customer_id=?", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get('/employees',(req,res) => {
    db.query('SELECT * FROM customer', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
        }
    });
});


app.delete("/deleteCustomer/:customer_id",(req,res)=>{
    const customer_id = req.params.customer_id;
    const sqlDelete="DELETE FROM customer WHERE customer_id=?";

    db.query(sqlDelete,customer_id,(err,result)=>{
      if(err) console.log(err);
    });
  });


  app.get('/loadEmp/:customer_id',(req,res)=>{
    const customer_id = req.params.customer_id;
    db.query('SELECT * FROM customer WHERE customer_id=?',(err,result)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
    })
})

  app.get('/view',(req,res)=>{
    customer_id=req.params.customer_id;
    db.query("SELECT * FROM customer WHERE customer_id=?",[req.query.customer_id],(err,result)=>{
      console.log(req.query.customer_id);
      res.send(result);
    });
    
  });

  /*
  app.put('/updateEmployee/:customer_id', (req,res) => {
    console.log(customer_id);
    //const id = req.body.id;
    const name = req.body.name;
    const sqlUpdate = "UPDATE SET customer name=? WHERE customer_id=?";
  
    db.query(sqlUpdate,[name,customer_id],(err,result)=>{
      if(err) console.log(err);
    })
  });
  */

//update Employee
app.put('/updateEmployee', (req,res) => {
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


  app.get("/viewEmp",(req,res)=>{
    db.query( "SELECT *FROM customer WHERE customer_id=?",[req.params.customer_id],(err,rows,fields)=>
   {
        if(!err)
        res.send(rows);
        else
        console.log(err);
   })
});










//log in

app.post('/login',(req,res)=>{
  
    const email = req.body.email;
    const password = req.body.password;
   
    db.query(
        "SELECT *FROM employee WHERE email=?;",
       email,
        (err,result)=>{
            console.log(result)
            
            
            if(err)
            { 
                res.send({err:err})
            } 
            if(result.length > 0){
                
             if(password==result[0].password) {
                      
                   res.send(result);
                  }
                  else{
                   
                   res.send({message:"Invalid Username or Password"});
                  
                  }
              }
           })
          
        });


app.post('/create_order', (req,res) => {
            const customer_id = req.body.customer_id;
            const o_date = req.body.o_date;
            const order_last_date = req.body.order_last_date;
            const order_description = req.body.order_description;
            const total_price = req.body.total_price;
        
            db.query('INSERT INTO orders (customer_id, o_date, order_last_date, order_description, total_price) VALUES (?,?,?,?,?)', 
            [customer_id, o_date, order_last_date, order_description, total_price], (err, result) => {
                if (err) {
                    console.log(err)
                } else{
                    res.send("Values Inserted")
                }
              }
            );
        });
 
  app.put('/updateDate', (req,res) => {
    const order_id=req.body.order_id;
    const order_last_date = req.body.order_last_date;
    db.query("UPDATE orders SET order_last_date = ? WHERE order_id = ?", 
    [order_last_date, order_id], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
});


app.get('/order_check',(req,res) => {
    db.query('SELECT order_id, customer_id, DATE_FORMAT(o_date,"%d-%m-%y") AS o_date, DATE_FORMAT(order_last_date,"%d-%m-%y") AS order_last_date, order_description, total_price FROM orders ORDER BY order_id DESC', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
        }
    });
});




//Report

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
