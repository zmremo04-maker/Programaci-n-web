const express = require('express');
const router = express.Router();
const db = require('../db');

// CONSULTAR TODAS LAS CUENTAS DE CORREO
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM cuentas_correo ORDER BY id_correo DESC'
    );

    res.json(rows);
  } catch (error) {
    console.error('Error al consultar cuentas de correo:', error);
    res.status(500).json({
      mensaje: 'Error al consultar las cuentas de correo',
      error: error.message
    });
  }
});

// CONSULTAR UNA CUENTA DE CORREO POR ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.execute(
      'SELECT * FROM cuentas_correo WHERE id_correo = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        mensaje: 'Cuenta de correo no encontrada'
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al consultar la cuenta de correo:', error);
    res.status(500).json({
      mensaje: 'Error al consultar la cuenta de correo',
      error: error.message
    });
  }
});

// REGISTRAR UNA NUEVA CUENTA DE CORREO
router.post('/', async (req, res) => {
  try {
    const {
      responsable,
      area,
      correo_generado,
      estado_cuenta,
      fecha_creacion,
      numero_alias,
      observaciones,
      confirmacion_registro
    } = req.body;

    if (
      !responsable ||
      !area ||
      !correo_generado ||
      !estado_cuenta ||
      !fecha_creacion
    ) {
      return res.status(400).json({
        mensaje: 'Todos los campos obligatorios deben ser completados'
      });
    }

    const [result] = await db.execute(
      `INSERT INTO cuentas_correo (
        responsable,
        area,
        correo_generado,
        estado_cuenta,
        fecha_creacion,
        numero_alias,
        observaciones,
        confirmacion_registro
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        responsable,
        area,
        correo_generado,
        estado_cuenta,
        fecha_creacion,
        numero_alias || 0,
        observaciones || '',
        confirmacion_registro ? 1 : 0
      ]
    );

    res.status(201).json({
      mensaje: 'Cuenta de correo registrada correctamente',
      id_correo: result.insertId
    });
  } catch (error) {
    console.error('Error al registrar cuenta de correo:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        mensaje: 'El correo generado ya se encuentra registrado'
      });
    }

    res.status(500).json({
      mensaje: 'Error al registrar la cuenta de correo',
      error: error.message
    });
  }
});

// MODIFICAR UNA CUENTA DE CORREO
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const {
      responsable,
      area,
      correo_generado,
      estado_cuenta,
      fecha_creacion,
      numero_alias,
      observaciones,
      confirmacion_registro
    } = req.body;

    if (
      !responsable ||
      !area ||
      !correo_generado ||
      !estado_cuenta ||
      !fecha_creacion
    ) {
      return res.status(400).json({
        mensaje: 'Todos los campos obligatorios deben ser completados'
      });
    }

    const [result] = await db.execute(
      `UPDATE cuentas_correo
       SET
        responsable = ?,
        area = ?,
        correo_generado = ?,
        estado_cuenta = ?,
        fecha_creacion = ?,
        numero_alias = ?,
        observaciones = ?,
        confirmacion_registro = ?
       WHERE id_correo = ?`,
      [
        responsable,
        area,
        correo_generado,
        estado_cuenta,
        fecha_creacion,
        numero_alias || 0,
        observaciones || '',
        confirmacion_registro ? 1 : 0,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'Cuenta de correo no encontrada'
      });
    }

    res.json({
      mensaje: 'Cuenta de correo modificada correctamente'
    });
  } catch (error) {
    console.error('Error al modificar cuenta de correo:', error);

    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        mensaje: 'El correo generado ya se encuentra registrado'
      });
    }

    res.status(500).json({
      mensaje: 'Error al modificar la cuenta de correo',
      error: error.message
    });
  }
});

// ELIMINAR UNA CUENTA DE CORREO
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      'DELETE FROM cuentas_correo WHERE id_correo = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: 'Cuenta de correo no encontrada'
      });
    }

    res.json({
      mensaje: 'Cuenta de correo eliminada correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar cuenta de correo:', error);
    res.status(500).json({
      mensaje: 'Error al eliminar la cuenta de correo',
      error: error.message
    });
  }
});

module.exports = router;