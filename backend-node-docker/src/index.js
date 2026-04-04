const express = require('express'); // Corregido: require
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API backend funcionando');
});

const PORT = process.env.PORT || 3000;

// Corregido: listen y uso de backticks en el log
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});