import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IMenu} from "../global-interface/global-interface.ts";

const initialState = {
    basket:<IMenu[]> []
}
export const basketSlice = createSlice({
    name: 'Basket',
    initialState,
    reducers: {
        addDishToBasket: (state, action: PayloadAction<IMenu>) => {
            state.basket.push(action.payload)
        },
        removeBasket: (state) => {
            state.basket.splice(0, state.basket.length)
        },
        plusQuantity: (state, action: PayloadAction<number>) => {
            const find = state.basket.find(el => el.id === action.payload)
            if (find){
                find.quantity++
            }
        },
        minQuantity: (state, action: PayloadAction<number>) => {
            const find = state.basket.find(el => el.id === action.payload)
            const index = state.basket.findIndex(el => el.id === action.payload)
            console.log(index)
            if (find){
                find.quantity--
                if (find.quantity <= 0){
                    state.basket.splice(index, 1)
                }
            }
        }
    }
})

export const {actions, reducer} = basketSlice