const express=require ('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

//connect with MongoDB
mongoose.connect('mongodb://localhost:27017/expense_tracker',{ useNewUrlParser: true, useUnifiedTopology: true })

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
app.post('/expense',async(req,res)=>{
    const {amount,description,date}=req.body;
    const expense=new Expense({amount,description,date});
    await expense.save();
    res.send(expense);
})

////Income api end point
app.post('/income',async(req,res)=>{
    const {amount,description,date}=req.body;
    const income=new Income({amount,description,date});
    await income.save();
    res.send(income);
})


//GET ENDPOINT SO THAT THE USER CAN GET THEIR STORED DATA
//get expense endpoint
app.get('/expense',async(req,res)=>{
    const expenses=await Expense.find();// fetching all documents from the Expense collection in your MongoDB database and storing them in the expenses constant variable as an array of JavaScript objects.
    res.send(expenses);
})

//get -income endpoint
app.get('/income',async(req,res)=>{
    const incomes=await Income.find();// fetching all documents from the Income collection in your MongoDB database and storing them in the incomes constant variable as an array of JavaScript objects.
    res.send(incomes);
})

app.listen(5000,()=>{
    console.log('app is listen on 5000')
})