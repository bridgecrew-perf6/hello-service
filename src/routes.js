const logger = require("./config/logger").logger;
const validateJWT = require("./controllers/leanJwtValidate").verification;
const tokenExtractor = require("./controllers/tokenExtractor");
module.exports = function (app) {
    app.get('/', async function (req, res) {
        // COMPLETE ROUTE. V1.
        res.send('Hello from the other side!');
    });
    app.get('/protected', async function(req, res) {
        // to just check if you can access like JWT pages.
        let token = await tokenExtractor(req.headers.authorization);
        if (token !== false) {
            logger.info(`${token}`)
            let response = await validateJWT(token);
            if (response !== false) {
                res.status(200).send(`Hello from the other side ${response["username"]}`)
            } else {
                res.status(403).json({"message": response})
            }
        }
        else {
            res.status(403).json({"message": "Failed Extraction"})
        }
    })
    return app;
}