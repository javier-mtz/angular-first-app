import {to} from 'await-to-js';

export default function controllerHandler(controllerAction) {
    return async (req, res, next) => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            userId: req.userId,
            headers: {
                authorization : req.headers.authorization
            }
        };
        const [err, result] = await to(controllerAction(httpRequest));

        if (err) return next(err);
        
        res.json(result);
    };
};