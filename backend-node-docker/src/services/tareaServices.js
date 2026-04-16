const tareaRepository= require("../repositories/tareasRepository");

async function getTareas(usuarioId){
    return await tareaRepository.getTareas.findMany({where: {usuarioID: usuarioId}});
}

async function deleteTarea(id) {
    return await tareaRepository.deleteTarea(id);
}


async function createTarea(data, usuarioID) {
    return await tareaRepository.createTarea(data, usuarioID);
}
module.exports={
    getTareas,
    deleteTarea,
    createTarea
}