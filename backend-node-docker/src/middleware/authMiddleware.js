const jwt = require("jsonwebtoken");
const blacklistRepo = require("../repositories/tokenBlackRepository"); // Verifica que el archivo se llame así
const secret_key = process.env.JWT_SECRET;

async function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: "No se proporciona token" });

    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).json({message: "Token modificado o mal formado"});

    try {
        // CORRECCIÓN AQUÍ: Usamos 'estaRevocado' que es el nombre real en tu repo
        const revocado = await blacklistRepo.estaRevocado(token);
        
        if(revocado) {
            return res.status(401).json({message: "Token revocado. Inicie sesión nuevamente."});
        }

        const decoded = jwt.verify(token, secret_key);
        req.usuario = decoded; 
        next();
    } catch (error) {
        // Es mejor capturar el error de JWT específicamente
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
}

module.exports = {
    verificarToken
};