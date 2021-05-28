const express = require("express");
const router = express.Router();
const { signUp, createSchedule, getSchedule, createRestrictions, getRestrictions } = require("../controllers/index");


const verifyUsername =(req, res, next) => {
    if(!req.body.username) {
        return res.status(401).json({err:"username is required"})
    }else{
        next()
    }
}

router.post('/signup',verifyUsername, signUp)
router.post('/collection', verifyUsername, createSchedule)
router.post('/restrict', verifyUsername, createRestrictions)

router.get('/schedule', verifyUsername, getSchedule)
router.get('/restrict', verifyUsername, getRestrictions)

router.put('/restrict', verifyUsername, createRestrictions)


module.exports = router;
