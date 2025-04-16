import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Reminders() {
  const [moodTimes, setMoodTimes] = useState(3)
  const [waterTimes, setWaterTimes] = useState(6)
  const [breakTimes, setBreakTimes] = useState(4)
  const [startTime, setStartTime] = useState('08:00')
  const [endTime, setEndTime] = useState('22:00')

  const navigate = useNavigate()

  const handleSave = () => {
    // Aqui você pode salvar no localStorage, banco ou state global futuramente
    console.log({
      moodTimes,
      waterTimes,
      breakTimes,
      startTime,
      endTime
    })
    alert('Lembretes salvos com sucesso!')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[#fdf6ec] text-black px-6 py-12 flex flex-col items-center font-nunito">
      <h2 className="text-6xl text-pink-700">Configurar Lembretes</h2>
  
      <div className="w-full max-w-md flex flex-col gap-6 text-base">
        <div className="flex flex-col gap-1">
          <label>Quantas vezes por dia lembrar de cadastrar humor?</label>
          <input
            type="number"
            min="1"
            value={moodTimes}
            onChange={(e) => setMoodTimes(e.target.value)}
            className="w-20 px-2 py-1 rounded bg-white border border-gray-300"
          />
        </div>
  
        <div className="flex flex-col gap-1">
          <label>Quantas vezes por dia lembrar de beber água?</label>
          <input
            type="number"
            min="1"
            value={waterTimes}
            onChange={(e) => setWaterTimes(e.target.value)}
            className="w-20 px-2 py-1 rounded bg-white border border-gray-300"
          />
        </div>
  
        <div className="flex flex-col gap-1">
          <label>Quantas vezes por dia lembrar de alongar/pausar?</label>
          <input
            type="number"
            min="1"
            value={breakTimes}
            onChange={(e) => setBreakTimes(e.target.value)}
            className="w-20 px-2 py-1 rounded bg-white border border-gray-300"
          />
        </div>
  
        <div className="flex gap-4 mt-4">
          <div className="flex-1 flex flex-col gap-1">
            <label>Início dos lembretes</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-2 py-1 rounded bg-white border border-gray-300"
            />
          </div>
  
          <div className="flex-1 flex flex-col gap-1">
            <label>Término dos lembretes</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-2 py-1 rounded bg-white border border-gray-300"
            />
          </div>
        </div>
  
        <button
          onClick={handleSave}
          className="mt-8 bg-green-600 hover:bg-green-700 py-3 rounded-lg text-white font-semibold"
        >
          Salvar Lembretes
        </button>
      </div>
    </div>
  )  
  
}
