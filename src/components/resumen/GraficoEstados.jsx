import { useSelector } from 'react-redux'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { ESTADOS } from '../../utils/estados'

// Igual que el TemperatureChart de clase: lee los datos de Redux y arma el gráfico
const GraficoEstados = () => {
  const conteos = useSelector(state => state.resumen.conteos)
  const total = useSelector(state => state.resumen.total)

  // Chart.js trae cada pieza por separado y hay que "registrar" las que se usan.
  // La dona usa ArcElement (los arcos); Tooltip y Legend son el cartelito y las referencias
  ChartJS.register(ArcElement, Tooltip, Legend)

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        // Colores del tema oscuro (por defecto Chart.js usa gris sobre blanco)
        labels: { color: '#cbd5e1', boxWidth: 12, padding: 14 }
      }
    }
  }

  // Un dato por estado, en el mismo orden que ESTADOS
  const data = {
    labels: ESTADOS.map(e => e.texto),
    datasets: [
      {
        label: 'Postulaciones',
        data: ESTADOS.map(e => conteos[e.valor]),
        backgroundColor: ESTADOS.map(e => e.color),
        borderColor: '#1e293b', // mismo color que la tarjeta: separa los arcos
        borderWidth: 3
      }
    ]
  }

  return (
    <article className="tarjeta">
      <h2 className="tarjeta__titulo">Postulaciones por estado</h2>

      {total === 0 ? (
        <p className="texto-suave">Cuando agregues postulaciones vas a ver acá cómo se reparten.</p>
      ) : (
        <div className="grafico">
          <Doughnut options={options} data={data} />
        </div>
      )}
    </article>
  )
}

export default GraficoEstados
