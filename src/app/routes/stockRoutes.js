'use strict';

var mongoose = require('mongoose');
var stockHandler = require('../controllers/stock.controller.js');
var express = require('express');

var router = express.Router();
//const Stock = require('../model/Stock.model')

router.get('/', function(req, res){
	res.send('API initialized')
});

// //get all lists
router.get('/all', stockHandler.show_all_stocks);

// //find one list by id
// router.get('/:id', todoList.get_list_by_id);

//create a new list
router.post('/add', stockHandler.save_new_stock)

// //post an item to the list
// router.post('/:id/item', todoList.save_new_item)

//delete an entire list
router.delete('/:id', stockHandler.delete_stock_by_id)

// //delete an item from the list
// router.delete('/:id/item/:itemid', todoList.delete_item_by_id)

// //edit the item
// router.put('/:id/item/:itemid', todoList.edit_item_by_id)

module.exports = router;