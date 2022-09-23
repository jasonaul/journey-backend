const express = require("express")
const router = express.Router()

const ctrls = require('../controllers')

 
router.get("/", ctrls.events.index)
router.post("/", ctrls.events.create)
router.delete('/:id', ctrls.events.destroy)
router.put('/:id', ctrls.events.update)

module.exports = router;