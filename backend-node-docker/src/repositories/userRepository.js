const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function crearUser(data) {
    // Asegúrate si es 'user' o 'usuario' según tu schema.prisma
    // Suponiendo que es 'user':
    return await prisma.usuario.create({ data });
}

async function obtenerPorEmail(email) {
    // CAMBIADO: 'usuario' por 'user' para que coincida con la función de arriba
    return await prisma.usuario.findUnique({
        where: { email }
    });
}

module.exports = {
    crearUser, // Este es el nombre que debes usar en authServices.js
    obtenerPorEmail
};