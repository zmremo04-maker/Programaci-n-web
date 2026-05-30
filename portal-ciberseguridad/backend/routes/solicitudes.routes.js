const express = require('express');
const router = express.Router();
const db = require('../db');

// CONSULTAR TODAS LAS SOLICITUDES
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM solicitudes_acceso ORDER BY id_solicitud DESC'
    );

    res.json(rows);
  } catch (error) {
    console.error('Error al consultar solicitudes:', error);
    res.status(500).json({
      mensaje: 'Error al consultar las solicitudes',
      error: error.message
    });
  }
});

// CONSULTAR UNA SOLICITUD POR ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      'SELECT * FROM solicitudes_acceso WHERE id_solicitud = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        mensaje: 'Solicitud no encontrada'
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al consultar la solicitud:', error);
    res.status(500).json({
      mensaje: 'Error al consultar la solicitud',
      error: error.message
    });
  }
});

// REGISTRAR UNA NUEVA SOLICITUD
router.post('/', async (req, res) => {
  try {
    const {
      nombre_empleado,
      numero_empleado,
      departamento,
      puesto,
      tipo_solicitud,
      recurso_solicitado,
      nivel_acceso,
      fecha_solicitud,
      hora_solicitud,
      justificacion,
      jefe_directo,
      confirmacion_minimo_privilegio
    } = req.body;

    if (
      !nombre_empleado ||
      !numero_empleado ||
      !departamento ||
      !puesto ||
      !tipo_solicitud ||
      !recurso_solicitado ||
      !nivel_acceso ||
      !fecha_solicitud ||
      !hora_solicitud ||
      !justificacion ||
      !jefe_directo
    ) {
      return res.status(400).json({
        mensaje: 'Todos los campos obligatorios deben ser completados'
      });
    }

    const [result] = await db.execute(
      `INSERT INTO solicitudes_acceso (
        nombre_empleado,
        numero_empleado,
        departamento,
        puesto,
        tipo_solicitud,
        recurso_solicitado,
        nivel_acceso,
        fecha_solicitud,
        hora_solicitud,
        justificacion,
        jefe_directo,
        confirmacion_minimo_privilegio
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre_empleado,
        numero_empleado,
        departamento,
        puesto,
        tipo_solicitud,
        recurso_solicitado,
        nivel_acceso,
        fecha_solicitud,
        hora_solicitud,
        justificacion,
        jefe_directo,
        confirmacion_minimo_privilegio ? 1 : 0
      ]
    );

    res.status(201).json({
      mensaje: 'Solicitud registrada correctamente',
      id_solicitud: result.insertId
    });
  } catch (error) {
    console.error('Error al registrar solicitud:', error);
    res.status(500).json({
      mensaje: 'Error al registrar la solicitud',
      error: error.message
    });
  }
});

// MODIFICAR UNA SOLICITUD
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nombre_empleado,
      numero_empleado,
      departamento,
      puesto,
      tipo_solicitud,
      recurso_solicitado,
      nivel_acceso,
      fecha_solicitud,
      hora_solicitud,
      justificacion,
      jefe_directo,
      confirmacion_minimo_privilegio
    } = req.body;

    if (
      !nombre_empleado ||
      !numero_empleado ||
      !departamento ||
      !puesto ||
      !tipo_solicitud ||
      !recurso_solicitado ||
      !nivel_acceso ||
      !fecha_solicitud ||
      !hora_solicitud ||
      !justificacion ||
      !jefe_directo
    ) {
      return res.status(400).json({
        mensaje: 'Todos los campos obligatorios deben ser completados'
      });
    }

    const [result] = await db.execute(
      `UPDATE solicitudes_acceso
       SET
        nombre_empleado = ?,
        numero_empleado = ?,
        departamento = ?,
        puesto = ?,
        tipo_solicitud = ?,
        recurso_solicitado = ?,
        nivel_acceso = ?,
        fecha_solicitud = ?,
        hora_solicitud = ?,
        justificacion = ?,
        jefe_directo = ?,
        confirmacion_minimo_privilegio = ?
       WHERE id_solicitud = ?`,
      [
        nombre_empleado,
        numero_empleado,
        departamento,
        puesto,
        tipo_solicitud,
        recurso_solicitado,
        nivel_acceso,
        fecha_solicitud,
        hora_solicitud,
        justificacion,
        jefe_directo,
        confirmacion_minimo_privilegio ? 1 : 0,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'Solicitud no encontrada'
      });
    }

    res.json({
      mensaje: 'Solicitud modificada correctamente'
    });
  } catch (error) {
    console.error('Error al modificar solicitud:', error);
    res.status(500).json({
      mensaje: 'Error al modificar la solicitud',
      error: error.message
    });
  }
});

// ELIMINAR UNA SOLICITUD
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      'DELETE FROM solicitudes_acceso WHERE id_solicitud = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'Solicitud no encontrada'
      });
    }

    res.json({
      mensaje: 'Solicitud eliminada correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar solicitud:', error);
    res.status(500).json({
      mensaje: 'Error al eliminar la solicitud',
      error: error.message
    });
  }
});

module.exports = router;