import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useRutas from '../hooks/useRutas'
import { toast } from 'react-toastify'
import Mapa from '../components/Mapa'

function Rutas() {
  const { rutas, marcarLlegada } = useRutas()
  const [infoMapa, setInfoMapa] = useState({
    latitude: 0,
    longitude: 0,
    nombre: '',
    fecha: '',
  })

  const ordenarFechas = (fechas) => {
    return fechas.sort((a, b) => {
      const dateA = new Date(a.split('-').reverse().join('-'))
      const dateB = new Date(b.split('-').reverse().join('-'))
      return dateA - dateB
    })
  }

  const handleMarcarLlegada = async (rutaId, fecha, almacen) => {
    const ruta = rutas.find((ruta) => ruta.id === rutaId)

    toast.promise(
      marcarLlegada(ruta, fecha, almacen),
      {
        pending: 'Reportando llegada...',
        error: 'Error al marcar la llegada.',
        success: 'Reporte marcado con éxito.',
      },
      { position: 'bottom-center' }
    )
  }

  return (
    <>
      <h1 className='text-center'>Rutas Programadas</h1>
      <div className='row mx-4'>
        <div className='col-12 col-md-6'>
          <ul>
            {rutas.map((ruta) => (
              <li key={ruta.id}>
                ID Ruta: {ruta.id}
                <ul>
                  {ordenarFechas(Object.keys(ruta.locaciones)).map((fecha) => (
                    <li key={fecha} className='mb-4'>
                      Fecha: {fecha}
                      {ruta.locaciones[fecha].almacenesProgramados && (
                        <>
                          <p className='m-0 text-primary'>
                            Almacenes Programados
                          </p>
                          <ul>
                            {ruta.locaciones[fecha].almacenesProgramados.map(
                              (nombreAlmacen) =>
                                nombreAlmacen !== '**TIQUETERA**' && (
                                  <li key={nombreAlmacen}>
                                    {nombreAlmacen}
                                    <button
                                      onClick={() =>
                                        handleMarcarLlegada(
                                          ruta.id,
                                          fecha,
                                          nombreAlmacen
                                        )
                                      }
                                    >
                                      Marcar llegada
                                    </button>
                                  </li>
                                )
                            )}
                          </ul>
                        </>
                      )}
                      {ruta.locaciones[fecha].almacenesVisitados && (
                        <>
                          <p className='m-0 text-info'>Almacenes Visitados</p>
                          <ul>
                            {Object.entries(
                              ruta.locaciones[fecha].almacenesVisitados
                            ).map(([nombreAlmacen, almacenData]) => (
                              <li key={nombreAlmacen}>
                                {nombreAlmacen}
                                <br />
                                Hora de visita:{' '}
                                {almacenData.horaVisita && (
                                  <>
                                    {typeof almacenData.horaVisita.toDate ===
                                    'function'
                                      ? almacenData.horaVisita
                                          .toDate()
                                          .toLocaleString('es-ES')
                                      : almacenData.horaVisita.toLocaleString(
                                          'es-ES'
                                        )}
                                  </>
                                )}
                                <br />
                                Ubicación:{' '}
                                {almacenData.ubicacion && (
                                  <>
                                    {almacenData.ubicacion.latitude},{' '}
                                    {almacenData.ubicacion.longitude}
                                    <button
                                      onClick={() =>
                                        setInfoMapa({
                                          latitude:
                                            almacenData.ubicacion.latitude,
                                          longitude:
                                            almacenData.ubicacion.longitude,
                                          nombre: nombreAlmacen,
                                          fecha:
                                            typeof almacenData.horaVisita
                                              .toDate === 'function'
                                              ? almacenData.horaVisita
                                                  .toDate()
                                                  .toLocaleString('es-ES')
                                              : almacenData.horaVisita.toLocaleString(
                                                  'es-ES'
                                                ),
                                        })
                                      }
                                    >
                                      Ver
                                    </button>
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className='col-12 col-md-6'>
          {infoMapa.latitude !== 0 && infoMapa.longitude !== 0 && (
            <Mapa infoMapa={infoMapa} />
          )}
        </div>
      </div>
      <Link to='/' className='btn btn-primary'>
        Inicio
      </Link>
    </>
  )
}

export default Rutas
