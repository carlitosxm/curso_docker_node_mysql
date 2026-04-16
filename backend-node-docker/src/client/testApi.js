const axios = require('axios');

async function testGetTareas() {
    try {
        const response = await axios.get("http://localhost:3000/api/tareas");
        console.log("respuesta",response.data);
    } catch (error) {
    console.log("error al traer tareas",error);       
    }
    
}

testGetTareas();