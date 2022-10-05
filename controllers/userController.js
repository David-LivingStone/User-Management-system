//const express = require(express);
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 100,
    host            : "localhost",
    user            : "root",
    password        : '',
    database        : "user_manager"
});

//View Users
exports.view = (req, res) => {
    pool.getConnection((err, connection) =>{
        if (err) throw err; //not connected
        console.log('connected as ID' + connection.threadId);

        //Use the connection
        connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
            //when done with the querry, release it.
            connection.release();

            if (!err){
                //let removedUser = req.query.removed;
                res.render('home', {rows});
            }
            else {
                console.log (err);            
            }
            //console.log('The data from user table: \n', rows);
        });
    });
    
}

//Find user ny search

exports.find = (req, res) => {
    pool.getConnection((err, connection) =>{
        if (err) throw err; //not connected
        console.log('connected as ID' + connection.threadId);
        

        let searchTerm = req.body.search;
        //Use the connection
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
            //when done with the querry, release it.
            connection.release();

            if (!err){
                res.render('home', {rows});
            }
            else {
                console.log (err);            
            }
            //console.log('The data from user table: \n', rows);
        });
    });
}

//Add new user
exports.form = (err, res) => {
    res.render('add-user');
}

exports.deleteform=(err,res) => {
    res.render('delete-user')
}

exports.create= (req, res) => {
    const {first_name, last_name, email, phone, comments} = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log ('Connected as ID' + connection.threadId);
        let searchTerm = req.body.search;

        connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', 
        [first_name,last_name, email, phone,comments], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('add-user', {alert: 'User added successfully!'});

            }
            else {
                console.log(err);
            }
        });
    });
}

exports.edit = (req, res ) => {
    pool.getConnection((err, connection) =>{
        if (err) throw err; //not connected
        console.log('connected as ID' + connection.threadId);

        //Use the connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with the querry, release it.
            connection.release();

            if (!err){
                res.render('edit-user', {rows});
            }
            else {
                console.log (err);            
            }
            //console.log('The data from user table: \n', rows);
        });
    });

}

exports.update = (req, res) => {
    const {first_name, last_name, email, phone, comments} = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log ('Connected as ID' + connection.threadId);
        let searchTerm = req.body.search;

        connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', 
        [first_name,last_name, email, phone, comments, req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                pool.getConnection((err, connection) =>{
                    if (err) throw err; //not connected
                    console.log('connected as ID' + connection.threadId);
            
                    //Use the connection
                    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
                        //when done with the querry, release it.
                        connection.release();
            
                        if (!err){
                            res.render('edit-user', {rows, alert: `${first_name} has been updated`});
                        }
                        else {
                            console.log (err);            
                        }
                        //console.log('The data from user table: \n', rows);
                    });
                });
            
                

            }
            else {
                console.log(err);
            }
        });
    });

}
exports.delete =(req, res)=> {
    pool.getConnection((err, connection) =>{
        if (err) throw err; //not connected
        console.log('connected as ID' + connection.threadId);

        //Use the connection
        connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with the querry, release it.
            connection.release();

            if (!err){
                res.redirect('/');
            }
            else {
                console.log (err);            
            }
            //console.log('The data from user table: \n', rows);
        });
    });
}

// exports.delete =(req, res)=> {
//     pool.getConnection((err, connection) =>{
//     if (err) throw err; //not connected
//     console.log('connected as ID' + connection.threadId);
    

//     connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
//     //when done with the querry, release it.
//     connection.release();

//             if (!err){
//                // let removedUser = encodeURIComponent('User Successfully Removed.');
//                 res.redirect('/');
//             }
//             else {
//                 console.log (err);            
//             }
//             //console.log('The data from user table: \n', rows);
//      });
// });
// }

exports.viewUser = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('view-user', {rows});
            }
            else{
                console.log(err);
            }
        });
    });
}


exports.DelUser = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release();
            if (!err) {
                res.render('delete-user', {rows});
            }
            else{
                console.log(err);
            }
        });
    });
}
