const authServices = require("../services/authServices");
const blancklistRepo = require("../repositories/tokenBlackRepository");
async function registrarUsuario(req, res) {
    
    try {
        // Corregido: req.body (con punto)
        const usuario = await authServices.registrarUsuario(req.body);
        // Corregido: Enviamos la respuesta JSON
        res.status(201).json({ message: "Usuario creado", data: usuario });
    } catch (error) {
        res.status(500).json({ message: error.message });   
    }
}

async function loginUsuario(req, res) {
    try {
        const token = await authServices.loginUsuario(req.body);
        res.json({ message: "Usuario logueado", data: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function logout(req, res) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: "No se proporciona token" });

    const token = authHeader.split(" ")[1];
    if (!token) return res,status(401).json({ message: "no se proporciona token" }); 
    await blancklistRepo.agregarToken(token);
    res.json({ message: "Usuario deslogueado" });
    
}

// ÚNICA EXPORTACIÓN: Ponemos ambas funciones en un solo objeto
module.exports = {
    registrarUsuario,
    loginUsuario,
    logout
};