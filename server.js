const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 3000; 

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.get('/posts', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en la consulta');
    }
});

app.post('/posts', async (req, res) => {
    const { titulo, img, descripcion, likes } = req.body;
    try {
        const newPost = await pool.query(
            'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, img, descripcion, likes]
        );
        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar el post');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
