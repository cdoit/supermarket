﻿var express = require('express');
var login = require('./login');
var router = express.Router();
const db = require("../../db/");

router.get('login', function (req, res, next) {

    res.render('wx/views/manager/login.ejs');
});
//登陆
router.post('login/index', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    db.AdminInfo.findOne({
        where: {
            adminname: username,
            password: password
        }
    }).then(function (result) {
        if (result != null) {
            req.session.admin = result;
            res.redirect("wx/views/manager/order");
        } else {
            res.render('wx/views/manager/login');
        }
    });
});

//访问管理页面
router.get('/wx', login.checkin, function (req, res, next) {

    db.User.findAll().then(function (result) {

        res.render('wx/views/manager/index.ejs', { users: result});
    });
})

router.get('/wx/user', login.checkin, function (req, res, next) {

    db.User.findAll().then(function (result) {

        res.render('wx/views/manager/user.ejs', { users: result });
    });
})

router.get('/role', login.checkin, function (req, res, next) {

    db.Role.findAll().then(function (result) {

        res.render('manager/role.ejs', { roles: result });
    });
})

router.get('/project', login.checkin, function (req, res, next) {

    db.Project.findAll().then(function (result) {

        res.render('manager/project.ejs', { projects: result });
    });
})

router.get('/order', login.checkin, function (req, res, next) {
    
        // db.Order.findAll().then(function (result) {
    
        //     res.render('manager/order.ejs', { order: result });
        // });
        db.Sequelize.query("SELECT o.*,p.`name`,a.adminname from `order` as o LEFT JOIN product as p ON o.product_id = p.id LEFT JOIN admininfo as a ON a.id = o.adminInfo_id").then(function (result) {
            res.render('manager/order.ejs', { order: result[0] });
        });
    })
module.exports = router;