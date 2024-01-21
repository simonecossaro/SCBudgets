const insert_div = document.getElementById('insert_div');
const pay_div = document.getElementById('pay_div');
const expenseslist_div = document.getElementById('expenseslist_div');
const update_div = document.getElementById('update_div');

const nav_insert = document.getElementById('nav_insert');
const nav_pay = document.getElementById('nav_pay');
const logout = document.getElementById('logout');
const add_filters_button = document.getElementById('add_filters_button');
const back_home_button = document.getElementById('home_button');
const nav_home = document.getElementById('nav_home');
const nav_logo = document.getElementById('nav_logo');
const balance_line = document.getElementById('balance_line');
const debts_line = document.getElementById('debts_line');

const close_insert_button = document.getElementById('close_insert');
const close_modify_button = document.getElementById('close_modify');
const close_pay_button = document.getElementById("close_pay");
const close_filters = document.getElementById("close_filters");

const filters_list = document.getElementById("filters_list");
const insert_form = document.getElementById('insert_form');
const update_form = document.getElementById('update_form');
const expenses_list = document.getElementById('expenseslist');
const users_search = document.getElementById('users_search');
const balance_list = document.getElementById("balancelist");
const balance_with = document.getElementById("balance_with");
const paytable = document.getElementById("paytable");
const user_info_list = document.getElementById("user_info_list");
const search_expense = document.getElementById("search_expense");

nav_home.addEventListener("click", () =>{
    balance_line.style.display = "block";
    debts_line.style.display = "block";
    add_filters_button.style.display = "block";
    expenseslist_div.style.display = "block";
    insert_div.style.display = "none";
    update_div.style.display = "none";
    filters_list.style.display = "none";
    close_filters.style.display = "none";
    pay_div.style.display = "none";
    users_search.style.display = "none";
    user_info_list.style.display = "none";
});

nav_logo.addEventListener("click", () =>{
    balance_line.style.display = "block";
    debts_line.style.display = "block";
    add_filters_button.style.display = "block";
    expenseslist_div.style.display = "block";
    insert_div.style.display = "none";
    update_div.style.display = "none";
    filters_list.style.display = "none";
    close_filters.style.display = "none";
    pay_div.style.display = "none";
    users_search.style.display = "none";
    user_info_list.style.display = "none";
});

add_filters_button.addEventListener("click", () =>{
    filters_list.style.display = "block";
    close_filters.style.display = "block";
    add_filters_button.style.display = "none";
});

close_filters.addEventListener("click", () =>{
    filters_list.style.display = "none";
    add_filters_button.style.display = "block";
    close_filters.style.display = "none";
});

nav_insert.addEventListener("click", () =>{
    balance_line.style.display = "block";
    debts_line.style.display = "block";
    insert_div.style.display = "block";
    expenseslist_div.style.display = "none";
    users_search.style.display = "none";
    pay_div.style.display = "none";
    update_div.style.display = "none";
    user_info_list.style.display = "none";
});

close_insert_button.addEventListener("click", () =>{
    insert_div.style.display = "none";
    expenseslist_div.style.display = "block";
});

nav_pay.addEventListener("click", () =>{
    balance_line.style.display = "block";
    debts_line.style.display = "block";
    pay_div.style.display = "block";
    expenseslist_div.style.display = "none";
    users_search.style.display = "none";
    insert_div.style.display = "none";
    update_div.style.display = "none";
    user_info_list.style.display = "none";
});

close_pay_button.addEventListener("click", () =>{
    pay_div.style.display = "none";
    expenseslist_div.style.display = "block";
    users_search.style.display = "none";
});

back_home_button.addEventListener("click", () =>{
    users_search.style.display = "none";
    balance_line.style.display = "block";
    debts_line.style.display = "block";
    expenseslist_div.style.display = "block";
});

close_modify_button.addEventListener("click", () =>{
    update_div.style.display = "none";
    expenseslist_div.style.display = "block";
});
