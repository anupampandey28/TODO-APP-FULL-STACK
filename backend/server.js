import express from 'express';
import  pool  from './db.js'

const app = express();
app.use(express.json());


app.get('/' ,(req,res) =>{
    res.send("Habit Tracker Server is running")
})

//Routes
app.post('/habits' , async(req , res)=>{
    try {
        const name = req.body;
        const result = await pool.query('INSERT INTO habits (name) VALUES ($1) RETURNING *' , [name]);
        res.status(201).json(result.rows[0])       
    } catch (error) {
    console.error(error);
    res.status(500).send('Database connection failed');  
    }
})

app.get('/habits' , async(req , res) => {
    try {
        const result = await pool.query('SELECT * FROM habits')
        res.status(200).json(result.rows  )
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

app.put('/habits/id',async(req , res) =>{
    try {
        const {id} = req.params;
        const {name} = req.body;
        const result = await pool.query('UPDATE habits SET name = $1 WHERE id =$2 RETURNING *', [name , id])
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

app.delete('/habits/:id' , async(req , res)=>{
try {
    const {id }= req.params;
    const result = await pool.query('DELETE FROM habits WHERE id = $1',[id])
    res.status(200).json({message : "Habit deleted succesfully"})
} catch (error) {
    res.status(500).json({error:error.message})
}
})

app.listen(3000 , () =>{
    console.log("Server is running on port 3000");
})
