import jwt from "jsonwebtoken";

function verifyToken (req, res, next) {
    const token = req.headers["authorization"];
    if(!token){
        return res.status(401).json({
            auth:false,
            message: "No token provided"
        });
    }
    const bearer = token.split(" ");
    const tokenBearer = bearer[1];
    const decoded = jwt.verify(tokenBearer, "MySecretDomentos");
        req.userId = decoded.id;
        next();
    }

export default verifyToken;