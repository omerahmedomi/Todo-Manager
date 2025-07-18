import express from "express";
import cors from "cors";
import {Pool} from 'pg'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();



const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Todo",
  password: "Omer$$@1641",
  port: 5432,
});


 
const app=express()
 const port=2000

 app.use(cors());
 app.use(express.json());

 function authMiddleware(req, res, next) {
   const token = req.headers["authorization"];
   console.log("token", token);
   if (!token) return res.status(401).json({ message: "No token provided" });

   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
     if (err) {
       return res.status(401).json({ message: "Invalid token" });
     }
     req.userId = decoded.id;
     next();
   });
 }

 app.use('/todos',authMiddleware)

app.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  const hashedPassword=bcrypt.hashSync(password,10)
  try{
    
    const checkDuplication = await pool.query(
      `SELECT * FROM users WHERE username = $1 `,
      [username]
    );
       if(checkDuplication.rows[0]){ return res.status(409).send({message:"User already exists!, Try logging in."})}
    const result = await pool.query(`INSERT INTO users(username,password) VALUES ($1,$2) RETURNING *`,[username,hashedPassword])
    const token= jwt.sign({id:result.rows[0].id},process.env.JWT_SECRET,{expiresIn:'24h'})
    res.json({token})
  }catch(error){
    console.log(error)
    res.status(503).json({ error: error.message });

  }
  // res.status(201).json({ message: "User created" }); // ✅ send response
});
app.post("/auth/login", async(req, res) => {
   const { username, password } = req.body;
  console.log(username, password);
  try{

    const result = await pool.query(`SELECT * FROM users WHERE username = $1 `,[username])
    const user=result.rows[0]
    if(!user){
      return res.status(404).send({message:"User not found!,Try signing up instead."})
    }

    const passwordIsValid=bcrypt.compareSync(password,user.password)

    if(!passwordIsValid){
      return res.status(404).send({message:"Incorrect Password"})
    }
    //now user is authenticated
    const token= jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:'24h'})
    res.json({token})
  }catch(error){
    console.log(error)
    res.status(503).json({ error: error.message });

    
  }
});


app.get('/todos',async (req,res)=>{
 
  const response= await pool.query(`SELECT * FROM todos WHERE user_id =$1 `,[req.userId])
const todos=response.rows
res.json(todos)
})


app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body; // use value from frontend
  await pool.query(`UPDATE todos SET completed = $1 WHERE id = $2`, [
    completed,
    id,
  ]);
  res.json({ message: "Todo updated" });
});

app.delete('/todos/:id',async (req,res)=>{
  const {id}=req.params;
  await pool.query(`DELETE FROM todos WHERE id = $1`,[id]);
  res.json({message:"Todo deleted"})
})
app.listen(port,()=>{
    console.log("Running on port",port)
})

