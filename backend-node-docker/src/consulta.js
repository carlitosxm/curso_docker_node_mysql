// 'async' le dice a JS: "Oye, esta función va a tardar, no te detengas"
async function saludar() {
    // 'fetch' va a internet por datos (Petición sujeta a reglas CORS)
    // 'await' es esperar a que el servidor responda
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users/1');
    
    // Convertimos la respuesta en un objeto que podamos leer
    const usuario = await respuesta.json();
    
    // Mostramos el resultado
    console.log(`Usuario: ${usuario.name} ${usuario.address.street}`);
}

// Ejecutamos la función
saludar();
console.log("Primer mensaje antes de saludar.");