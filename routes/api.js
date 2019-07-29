var express = require('express');
var router = express.Router();
var rp =  require('request-promise');



/* GET api listing. */
router.get('/', async (req, res) => {
    const data = await getRandom().then(getClues);
    res.send(data);
});

const getRandom = async () => {
    const options = {
        uri: `${baseApiUri}/random`,
        json: true
    };

    return await rp(options);
}

const getClues = async (req, res) => {
    const options = {
        uri: `${baseApiUri}/clues`,
        json: true
    };

    return await rp(options);
}

module.exports = router;

