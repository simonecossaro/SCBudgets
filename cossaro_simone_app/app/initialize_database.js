const { MongoClient } = require('mongodb');
const uri = "mongodb://mongohost";
const client = new MongoClient(uri);
let db = client.db("expenses");

// user with 0 expenses and debts
const user0 = {
    username: "bobo",
    name: "Roberto",
    surname: "Franco",
    password: "psw0",
    email: "robertofranco@gmail.com"
}
// user with several expenses
const user1 = {
    username: "mario_rossi7",
    name: "Mario",
    surname: "Rossi",
    password: "psw1",
    email: "mariorossi@gmail.com"
};
const user2 = {
    username: "luigi_bianchi",
    name: "Luigi",
    surname: "Bianchi",
    password: "psw2",
    email: "luigibianchi@gmail.it"
};
const user3 = {
    username: "dimash",
    name: "Federico",
    surname: "Dimarco",
    password: "psw3",
    email: "federicodimarco@gmail.it"
};
const user4 = {
    username: "marco_beli3",
    name: "Marco",
    surname: "Belinelli",
    password: "psw4",
    email: "marcobelinelli@gmail.it"
};
const user5 = {
    username: "stef00",
    name: "Stefano",
    surname: "Ferrari",
    password: "psw5",
    email: "stefanoferrari@libero.it"
};
const user6 = {
    username: "colombino",
    name: "Andrea",
    surname: "Colombo",
    password: "psw6",
    email: "acolombo@gmail.it"
};
const user7 = {
    username: "samu99",
    name: "Samuele",
    surname: "Longo",
    password: "psw7",
    email: "samuelelongo@outlook.com"
};
const user8 = {
    username: "alex_rinaldi",
    name: "Alex",
    surname: "Rinaldi",
    password: "psw8",
    email: "a.rinaldi@gmail.com"
};
const user9 = {
    username: "alice_fontana",
    name: "Alice",
    surname: "Fontana",
    password: "psw9",
    email: "alicefontana@gmail.it"
};
const user10 = {
    username: "sofix",
    name: "Sofia",
    surname: "Delvecchio",
    password: "psw10",
    email: "sofiadelvecchio@outlook.it"
};
const user11 = {
    username: "giulia_conti",
    name: "Giulia",
    surname: "Conti",
    password: "psw11",
    email: "gconti@gmail.it"
};
const user12 = {
    username: "barbarina",
    name: "Barbara",
    surname: "Marchetti",
    password: "psw12",
    email: "bmarchetti@gmail.com"
};
const user13 = {
    username: "nikolita",
    name: "Nicole",
    surname: "Sala",
    password: "psw13",
    email: "nicole.sala@gmail.it"
};
const user14 = {
    username: "robi_serra",
    name: "Roberta",
    surname: "Serra",
    password: "psw14",
    email: "robertaserra@gmail.com"
};
const user15 = {
    username: "valterv",
    name: "Valter",
    surname: "Villa",
    password: "psw15",
    email: "valtervilla@libero.it"
};
const user16 = {
    username: "chiaretta98",
    name: "Chiara",
    surname: "Barbieri",
    password: "psw16",
    email: "chiaraBarbieri@gmail.com"
};
const user17 = {
    username: "lollo_caruso",
    name: "Lorenzo",
    surname: "Caruso",
    password: "psw17",
    email: "lorenzo.caruso@hotmail.it"
};
const user18 = {
    username: "bianca_espo",
    name: "Bianca",
    surname: "Esposito",
    password: "psw18",
    email: "bianca_esposito@outlook.it"
};
const user19 = {
    username: "stefania_ricci",
    name: "Stefania",
    surname: "Ricci",
    password: "psw19",
    email: "stiricci@gmail.it"
};
const user20 = {
    username: "franci_mancio",
    name: "Francesca",
    surname: "Mancini",
    password: "psw20",
    email: "francesca.mancini@gmail.com"
};
const expense1 = {
    creator: "mario_rossi7",
    amount: 30,
    description: "regalo luca",
    category: "gifts",
    shared_with: "luigi_bianchi",
    quotas: "15",
    date: new Date(2023,10,1),
    user_quota : 15
};
const expense2 = {
    creator: "mario_rossi7",
    amount: 50,
    description: "regalo marco",
    category: "gifts",
    shared_with: "luigi_bianchi",
    quotas: "25",
    date: new Date(2023,11,10),
    user_quota : 25
};
const expense3 = {
    creator: "luigi_bianchi",
    amount: 40,
    description: "pranzo",
    category: "food",
    shared_with: "mario_rossi7",
    quotas: "20",
    date: new Date(2023,5,12),
    user_quota : 20
};
const expense4 = {
    creator: "colombino",
    amount: 20,
    description: "netflix",
    category: "subscriptions",
    shared_with: "mario_rossi7",
    quotas: "10",
    date: new Date(2024,0,10),
    user_quota : 10
};
const expense5 = {
    creator: "alex_rinaldi",
    amount: 20,
    description: "biglietto treno",
    category: "transports",
    shared_with: "mario_rossi7",
    quotas: "10",
    date: new Date(2024,0,11),
    user_quota : 10
};
const expense6 = {
    creator: "mario_rossi7",
    amount: 100,
    description: "spa",
    category: "holiday/wellness",
    shared_with: "stefania_ricci",
    quotas: "50",
    date: new Date(2024,0,10),
    user_quota : 50
};
const expense7 = {
    creator: "dimash",
    amount: 100,
    description: "biglietti Inter-Juve",
    category: "tickets",
    shared_with: "mario_rossi7",
    quotas: "50",
    date: new Date(2024,0,13),
    user_quota : 50
};
const expense8 = {
    creator: "valterv",
    amount: 20,
    description: "bowling",
    category: "hobby/fun",
    shared_with: "mario_rossi7",
    quotas: "10",
    date: new Date(2024,0,10),
    user_quota : 10
};
const expense9 = {
    creator: "giulia_conti",
    amount: 30,
    description: "cena",
    category: "subscriptions",
    shared_with: "mario_rossi7",
    quotas: "20",
    date: new Date(2024,0,8),
    user_quota : 10
};
const expense10 = {
    creator: "mario_rossi7",
    amount: 10,
    description: "colazione al bar",
    category: "food",
    shared_with: "giulia_conti",
    quotas: "5",
    date: new Date(2024,0,12),
    user_quota : 5
};
const expense11 = {
    creator: "mario_rossi7",
    amount: 10,
    description: "spotify",
    category: "subscriptions",
    shared_with: "giulia_conti",
    quotas: "5",
    date: new Date(2024,0,2),
    user_quota : 5
};
const expense12 = {
    creator: "luigi_bianchi",
    amount: 30,
    description: "sala giochi",
    category: "hobby/fun",
    shared_with: "mario_rossi7",
    quotas: "15",
    date: new Date(2023,2,7),
    user_quota : 15
};
const expense13 = {
    creator: "mario_rossi7",
    amount: 20,
    description: "mcdonalds",
    category: "food",
    shared_with: "giulia_conti",
    quotas: "10",
    date: new Date(2023,11,8),
    user_quota : 10
};
const expense14 = {
    creator: "sofix",
    amount: 30,
    description: "regalo alice",
    category: "gifts",
    shared_with: "barbarina",
    quotas: "15",
    date: new Date(2024,0,7),
    user_quota : 15
};
const expense15 = {
    creator: "sofix",
    amount: 100,
    description: "concerto Maneskin",
    category: "tickets",
    shared_with: "barbarina",
    quotas: "50",
    date: new Date(2023,10,10),
    user_quota : 50
};
const expense16 = {
    creator: "barbarina",
    amount: 10,
    description: "spotify",
    category: "subscriptions",
    shared_with: "sofix",
    quotas: "5",
    date: new Date(2023,9,18),
    user_quota : 5
};
const expense17 = {
    creator: "marco_beli3",
    amount: 30,
    description: "cena",
    category: "food",
    shared_with: "lollo_caruso",
    quotas: "15",
    date: new Date(2023,6,20),
    user_quota : 15
};
const expense18 = {
    creator: "marco_beli3",
    amount: 20,
    description: "netflix",
    category: "subscriptions",
    shared_with: "robi_serra",
    quotas: "10",
    date: new Date(2024,0,2),
    user_quota : 10
};
const expense19 = {
    creator: "mario_rossi7",
    amount: 16,
    description: "cinema",
    category: "tickets",
    shared_with: "giulia_conti",
    quotas: "6",
    date: new Date(2024,0,10),
    user_quota : 10
};
const expense20 = {
    creator: "bianca_espo",
    amount: 24,
    description: "cinema e popcorn",
    category: "tickets",
    shared_with: "nikolita",
    quotas: "12",
    date: new Date(2024,0,6),
    user_quota : 12
};
const expense21 = {
    creator: "mario_rossi7",
    amount: 40,
    description: "libro Analisi",
    category: "work/study",
    shared_with: "giulia_conti",
    quotas: "20",
    date: new Date(2023,9,2),
    user_quota : 20
};
const expense22 = {
    creator: "chiaretta98",
    amount: 10,
    description: "aperitivo",
    category: "food",
    shared_with: "franci_mancio",
    quotas: "5",
    date: new Date(2023,11,10),
    user_quota : 5
};
const expense23 = {
    creator: "alice_fontana",
    amount: 60,
    description: "massaggio",
    category: "holiday/wellness",
    shared_with: "giulia_conti",
    quotas: "30",
    date: new Date(2023,11,1),
    user_quota : 30
};
const expense24 = {
    creator: "mario_rossi7",
    amount: 20,
    description: "birre",
    category: "food",
    shared_with: "valterv",
    quotas: "5",
    date: new Date(2023,11,10),
    user_quota : 15
};
const expense25 = {
    creator: "mario_rossi7",
    amount: 30,
    description: "spese capodanno",
    category: "other",
    shared_with: "luigi_bianchi",
    quotas: "15",
    date: new Date(2024,0,1),
    user_quota : 15
};
const expense26 = {
    creator: "luigi_bianchi",
    amount: 20,
    description: "calcetto",
    category: "hobby/fun",
    shared_with: "dimash",
    quotas: "10",
    date: new Date(2023,6,7),
    user_quota : 10
};
const expense27 = {
    creator: "dimash",
    amount: 60,
    description: "biglietti Coppa Italia",
    category: "tickets",
    shared_with: "luigi_bianchi,mario_rossi7",
    quotas: "20,20",
    date: new Date(2023,11,10),
    user_quota : 20
};
const expense28 = {
    creator: "mario_rossi7",
    amount: 45,
    description: "pranzo",
    category: "food",
    shared_with: "giulia_conti,alice_fontana",
    quotas: "15,15",
    date: new Date(2024,0,15),
    user_quota : 15
};
const expense29 = {
    creator: "mario_rossi7",
    amount: 400,
    description: "hotel barcellona",
    category: "holiday/wellness",
    shared_with: "giulia_conti,luigi_bianchi,alice_fontana",
    quotas: "100,100,100",
    date: new Date(2023,6,10),
    user_quota : 100
};
const expense30 = {
    creator: "alice_fontana",
    amount: 120,
    description: "concerto Taylor Swift",
    category: "tickets",
    shared_with: "giulia_conti",
    quotas: "60",
    date: new Date(2023,10,10),
    user_quota : 60
};
const expense31 = {
    creator: "giulia_conti",
    amount: 40,
    description: "bowling",
    category: "hobby/fun",
    shared_with: "mario_rossi7,luigi_bianchi,alice_fontana",
    quotas: "10,10,10",
    date: new Date(2023,8,14),
    user_quota : 10
};

async function removeOldExpenses(){
    await db.collection("expenses").deleteMany({"creator":{$regex:''}});
}

async function removeOldUsers(){
    await db.collection("users").deleteMany({"username":{$regex:''}});
}

async function addUserToDb(new_user){
    await db.collection("users").insertOne(new_user);
}

async function addExpenseToDb(new_expense){
    await db.collection("expenses").insertOne(new_expense);
}

async function initializeExpenses(){
    await removeOldExpenses();
    const new_expenses = [expense1,expense2,expense3,expense4,expense5,expense6,expense7,expense8,expense9,expense10,
        expense11,expense12,expense13,expense14,expense15,expense16,expense17,expense18,expense19,expense20,expense21,
        expense22,expense23,expense24,expense25,expense26,expense27,expense28,expense29,expense30,expense31];
    new_expenses.forEach(function(expense){
        addExpenseToDb(expense);
    });
}

async function initializeUsers(){
    await removeOldUsers();
    const new_users = [user0,user1,user2,user3,user4,user5,user6,user7,user8,user9,user10,user11,user12,user13,user14,user15,user16,user17,user18,user19,user20];
    new_users.forEach(function(user){
        addUserToDb(user);
    });
}

async function initializeDatabase(){
    await initializeUsers();
    await initializeExpenses();
};

module.exports = {initializeDatabase};



