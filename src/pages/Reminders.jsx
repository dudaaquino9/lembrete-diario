import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Reminders() {
  const navigate = useNavigate()

  const [moodTimes, setMoodTimes] = useState(3)
  const [waterTimes, setWaterTimes] = useState(6)
  const [breakTimes, setBreakTimes] = useState(4)
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('22:00')

  useEffect(() => {
    const stored = localStorage.getItem('reminderSettings')
    if (stored) {
      const parsed = JSON.parse(stored)
      setMoodTimes(parsed.moodTimes)
      setWaterTimes(parsed.waterTimes)
      setBreakTimes(parsed.breakTimes)
      setStartTime(parsed.startTime)
      setEndTime(parsed.endTime)
    }
  }, [])

  const handleSave = () => {
    const reminderSettings = {
      moodTimes: Number(moodTimes),
      waterTimes: Number(waterTimes),
      breakTimes: Number(breakTimes),
      startTime,
      endTime
    }

    localStorage.setItem('reminderSettings', JSON.stringify(reminderSettings))
    alert('Lembretes salvos com sucesso!')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#fdf6ec] text-black px-6 py-12 flex flex-col items-center font-nunito">
      <h2 className="text-4xl text-blue-900 font-bold mb-10 text-center">
        Configurar Lembretes
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-left">
            Quantas vezes por dia lembrar de cadastrar humor?
          </label>
          <input
            type="number"
            min="1"
            value={moodTimes}
            onChange={(e) => setMoodTimes(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 bg-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-left">
            Quantas vezes por dia lembrar de beber água?
          </label>
          <input
            type="number"
            min="1"
            value={waterTimes}
            onChange={(e) => setWaterTimes(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 bg-white"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-left">
            Quantas vezes por dia lembrar de alongar/pausar?
          </label>
          <input
            type="number"
            min="1"
            value={breakTimes}
            onChange={(e) => setBreakTimes(e.target.value)}
            className="w-full px-3 py-2 rounded border border-gray-300 bg-white"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold text-left">
              Início dos lembretes
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 bg-white"
            />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold text-left">
              Término dos lembretes
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-300 bg-white"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-8 bg-[#800020] hover:bg-[#a0002a] py-3 rounded-lg text-white font-semibold transition-all duration-300"
        >
          Salvar Lembretes
        </button>
      </motion.div>
    </div>
  )
}
