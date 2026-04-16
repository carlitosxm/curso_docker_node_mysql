const express = require("express");
const router = express.Router();

// 1. Importamos con llaves para sacar la función del objeto exportado
const { verificarToken } = require("../middleware/authMiddleware");
const { getTareas } = require("../controller/tareaController");
const { autorizarRoles } = require("../middleware/rolMidlleware");
const tareaController = require("../controller/tareaController");

// 2. Ahora pasamos las funciones directamente
// Si alguna de estas es 'undefined', el console.log de abajo te lo dirá
console.log("Revisión de funciones:", { verificarToken, getTareas });

router.get("/tareas", verificarToken, getTareas);
router.post("/tareas", verificarToken,tareaController.createTarea);
router.delete("/tareas/:id" , verificarToken, autorizarRoles("admin"), tareaController.deleteTarea);
//router.delete("/tareas/:id", verificarToken, tareaController.deleteTarea);

module.exports = router;