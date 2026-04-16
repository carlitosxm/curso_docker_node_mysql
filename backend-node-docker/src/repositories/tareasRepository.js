const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getTareas(usuarioId) {
    return await prisma.tarea.findMany({
        where: { usuarioId: Number(usuarioId) }
    });
}

async function createTarea(data) {
    return await prisma.tarea.create({
        data: {
            titulo: data.titulo,
            descripcion: data.descripcion,
            usuario: {
                connect: { id: Number(data.usuarioId) }
            }
        }
    });
}

async function deleteTarea(id) {
    return await prisma.tarea.delete({
        where: { id: Number(id) }
    });    
}

module.exports = { getTareas, createTarea, deleteTarea };