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
    secret: 'segreto',
    resave: false
}));
const router = express.Router();

// function to check the correct format of shared_with input field and and the existence of all users entered
async function errors_in_sharedwith(expense){
    let users = expense.shared_with.split(',');
    var i;
    for (i=0; i<users.length; i++){
        let query = JSON.parse("{\"username\":\""+users[i]+"\"}");
        let user = await db.collection("users").findOne(query);
        if (!user){
            return true;
        }
    }
    return false;
}

// function to check the correct format of quotas input field and that the sum of the quotas gives the total amount
async function errors_in_quotas(expense){
    let shared_length = expense.shared_with.split(',').length;
    let quotas = expense.quotas.split(',');
    if (shared_length !== quotas.length){
        return true;
    }
    let total_sum = 0;
    for (i=0; i<quotas.length; i++){
        total_sum += parseInt(quotas[i]);
    }
    if ((total_sum + parseInt(expense.user_quota)) != expense.amount){
        return true;
    }
    return false;
}

// function to check the entered expense 
async function checkInput(expense){
    if (expense.date > new Date()){
        return {msg:"The date cannot be in the future"};
    } 
    if (expense.amount < 0){
        return {msg:"The amount cannot be negative"};
    }
    let check_sharedwith = await errors_in_sharedwith(expense);
    if (check_sharedwith){
        return {msg:"Error in users inserted: some users may not exist or the input may be in an incorrect format"};
    }
    if (expense.quotas){
        let check_quotas = await errors_in_quotas(expense);
        if (check_quotas){
            return {msg:"Error in quotas inserted: the number of quotas may not be consistent with the number of users or the total sum of the quotas may not lead to the total amount"};
        }
    }
    return {msg:"Correct input"};
}

module.exports = checkInput;
