import {IMenu} from "../global-interface/global-interface.ts";
import {useActions} from "../hooks/useActions.tsx";
import {FC} from "react";

interface DishBasketProps {
    dish: IMenu
}

const DishBasket:FC<DishBasketProps> = ({dish}) => {
    const {plusQuantity} = useActions()
    const {minQuantity} = useActions()
    return (
        <div className='bg-[#EF9556]  px-4 py-2 rounded-xl text-white mt-12'>
            <img className='flex m-auto -mt-12 rounded-full w-24 h-24' src={dish.img} alt=""/>
            <div className='flex mt-2 items-center'>
                <p className='text-[14px] font-normal leading-3 w-full line-clamp-2'>{dish.title}</p>
                <span
                    className='bg-[#FFECB1] text-[#FF9B00] text-[12px] font-bold px-2 py-1 rounded-md'>{dish.price * dish.quantity}₽</span>
            </div>
            <div className='flex items-center justify-between'>
                <button
                    className='flex w-14 justify-center bg-[#FFECB1] text-[#FF9B00] text-[12px] px-2 py-1 rounded-md mt-2'
                    onClick={() => plusQuantity(dish.id)}>+
                </button>
                <span className='flex mt-2' key={dish.id}>{dish.quantity}</span>
                <button
                    className='flex w-14 justify-center bg-[#FFECB1] text-[#FF9B00] text-[12px] px-2 py-1 rounded-md mt-2'
                    onClick={() => minQuantity(dish.id)}>-
                </button>
            </div>
        </div>
    );
};

export default DishBasket;