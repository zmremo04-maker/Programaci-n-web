function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Portal de Gestión de Accesos y Ciberseguridad ETM</h1>
        <p>
          Aplicación frontend para captura de datos, control de identidades y
          prevención de riesgos digitales.
        </p>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <nav className="menu">
            <ul>
              <li>
                <a href="#inicio">Inicio</a>
              </li>
              <li>
                <a href="#solicitudes">Solicitudes</a>
              </li>
              <li>
                <a href="#correos">Control de Correos</a>
              </li>
              <li>
                <a href="#seguridad-interna">Seguridad Interna</a>
              </li>
              <li>
                <a href="#seguridad-externa">Seguridad Externa</a>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="content">
          {/* INICIO */}
          <section id="inicio" className="card hero">
            <div>
              <h2>Ciberseguridad ETM</h2>
              <p>
                Este portal simula una herramienta del lado del cliente para
                apoyar la gestión de accesos, el control de cuentas de correo y
                la concientización en ciberseguridad dentro de la empresa.
              </p>
            </div>

            <img
              src="https://www.etmturbo.com/assets/img/logo_isoetm.png"
              alt="Logo de ETM"
              className="hero-image"
            />
          </section>

          {/* SOLICITUDES */}
          <section id="solicitudes" className="card">
            <h2>Solicitudes de Acceso</h2>

            <p>
              Formulario para capturar solicitudes relacionadas con accesos a
              carpetas, permisos, altas, bajas, modificaciones y regularización
              de accesos.
            </p>

            <form className="form">
              <fieldset>
                <legend>Información del empleado</legend>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre completo *</label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Ej. Juan Pérez López"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="numeroEmpleado">Número de empleado *</label>
                    <input
                      type="number"
                      id="numeroEmpleado"
                      name="numeroEmpleado"
                      placeholder="Ej. 1025"
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="departamento">Departamento / área *</label>
                    <select id="departamento" name="departamento" required>
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
                    <label htmlFor="tipoSolicitud">Tipo de solicitud *</label>
                    <select id="tipoSolicitud" name="tipoSolicitud" required>
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
                    <label htmlFor="recurso">Recurso solicitado *</label>
                    <input
                      type="text"
                      id="recurso"
                      name="recurso"
                      placeholder="Ej. Carpeta de proyectos / servidor local"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="fechaSolicitud">Fecha de solicitud *</label>
                    <input
                      type="date"
                      id="fechaSolicitud"
                      name="fechaSolicitud"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="horaSolicitud">Hora de solicitud *</label>
                    <input
                      type="time"
                      id="horaSolicitud"
                      name="horaSolicitud"
                      required
                    />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend>Nivel de acceso requerido</legend>

                <div className="options-group">
                  <label>
                    <input type="radio" name="nivelAcceso" required />
                    Lectura
                  </label>

                  <label>
                    <input type="radio" name="nivelAcceso" />
                    Lectura y escritura
                  </label>

                  <label>
                    <input type="radio" name="nivelAcceso" />
                    Administrador
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend>Justificación y aprobación</legend>

                <div className="form-group">
                  <label htmlFor="justificacion">
                    Justificación del acceso *
                  </label>
                  <textarea
                    id="justificacion"
                    name="justificacion"
                    rows="5"
                    placeholder="Explica por qué el acceso es necesario para las funciones laborales."
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="jefeDirecto">Nombre del jefe directo *</label>
                  <input
                    type="text"
                    id="jefeDirecto"
                    name="jefeDirecto"
                    placeholder="Ej. Nombre del responsable que aprueba"
                    required
                  />
                </div>

                <label className="check-label">
                  <input type="checkbox" required />
                  Confirmo que este acceso cumple con el principio de mínimo
                  privilegio.
                </label>
              </fieldset>

              <button type="submit" className="btn">
                Enviar solicitud
              </button>
            </form>
          </section>

          {/* CONTROL DE CORREOS */}
          <section id="correos" className="card">
            <h2>Control de Correos</h2>

            <p>
              Formulario para registrar cuentas de correo corporativo,
              responsables, áreas y estado de la cuenta dentro de la
              organización.
            </p>

            <form className="form">
              <fieldset>
                <legend>Datos de la cuenta corporativa</legend>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="responsableCorreo">
                      Responsable del correo *
                    </label>
                    <input
                      type="text"
                      id="responsableCorreo"
                      name="responsableCorreo"
                      placeholder="Ej. Ana López"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="areaCorreo">Área *</label>
                    <select id="areaCorreo" name="areaCorreo" required>
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
                    <label htmlFor="correoGenerado">Correo generado *</label>
                    <input
                      type="email"
                      id="correoGenerado"
                      name="correoGenerado"
                      placeholder="usuario@empresa.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="estadoCuenta">Estado de la cuenta *</label>
                    <select id="estadoCuenta" name="estadoCuenta" required>
                      <option value="">Selecciona un estado</option>
                      <option>Activa</option>
                      <option>Suspendida</option>
                      <option>En proceso de baja</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="fechaCreacion">Fecha de creación *</label>
                    <input
                      type="date"
                      id="fechaCreacion"
                      name="fechaCreacion"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="aliasCorreo">
                      Número de alias asociados
                    </label>
                    <input
                      type="number"
                      id="aliasCorreo"
                      name="aliasCorreo"
                      min="0"
                      placeholder="Ej. 2"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="observacionesCorreo">Observaciones</label>
                  <textarea
                    id="observacionesCorreo"
                    name="observacionesCorreo"
                    rows="4"
                    placeholder="Ej. Cuenta asignada a proyecto temporal o usuario de nuevo ingreso."
                  ></textarea>
                </div>

                <label className="check-label">
                  <input type="checkbox" required />
                  Confirmo que la cuenta fue registrada para control interno.
                </label>
              </fieldset>

              <button type="submit" className="btn">
                Registrar cuenta
              </button>
            </form>
          </section>

          {/* SEGURIDAD INTERNA */}
          <section id="seguridad-interna" className="card">
            <h2>Seguridad Interna</h2>

            <p>
              La seguridad interna se enfoca en prevenir incidentes dentro de la
              organización mediante buenas prácticas, capacitación del personal
              y control adecuado de los accesos. En una empresa, muchos ataques
              comienzan por errores humanos como contraseñas débiles, correos
              fraudulentos o manejo incorrecto de la información.
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
                  actualización de sistemas y cuidado al abrir enlaces o
                  archivos.
                </p>
              </article>

              <article className="media-card">
                <img
                  src="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=900&q=80"
                  alt="Persona trabajando en seguridad informática"
                />
                <h3>Protección de datos</h3>
                <p>
                  La información empresarial debe protegerse mediante controles
                  de acceso, respaldo de datos y clasificación adecuada de
                  documentos.
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
                  Utilizar claves únicas, largas y difíciles de adivinar. Evitar
                  usar la misma contraseña en diferentes plataformas.
                </p>
              </div>

              <div className="tip-card">
                <h4>Autenticación de dos factores</h4>
                <p>
                  Activar 2FA agrega una segunda barrera de protección en caso
                  de que una contraseña sea robada o expuesta.
                </p>
              </div>

              <div className="tip-card">
                <h4>Prevención de phishing</h4>
                <p>
                  Verificar remitentes, enlaces y archivos adjuntos antes de
                  abrirlos. Muchos ataques buscan engañar al usuario para robar
                  credenciales.
                </p>
              </div>

              <div className="tip-card">
                <h4>Respaldos de información</h4>
                <p>
                  Realizar copias de seguridad ayuda a recuperar información
                  importante ante fallas, errores o ataques como ransomware.
                </p>
              </div>
            </div>
          </section>

          {/* SEGURIDAD EXTERNA */}
          <section id="seguridad-externa" className="card">
            <h2>Seguridad Externa</h2>

            <p>
              Esta sección reúne recursos externos confiables para consultar
              guías, documentación y buenas prácticas relacionadas con
              ciberseguridad, desarrollo seguro y prevención de incidentes.
            </p>

            <div className="resources-grid">
              <article className="resource-card">
                <h3>OWASP</h3>
                <p>
                  Organización enfocada en la seguridad de aplicaciones web. Es
                  útil para aprender sobre riesgos comunes, desarrollo seguro y
                  vulnerabilidades.
                </p>
                <a href="https://owasp.org" target="_blank" rel="noreferrer">
                  Visitar OWASP
                </a>
              </article>

              <article className="resource-card">
                <h3>INCIBE</h3>
                <p>
                  Portal especializado en ciberseguridad, prevención,
                  concientización y apoyo ante incidentes digitales.
                </p>
                <a
                  href="https://www.incibe.es"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visitar INCIBE
                </a>
              </article>

              <article className="resource-card">
                <h3>Kaspersky</h3>
                <p>
                  Sitio con información sobre amenazas, malware, phishing,
                  protección de dispositivos y seguridad digital.
                </p>
                <a
                  href="https://www.kaspersky.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visitar Kaspersky
                </a>
              </article>

              <article className="resource-card">
                <h3>CISA</h3>
                <p>
                  Agencia con recursos, alertas y recomendaciones de seguridad
                  para organizaciones, usuarios y áreas técnicas.
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
  );
}

export default App