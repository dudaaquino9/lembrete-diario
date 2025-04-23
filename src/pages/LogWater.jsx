import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const convertToMl = (quantity, unit) => {
  return unit === 'Copos' ? quantity * 250 : quantity
}

export default function LogWater() {
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('Copos')
  const [waterLogs, setWaterLogs] = useState(() => {
    const stored = localStorage.getItem('waterLogs')
    return stored ? JSON.parse(stored) : []
  })

  const today = new Date().toISOString().split('T')[0]

  const handleSave = () => {
    const parsedQuantity = parseFloat(quantity)
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      alert('Digite uma quantidade válida.')
      return
    }

    const ml = convertToMl(parsedQuantity, unit)

    const updatedLogs = [...waterLogs]
    const todayIndex = updatedLogs.findIndex(log => log.date === today)

    if (todayIndex >= 0) {
      updatedLogs[todayIndex].amount += ml
    } else {
      updatedLogs.push({ date: today, amount: ml })
    }

    setWaterLogs(updatedLogs)
    localStorage.setItem('waterLogs', JSON.stringify(updatedLogs))
    setQuantity('')
  }

  const todayLog = waterLogs.find(log => log.date === today)
  const last7days = waterLogs
    .filter(log => {
      const logDate = new Date(log.date)
      const diff = (new Date() - logDate) / (1000 * 60 * 60 * 24)
      return diff <= 6
    })

  const avg =
    last7days.length > 0
      ? Math.round(last7days.reduce((sum, log) => sum + log.amount, 0) / last7days.length)
      : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#fdf6ec] px-6 py-12 flex flex-col items-center font-nunito"
    >
      <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">
        Quantos copos de <br /> água você bebeu?
      </h2>

      <input
        type="number"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        placeholder="Digite a quantidade"
        className="mb-4 p-3 rounded-lg border w-full max-w-xs text-center"
      />

      <select
        value={unit}
        onChange={e => setUnit(e.target.value)}
        className="mb-6 p-3 rounded-lg border w-full max-w-xs text-center"
      >
        <option>Copos</option>
        <option>ml</option>
      </select>

      <button
        onClick={handleSave}
        className="bg-[#800020] hover:bg-[#a0002a] text-white font-semibold py-3 px-6 rounded-lg transition-all mb-12"
      >
        Salvar Consumo
      </button>

      <div className="w-full max-w-sm bg-white rounded-lg p-6 text-center shadow">
        <h3 className="text-lg font-semibold mb-2">Resumo</h3>
        <p>Hoje: {todayLog ? `${todayLog.amount} ml` : 'Sem registro'}</p>
        <p>Média: {avg} ml</p>
      </div>
    </motion.div>
  )
}
