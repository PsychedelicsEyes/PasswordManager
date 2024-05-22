const router = require('express').Router();
const settingsController = require('../../controllers/dashboard/settingsController')
const checkToken = require('../../middlewares/checkToken');

router.post('/update-password', checkToken,settingsController.updatePassword);

module.exports = router;