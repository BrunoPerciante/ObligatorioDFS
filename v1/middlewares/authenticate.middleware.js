import jwt from "jsonwebtoken";

export const authenticateMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No se proporcionó un token de autenticación" });
    }
    const token = authHeader.split(" ")[1];
    if(!token) {
        return res.status(401).json({ message: "Token de autenticación no válido" });
    }

    // el err o decoded me los da la copnst token de auth controller cuando hago el jwt.sign, si el token es válido, decoded tendrá la información del payload (en este caso el username), si no es válido, err tendrá el error correspondiente
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token de autenticación inválido" });
        }
        req.decoded = decoded;
        next();
    });
}