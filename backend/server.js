require('dotenv').config(); // Cargar las variables de entorno
const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/database');

const ministerioRoutes = require('./routes/ministerios');
const requestRoutes = require('./routes/requests');

const app = express();

// Configuración de CORS para permitir solicitudes desde localhost:3000
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json()); // Usar el middleware integrado de Express para JSON

// Usar las rutas
app.use('/api/ministerios', ministerioRoutes);
app.use('/api/requests', requestRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        // Conectar a la base de datos
        await connectDB();
        
        // Sincronizar los modelos con la base de datos
        await sequelize.sync({ alter: true });
        console.log('Database synchronized');

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
