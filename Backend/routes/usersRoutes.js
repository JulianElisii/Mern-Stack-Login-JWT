const express = require("express");
const { singup, singin } = require("../controllers/controllersUser");
const router = express.Router();

router.post('/singup', singup);
router.post('/singin', singin);





module.exports = router