require('dotenv').config(); 
const path = require('path'); 
const express = require('express'); 
const cors = require('cors');
const { apiReference } = require('@scalar/express-api-reference');
const fs = require('fs'); // Añadido para verificar que el archivo existe

const tareaRoutes = require("./routes/tareasRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 3000;
const jwtSrecret = process.env.JWT_SECRET;

// Configuración de CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Logs de inicio
console.log("🚀 Iniciando servidor...");
console.log("🔑 JWT Secret configurado:", jwtSrecret ? "SÍ" : "NO");

// Rutas base
app.get('/', (req, res) => {
    res.send('API backend funcionando correctamente');
});

// Rutas de la API
app.use('/api', tareaRoutes);
app.use('/api', authRouter);

/**
 * CONFIGURACIÓN DE DOCUMENTACIÓN (SCALAR)
 */
app.use('/docs', apiReference({
    theme: 'dark',
    layout: 'modern',
    spec: {
        url: '/api/openapi.yaml'
    },
    configuration: {
        showSidebar: true,
        hideDownloadButton: false,
        hideTryItPanel: false,
        authentication: {
            preferredSecurityScheme: 'bearerAuth',
            apiKey: 'token'
        }
    }
}));

// Servir archivo OpenAPI con validación de ruta absoluta
app.get('/api/openapi.yaml', (req, res) => {
    // path.resolve con process.cwd() busca desde la carpeta raíz del proyecto (donde está el package.json)
    const rutaYaml = path.resolve(process.cwd(), 'docs', 'openapi.yaml');

    if (fs.existsSync(rutaYaml)) {
        res.setHeader('Content-Type', 'application/x-yaml');
        res.sendFile(rutaYaml);
    } else {
        console.error(`❌ ERROR: No se encontró el archivo en: ${rutaYaml}`);
        res.status(404).json({
            error: "Archivo de documentación no encontrado",
            rutaBuscada: rutaYaml,
            ayuda: "Asegúrate de que la carpeta 'docs' esté en la raíz del proyecto y el archivo se llame 'openapi.yaml'"
        });
    }
});

// Levantar servidor
app.listen(port, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${port}`);
    console.log(`📖 Documentación: http://localhost:${port}/docs`);
});