export const rolAuthMiddleware = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({ error: "Acceso denegado: rol no autorizado" });
        }
        next();
    }
}