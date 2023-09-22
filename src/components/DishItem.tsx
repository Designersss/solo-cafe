import {IMenu} from "../global-interface/global-interface.ts";
import {FC} from "react";
import {useActions} from "../hooks/useActions.tsx";
import {useGetBasket} from "../hooks/useGetBasket.ts";

interface DishMenuProps {
    menu: IMenu
}
const DishItem:FC<DishMenuProps> = ({menu}) => {
    const {addDishToBasket} = useActions()
    const {plusQuantity} = useActions()
    const {minQuantity} = useActions()
    const {basket} = useGetBasket()
    const addToBasket = () => {
        addDishToBasket(menu)
    }
    return (
        <div className='bg-[#EF9556]  px-4 py-2 rounded-xl text-white mt-12'>
            <img className='flex m-auto -mt-12 rounded-full w-24 h-24' src={menu.img} alt=""/>
            <div className='flex mt-2 items-center'>
                <p className='text-[14px] font-normal leading-3 w-full line-clamp-2'>{menu.title}</p>
                <span className='bg-[#FFECB1] text-[#FF9B00] text-[12px] font-bold px-2 py-1 rounded-md'>{menu.price}₽</span>
            </div>
            {
                basket.find(item => item.id === menu.id)
                    ? <div className='flex items-center justify-between'>
                        <button className='flex w-14 justify-center bg-[#FFECB1] text-[#FF9B00] text-[12px] px-2 py-1 rounded-md mt-2' onClick={() => plusQuantity(menu.id)}>+</button>
                            {
                                basket.map(item => item.id === menu.id && <span className='flex mt-2' key={item.id}>{item.quantity}</span>)
                            }
                        <button className='flex w-14 justify-center bg-[#FFECB1] text-[#FF9B00] text-[12px] px-2 py-1 rounded-md mt-2' onClick={() => minQuantity(menu.id)}>-</button>
                    </div>
                    : <button onClick={addToBasket} className='flex w-full justify-center bg-[#FFECB1] text-[#FF9B00] text-[12px] px-2 py-1 rounded-md mt-2'>В корзину</button>
            }
        </div>
    );
};

export default DishItem;