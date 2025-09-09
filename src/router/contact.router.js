const express = require('express');
const { verifytoken } = require('../middleware/auth.token');



module.exports = (logger) => {
    const router = express.Router()
    const { addContact, getContacts } = require("../controllers/contact.controller")(logger)

    router.post("/addcontact", verifytoken, addContact)
    router.get("/getcontacts", verifytoken, getContacts)

    return router
}