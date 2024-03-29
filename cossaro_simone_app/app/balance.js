const express = require('express');
const { MongoClient } = require('mongodb');
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

// function to find the quota of the user passed as a parameter
function findDebt(user,expense){
    const users = expense.shared_with.split(',');
    const quotas = expense.quotas.split(',');
    let index;
    for (i =0; i<users.length; i++){
        if (users[i] === user){
            index = i;
        }
    }
    return quotas[index];
};

// function to find the balance of the user starting from the expenses
async function getBalance (user,budget){
    let balance = [];
    budget.forEach(function(expense){
        if (expense.creator === user){
            if (expense.amount !== 0){
                const new_credit = {
                    id : expense._id,
                    date: expense.date,
                    description: expense.description,
                    category: expense.category,
                    creator: expense.creator,
                    amount: expense.amount - parseInt(expense.user_quota),
                    global_amount: expense.amount,
                    with: expense.shared_with,
                    shared_with: expense.shared_with,
                    type: "credit"
                };
                balance.push(new_credit);
            } else if (expense.amount === 0){
                const new_credit = {
                    id : expense._id,
                    date: expense.date,
                    description: expense.description,
                    category: expense.category,
                    creator: expense.creator,
                    amount: parseInt(expense.user_quota),
                    global_amount: expense.amount,
                    with: expense.shared_with,
                    shared_with: expense.shared_with,
                    type: "credit"
                };
                balance.push(new_credit);
            }
        } else {
            if (expense.amount !== 0){
                const new_debt = {
                    id : expense._id,
                    date: expense.date,
                    description: expense.description,
                    category: expense.category,
                    creator: expense.creator,
                    amount: parseInt(-1 * findDebt(user,expense)),
                    global_amount: expense.amount,
                    with: expense.creator,
                    shared_with: expense.shared_with,
                    type: "debt"
                };
                balance.push(new_debt);
            } else if (expense.amount === 0){
                const new_debt = {
                    id : expense._id,
                    date: expense.date,
                    description: expense.description,
                    category: expense.category,
                    creator: expense.creator,
                    amount: parseInt(findDebt(user,expense)),
                    global_amount: expense.amount,
                    with: expense.creator,
                    shared_with: expense.shared_with,
                    type: "credit"
                };
                balance.push(new_debt);
            }
        }
    });
    let total = 0;
    balance.forEach(function(expense){
        total += parseInt(expense.amount);
    });
    balance.push({total_balance: total});
    return balance;
};

// function to find the balance between two users
async function getBalanceId (user,budget,other_user){
    let balance = [];
    budget.forEach(function(expense){
        if (expense.creator === user){
            if (expense.amount !== 0){
                const new_credit = {
                    id : expense._id,
                    date: expense.date,
                    description: expense.description,
                    category: expense.category,
                    creator: expense.creator,
                    amount: parseInt(findDebt(other_user,expense)),
                    type: "credit"
                };
                balance.push(new_credit);
            } else if (expense.amount === 0){
                const new_credit = {
                    id : expense._id,
                    date: expense.date,
                    description: expense.description,
                    category: expense.category,
                    creator: expense.creator,
                    amount: parseInt(expense.user_quota),
                    type: "credit"
                };
                balance.push(new_credit);
            }
        } else {
            if (expense.amount !== 0){
                const new_debt = {
                    id : expense._id,
                    date: expense.date,
                    description: expense.description,
                    category: expense.category,
                    creator: expense.creator,
                    amount: -1 * findDebt(user,expense),
                    type: "debt"
                };
                balance.push(new_debt);
            } else if (expense.amount === 0){
                const new_debt = {
                    id : expense._id,
                    date: expense.date,
                    description: expense.description,
                    category: expense.category,
                    creator: expense.creator,
                    amount: parseInt(findDebt(user,expense)),
                    type: "debt"
                };
                balance.push(new_debt);
            }
        }
    });
    let total = 0;
    balance.forEach(function(expense){
        total += parseInt(expense.amount);
    });
    balance.push({total_balance: total});
    return balance;
}

// function to check if an expense has been paid
async function hasBeenPaid(expense,this_username){
    const payments = await db.collection("expenses").find({ $and: [{ creator: this_username }, { "description": { $regex: expense._id.toString() } }] }).toArray();
    if (payments.length == 0){
        return false;
    }
    return true;
};

// function that returns the list of the debts
async function getBalanceToPay(user,expenses_list){
    let paylist = [];
    for (i=0; i< expenses_list.length; i++){
        const hasbeenpaid = await hasBeenPaid(expenses_list[i],user);
        if (!hasbeenpaid){
            paylist.push(expenses_list[i]);
        }
    }
    let balance = [];
    paylist.forEach(function(expense){
        const new_debt = {
            id : expense._id,
            date: expense.date,
            description: expense.description,
            category: expense.category,
            creator: expense.creator,
            amount: findDebt(user,expense),
            with: expense.creator,
            type: "debt"
        };
        balance.push(new_debt);
    });
    return balance;
};

module.exports = {getBalance,getBalanceId,getBalanceToPay};
