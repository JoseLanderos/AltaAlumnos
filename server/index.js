const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de AltaAlumnos corriendo 🎉');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Metodo POST

app.post('/alumnos', async (req, res) => {
  try {
    const { nombre, escuelaId, padres } = req.body;

    if (!nombre || !escuelaId || !padres) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // 1. Crear los padres
    const padresCreado = await prisma.padres.create({
      data: {
        nombre_padre: padres.nombre_padre,
        apellido_padre: padres.apellido_padre,
        nombre_madre: padres.nombre_madre,
        apellido_madre: padres.apellido_madre
      }
    });

    // 2. Crear el alumno y relacionarlo con escuela y padres
    const alumnoCreado = await prisma.alumno.create({
      data: {
        nombre,
        escuela: {
          connect: { id: escuelaId }
        },
        padres: {
          create: {
            padres: {
              connect: { id: padresCreado.id }
            }
          }
        }
      },
      include: {
        escuela: true,
        padres: {
          include: {
            padres: true
          }
        }
      }
    });

    res.status(201).json(alumnoCreado);
  } catch (error) {
    console.error('Error al registrar alumno:', error.message, error.stack);
    res.status(500).json({ error: 'Error al registrar alumno' });
  }
});


// Metodo GET

app.get('/alumnos', async (req, res) => {
  try {
    const { nombre, escuelaId } = req.query;

    // Construir condiciones dinámicas de búsqueda
    const where = {};

    if (nombre) {
      where.nombre = {
        contains: nombre,
      };
    }

    if (escuelaId) {
      where.escuelaId = parseInt(escuelaId);
    }

    // Buscar alumnos
    const alumnos = await prisma.alumno.findMany({
      where,
      include: {
        escuela: true,
        padres: {
          include: {
            padres: true
          }
        }
      }
    });

    res.json(alumnos);
  } catch (error) {
    console.error('Error al obtener alumnos:', error.message);
    res.status(500).json({ error: 'Error al obtener alumnos' });
  }
});


