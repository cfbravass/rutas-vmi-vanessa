import React, { useState } from 'react'
import { startOfWeek, addWeeks, addDays, format } from 'date-fns'
import useVendedores from '../hooks/useVendedores'
import useAlmacenes from '../hooks/useAlmacenes'
import useRutas from '../hooks/useRutas'
import { toast } from 'react-toastify'

function ProgramarRuta() {
  const vendedores = useVendedores()
  const almacenes = useAlmacenes()
  const { crearRuta } = useRutas()
  const [selectedVendedor, setSelectedVendedor] = useState('')
  const [selectedLocaciones, setSelectedLocaciones] = useState({})

  const handleVendedorChange = (e) => {
    setSelectedVendedor(e.target.value)
    setSelectedLocaciones({})
  }

  const handleAlmacenChange = (e, fecha, almacenIndex) => {
    const selectedValue = e.target.value
    setSelectedLocaciones((prevAlmacenes) => {
      const updatedAlmacenes = { ...prevAlmacenes }
      if (!updatedAlmacenes[fecha]) {
        updatedAlmacenes[fecha] = {}
      }
      if (selectedValue === '') {
        delete updatedAlmacenes[fecha][almacenIndex]
      } else {
        updatedAlmacenes[fecha][almacenIndex] = selectedValue
      }
      return updatedAlmacenes
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const locaciones = {}

    for (const [fecha, programacion] of Object.entries(selectedLocaciones)) {
      const fechaProgramadas = []

      Object.values(programacion).forEach((value) => {
        fechaProgramadas.push(value)
      })

      locaciones[fecha] = {
        almacenesVisitados: [],
        almacenesProgramados: fechaProgramadas,
      }
    }

    const datosRuta = {
      idVendedor: selectedVendedor,
      locaciones,
    }

    await toast.promise(
      crearRuta(datosRuta),
      {
        pending: 'Asignando la ruta...',
        error: 'Error al asignar la ruta',
        success: 'Se ha asignado la ruta',
      },
      { position: 'bottom-center' }
    )

    setSelectedVendedor('')
    setSelectedLocaciones({})
  }

  const renderFechaHeaders = () => {
    const startDate = startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 })
    const daysOfWeek = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ]
    const fechas = []
    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, i)
      const formattedDate = format(date, 'dd-MM-yyyy')
      fechas.push(formattedDate)
    }
    return fechas.map((fecha, index) => (
      <th key={index} className='text-center'>
        {daysOfWeek[index]} {fecha}
      </th>
    ))
  }

  const renderAlmacenSelectors = () => {
    const startDate = startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 })
    const almacenSelectors = []
    for (let i = 0; i < 7; i++) {
      const date = addDays(startDate, i)
      const formattedDate = format(date, 'dd-MM-yyyy')
      const firstAlmacenValue =
        (selectedLocaciones[formattedDate] &&
          selectedLocaciones[formattedDate][1]) ||
        ''

      const almacenSelector = (
        <td key={i}>
          {selectedVendedor && ( // Verificar si se ha seleccionado un vendedor
            <div key={1}>
              <select
                className='form-select mb-2'
                value={firstAlmacenValue}
                onChange={
                  (e) => handleAlmacenChange(e, formattedDate, 1) // Manejar el cambio del primer selector
                }
                id={`almacen-${formattedDate}-1`}
              >
                <option value=''>...</option>
                {almacenes.map((almacen) => (
                  <option key={almacen.id} value={almacen.nombre}>
                    {almacen.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}
          {firstAlmacenValue && ( // Mostrar el segundo selector solo si se seleccionó el primer almacén
            <div key={2}>
              <select
                className='form-select mb-2'
                value={selectedLocaciones[formattedDate]?.[2] || ''}
                onChange={
                  (e) => handleAlmacenChange(e, formattedDate, 2) // Manejar el cambio del segundo selector
                }
                id={`almacen-${formattedDate}-2`}
              >
                <option value=''>...</option>
                {almacenes.map((almacen) => (
                  <option key={almacen.id} value={almacen.nombre}>
                    {almacen.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}
        </td>
      )
      almacenSelectors.push(almacenSelector)
    }
    return almacenSelectors
  }

  return (
    <div>
      <h1>Programar Ruta</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-floating mb-3'>
          <select
            className='form-select'
            value={selectedVendedor}
            onChange={handleVendedorChange}
          >
            <option value='' disabled>
              Seleccionar vendedor...
            </option>
            {vendedores.map((vendedor) => (
              <option key={vendedor.id} value={vendedor.id}>
                {vendedor.nombre}
              </option>
            ))}
          </select>
          <label htmlFor='selectorVendedor'>VENDEDOR:</label>
        </div>
        {selectedVendedor && (
          <table className='table'>
            <thead>
              <tr>{renderFechaHeaders()}</tr>
            </thead>
            <tbody>
              <tr>{renderAlmacenSelectors()}</tr>
            </tbody>
          </table>
        )}
        <button type='submit' className='btn btn-primary mb-2'>
          Guardar
        </button>
      </form>
    </div>
  )
}

export default ProgramarRuta
