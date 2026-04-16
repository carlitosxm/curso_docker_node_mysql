const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");

const saltRounds = 10;
const secret_key = process.env.JWT_SECRET || "mi_clave_ultrasecreta";

async function registrarUsuario(data) {
    const userExiste = await userRepository.obtenerPorEmail(data.email);
    if (userExiste) throw new Error("El usuario ya existe");

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return await userRepository.crearUser({
        email: data.email,
        password: hashedPassword,
        // Lógica: Si data.rol tiene valor (admin), úsalo. 
        // Si viene vacío o undefined, usa "usuario".
        rol: data.rol || "usuario" 
    });
}

async function loginUsuario(data) {
    const usuario = await userRepository.obtenerPorEmail(data.email);
    if (!usuario) throw new Error("Usuario no encontrado");

    const passwordCorrecto = await bcrypt.compare(data.password, usuario.password);
    if (!passwordCorrecto) throw new Error("Contraseña incorrecta");

    const payload = { userId: usuario.id, email: usuario.email, rol: usuario.rol };
    return jwt.sign(payload, secret_key, { expiresIn: "1h" });
}



module.exports = { registrarUsuario, loginUsuario };