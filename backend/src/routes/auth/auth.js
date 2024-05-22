const router = require('express').Router();
const authController = require('../../controllers/authController')

router.post('/sign-in', authController.signin);
router.post('/verify-token', authController.verifyToken);

module.exports = router;