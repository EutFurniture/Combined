const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const { name } = require('ejs');
const bcrypt = require('bcrypt');
const bodyParser =  require('body-parser')
const { response } = require('express');
const saltRounds = 10;

var nodemailer = require('nodemailer')

app.use(cors());
app.use(express.json());
app.set("view engine","ejs");

const db = mysql.createConnection({
    user: "root",
    host:"localhost",
    password:"",
    database:"eut_furniture",
    multipleStatements:true
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

                    <strong>Your otp code is ${otp}</strong>
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
          
                db.query("INSERT INTO employee(e_name, e_nic, e_email, e_phone, e_job_start_date, e_address, e_role) VALUES ( ?, ?, ?, ?,NOW(), ?,'Deliver'); INSERT INTO userlogin (u_email, u_name, u_password,user_role,u_otp,u_verify) VALUES (?,?,?,'Deliver',?,'0') ;", 
                [fullname,NIC,email ,mobile ,address,email,fullname,hash,otp],(err,result)=>{
                 
                     
                 if(result){
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