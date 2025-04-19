import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const emojis = [
  { label: 'Muito Feliz', emoji: '😄', value: 5 },
  { label: 'Feliz', emoji: '🙂', value: 4 },
  { label: 'Neutro', emoji: '😐', value: 3 },
  { label: 'Triste', emoji: '😢', value: 2 },
  { label: 'Muito Triste', emoji: '😭', value: 1 }
]

// Dados simulados
const fakeData = [
  { date: 'Seg', mood: 4 },
  { date: 'Ter', mood: 3 },
  { date: 'Qua', mood: 5 },
  { date: 'Qui', mood: 2 },
  { date: 'Sex', mood: 4 },
  { date: 'Sáb', mood: 3 },
  { date: 'Dom', mood: 5 }
]

export default function AddMood() {
  const [selectedMood, setSelectedMood] = useState(null)
  const navigate = useNavigate()

  const handleSave = () => {
    if (!selectedMood) {
      alert('Escolha um humor antes de salvar.')
      return
    }

    console.log('Humor salvo:', selectedMood)
    alert('Humor registrado com sucesso!')
    navigate('/')
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#fdf6ec] px-6 py-12 flex flex-col items-center font-nunito"
    >
      <h2 className="text-4xl font-bold text-blue-900 mb-10">Como você está se sentindo?</h2>

      <div className="flex flex-wrap justify-center gap-6 mb-12">
        {emojis.map(({ label, emoji }) => (
          <button
            key={label}
            onClick={() => setSelectedMood(label)}
            className={`text-4xl p-4 rounded-xl border transition 
              ${selectedMood === label 
                ? 'bg-[#800020] border-[#800020] text-white' 
                : 'bg-white border-gray-300 hover:bg-gray-100'}`}
            aria-label={label}
          >
            {emoji}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-[#800020] hover:bg-[#800020] text-white font-semibold py-3 px-6 rounded-lg transition-all mb-12"
      >
        Salvar Humor
      </button>

      <div className="w-full max-w-md h-64 bg-white p-6 rounded-lg shadow overflow-hidden">
        <h3 className="text-center text-lg font-semibold mb-4">Seu Humor na Semana</h3>
        <ResponsiveContainer width="95%" height="100%">
        <LineChart data={fakeData} margin={{ top: 10, right: 20, bottom: 20, left: 15 }}>
            <XAxis dataKey="date" />
            <YAxis 
              domain={[1, 5]}
              tick={({ x, y, payload }) => {
                const emoji = emojis.find(e => e.value === payload.value)?.emoji || payload.value
                return (
                 <text x={x - 10} y={y + 6} textAnchor="end" fontSize="12">
                    <tspan>{emoji}</tspan>
                 </text>
                )
              }}
            />
            <Tooltip formatter={(value) => emojis.find(e => e.value === value)?.label || value} />
            <Line type="monotone" dataKey="mood" stroke="#800020" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}
