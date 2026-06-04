export const validateBodyMiddleware = schema => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ message: "Error en validación", errors: error.details });
    }
    //req.body = value;
    req.validatedBody = value;
    next();
}
