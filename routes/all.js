var express = require('express'),
    router = express.Router();

router.use(App.require('/middlewares/successHandler_logger'));


router.use('/start', App.require('/routes/start/start'));
router.use('/login', App.require('/routes/login/login'));


router.all('*', App.require('/middlewares/404'));
router.use(App.require('/middlewares/errorHandeling'));


module.exports = router