import play from "../assets/play-button.svg"
import reset from "../assets/reset.svg"
import { useSelector, useDispatch } from "react-redux"
import { startChrono, resetChrono } from "../features/chrono"

export default function ToggleButton({}) {

    const dispatch = useDispatch()
    const chronoValue = useSelector(state => state.chrono)

    const toggleChrono = () => {
        !chronoValue.isPlaying ? dispatch(startChrono()) : dispatch(resetChrono())
    }

  return (
    <button
    onClick={toggleChrono}
    className="px-4 py-2 text-slate-800 flex justify-center items-center mx-auto bg-slate-300 rounded hover:bg-slate-200">
        <span className="mr-3 text-lg">{!chronoValue.isPlaying ? "Start" : "Reset"}</span>
        <img className="w-5" src={!chronoValue.isPlaying ? play : reset} alt="" />
    </button>
  )
}
