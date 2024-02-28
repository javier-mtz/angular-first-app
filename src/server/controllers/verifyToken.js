import jwt from "jsonwebtoken";
import secret from "../Config.js";

function verifyToken (req, res, next) {
    const token = req.headers["x-access-token"];
    if(!token){
        return res.status(401).json({
            auth:false,
            message: "No token provided"
        });
    }
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.id;
    next();
}

export default verifyToken;