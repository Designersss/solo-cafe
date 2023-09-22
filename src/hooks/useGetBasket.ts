import {useSelector} from "react-redux";
import {RootState} from "../store/store.tsx";


export const useGetBasket = () => {
    const {basket} = useSelector((state: RootState) => state.basket)
    return {basket}
}