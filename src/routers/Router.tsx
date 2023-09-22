import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.tsx";
import Dishes from "../pages/Dishes.tsx";
import Basket from "../pages/Basket.tsx";


const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/dish' element={<Dishes />} />
            <Route path='/basket' element={<Basket />} />
        </Routes>
    );
};

export default Router;