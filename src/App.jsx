import UpdateTimeButton from "./components/UpdateTimeButton"
import ToggleButton from "./components/ToggleButton"
import { useSelector } from "react-redux"
import getFormattedValue from "./Utils/getFormattedValue"

function App() {

  const chronoValues = useSelector(state => state.chrono)

  return (
    <div className="bg-slate-700 min-h-screen pt-20 text-slate-100">
      <div className="max-w-xl mx-auto border border-slate-500 rounded p-10">
        <h1 className="text-center text-3xl mb-8">Pomodoro App</h1>
        <div className="flex items-center justify-center mb-8">

          {/* Session Block */}
          <div className="mr-10">
            <p className="text-center mb-1">Session</p>
            <div className="flex">
              <UpdateTimeButton sign={"+"} type={"session"}/>
              <p className="mx-4 text-xl">{chronoValues.session.value / 60}</p>
              <UpdateTimeButton sign={"-"} type={"session"}/>
            </div>
          </div>

          {/* Pause Block */}
          <div>
            <p className="text-center mb-1">Pause</p>
            <div className="flex">
              <UpdateTimeButton sign={"+"} type={"pause"}/>
              <p className="mx-4 text-xl">{chronoValues.pause.value / 60}</p>
              <UpdateTimeButton sign={"-"} type={"pause"}/>
            </div>
          </div>
        </div>

        <p className="text-center mb-2 text-xl font-semibold">{chronoValues.displayedValue.heading}</p>

        <p className="text-center flex justify-center mb-1">
          <span className="bg-slate-300 rounded p-4 text-4xl text-slate-900">{getFormattedValue(chronoValues.displayedValue.value)}</span>
        </p>

        <p className="mb-10 text-center">Passed cycle(s): {chronoValues.cycles}</p>

        <ToggleButton />
        
      </div>
    </div>
  )
}

export default App
