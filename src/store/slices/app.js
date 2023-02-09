import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    isSVGLoaded: false,
    mapContext: "list", // can either be list, drawing, pin-select, region-select. drawing means drawing tools are active. list means dropping pin and selecting region is active
    ifPositionChanged: false,
    selectedItemId: null,
}

export const modalsSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setSVGLoaded: (state, action) => {
            state.isSVGLoaded = action.payload
        },
        setMapContext: (state, action) => {
            state.mapContext = action.payload
            if (action.payload === "list" || action.payload === "drawing") {
                state.selectedItemId = null
            }
        },
        setIfPostionChanged: (state, action) => {
            state.ifPositionChanged = action.payload
        },
        setSelectedItemId: (state, action) => {
            state.selectedItemId = action.payload
        },
    },
})

export const {
    setSVGLoaded,
    setMapContext,
    setIfPostionChanged,
    setSelectedItemId,
} = modalsSlice.actions

export default modalsSlice.reducer
