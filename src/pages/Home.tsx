import bg from '../assets/Mask Group.png'
import TitleMenu from "../components/TitleMenu.tsx";
import DishItem from "../components/DishItem.tsx";
import {useRef, useState} from "react";
import {IMenu} from "../global-interface/global-interface.ts";
import {menu} from "../api/menu.tsx";
import bgContact from '../assets/Group 34516.png'
import {photo} from "../api/photo.tsx";
import Footer from "../components/Footer.tsx";
const Home = () => {
    const [menuAll] = useState<IMenu[]>(menu)
    const [resize] = useState({width: window.innerWidth})
    const ref = useRef<HTMLDivElement>(null)
    setTimeout(() => {
        if (ref.current){
            window.scrollTo({behavior: 'smooth', top: ref.current.offsetTop - 70})
        }
    }, 1000)
    return (
        <div>
            <section className='flex mt-24 relative rounded-md justify-center'>
                <img className='absolute w-full z-10' src={bg} alt="Задний фон"/>
                <div className='absolute z-20 mt-12'>
                    <p className='font-playfair flex justify-center text-3xl'>Кафе “Соло”</p>
                    <button className='flex items-center bg-[#F9DEC9] rounded-md px-14 py-3 mt-4'>
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_14_151)">
                                <path d="M17.3661 17.2766C17.3591 17.1241 17.1225 16.8358 16.6563 16.4121C16.5334 16.2853 16.3567 16.1103 16.1272 15.8868C15.8975 15.6632 15.6895 15.4582 15.5038 15.2721C15.3176 15.0859 15.1442 14.9075 14.9834 14.7369C14.959 14.7049 14.8812 14.61 14.7502 14.4516C14.6189 14.2935 14.5051 14.1715 14.4078 14.0854C14.3107 13.9998 14.2079 13.9415 14.0994 13.9109C13.9445 13.8673 13.7199 13.9233 13.4254 14.0785C13.1308 14.2341 12.8501 14.4141 12.5834 14.6193C12.3166 14.8245 12.0437 15.0066 11.7648 15.1664C11.4855 15.3262 11.2761 15.3864 11.1368 15.3472C11.0669 15.3275 10.9852 15.2834 10.8915 15.2155C10.798 15.1474 10.7279 15.0919 10.6808 15.0498C10.6345 15.0072 10.5569 14.927 10.4481 14.8083C10.339 14.6898 10.2781 14.6245 10.2648 14.6124C9.36924 13.7245 8.64874 12.7941 8.10311 11.8213C7.55784 10.848 7.13997 9.74796 6.85006 8.52064C6.84669 8.50295 6.82277 8.41674 6.77855 8.26221C6.73424 8.10752 6.70613 7.99939 6.69433 7.93738C6.68248 7.87556 6.67192 7.78683 6.66269 7.67137C6.65347 7.55591 6.65858 7.46333 6.67824 7.39352C6.71748 7.25414 6.87812 7.10695 7.16004 6.95217C7.44189 6.7975 7.73997 6.65974 8.05393 6.53925C8.36809 6.4188 8.66811 6.27325 8.95441 6.10309C9.24065 5.93279 9.40556 5.77028 9.44918 5.61535C9.47971 5.50695 9.48372 5.3888 9.46116 5.26124C9.43863 5.13342 9.39402 4.97263 9.32747 4.7782C9.26085 4.58384 9.22032 4.468 9.20581 4.4303C9.14421 4.20406 9.08261 3.96304 9.02067 3.70727C8.95873 3.45153 8.89256 3.16728 8.82164 2.85467C8.7508 2.54221 8.69359 2.30024 8.64972 2.12903C8.53138 1.51047 8.40904 1.15812 8.28258 1.07252C8.23487 1.034 8.15676 0.999351 8.0484 0.96884C7.83909 0.909902 7.55514 0.871687 7.19629 0.854379C6.83736 0.836915 6.5492 0.843466 6.33144 0.874279C5.89826 0.927816 5.35458 1.28479 4.70035 1.94502C4.10019 2.5619 3.69971 3.22698 3.49902 3.93969C3.44017 4.14872 3.39646 4.3559 3.36789 4.56128C3.33937 4.76646 3.32508 5.00289 3.32507 5.27052C3.32495 5.53804 3.32931 5.73803 3.33804 5.86991C3.34679 6.00189 3.36568 6.23922 3.39464 6.58197C3.42346 6.92459 3.43985 7.13398 3.44346 7.21025C3.50079 8.04593 3.63145 8.81434 3.8353 9.51567C4.16787 10.6796 4.71422 11.9396 5.47395 13.295C6.23375 14.6503 7.02331 15.7737 7.84273 16.665C8.33458 17.2048 8.92217 17.7172 9.60497 18.2023C9.66823 18.2451 9.83835 18.3682 10.1154 18.5719C10.3926 18.7754 10.5853 18.9153 10.6933 18.9917C10.8013 19.0682 10.9696 19.1763 11.1977 19.3159C11.4263 19.4556 11.6352 19.5667 11.825 19.6496C12.0152 19.732 12.2147 19.8031 12.4238 19.862C13.1365 20.0627 13.9128 20.0679 14.7524 19.8779C15.6568 19.6644 16.2449 19.3868 16.5168 19.0449C16.6569 18.8755 16.8126 18.633 16.985 18.3176C17.1576 18.0026 17.2731 17.7404 17.332 17.5311C17.3629 17.4224 17.3741 17.3379 17.3661 17.2766Z" fill="#785E00"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_14_151">
                                    <rect width="17" height="17" fill="white" transform="translate(4.60767) rotate(15.7261)"/>
                                </clipPath>
                            </defs>
                        </svg>
                        <span className='ml-2'>Позвонить</span>
                    </button>
                </div>
            </section>
            <div className='mt-72'>
                <TitleMenu linkTo={'/dish'} link={true} title={'Меню'} />
                <div className='grid-menu grid grid-cols-5 gap-5'>
                    {
                        menuAll && menuAll.slice(0, resize ? 5 : 3).map(item => <DishItem menu={item} />)
                    }
                </div>
            </div>
            <div>
                <TitleMenu linkTo={''} link={false} title={'Мероприятия'} />
                <div className='grid grid-cols-5 gap-2 mt-4 font-semibold text-[14px]'>
                    <span className='flex bg-[#F9DEC9] px-4 py-4 rounded-xl justify-center items-center col-span-1 row-span-2'>Дни рождения</span>
                    <span className='flex bg-[#F9DEC9] px-4 py-4 rounded-xl justify-center items-center col-span-2'>Кинопоказы</span>
                    <span className='flex bg-[#F9DEC9] px-4 py-4 rounded-xl justify-center items-center col-span-1'>Концерты</span>
                    <span className='flex bg-[#F9DEC9] px-4 py-4 rounded-xl justify-center items-center col-span-1  row-span-2'>Семинары</span>
                    <span className='flex bg-[#F9DEC9] px-4 py-4 rounded-xl justify-center items-center col-span-1'>Свадьбы</span>
                    <span className='flex bg-[#F9DEC9] px-4 py-4 rounded-xl justify-center items-center col-span-2'>Поминки</span>
                </div>
            </div>
            <div>
                <TitleMenu linkTo={''} link={false} title={'Конакты'} />
                <div className='relative'>
                    <img className='w-full rounded-xl' src={bgContact} alt=""/>
                    <div className='absolute flex top-16 left-4'>
                        <iframe className='map rounded-xl ' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17763.7569223407!2d40.58519532922111!3d56.18356083776729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x414c65691fbca4b5%3A0x5ca00f1318fda92b!2z0KHQvtC70L4!5e0!3m2!1sru!2sru!4v1694256323796!5m2!1sru!2sru" width="550" height="350" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        <div className='contact ml-4'>
                            <span className='block bg-[#fff] opacity-60 rounded-md px-3 py-6 mt-4'>Телефон:  +7(904)-253-50-30</span>
                            <span className='block bg-[#fff] opacity-60 rounded-md px-3 py-6 mt-4'>Почта:  solo-cafe@gmail.com</span>
                            <span className='block bg-[#fff] opacity-60 rounded-md px-3 py-6 mt-4'>Адрес:  г.Владимир, мкр.Оргтруд, ул.Новая, дом 1</span>
                        </div>
                    </div>
                </div>
            </div>
            <div >
                <TitleMenu linkTo={'/photo'} link={true} title={'Фото'} />
                <div className='grid grid-cols-4 gap-5 mt-2'>
                    {
                        photo.slice(0, 4).map(photo => <img className='w-full h-72 rounded-xl object-cover' src={photo.img} key={photo.id} alt=""/>)
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;