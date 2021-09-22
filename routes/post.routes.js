const express = require('express');
const router = express.Router();



router.get('/', (req, res, next)=>{
    console.log(req.query);
});
router.get('/:name', (req, res, name)=>{
    console.log(req.params);
});



module.exports = router;