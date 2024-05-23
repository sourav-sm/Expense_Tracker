const express=require ('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

//{useNewUrlParser: true, useUnifiedTopology: true }
//connect with MongoDB
mongoose.connect('mongodb+srv://developersourav135:44281219@cluster0.cim5m44.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/expense_traker',)
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));


//making schema
const expenseSchema = new mongoose.Schema({
    amount:Number,
    description:String,
    data:String
});

const incomeSchema = new mongoose.Schema({
    amount:Number,
    description:String,
    data:String
})

const Expense=mongoose.model('Expense',expenseSchema);
const Income=mongoose.model('Income',incomeSchema);

//POST END POINT SO THAT THE DATA THAT THE USER GIVES ARE STORED IN DATABASE
//expense api end point
app.post('/expenses',async(req,res)=>{
    const {amount,description,date}=req.body;
    const expense=new Expense({amount,description,date});
    await expense.save();
    res.send(expense);
})

////Income api end point
app.post('/incomes',async(req,res)=>{
    const {amount,description,date}=req.body;
    const income=new Income({amount,description,date});
    await income.save();
    res.send(income);
})


//GET ENDPOINT SO THAT THE USER CAN GET THEIR STORED DATA
//get expense endpoint
app.get('/expenses',async(req,res)=>{
    const expenses=await Expense.find();// fetching all documents from the Expense collection in your MongoDB database and storing them in the expenses constant variable as an array of JavaScript objects.
    res.send(expenses);
})

//get -income endpoint
app.get('/incomes',async(req,res)=>{
    const incomes=await Income.find();// fetching all documents from the Income collection in your MongoDB database and storing them in the incomes constant variable as an array of JavaScript objects.
    res.send(incomes);
})

app.listen(5000,(error)=>{
    if(!error){
        console.log(`Server is running  5000`);
    }else{
        console.log("Error :"+error)
    }
})