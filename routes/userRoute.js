
const express = require('express');
const router = express.Router();
const userController =require('./../controllers/userController');

// Create, Find, Update, Delete
router.get('/', userController.view)
router.post('/', userController.find)
router.post('/adduser', userController.create)
router.post('/updateuser/:id', userController.update)
router.get('/:id', userController.delete)
router.get('/view/:id', userController.viewUser)


router.get('/add', userController.form)
router.get('/edit-user/:id', userController.edit)
//router.get('/delete-user/:id', userController.DelUser)




module.exports = router;