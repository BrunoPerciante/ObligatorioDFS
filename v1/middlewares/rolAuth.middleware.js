export const rolAuthMiddleware = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.usuario.role)) {
            return res.status(403).json({ error: "Acceso denegado: rol no autorizado" });
        }
        next();
    }
}