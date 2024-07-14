const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/Auth');

router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            "name": "Samsung Galaxy S24 Ultra",
            "price": 130000,
        },
        {
            "name": "Apple iPhone 15 Pro Max",
            "price": 150000,
        },
        {
            "name": "Google Pixel 8 Pro",
            "price": 110000,
        },
        {
            "name": "Vivo X100 Ultra",
            "price": 98000,
        }
    ]);
});

module.exports = router;