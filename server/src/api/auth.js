import express from 'express';
import jwt from 'jsonwebtoken';

import { create_user, verify_password, change_password } from '../lib/auth.js';

/**
 * Middleware to verify user token and set res.locals.token_data if token is valid
 * @example
 * app.use(verify_token);
 * @example
 * app.get('/route', verify_token, () => {...});
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const verify_token = (req, res, next) => {
    res.locals.token_data = null;

    try {
        if (typeof req.headers['authorization'] === 'string') {
            const token = req.headers['authorization'].split(' ')[1];
            const data = jwt.verify(token, process.env.TOKEN_KEY);

            res.locals.token_data = data;
        }
    } catch (error) {
        // console.log('Invalid Token:', error.name);
    }

    next();
};

/**
 * Middleware which responds with error when user is not logged in
 * @example
 * app.get('/route_where_login_is_required', verify_token, login_required, () => {...});
 * @example
 * app.use(verify_token);
 * app.get('/route_where_login_is_required', login_required, () => {...});
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const login_required = (req, res, next) => {
    if (res.locals.token_data === null) {
        res.status(401).send({ status: 'Failed', reason: 'Invalid token' });
    } else {
        next();
    }
};

/**
 * Middleware that verifies username and password \
 * Sends a token if verified \
 * Sends response with error if token is not recieved or is invalid
 * @param {express.Request} req
 * @param {express.Response} res
 */
const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // console.log('login', { username, password });

    if (await verify_password(username, password)) {
        const token = jwt.sign(
            {
                username,
            },
            process.env.TOKEN_KEY,
            { expiresIn: '30d' }
        );
        // res.setHeader('Authorization', `Bearer ${token}`);
        // res.setHeader('Access-Control-Expose-Headers', 'Authorization');
        res.send({ status: 'Success', token });
    } else {
        res.status(401).send({ status: 'Failed', reason: 'Invalid username or password' });
    }
};

/**
 * Middleware to create new user \
 * Sends response with confirmation if user created \
 * Sends response with error if user could not be created
 * @param {express.Request} req
 * @param {express.Response} res
 */
const signup = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // console.log('signup', { username, password });

    try {
        await create_user(username, password);
        res.send({ status: 'Success' });
    } catch (err) {
        res.status(400).send({
            status: 'Failed',
            reason: err.message,
        });
    }
};

const edit_password = async (req, res) => {
    const username = res.locals.token_data.username;
    const password = req.body.password;

    try {
        await change_password(username, password);
        res.send({ status: 'Success' });
    } catch (err) {
        res.status(400).send({
            status: 'Failed',
            reason: err.message,
        });
    }
};

export { login, signup, verify_token, login_required, edit_password };
