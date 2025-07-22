import { useDispatch } from "react-redux"
import { useRef } from "react"
import { updateChronoValues } from "../features/chrono"

export default function UpdateTimeButton({sign, type}) {
    
    const dispatch = useDispatch()
    const intervalRef = useRef(null)
    
    const handleUpdate = () => {
        dispatch(updateChronoValues({type, value: sign === "+" ? 60 : - 60}))
    }
    
    const startContinuousUpdate = () => {
        handleUpdate()
        intervalRef.current = setInterval(handleUpdate, 150)
    }
    const stopContinuousUpdate = () => {
        if(intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
    }

  return (
    <button
    onTouchStart={startContinuousUpdate}
    onTouchEnd={stopContinuousUpdate}
    onMouseLeave={stopContinuousUpdate}
    onMouseDown={startContinuousUpdate}
    onMouseUp={stopContinuousUpdate} /*onClick={handleUpdate}*/
    className="w-8 h-8 text-4xl text-slate-700 bg-slate-200 rounded flex justify-center items-center">
        <span className="relative bottom-0.5 pointer-event-none">{sign}</span>
    </button>
  )
}
