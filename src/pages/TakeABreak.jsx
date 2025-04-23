import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function TakeABreak() {
  const [breakLogs, setBreakLogs] = useState(() => {
    const stored = localStorage.getItem('breakLogs')
    return stored ? JSON.parse(stored) : []
  })

  const today = new Date().toISOString().split('T')[0]

  const handleRegisterBreak = () => {
    const updatedLogs = [...breakLogs]
    const todayIndex = updatedLogs.findIndex(log => log.date === today)

    if (todayIndex >= 0) {
      updatedLogs[todayIndex].count += 1
    } else {
      updatedLogs.push({ date: today, count: 1 })
    }

    setBreakLogs(updatedLogs)
    localStorage.setItem('breakLogs', JSON.stringify(updatedLogs))
  }

  const todayBreaks = breakLogs.find(log => log.date === today)?.count || 0

  const last7days = breakLogs
    .filter(log => {
      const logDate = new Date(log.date)
      const diff = (new Date() - logDate) / (1000 * 60 * 60 * 24)
      return diff <= 6
    })

  const average =
    last7days.length > 0
      ? Math.round(last7days.reduce((sum, log) => sum + log.count, 0) / last7days.length)
      : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#fdf6ec] px-6 py-12 flex flex-col items-center font-nunito"
    >
      <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">
        Você fez alguma pausa ou alongamento?
      </h2>

      <button
        onClick={handleRegisterBreak}
        className="bg-[#800020] hover:bg-[#a0002a] text-white font-semibold py-3 px-6 rounded-lg transition-all mb-12"
      >
        Registrar Pausa
      </button>

      <div className="w-full max-w-sm bg-white rounded-lg p-6 text-center shadow">
        <h3 className="text-lg font-semibold mb-2">Resumo</h3>
        <p>Hoje: {todayBreaks} {todayBreaks === 1 ? 'vez' : 'vezes'}</p>
        <p>Média: {average} {average === 1 ? 'vez' : 'vezes'}</p>
      </div>
    </motion.div>
  )
}
