const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const logger = require("./../config/logger").logger;

const publicKeyPath = path.join(__dirname, './../keys/public.key');

// key imports
const publicKEY = fs.readFileSync(publicKeyPath, "utf-8")

// token signing options
const tokenOptions = require("./../config/tokenOptions");


module.exports = {
    verification: async function (passedToken) {
        return new Promise(function (resolve, reject) {
            jwt.verify(passedToken, publicKEY, tokenOptions.verifyOptions, function (err, decodedToken) {
                if (err) {
                    logger.error(`Failed to validate token ${err}`);
                    resolve(false);
                } else {
                    logger.info(`Decoded a token ${decodedToken}`);
                    resolve(decodedToken);
                }
            })
        })
    }
}