require('dotenv').config(); 


const express = require('express'); 
const app = express();
const port=process.env.PORT || 3000;
const jwtSrecret=process.env.JWT_SECRET;

app.use(express.json());
console.log("clave secreta", jwtSrecret)
console.log("port", port)

app.get('/', (req, res) => {
    res.send('API backend funcionando');
});

// Corregido: listen y uso de backticks en el log
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});