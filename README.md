# $CBudgets

A web application for managing family budgets has been developed in this repository.

The application allows a registered user to upload expenses, share these expenses with other users in parts that are not necessarily equal and see the balance between credits and debts.

The main functions of this application include: viewing personal balance, viewing personal balance with respect to another user, creating an expense, viewing expenses, searching for expenses across multiple fields and searching for users.

The application was developed through the implementation of a REST interface.

A user with debts can pay them in a special section of the web page. The payment of a debt involves the automatic creation of an expense with a total cost of 0, the money transferred by the user with a positive sign and the money received from the other user with a negative sign.

For a working demo it is possible to log in the application using the credentials entered in the file [initialize_database.js](https://github.com/simonecossaro/SCBudgets/blob/main/cossaro_simone_app/app/initialize_database.js).
