import { Link } from 'react-router-dom'


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-4xl font-bold">Monitor de Saúde</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link to="/reminders">
          <button className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-2xl shadow-md text-lg font-semibold">
            ⏰ Reminders
          </button>
        </Link>
        <Link to="/add-mood">
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 py-3 rounded-2xl shadow-md text-lg font-semibold">
            😊 Add Mood
          </button>
        </Link>
        <Link to="/log-water">
          <button className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-2xl shadow-md text-lg font-semibold">
            💧 Log Water
          </button>
        </Link>
        <Link to="/take-a-break">
          <button className="w-full bg-purple-500 hover:bg-purple-600 py-3 rounded-2xl shadow-md text-lg font-semibold">
            🧘 Take a Break
          </button>
        </Link>
      </div>
    </div>
  )
}
