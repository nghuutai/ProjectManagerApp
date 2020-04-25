const express = require('express');
const router = express.Router();
const { getMembers, addMember, deleteMember, updateMember} = require('../controllers/member');

router
    .route('/')
    .get(getMembers)
    .post(addMember);

router
    .route('/:id')
    .delete(deleteMember)
    .put(updateMember);    
module.exports = router;