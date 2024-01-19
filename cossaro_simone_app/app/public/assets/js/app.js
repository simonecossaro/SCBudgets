let insert_div = document.getElementById('insert_div');
let pay_div = document.getElementById('pay_div');
let expenseslist_div = document.getElementById('expenseslist_div');
let update_div = document.getElementById('update_div');

let nav_insert = document.getElementById('nav_insert');
let nav_pay = document.getElementById('nav_pay');
let logout = document.getElementById('logout');
let add_filters_button = document.getElementById('add_filters_button');
let back_home_button = document.getElementById('home_button');
let nav_home = document.getElementById('nav_home');
let nav_logo = document.getElementById('nav_logo');
let balance_line = document.getElementById('balance_line');
let debts_line = document.getElementById('debts_line');

let close_insert_button = document.getElementById('close_insert');
let close_modify_button = document.getElementById('close_modify');
let close_pay_button = document.getElementById("close_pay");
let close_filters = document.getElementById("close_filters");

let filters_list = document.getElementById("filters_list");
let insert_form = document.getElementById('insert_form');
let update_form = document.getElementById('update_form');
let expenses_list = document.getElementById('expenseslist');
let users_search = document.getElementById('users_search');
let balance_list = document.getElementById("balancelist");
let balance_with = document.getElementById("balance_with");
let paytable = document.getElementById("paytable");
let user_info_list = document.getElementById("user_info_list");
let search_expense = document.getElementById("search_expense");

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