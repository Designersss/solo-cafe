import {configureStore} from "@reduxjs/toolkit";
import {basketSlice} from "../slices/basketSlice.ts";


export const store = configureStore({
    reducer: {
        basket: basketSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>