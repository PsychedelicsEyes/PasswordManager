const router = require('express').Router();
const passwordController = require('../../controllers/dashboard/passwordController');
const checkToken = require('../../middlewares/checkToken');

router.post('/add', checkToken, passwordController.addPassword);
router.get('/fetchAll', checkToken, passwordController.getPasswords);
router.put('/update/:id', checkToken, passwordController.updatePassword);
router.delete('/delete/:id', checkToken, passwordController.deletePassword);

module.exports = router;