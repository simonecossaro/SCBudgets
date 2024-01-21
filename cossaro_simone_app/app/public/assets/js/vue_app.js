const { createApp } = Vue;

const app = createApp({
    data() {return {
      user: null,
      username: '',
      balance: 0,
      number_of_debts: 0,
      //expenseslist
      expenses:[],
      curPage: 1,
      pageSize: 10,
      //search in expenses
      year_find: null,
      month_find: null,
      category_find: null,
      search_expense: null,
      //insert_form
      creator: '',
      amount: 0,
      description: '',
      category: '',
      shared_with: '',
      quotas: null,
      date: new Date(),
      user_quota: null,
      //update_form
      id_modify: '',
      amount_modify: 0,
      description_modify: '',
      category_modify: '',
      shared_with_modify: '',
      user_quota_modify: '',
      quotas_modify: '',
      date_modify: new Date(),
      //balancelist
      other_username: '',
      balance_with_other_user: 0,
      expenses_with_other_user:[],
      //paylist
      paylist: []
    }},
    methods: {
      getWhoIs: async function() {
        const response = await fetch("/api/budget/whoami");
        const res = await response.json();
        this.user = res;
        this.username = res.username;
      },
      getBalance: async function(){
        const response = await fetch("/api/balance");
        const resp_balance = await response.json();
        this.balance = resp_balance[resp_balance.length-1].total_balance;
        this.expenses = resp_balance.slice(0,-1);
      },
      getPaylist: async function(){
        const response = await fetch("/api/pay");
        this.paylist = await response.json();
        this.number_of_debts = this.paylist.length;
      },
      getBalanceWith: async function(){
        const response = await fetch("/api/balance/"+this.other_username);
        const resp_balance = await response.json();
        this.balance_with_other_user = resp_balance[resp_balance.length-1].total_balance;
        this.expenses_with_other_user = resp_balance.slice(0,-1);
      },
      addExpense: async function() {
        this.shared_with = document.getElementById('shared_with').value;
        // if quotas not specified, user quota = total amount
        if (!this.user_quota && !this.quotas){
          this.user_quota = this.amount;
          await this.initializeQuotas();
        }
        const expense = {
            amount: this.amount,
            description: this.description,
            category: this.category,
            shared_with: this.shared_with,
            quotas: this.quotas,
            date: this.date,
            user_quota: this.user_quota
        };
        let year = {$year:expense.date};
        let month = {$month:expense.date};
        const response = await fetch("/api/budget/"+year+"/"+month, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(expense) 
        });
        const res = await response.json();
        if (res.msg === "Expense entered"){
          appendAlert(res.msg,'success',document.getElementById('expense_entered_alert'));
        } else{
          appendAlert(res.msg,'danger',document.getElementById('expense_entered_alert'));
        }
        await this.getBalance();
        this.renderTable();
      },
      modifyExpense: async function() {
        this.shared_with_modify = document.getElementById('shared_with_modify').value;
        const expense = {
            id: this.id_modify,
            amount: this.amount_modify,
            description: this.description_modify,
            category: this.category_modify,
            shared_with: this.shared_with_modify,
            user_quota: this.user_quota_modify,
            quotas: this.quotas_modify,
            date: this.date_modify
        };
        let year = {$year:expense.date};
        let month = {$month:expense.date};
        const response = await fetch("/api/budget/"+year+"/"+month+"/"+expense.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(expense) 
        });
        const res = await response.json();
        if (res.msg === "Expense modified"){
          appendAlert(res.msg,'success',document.getElementById('expense_modified_alert'));
        } else{
          appendAlert(res.msg,'danger',document.getElementById('expense_modified_alert'));
        }
        await this.getBalance();
        this.renderTable();
      },
      removeExpense: async function(idd) {
        const response = await fetch("/api/budget/2024/01/"+idd, {
          method: 'DELETE'
        });
        const res = await response.json();
        await this.getBalance();
        await this.getPaylist();
        this.renderTable();
        appendAlert(res.msg,'danger',document.getElementById('expense_deleted_alert'));
      },
      payExpense: async function(expense_to_pay) {
        let paydebt_expense = {
            amount: 0,
            date: new Date(),
            description: "payment debt of: " + expense_to_pay.id,
            category: expense_to_pay.category,
            shared_with: expense_to_pay.creator,
            quotas: (-1*expense_to_pay.amount).toString(),
            user_quota: expense_to_pay.amount
        };
        const response = await fetch("/api/budget/2024/01", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paydebt_expense) 
        });
        const res = await response.json();
        await this.getPaylist();
        await this.getBalance();
        this.renderTable();
        if (res.msg === "Expense entered"){
          appendAlert("Expense paid",'success',document.getElementById('expense_paid_alert'));
        } else{
          appendAlert("Error during payment",'danger',document.getElementById('expense_paid_alert'));
        }
      },
      filterExpenses: async function(){
        let optional_query = "";
        if (this.category_find){
          optional_query += ",{\"category\":\""+this.category_find+"\"}";
        }
        if (this.search_expense){
          optional_query += ",{\"$or\":[{\"creator\":{\"$regex\":\""+this.search_expense+"\"}},{\"shared_with\":{\"$regex\":\""+this.search_expense+"\"}},"+
          "{\"description\":{\"$regex\":\""+this.search_expense+"\"}},{\"category\":{\"$regex\":\""+this.search_expense+"\"}}]}";
        }
        let query = "{\"$and\":[{\"$or\":[{\"creator\":\""+this.username+"\"},{\"shared_with\":\""+this.username+"\"},"+
        "{\"shared_with\":{\"$regex\":\","+this.username+",\"}},{\"shared_with\":{\"$regex\":\"^"+this.username+",\"}},"+
        "{\"shared_with\":{\"$regex\":\","+this.username+"$\"}}]}"+optional_query+"]}";
        let response;
        if (this.month_find && !this.year_find){
          appendAlert("You must specify the year for search by month",'danger',document.getElementById('noyear_alert'));
        } else if (this.year_find && this.month_find){
          response = await fetch("/api/budget/"+this.year_find.toString()+"/"+this.month_find.toString()+"/search?q="+query);
        } else if (this.year_find && !this.month_find){
          response = await fetch("/api/budget/"+this.year_find.toString()+"/search?q="+query);
        } else {
          response = await fetch("/api/budget/search?q="+query);
        }
        const res = await response.json();
        this.expenses = res;
      },
      findDebt: function(user,expense){
        let users = expense.shared_with.split(',');
        let quotas = expense.quotas.split(',');
        let index;
        for (i =0; i<users.length; i++){
            if (users[i] === user){
                index = i;
            }
        }
        return parseInt(quotas[index]);
      },
      prepareModify: function(expense){
        this.id_modify = expense.id;
        this.amount_modify = expense.global_amount;
        this.description_modify = expense.description;
        this.category_modify = expense.category;
        this.shared_with_modify = expense.shared_with;
        this.user_quota_modify = parseInt(expense.user_quota);
        this.quotas_modify = expense.quotas;
        this.date_modify = new Date(expense.date);
        document.getElementById("update_div").style.display = "block";
        document.getElementById("expenseslist_div").style.display = "none";
        document.getElementById("users_search").style.display = "none";
      },
      resetInsertForm: function(){
        document.getElementById('insert_form').reset();
        this.amount = null;
        this.description = null;
        this.quotas = null;
        this.user_quota = null; 
        this.date = null;
        this.shared_with = '';
      },
      loadBalanceList: async function(){
        this.other_username = document.getElementById("user_search_input").value;
        await this.getBalanceWith();
        document.getElementById("users_search").style.display = "block";
        document.getElementById("expenseslist_div").style.display = "none";
        document.getElementById("balance_line").style.display = "none";
        document.getElementById("debts_line").style.display = "none";
        document.getElementById("insert_div").style.display = "none";
        document.getElementById("update_div").style.display = "none";
        document.getElementById("filters_list").style.dispaly = "none";
        document.getElementById("close_filters").style.display = "none";
        document.getElementById("pay_div").style.display = "none";
        document.getElementById("user_info_list").style.display = "none";
      },
      loadUserInfo: async function(){
        let html_list = document.getElementById("user_info_list");
        document.getElementById("expenseslist_div").style.display = "none";
        document.getElementById("balance_line").style.display = "none";
        document.getElementById("debts_line").style.display = "none";
        document.getElementById("insert_div").style.display = "none";
        document.getElementById("update_div").style.display = "none";
        document.getElementById("filters_list").style.dispaly = "none";
        document.getElementById("close_filters").style.display = "none";
        document.getElementById("pay_div").style.display = "none";
        document.getElementById("users_search").style.display = "none";
        html_list.style.display = "block";
        html_list.innerHTML = "<li class=\"list-group-item\">Username: <span id=\"user_info_span\">"+this.user.username+"</span></li>"+
        "<li class=\"list-group-item\">Name: <span id=\"user_info_span\">"+this.user.name+"</li>"+
        "<li class=\"list-group-item\">Surname: <span id=\"user_info_span\">"+this.user.surname+"</li>"+
        "<li class=\"list-group-item\">Email: <span id=\"user_info_span\">"+this.user.email+"</li>";
      },
      previousPage: function () {
        if(this.curPage > 1) this.curPage--;
        this.renderTable();
      },
      nextPage: function () {
        if((this.curPage * this.pageSize) < this.expenses.length) this.curPage++;
        this.renderTable();
      },
      renderTable: function() {
        if(this.curPage == 1){
          document.querySelector('#prevButton').disabled = true;
        } else{
          document.querySelector('#prevButton').disabled = false;
        }
        if((this.curPage * this.pageSize) > this.expenses.length){
          document.querySelector('#nextButton').disabled = true;
        } else{
          document.querySelector('#nextButton').disabled = false;
        }
        let tds = document.querySelectorAll("#expenseslist_row");
        let start = (this.curPage-1)*this.pageSize;
        let end =this.curPage*this.pageSize;
        let index = 0;
        tds.forEach(r => {
          if (index >= start && index < end){
            r.style.display= "table-row";
          } else{
            r.style.display= "none";
          }
          index +=1;
        });
        if (this.expenses.length >0){
          document.getElementById("pagination_div").style.display = "block";
        } else{
          this.hidePagination();
        }
      },
      resetFilterExpenses: async function(){
        this.search_expense = '';
        await this.getBalance();
        this.renderTable();
        document.getElementById("pagination_div").style.display = "block";
      },
      hidePagination: function(){
        document.getElementById("pagination_div").style.display = "none";
      },
      initializeQuotas: async function(){
        let quotas = "";
        let users_list = await this.shared_with.split(',');
        for(i=0; i<users_list.length; i++){
          if (i === (users_list.length-1)){
            quotas += "0";
          } else{
            quotas += "0,";
          }
        }
        this.quotas = quotas;
      }
    },
    mounted: async function(){
        await this.getWhoIs();
        await this.getBalance();
        await this.getPaylist();
        this.renderTable();
    }
});

app.mount('#app');

