import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3000/api'

const solicitudInicial = {
  nombre_empleado: '',
  numero_empleado: '',
  departamento: '',
  puesto: '',
  tipo_solicitud: '',
  recurso_solicitado: '',
  nivel_acceso: '',
  fecha_solicitud: '',
  hora_solicitud: '',
  justificacion: '',
  jefe_directo: '',
  confirmacion_minimo_privilegio: false
}

const correoInicial = {
  responsable: '',
  area: '',
  correo_generado: '',
  estado_cuenta: '',
  fecha_creacion: '',
  numero_alias: '',
  observaciones: '',
  confirmacion_registro: false
}

function App() {
  const [solicitudForm, setSolicitudForm] = useState(solicitudInicial)
  const [correoForm, setCorreoForm] = useState(correoInicial)

  const [solicitudes, setSolicitudes] = useState([])
  const [correos, setCorreos] = useState([])

  const [mensajeSolicitud, setMensajeSolicitud] = useState('')
  const [mensajeCorreo, setMensajeCorreo] = useState('')

  const [editandoSolicitudId, setEditandoSolicitudId] = useState(null)
  const [editandoCorreoId, setEditandoCorreoId] = useState(null)


  useEffect(() => {
    const controller = new AbortController()

    const cargarDatosIniciales = async () => {
      try {
        const [respuestaSolicitudes, respuestaCorreos] = await Promise.all([
          fetch(`${API_URL}/solicitudes`, { signal: controller.signal }),
          fetch(`${API_URL}/correos`, { signal: controller.signal })
        ])

        const [datosSolicitudes, datosCorreos] = await Promise.all([
          respuestaSolicitudes.json(),
          respuestaCorreos.json()
        ])

        setSolicitudes(datosSolicitudes)
        setCorreos(datosCorreos)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error al cargar datos iniciales:', error)
        }
      }
    }

    cargarDatosIniciales()

    return () => controller.abort()
  }, [])

  const obtenerSolicitudes = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/solicitudes`)
      const datos = await respuesta.json()
      setSolicitudes(datos)
    } catch (error) {
      console.error('Error al consultar solicitudes:', error)
    }
  }

  const obtenerCorreos = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/correos`)
      const datos = await respuesta.json()
      setCorreos(datos)
    } catch (error) {
      console.error('Error al consultar correos:', error)
    }
  }

  const manejarCambioSolicitud = (e) => {
    const { name, value, type, checked } = e.target

    setSolicitudForm({
      ...solicitudForm,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const manejarCambioCorreo = (e) => {
    const { name, value, type, checked } = e.target

    setCorreoForm({
      ...correoForm,
      [name]: type === 'checkbox' ? checked : value
    })
  }

const registrarSolicitud = async (e) => {
  e.preventDefault()

  try {
    const datosSolicitud = {
      ...solicitudForm,
      numero_empleado: Number(solicitudForm.numero_empleado)
    }

    const url = editandoSolicitudId
      ? `${API_URL}/solicitudes/${editandoSolicitudId}`
      : `${API_URL}/solicitudes`

    const metodo = editandoSolicitudId ? 'PUT' : 'POST'

    const respuesta = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosSolicitud)
    })

    const resultado = await respuesta.json()

    if (!respuesta.ok) {
      setMensajeSolicitud(resultado.mensaje || 'Error al guardar la solicitud')
      return
    }

    setMensajeSolicitud(
      editandoSolicitudId
        ? 'Solicitud modificada correctamente'
        : 'Solicitud registrada correctamente'
    )

    setSolicitudForm(solicitudInicial)
    setEditandoSolicitudId(null)
    obtenerSolicitudes()
  } catch (error) {
    console.error('Error al guardar solicitud:', error)
    setMensajeSolicitud('Error de conexión con el servidor')
  }
}

const editarSolicitud = (solicitud) => {
  setSolicitudForm({
    nombre_empleado: solicitud.nombre_empleado || '',
    numero_empleado: solicitud.numero_empleado || '',
    departamento: solicitud.departamento || '',
    puesto: solicitud.puesto || '',
    tipo_solicitud: solicitud.tipo_solicitud || '',
    recurso_solicitado: solicitud.recurso_solicitado || '',
    nivel_acceso: solicitud.nivel_acceso || '',
    fecha_solicitud: formatearFecha(solicitud.fecha_solicitud),
    hora_solicitud: String(solicitud.hora_solicitud || '').slice(0, 5),
    justificacion: solicitud.justificacion || '',
    jefe_directo: solicitud.jefe_directo || '',
    confirmacion_minimo_privilegio: Boolean(solicitud.confirmacion_minimo_privilegio)
  })

  setEditandoSolicitudId(solicitud.id_solicitud)
  setMensajeSolicitud('Editando solicitud seleccionada')
}

const cancelarEdicionSolicitud = () => {
  setSolicitudForm(solicitudInicial)
  setEditandoSolicitudId(null)
  setMensajeSolicitud('')
}

const eliminarSolicitud = async (id) => {
  const confirmar = window.confirm('¿Seguro que deseas eliminar esta solicitud?')

  if (!confirmar) {
    return
  }

  try {
    const respuesta = await fetch(`${API_URL}/solicitudes/${id}`, {
      method: 'DELETE'
    })

    const resultado = await respuesta.json()

    if (!respuesta.ok) {
      setMensajeSolicitud(resultado.mensaje || 'Error al eliminar la solicitud')
      return
    }

    setMensajeSolicitud('Solicitud eliminada correctamente')
    obtenerSolicitudes()
  } catch (error) {
    console.error('Error al eliminar solicitud:', error)
    setMensajeSolicitud('Error de conexión con el servidor')
  }
}


  const registrarCorreo = async (e) => {
    e.preventDefault()

    try {
      const datosCorreo = {
        ...correoForm,
        numero_alias: Number(correoForm.numero_alias || 0)
      }

      const url = editandoCorreoId
        ? `${API_URL}/correos/${editandoCorreoId}`
        : `${API_URL}/correos`

      const metodo = editandoCorreoId ? 'PUT' : 'POST'

      const respuesta = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosCorreo)
      })

      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        setMensajeCorreo(resultado.mensaje || 'Error al guardar la cuenta de correo')
        return
      }

      setMensajeCorreo(
        editandoCorreoId
          ? 'Cuenta de correo modificada correctamente'
          : 'Cuenta de correo registrada correctamente'
      )

      setCorreoForm(correoInicial)
      setEditandoCorreoId(null)
      obtenerCorreos()
    } catch (error) {
      console.error('Error al guardar correo:', error)
      setMensajeCorreo('Error de conexión con el servidor')
    }
  }

  const editarCorreo = (correo) => {
    setCorreoForm({
      responsable: correo.responsable || '',
      area: correo.area || '',
      correo_generado: correo.correo_generado || '',
      estado_cuenta: correo.estado_cuenta || '',
      fecha_creacion: formatearFecha(correo.fecha_creacion),
      numero_alias: correo.numero_alias || '',
      observaciones: correo.observaciones || '',
      confirmacion_registro: Boolean(correo.confirmacion_registro)
    })

    setEditandoCorreoId(correo.id_correo)
    setMensajeCorreo('Editando cuenta de correo seleccionada')
  }

  const cancelarEdicionCorreo = () => {
    setCorreoForm(correoInicial)
    setEditandoCorreoId(null)
    setMensajeCorreo('')
  }

  const eliminarCorreo = async (id) => {
    const confirmar = window.confirm('¿Seguro que deseas eliminar esta cuenta de correo?')

    if (!confirmar) {
      return
    }

    try {
      const respuesta = await fetch(`${API_URL}/correos/${id}`, {
        method: 'DELETE'
      })

      const resultado = await respuesta.json()

      if (!respuesta.ok) {
        setMensajeCorreo(resultado.mensaje || 'Error al eliminar la cuenta de correo')
        return
      }

      setMensajeCorreo('Cuenta de correo eliminada correctamente')
      obtenerCorreos()
    } catch (error) {
      console.error('Error al eliminar correo:', error)
      setMensajeCorreo('Error de conexión con el servidor')
    }
  }

  const formatearFecha = (fecha) => {
    if (!fecha) return ''
    return String(fecha).split('T')[0]
  }

  return (
    <div className="app">

      <header className="header">
        <h1>Portal de Gestión de Accesos y Ciberseguridad ETM</h1>
        <p>
          Sistema web cliente-servidor para registro, consulta y administración
          de solicitudes de acceso y cuentas de correo corporativo.
        </p>
      </header>

      <div className="layout">

        <aside className="sidebar">
          <nav className="menu">
            <ul>
              <li><a href="#inicio">Inicio</a></li>
              <li><a href="#solicitudes">Solicitudes</a></li>
              <li><a href="#correos">Control de Correos</a></li>
              <li><a href="#seguridad-interna">Seguridad Interna</a></li>
              <li><a href="#seguridad-externa">Seguridad Externa</a></li>
            </ul>
          </nav>
        </aside>

        <main className="content">

          <section id="inicio" className="card hero">
            <div>
              <h2>Ciberseguridad ETM</h2>
              <p>
                Este portal permite gestionar información relacionada con accesos,
                identidades digitales y cuentas corporativas. El sistema se conecta
                a una base de datos MySQL mediante un backend desarrollado con Node.js
                y Express.
              </p>
            </div>

            <img
              src="https://www.etmturbo.com/assets/img/logo_isoetm.png"
              alt="Logo de ETM"
              className="hero-image"
            />
          </section>

          <section id="solicitudes" className="card">
            <h2>Solicitudes de Acceso</h2>

            <p>
              Formulario para registrar solicitudes relacionadas con accesos a carpetas,
              permisos, altas, bajas, modificaciones y regularización de accesos.
            </p>

            {mensajeSolicitud && (
              <p className="message">{mensajeSolicitud}</p>
            )}

            <form className="form" onSubmit={registrarSolicitud}>

              <fieldset>
                <legend>Información del empleado</legend>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="nombre_empleado">Nombre completo *</label>
                    <input
                      type="text"
                      id="nombre_empleado"
                      name="nombre_empleado"
                      value={solicitudForm.nombre_empleado}
                      onChange={manejarCambioSolicitud}
                      placeholder="Ej. Juan Pérez López"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="numero_empleado">Número de empleado *</label>
                    <input
                      type="number"
                      id="numero_empleado"
                      name="numero_empleado"
                      value={solicitudForm.numero_empleado}
                      onChange={manejarCambioSolicitud}
                      placeholder="Ej. 1025"
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="departamento">Departamento / área *</label>
                    <select
                      id="departamento"
                      name="departamento"
                      value={solicitudForm.departamento}
                      onChange={manejarCambioSolicitud}
                      required
                    >
                      <option value="">Selecciona un departamento</option>
                      <option>Auditoría y Control</option>
                      <option>Planeación y Control de Proyectos</option>
                      <option>Jefatura de Personal</option>
                      <option>Jefatura de Nóminas</option>
                      <option>Gestión de Calidad</option>
                      <option>Control de Calidad</option>
                      <option>Salud Ocupacional</option>
                      <option>Seguridad Industrial</option>
                      <option>Protección Ambiental</option>
                      <option>Almacén</option>
                      <option>Residencia de Obra</option>
                      <option>Instrumentación y Control</option>
                      <option>Diseño y Construcción Civil</option>
                      <option>Mantenimiento y Construcción Mecánica</option>
                      <option>Diseño y Construcción Eléctrica</option>
                      <option>Diseño de Procesos</option>
                      <option>Diseño de Tuberías</option>
                      <option>Construcción de Tuberías y Estructuras</option>
                      <option>Sistemas Anticorrosivos</option>
                      <option>Sistemas</option>
                      <option>Taller Mecánico Diesel</option>
                      <option>Mantenimiento</option>
                      <option>Logística</option>
                      <option>Practicante</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="puesto">Puesto *</label>
                    <input
                      type="text"
                      id="puesto"
                      name="puesto"
                      value={solicitudForm.puesto}
                      onChange={manejarCambioSolicitud}
                      placeholder="Ej. Auxiliar de sistemas"
                      required
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Clasificación de la solicitud</legend>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="tipo_solicitud">Tipo de solicitud *</label>
                    <select
                      id="tipo_solicitud"
                      name="tipo_solicitud"
                      value={solicitudForm.tipo_solicitud}
                      onChange={manejarCambioSolicitud}
                      required
                    >
                      <option value="">Selecciona una opción</option>
                      <option>Acceso a carpeta</option>
                      <option>Crear nueva carpeta</option>
                      <option>Modificación de acceso</option>
                      <option>Baja de empleado</option>
                      <option>Acceso temporal</option>
                      <option>Regularización de acceso</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="recurso_solicitado">Recurso solicitado *</label>
                    <input
                      type="text"
                      id="recurso_solicitado"
                      name="recurso_solicitado"
                      value={solicitudForm.recurso_solicitado}
                      onChange={manejarCambioSolicitud}
                      placeholder="Ej. Carpeta de proyectos / servidor local"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="fecha_solicitud">Fecha de solicitud *</label>
                    <input
                      type="date"
                      id="fecha_solicitud"
                      name="fecha_solicitud"
                      value={solicitudForm.fecha_solicitud}
                      onChange={manejarCambioSolicitud}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="hora_solicitud">Hora de solicitud *</label>
                    <input
                      type="time"
                      id="hora_solicitud"
                      name="hora_solicitud"
                      value={solicitudForm.hora_solicitud}
                      onChange={manejarCambioSolicitud}
                      required
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Nivel de acceso requerido</legend>

                <div className="options-group">
                  <label>
                    <input
                      type="radio"
                      name="nivel_acceso"
                      value="Lectura"
                      checked={solicitudForm.nivel_acceso === 'Lectura'}
                      onChange={manejarCambioSolicitud}
                      required
                    />
                    Lectura
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="nivel_acceso"
                      value="Lectura y escritura"
                      checked={solicitudForm.nivel_acceso === 'Lectura y escritura'}
                      onChange={manejarCambioSolicitud}
                    />
                    Lectura y escritura
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="nivel_acceso"
                      value="Administrador"
                      checked={solicitudForm.nivel_acceso === 'Administrador'}
                      onChange={manejarCambioSolicitud}
                    />
                    Administrador
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend>Justificación y aprobación</legend>

                <div className="form-group">
                  <label htmlFor="justificacion">Justificación del acceso *</label>
                  <textarea
                    id="justificacion"
                    name="justificacion"
                    rows="5"
                    value={solicitudForm.justificacion}
                    onChange={manejarCambioSolicitud}
                    placeholder="Explica por qué el acceso es necesario para las funciones laborales."
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="jefe_directo">Nombre del jefe directo *</label>
                  <input
                    type="text"
                    id="jefe_directo"
                    name="jefe_directo"
                    value={solicitudForm.jefe_directo}
                    onChange={manejarCambioSolicitud}
                    placeholder="Ej. Nombre del responsable que aprueba"
                    required
                  />
                </div>

                <label className="check-label">
                  <input
                    type="checkbox"
                    name="confirmacion_minimo_privilegio"
                    checked={solicitudForm.confirmacion_minimo_privilegio}
                    onChange={manejarCambioSolicitud}
                    required
                  />
                  Confirmo que este acceso cumple con el principio de mínimo privilegio.
                </label>
              </fieldset>

              <div className="button-group">
                <button type="submit" className="btn">
                  {editandoSolicitudId ? 'Guardar cambios' : 'Guardar solicitud'}
                </button>

                {editandoSolicitudId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancelarEdicionSolicitud}
                  >
                    Cancelar edición
                  </button>
                )}
              </div>

            </form>

            <h3>Solicitudes registradas</h3>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Empleado</th>
                    <th>Departamento</th>
                    <th>Tipo</th>
                    <th>Nivel</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {solicitudes.length === 0 ? (
                    <tr>
                      <td colSpan="7">No hay solicitudes registradas.</td>
                    </tr>
                  ) : (
                    solicitudes.map((solicitud) => (
                      <tr key={solicitud.id_solicitud}>
                        <td>{solicitud.id_solicitud}</td>
                        <td>{solicitud.nombre_empleado}</td>
                        <td>{solicitud.departamento}</td>
                        <td>{solicitud.tipo_solicitud}</td>
                        <td>{solicitud.nivel_acceso}</td>
                        <td>{formatearFecha(solicitud.fecha_solicitud)}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              type="button"
                              className="btn-small btn-edit"
                              onClick={() => editarSolicitud(solicitud)}
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              className="btn-small btn-delete"
                              onClick={() => eliminarSolicitud(solicitud.id_solicitud)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section id="correos" className="card">
            <h2>Control de Correos</h2>

            <p>
              Formulario para registrar cuentas de correo corporativo, responsables,
              áreas y estado de la cuenta dentro de la organización.
            </p>

            {mensajeCorreo && (
              <p className="message">{mensajeCorreo}</p>
            )}

            <form className="form" onSubmit={registrarCorreo}>

              <fieldset>
                <legend>Datos de la cuenta corporativa</legend>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="responsable">Responsable del correo *</label>
                    <input
                      type="text"
                      id="responsable"
                      name="responsable"
                      value={correoForm.responsable}
                      onChange={manejarCambioCorreo}
                      placeholder="Ej. Ana López"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="area">Área *</label>
                    <select
                      id="area"
                      name="area"
                      value={correoForm.area}
                      onChange={manejarCambioCorreo}
                      required
                    >
                      <option value="">Selecciona un área</option>
                      <option>Sistemas</option>
                      <option>Recursos Humanos</option>
                      <option>Logística</option>
                      <option>Auditoría y Control</option>
                      <option>Seguridad Industrial</option>
                      <option>Residencia de Obra</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="correo_generado">Correo generado *</label>
                    <input
                      type="email"
                      id="correo_generado"
                      name="correo_generado"
                      value={correoForm.correo_generado}
                      onChange={manejarCambioCorreo}
                      placeholder="usuario@empresa.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="estado_cuenta">Estado de la cuenta *</label>
                    <select
                      id="estado_cuenta"
                      name="estado_cuenta"
                      value={correoForm.estado_cuenta}
                      onChange={manejarCambioCorreo}
                      required
                    >
                      <option value="">Selecciona un estado</option>
                      <option>Activa</option>
                      <option>Suspendida</option>
                      <option>En proceso de baja</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="fecha_creacion">Fecha de creación *</label>
                    <input
                      type="date"
                      id="fecha_creacion"
                      name="fecha_creacion"
                      value={correoForm.fecha_creacion}
                      onChange={manejarCambioCorreo}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="numero_alias">Número de alias asociados</label>
                    <input
                      type="number"
                      id="numero_alias"
                      name="numero_alias"
                      value={correoForm.numero_alias}
                      onChange={manejarCambioCorreo}
                      min="0"
                      placeholder="Ej. 2"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="observaciones">Observaciones</label>
                  <textarea
                    id="observaciones"
                    name="observaciones"
                    rows="4"
                    value={correoForm.observaciones}
                    onChange={manejarCambioCorreo}
                    placeholder="Ej. Cuenta asignada a proyecto temporal o usuario de nuevo ingreso."
                  ></textarea>
                </div>

                <label className="check-label">
                  <input
                    type="checkbox"
                    name="confirmacion_registro"
                    checked={correoForm.confirmacion_registro}
                    onChange={manejarCambioCorreo}
                    required
                  />
                  Confirmo que la cuenta fue registrada para control interno.
                </label>

              </fieldset>

              <div className="button-group">
                <button type="submit" className="btn">
                  {editandoCorreoId ? 'Guardar cambios' : 'Guardar cuenta'}
                </button>

                {editandoCorreoId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancelarEdicionCorreo}
                  >
                    Cancelar edición
                  </button>
                )}
              </div>

            </form>

            <h3>Cuentas registradas</h3>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Responsable</th>
                    <th>Área</th>
                    <th>Correo</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {correos.length === 0 ? (
                    <tr>
                      <td colSpan="7">No hay cuentas de correo registradas.</td>
                    </tr>
                  ) : (
                    correos.map((correo) => (
                      <tr key={correo.id_correo}>
                        <td>{correo.id_correo}</td>
                        <td>{correo.responsable}</td>
                        <td>{correo.area}</td>
                        <td>{correo.correo_generado}</td>
                        <td>{correo.estado_cuenta}</td>
                        <td>{formatearFecha(correo.fecha_creacion)}</td>
                        <td>
                          <div className="table-actions">
                            <button
                              type="button"
                              className="btn-small btn-edit"
                              onClick={() => editarCorreo(correo)}
                            >
                              Editar
                            </button>

                            <button
                              type="button"
                              className="btn-small btn-delete"
                              onClick={() => eliminarCorreo(correo.id_correo)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section id="seguridad-interna" className="card">
            <h2>Seguridad Interna</h2>

            <p>
              La seguridad interna se enfoca en prevenir incidentes dentro de la organización
              mediante buenas prácticas, capacitación del personal y control adecuado de los accesos.
            </p>

            <div className="media-grid">
              <article className="media-card">
                <img
                  src="https://ticsyformacion.com/wp-content/uploads/2017/11/consejos-ciberseguridad-infografi%CC%81a.jpg"
                  alt="Infografía con consejos de ciberseguridad"
                />
                <h3>Buenas prácticas</h3>
                <p>
                  La prevención depende de hábitos seguros: contraseñas fuertes,
                  actualización de sistemas y cuidado al abrir enlaces o archivos.
                </p>
              </article>

              <article className="media-card">
                <img
                  src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=80"
                  alt="Persona trabajando en seguridad informática"
                />
                <h3>Protección de datos</h3>
                <p>
                  La información empresarial debe protegerse mediante controles de acceso,
                  respaldo de datos y clasificación adecuada de documentos.
                </p>
              </article>
            </div>

            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/NTE_KvzRXOM?si=R4e0kBTNj4WtsSfI"
                title="Video sobre ciberseguridad"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            <h3>Consejos de prevención</h3>

            <div className="tips-grid">
              <div className="tip-card">
                <h4>Contraseñas seguras</h4>
                <p>
                  Utilizar claves únicas, largas y difíciles de adivinar.
                </p>
              </div>

              <div className="tip-card">
                <h4>Autenticación de dos factores</h4>
                <p>
                  Activar 2FA agrega una segunda barrera de protección.
                </p>
              </div>

              <div className="tip-card">
                <h4>Prevención de phishing</h4>
                <p>
                  Verificar remitentes, enlaces y archivos adjuntos antes de abrirlos.
                </p>
              </div>

              <div className="tip-card">
                <h4>Respaldos de información</h4>
                <p>
                  Realizar copias de seguridad reduce el impacto de incidentes.
                </p>
              </div>
            </div>
          </section>

          <section id="seguridad-externa" className="card">
            <h2>Seguridad Externa</h2>

            <p>
              Recursos externos confiables para consultar buenas prácticas,
              guías y documentación técnica relacionada con ciberseguridad.
            </p>

            <div className="resources-grid">
              <article className="resource-card">
                <h3>OWASP</h3>
                <p>
                  Organización enfocada en seguridad de aplicaciones web y desarrollo seguro.
                </p>
                <a href="https://owasp.org" target="_blank" rel="noreferrer">
                  Visitar OWASP
                </a>
              </article>

              <article className="resource-card">
                <h3>INCIBE</h3>
                <p>
                  Portal especializado en prevención, concientización y apoyo ante incidentes.
                </p>
                <a href="https://www.incibe.es" target="_blank" rel="noreferrer">
                  Visitar INCIBE
                </a>
              </article>

              <article className="resource-card">
                <h3>Kaspersky</h3>
                <p>
                  Sitio con información sobre malware, phishing y seguridad digital.
                </p>
                <a href="https://www.kaspersky.com" target="_blank" rel="noreferrer">
                  Visitar Kaspersky
                </a>
              </article>

              <article className="resource-card">
                <h3>CISA</h3>
                <p>
                  Agencia con recursos y recomendaciones de seguridad para organizaciones.
                </p>
                <a href="https://www.cisa.gov" target="_blank" rel="noreferrer">
                  Visitar CISA
                </a>
              </article>
            </div>
          </section>

        </main>
      </div>

      <footer className="footer">
        <p>© 2026 ETM Segura</p>

        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>

          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            Twitter
          </a>

          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </footer>

    </div>
  )
}

export default App