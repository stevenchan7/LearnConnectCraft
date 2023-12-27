const { Router } = require('express');
const { signIn, signUp, signOut } = require('../controllers/auth.controller');
const { checkDupliacateEmail } = require('../middlewares/auth.middleware');

const router = Router();

router.post('/register', checkDupliacateEmail, signUp);

router.post('/login', signIn);

router.post('/logout', signOut);

module.exports = router;
