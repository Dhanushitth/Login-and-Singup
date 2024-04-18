//const express = require('express');
const { getAllUser, signup ,login} = require('../controller/user-controller'); // corrected typo

const router = require("express").Router();


router.post("/signup", signup); // corrected typo
router.post("/login", login);

module.exports = router;

