const CognitoExpress = require('cognito-express');

const cognitoExpress = new CognitoExpress ({
    region: process.env.AWS_DEFAULT_REGION,
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUser: "access",
    tokenExpiration: 3600
});

exports.validateAuth = (req, res, next => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        const token = req.headers.authorization.split(' ')[1]
        cognitoExpress.validate(token, (err) => {
            if (err) {
                res.status(401).json ({
                    error: err
                })
            } else {
                next()
            }
        })
    } else {
        res.status(401).json ({
            error: err
        })
    }
})