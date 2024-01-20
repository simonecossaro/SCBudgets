const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://mongohost";
const app = express();
const session = require('express-session');
const client = new MongoClient(uri);
let db = client.db("expenses");

app.use(express.json());
app.use(express.urlencoded());
app.use(session({
    secret: "segreto",
    resave: false
}));
const router = express.Router();
const checkInsert = require("./insert_check.js");
const {getBalance,getBalanceId,getBalanceToPay} = require("./balance.js");

router.post("/auth/signup", async (req, res) => {
    try{
        if (req.body.username.includes(',')){
            res.status(401).json({msg: "The username contains ',' which is not allowed"});
        } else if (req.body.password !== req.body.password_c) {
            res.status(401).json({msg: "The two passwords do not match"});
        } else {
            let new_user = {
                username: req.body.username,
                name: req.body.name,
                surname: req.body.surname,
                password: req.body.password,
                email: req.body.email
            };
            const db_user = await db.collection("users").findOne({username:new_user.username});
            if (!db_user) {
                await db.collection("users").insertOne(new_user);
                res.redirect("/signin");
            } else {
                res.status(401).json({msg: "Username already used"});
            }
        }
    } catch (error) {
        console.log(error);
    }
});

router.post("/auth/signin", async (req, res) => {
    try{
        const{ username, password } = req.body;
        const db_user = await db.collection("users").findOne({username});
        if (db_user.password === password) {
            req.session.user = db_user.username;
            res.redirect('/');
        } else {
            res.status(401).json({msg: "Wrong username or password"});
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal error"});
    }
});

router.get("/budget", async (req, res) => {
    let budget = await db.collection("expenses").find({$or:[{creator:req.session.user},{"shared_with":req.session.user},
    {"shared_with":{$regex : ","+req.session.user+","}},{"shared_with":new RegExp('^'+req.session.user+',')},{"shared_with":new RegExp(','+req.session.user+'$')}]}).sort({date:-1}).toArray();
    res.json(budget);
});

router.get("/budget/whoami", async (req, res) => {
    let user_info = await db.collection("users").findOne({username:req.session.user});
    res.json(user_info);
});

router.get("/budget/search", async (req, res) => {
    try{
        let query = JSON.parse(req.query.q);
        let budget = await db.collection("expenses").find({$and:[{$or:[{creator:req.session.user},{"shared_with":req.session.user},
        {"shared_with":{$regex : ","+req.session.user+","}},{"shared_with":new RegExp('^'+req.session.user+',')},{"shared_with":new RegExp(','+req.session.user+'$')}]},
        query]}).sort({date:-1}).toArray();
        res.json(budget);
    } catch(err){
        console.error(err.message);
        res.sendStatus(400).json({msg: "Error"});
    }
});

router.get("/users/search", async (req, res) => {
    try{
        let query = JSON.parse(req.query.q);
        let users = await db.collection("users").find(query).toArray();
        res.json(users);
    } catch(err){
        console.error(err.message);
        res.sendStatus(400).json({msg: "Error"});
    }
});

router.get("/budget/:year", async (req, res) => {
    let year = req.params.year;
    let budget = await db.collection("expenses").find({$and:[{$or:[{creator:req.session.user},{"shared_with":req.session.user},
    {"shared_with":{$regex : ","+req.session.user+","}},{"shared_with":new RegExp('^'+req.session.user+',')},{"shared_with":new RegExp(','+req.session.user+'$')}]},
    {"date":{"$gte":new Date(year,0,1),"$lte":new Date(year,11,31)}}]}).sort({date:-1}).toArray();
    res.json(budget);
});

router.get("/budget/:year/search", async (req, res) => {
    try{
        let query = JSON.parse(req.query.q);
        let year = parseInt(req.params.year);
        let budget = await db.collection("expenses").find({$and:[{$or:[{creator:req.session.user},{"shared_with":req.session.user},
        {"shared_with":{$regex : ","+req.session.user+","}},{"shared_with":new RegExp('^'+req.session.user+',')},{"shared_with":new RegExp(','+req.session.user+'$')}]},
        {"date":{"$gte":new Date(year,0,1),"$lte":new Date(year,11,31)}},query]}).sort({date:-1}).toArray();
        res.json(budget);
    } catch(err){
        console.error(err.message);
        res.sendStatus(400).json({msg: "Error"});
    }
});

router.get("/budget/:year/:month/search", async (req, res) => {
    try{
        let query = JSON.parse(req.query.q);
        let year = parseInt(req.params.year);
        let month = parseInt(req.params.month);
        let budget = await db.collection("expenses").find({$and:[{$or:[{creator:req.session.user},{"shared_with":req.session.user},
        {"shared_with":{$regex : ","+req.session.user+","}},{"shared_with":new RegExp('^'+req.session.user+',')},{"shared_with":new RegExp(','+req.session.user+'$')}]},
        {"date":{"$gte":new Date(year,month-1,1),"$lte":new Date(year,month-1,31)}},query]}).sort({date:-1}).toArray();
        res.json(budget);
    } catch(err){
        console.error(err.message);
        res.sendStatus(400).json({msg: "Error"});
    }
});

router.get("/budget/:year/:month", async (req, res) => {
    let year = parseInt(req.params.year);
    let month = parseInt(req.params.month);
    let budget = await db.collection("expenses").find({$and:[{$or:[{creator:req.session.user},{"shared_with":req.session.user},
    {"shared_with":{$regex : ","+req.session.user+","}},{"shared_with":new RegExp('^'+req.session.user+',')},{"shared_with":new RegExp(','+req.session.user+'$')}]},
    {"date":{"$gte":new Date(year,month-1,1),"$lte":new Date(year,month-1,31)}}]}).sort({date:-1}).toArray();
    res.json(budget);
});

router.get("/budget/:year/:month/:id", async (req, res) => {
    let year = parseInt(req.params.year);
    let month = parseInt(req.params.month);
    let id = req.params.id;
    let budget = await db.collection("expenses").findOne({$and:[{$or:[{creator:req.session.user},{"shared_with":req.session.user},
    {"shared_with":{$regex : ","+req.session.user+","}},{"shared_with":new RegExp('^'+req.session.user+',')},{"shared_with":new RegExp(','+req.session.user+'$')}]},
    {_id: new ObjectId(id)}]});
    res.json(budget);
});

router.delete("/budget/:year/:month/:id", async (req, res) => {
    try {
        let year = req.params.year;
        let month = req.params.month;
        let id = req.params.id;
        await db.collection("expenses").deleteOne({ $and:[{creator:req.session.user}, 
        {_id: new ObjectId(id)}]});
        res.json({msg: "Expense delated"});
    } catch(err){
        console.error(err.message);
        res.sendStatus(400).json({msg: "Error"});
    }
});

router.put("/budget/:year/:month/:id", async (req, res) => {
    try {
        let modified_expense = {
            creator: req.session.user,
            amount: req.body.amount,
            description: req.body.description,
            category: req.body.category,
            shared_with: req.body.shared_with,
            quotas: req.body.quotas,
            date: new Date(req.body.date),
            user_quota : req.body.user_quota
        };
        let check_input = await checkInsert(modified_expense);
        if (check_input.msg === "Correct input"){
            await db.collection("expenses").updateOne({_id:new ObjectId(req.params.id)}, {
                $set:{
                    creator: req.session.user,
                    amount: req.body.amount,
                    description: req.body.description,
                    category: req.body.category,
                    shared_with: req.body.shared_with,
                    quotas: req.body.quotas,
                    user_quota: req.body.user_quota,
                    date: new Date(req.body.date)
                }
            });
            res.json({msg: "Expense modified"});
        } else{
            res.json(check_input);
        }
    } catch(err) {
        console.error(err.message);
        res.sendStatus(400).json({msg: "Error"});
    }
});

router.post("/budget/:year/:month", async (req, res) => {
    let new_expense = {
        creator: req.session.user,
        amount: req.body.amount,
        description: req.body.description,
        category: req.body.category,
        shared_with: req.body.shared_with,
        quotas: req.body.quotas,
        date: new Date(req.body.date),
        user_quota : req.body.user_quota
    };
    try {
        let check_input = await checkInsert(new_expense);
        if (check_input.msg === "Correct input"){
            await db.collection("expenses").insertOne(new_expense);
            res.json({msg:"Expense entered"});
        } else{
            res.json(check_input);
        }
    } catch(err){
        console.log(err);
    }
});

router.get("/balance", async (req, res) => {
    let budget = await db.collection("expenses").find({$or:[{creator:req.session.user},{"shared_with":req.session.user},
    {"shared_with":{$regex : ","+req.session.user+","}},{"shared_with":new RegExp('^'+req.session.user+',')},{"shared_with":new RegExp(','+req.session.user+'$')}]}).sort({date:-1}).toArray();
    let balance = await getBalance(req.session.user,budget);
    res.json(balance);
});

router.get("/balance/:id", async (req, res) => {
    let id = req.params.id;
    let budget = await db.collection("expenses").find({$or:[{$and:[{creator:req.session.user},{$or:[{"shared_with":id},
    {"shared_with":{$regex : ","+id+","}},{"shared_with":new RegExp('^'+id+',')},{"shared_with":new RegExp(','+id+'$')}]}]},
    {$and:[{creator:id},{$or:[{"shared_with":req.session.user},{"shared_with":{$regex : ","+req.session.user+","}},{"shared_with":new RegExp('^'+req.session.user+',')},{"shared_with":new RegExp(','+req.session.user+'$')}]}]}]}).sort({date:-1}).toArray();
    let balance = await getBalanceId(req.session.user,budget,id);
    res.json(balance);
});

router.get("/users", async (req, res) => {
    let usernames = [];
    let users = await db.collection("users").find().toArray();
    users.forEach(function(user){
        usernames.push(user.username);
    })
    res.json(usernames);
});

router.get("/pay", async(req,res) => {
    let response = await db.collection("expenses").find({$and:[{"amount":{$ne:0}},{$or:[{"shared_with":req.session.user},
    {"shared_with":{$regex : ","+req.session.user+","}},{"shared_with":new RegExp('^'+req.session.user+',')},{"shared_with":new RegExp(','+req.session.user+'$')}]}]}).sort({date:-1}).toArray();
    let paylist = await getBalanceToPay(req.session.user,response);
    res.json(paylist);
});

module.exports = router;


