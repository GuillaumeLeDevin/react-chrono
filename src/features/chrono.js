import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    session: {
        value: 1500,
        runningValue: 1500
    },
    pause: {
        value: 300,
        runningValue: 300
    },
    isPlaying: false,
    intervalID: undefined,
    cycles:0,
    displayedValue: {
        value: 1500,
        heading: "Work"
    }
}

export const chrono = createSlice({
    name: "chrono",
    initialState,
    reducers: {
        updateChronoValues: (state, action) => {
            const chosenState = state[action.payload.type]
            
            // Never less than 1
            if (chosenState.value + action.payload.value === 0) return
            else if(action.payload.type === "session"){

                if(!state.isPlaying){
                    chosenState.value = chosenState.value + action.payload.value
                    chosenState.runningValue = chosenState.runningValue + action.payload.value
                    state.displayedValue.value = chosenState.runningValue
                }
                else {
                    console.log(chosenState.value)
                    chosenState.value = chosenState.value + action.payload.value
                    console.log(chosenState)
                }
            }
            else if(action.payload.type === "pause"){                    
                chosenState.value = chosenState.value + action.payload.value
            }
        },
        tick: (state, action) => {
            if(state.session.runningValue > 0) {
                console.log(state.session.runningValue)
                state.session.runningValue--
                state.displayedValue.value = state.session.runningValue
                state.displayedValue.heading = "Work"
                console.log(state.pause.runningValue)
            }
            else if(state.pause.runningValue > 0) {
                console.log(state.pause.runningValue)
                state.pause.runningValue--
                state.displayedValue.value = state.pause.runningValue
                state.displayedValue.heading = "Break"
            }
            else {
                state.cycles++
                state.session.runningValue = state.session.value - 1
                state.displayedValue.runningValue = state.session.value - 1
                state.displayedValue.heading = "Work"
                state.pause.runningValue = state.pause.value
            }
        },
        setUpChrono: (state, action) => {
            state.isPlaying = true
            state.intervalID = action.payload
        },
        resetChrono : (state, action) => {
            window.clearInterval(state.intervalID)
            state.isPlaying = false
            state.session.runningValue = state.session.value
            state.pause.runningValue = state.pause.value
            state.displayedValue.value = state.session.runningValue
            state.cycles = 0
        }
    }
})

export function startChrono(action) {
    return function(dispatch, getState){
        const intervalID = setInterval(() => {
            dispatch(tick())
        }, 1000)

        dispatch(setUpChrono(intervalID))

        dispatch(tick())
    }
}

export const { updateChronoValues, setUpChrono, resetChrono, tick } = chrono.actions
export default chrono.reducer