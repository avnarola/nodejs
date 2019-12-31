const express = require('express');
const { registration,
  authenticate,
  getSingleUser,
  sendMail,
  getData,
  updateUser,
  deleteUser
} = require('./users.controller');
const router = express.Router();
router.post('/registration', registration);
router.post('/authenticate', authenticate);
router.get('/user/:id', getSingleUser);
router.post('/sendMail', sendMail);
router.get('/getData', getData);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
module.exports = router;
