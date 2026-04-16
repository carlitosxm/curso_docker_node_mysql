const tareaServices = require("../services/tareaServices");

async function getTareas(req, res) {
    try {
        const usuarioId = req.usuario.userId;
        const tareas = await tareaServices.getTareas(usuarioId);
        res.status(200).json({ message: "tareas obtenidas", data: tareas });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
}

async function createTarea(req, res) {
    try {
        if (!req.usuario || !req.usuario.userId) {
            return res.status(401).json({ message: "Usuario no identificado" });
        }
        const datosTarea = { ...req.body, usuarioId: req.usuario.userId };
        const tarea = await tareaServices.createTarea(datosTarea);
        res.status(201).json({ message: "tarea creada", data: tarea });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteTarea(req, res) {
    try {
        const { id } = req.params;
        const tarea = await tareaServices.deleteTarea(id);
        res.status(200).json({ message: "tarea eliminada", data: tarea });       
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getTareas, createTarea, deleteTarea };
