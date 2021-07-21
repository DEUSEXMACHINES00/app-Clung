'use strict'
var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/product');
const jwt = require('jsonwebtoken');

var multipart= require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});


router.get('/product/:id',ProductController.getProduct);
router.get('/products/',ProductController.getProducts);
router.post('/save-product',ProductController.saveProduct);
router.put('/product/:id',ProductController.updateProduct);
router.delete('/product/:id',ProductController.deleteProduct);
router.post('/upload-image/:id',multipartMiddleware,ProductController.uploadImage);
router.get('/get-image/:image',ProductController.getImageFile);

module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorization) return res.status(401).send({message :"anUnthorize request"});
    const token = req.headers.authorization.split(' ')[1];        
    if( token == 'null') return res.status(401).send({message :"anUnthorize request"});    
    const verifiedToken = jwt.verify(token, "cañondecerdo");
    req.userId = verifiedToken._id;
    next();
}

