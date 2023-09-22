import TitleMenu from "../components/TitleMenu.tsx";
import {menu} from "../api/menu.tsx";
import DishItem from "../components/DishItem.tsx";

const Dishes = () => {
    return (
        <div className='mt-24'>
            <TitleMenu title={'Меню'} link={false} linkTo={''} />
            <div className='grid grid-cols-5 gap-5'>
                {
                    menu.map(dish => <DishItem key={dish.id} menu={dish} />)
                }
            </div>
        </div>
    );
};

export default Dishes;