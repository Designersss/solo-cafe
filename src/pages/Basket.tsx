import {useGetBasket} from "../hooks/useGetBasket.ts";
import DishBasket from "../components/DishBasket.tsx";
import TitleMenu from "../components/TitleMenu.tsx";
import {Link} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import {useActions} from "../hooks/useActions.tsx";

const Basket = () => {
    const {basket} = useGetBasket()
    const {removeBasket} = useActions()
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress ] = useState('')
    console.log(basket)
    let sum = 0
    for (let i = 0; i < basket.length; i++){
        sum += basket[i].price * basket[i].quantity
    }
    const sendTelegram = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const CHAT_ID = '-1001846644565'
        const TOKEN = '6570921165:AAH0_JGb8HHotXBAW1uDIQ3LqhpZhHVlk-g'
        const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`
        const orderNumber = Math.floor(Math.random() * 2312)
        let message = `
<b>Заказ № ${orderNumber}</b>\n
<b>Заказчик:</b> ${name + ' ' + surname}
<b>Номер:</b> ${number}
<b>Адрес:</b> ${address}\n
<b>${basket.map(el => el.title + (el.quantity === 1 ? '' :`(X${el.quantity})`) + '\n').join('')}</b>
К оплате: ${sum}
`
        if (basket.length === 0 ){
            alert('Корзина пуста')
        } else if (name === '' || surname === '' || number === '' || address === ''){
            alert('Заполните все поля')
        } else {
            axios.post(URL_API, {
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: message,
            }).then(() => {
                setName('')
                setSurname('')
                setNumber('')
                setAddress('')
            }).then(() => {
                localStorage.setItem('lastShop', String(orderNumber))
            }).then(() => {
                removeBasket()
            })
        }
    }
     return (
        <div className='mt-24 mb-24'>
            {
                localStorage.getItem('lastShop') !== null ?
            <div>
                <h3 className='flex justify-center items-center'><span className='flex w-32 h-0.5 mx-4 bg-[#FFEAA0]'></span>Ваш последний заказ<span className='flex w-32 h-0.5 mx-4 bg-[#FFEAA0]'></span></h3>
                <span className='flex w-96 bg-[#FFECB1] justify-center m-auto rounded-md text-[#FF9B00] px-4 py-2'>Номер заказа: {localStorage.getItem('lastShop')}</span>
                <div className='mt-4 w-96 bg-[#FFECB1] text-[12px] m-auto rounded-md text-[#FF9B00] px-4 py-2'>
                    <p>Если вы хотите отменить заказ или добавить что-либо, напишите номер заказа в чат и что хотите сделать, либо позвоните по номеру телефона <Link className='bg-[#EF9556] text-white text-[12px] px-1 rounded-md' to='tel: 123'>+7(904)253-50-30</Link> </p>
                    <div className='flex items-center justify-center mt-4'>
                        <Link className='flex' to='/'>
                            <svg width="40" height="40" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M71.4 44.764C73.892 45.295 75.802 46.242 77.434 47.77C79.534 49.753 80.685 52.153 81.191 55.601C81.533 57.849 81.393 58.733 80.596 59.466C79.85 60.148 78.471 60.173 77.636 59.529C77.029 59.074 76.839 58.594 76.7 57.293C76.536 55.562 76.232 54.35 75.713 53.226C74.6 50.839 72.639 49.601 69.325 49.197C67.769 49.007 67.301 48.831 66.795 48.237C65.871 47.138 66.226 45.357 67.503 44.7C67.984 44.46 68.186 44.435 69.249 44.498C69.908 44.536 70.882 44.65 71.4 44.764ZM68.706 35.227C76.385 36.351 82.33 39.913 86.227 45.698C88.416 48.957 89.782 52.784 90.25 56.889C90.414 58.392 90.414 61.133 90.237 61.588C90.072 62.017 89.541 62.598 89.086 62.838C88.593 63.091 87.543 63.065 86.961 62.762C85.987 62.269 85.696 61.486 85.696 59.364C85.696 56.093 84.848 52.644 83.381 49.966C81.711 46.909 79.282 44.383 76.322 42.627C73.779 41.111 70.022 39.987 66.594 39.709C65.354 39.608 64.671 39.355 64.203 38.812C63.482 37.991 63.406 36.879 64.013 35.957C64.67 34.937 65.682 34.772 68.706 35.227ZM38.914 27.434C39.357 27.586 40.04 27.939 40.432 28.192C42.835 29.784 49.527 38.335 51.716 42.604C52.968 45.042 53.386 46.848 52.994 48.187C52.589 49.627 51.919 50.385 48.92 52.797C47.718 53.769 46.592 54.767 46.415 55.033C45.96 55.69 45.593 56.978 45.593 57.888C45.606 59.997 46.972 63.825 48.768 66.768C50.159 69.054 52.651 71.984 55.118 74.233C58.015 76.886 60.57 78.692 63.455 80.119C67.162 81.963 69.426 82.43 71.083 81.66C71.5 81.47 71.943 81.218 72.082 81.104C72.208 80.99 73.183 79.803 74.245 78.489C76.294 75.912 76.762 75.495 78.167 75.015C79.951 74.409 81.772 74.573 83.607 75.508C84.999 76.228 88.035 78.11 89.995 79.474C92.576 81.28 98.091 85.777 98.838 86.674C100.153 88.291 100.381 90.362 99.496 92.649C98.56 95.061 94.917 99.583 92.374 101.516C90.072 103.259 88.44 103.928 86.289 104.029C84.518 104.117 83.784 103.966 81.52 103.031C63.76 95.718 49.579 84.805 38.32 69.811C32.438 61.98 27.959 53.858 24.898 45.433C23.114 40.52 23.026 38.385 24.493 35.871C25.126 34.81 27.82 32.183 29.781 30.718C33.045 28.293 34.55 27.396 35.752 27.143C36.574 26.966 38.004 27.105 38.914 27.434ZM67.833 26.07C72.185 26.613 75.701 27.661 79.56 29.544C83.355 31.401 85.784 33.157 88.997 36.352C92.008 39.371 93.678 41.657 95.449 45.206C97.916 50.157 99.32 56.044 99.56 62.523C99.649 64.733 99.585 65.226 99.079 65.858C98.118 67.083 96.005 66.881 95.284 65.504C95.056 65.049 94.993 64.658 94.917 62.889C94.79 60.173 94.601 58.418 94.221 56.321C92.728 48.098 88.781 41.53 82.481 36.818C77.231 32.877 71.804 30.957 64.695 30.54C62.291 30.401 61.874 30.313 61.33 29.896C60.318 29.1 60.267 27.231 61.241 26.359C61.836 25.816 62.253 25.74 64.315 25.803C65.392 25.842 66.973 25.969 67.833 26.07ZM64 0C99.346 0 128 28.654 128 64C128 99.346 99.346 128 64 128C28.654 128 0 99.346 0 64C0 28.654 28.654 0 64 0Z" fill="#7F4DA0"/>
                            </svg>
                        </Link>
                        <Link className='flex ml-4' to='/'>
                            <svg width="40" height="40" viewBox="0 0 86 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M26.3184 76.6247L6.11676 83.0536L0 85L8.59305 59.619C7.15103 56.9684 6.00878 54.1603 5.19498 51.2524C4.20776 47.724 3.70963 44.0774 3.70963 40.4137C3.70963 29.6326 7.99906 19.4117 15.6458 11.8265C23.3174 4.21663 33.6148 0 44.4182 0C55.2184 0 65.5102 4.2217 73.1753 11.8327C80.8188 19.4224 85.1028 29.6457 85.1028 40.4266C85.1028 51.2057 80.8141 61.4255 73.1697 69.0102C65.5009 76.6189 55.2069 80.8368 44.4062 80.8368C40.9795 80.8368 37.5656 80.4138 34.2454 79.5644C31.5072 78.864 28.8498 77.877 26.3183 76.6246L26.3184 76.6247Z" fill="#EEEEEE"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M81.8572 40.4266C81.8572 30.1604 77.6654 20.8651 70.8883 14.1357C64.1121 7.40728 54.7532 3.24561 44.4182 3.24561C34.0742 3.24561 24.7108 7.40586 17.9314 14.1307C11.149 20.8585 6.95505 30.152 6.95505 40.4136C6.95505 43.8582 7.43145 47.2009 8.32038 50.3778C9.20368 53.5342 10.4958 56.5228 12.1338 59.2812L5.64538 78.4457L5.13246 79.9608L6.65648 79.4759L26.6131 73.1249C29.2552 74.5468 32.0821 75.6609 35.0497 76.4202C38.0397 77.1851 41.1734 77.5913 44.4061 77.5913C54.7455 77.5913 64.106 73.4308 70.8836 66.7063C77.6641 59.9789 81.8572 50.6863 81.8572 40.4266Z" fill="#54CC61"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M38.328 30.2771C38.1636 29.9459 37.2146 27.6539 36.3399 25.5413C35.7808 24.1908 35.2476 22.9029 35.143 22.6537C34.1579 20.3051 33.0692 20.3759 32.2341 20.4302C32.1793 20.4337 32.1265 20.4372 32.0559 20.4372C31.7645 20.4372 31.4781 20.419 31.1813 20.4003C30.8103 20.3767 30.4252 20.3523 30.0612 20.3523C29.5774 20.3523 28.9183 20.4527 28.2243 20.7775C27.7096 21.0184 27.1786 21.3811 26.6927 21.9151C26.6218 21.9916 26.5684 22.0478 26.5104 22.1087C25.3542 23.3241 22.8336 25.9735 22.8336 31.0617C22.8336 36.3992 26.6826 41.475 27.2482 42.2204L27.2461 42.2219L27.2514 42.2288L27.2577 42.2352C27.2799 42.2637 27.3616 42.3832 27.4823 42.5599C28.9038 44.6388 35.4386 54.1961 45.3726 58.0761C54.3847 61.5927 56.0155 61.198 57.4721 60.8456C57.7201 60.7856 57.9621 60.727 58.2241 60.7028C59.4036 60.5919 61.3333 59.7844 62.9572 58.6505C64.3043 57.7098 65.4802 56.521 65.9303 55.2693C66.332 54.1501 66.5591 53.1104 66.6644 52.2545C66.8174 51.0114 66.6963 50.0333 66.4701 49.6554L66.4669 49.6522C66.123 49.0856 65.5281 48.8048 64.6358 48.3834C64.4784 48.3091 64.3102 48.2297 64.1485 48.1515L64.1491 48.1504C63.5337 47.8375 61.4048 46.7966 59.5851 45.9364C58.4092 45.3805 57.3643 44.9029 56.9506 44.7544C56.3686 44.5454 55.8615 44.3874 55.3178 44.4486C54.7014 44.5182 54.1637 44.8357 53.6652 45.5906L53.6637 45.5896C53.4134 45.9657 52.9724 46.5295 52.4905 47.1199C51.7271 48.055 50.8164 49.1051 50.4283 49.5459V49.5491C50.2626 49.7378 50.1197 49.8406 49.9796 49.8575C49.7851 49.881 49.5178 49.8013 49.1476 49.6195C48.911 49.5011 48.6804 49.4015 48.3959 49.2787C46.9568 48.6578 44.1539 47.4485 40.9593 44.6201C39.8166 43.6087 38.811 42.5031 37.9711 41.4656C36.6118 39.7866 35.6932 38.2907 35.3281 37.6606C35.04 37.1665 35.3601 36.8461 35.6557 36.5505L35.6542 36.5488C35.9811 36.2224 36.351 35.7778 36.7222 35.3317C36.8912 35.1285 37.0603 34.9252 37.266 34.6883L37.2691 34.6851C37.7698 34.103 37.9773 33.679 38.2574 33.1069C38.3062 33.0073 38.3573 32.9029 38.4087 32.8003L38.4119 32.7972C38.6582 32.3008 38.7212 31.8286 38.6753 31.3862C38.6327 30.9744 38.4949 30.6069 38.3267 30.2776L38.328 30.2771Z" fill="#FFFFFE"/>
                            </svg>
                        </Link>
                        <Link className='flex ml-4' to='/'>
                            <svg width="40" height="40" viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_49_4)">
                                    <path d="M101.15 0H17.85C7.99172 0 0 7.99172 0 17.85V101.15C0 111.008 7.99172 119 17.85 119H101.15C111.008 119 119 111.008 119 101.15V17.85C119 7.99172 111.008 0 101.15 0Z" fill="#37AEE2"/>
                                    <path d="M46.252 93.8984C43.6953 93.8984 43.9277 92.9688 43.2305 90.6445L35.793 66.2402L92.7363 32.7715" fill="#C8DAEA"/>
                                    <path d="M46.252 93.8984C47.8789 93.8984 48.8086 92.9688 49.9707 92.0391L60.4297 82.0449L47.4141 74.1426" fill="#A9C9DD"/>
                                    <path d="M47.4141 74.1425L78.791 97.1522C82.0449 99.244 84.834 98.0819 85.7637 93.8983L98.5469 33.9335C99.709 28.8202 96.4551 26.496 92.9688 28.1229L18.3613 56.9432C13.4805 58.8026 13.4805 61.8241 17.4316 62.9862L36.7227 69.0292L80.8828 40.9061C82.9746 39.744 84.834 40.2089 83.4395 41.8358" fill="#F6FBFE"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_49_4">
                                        <rect width="119" height="119" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
                    :
                    <></>
            }
            <TitleMenu title={'Корзина'} link={false} linkTo={''} />
            <div className='grid grid-cols-4 gap-5'>
                {
                    basket.length ?
                        basket.map(dish => <DishBasket dish={dish} key={dish.id}/>) : <span
                            className='flex w-full justify-center bg-[#EF9556] text-white text-[12px] px-2 py-1 rounded-md mt-2'>Корзина пуста, добавьте что-нибудь</span>
                }
            </div>
            <TitleMenu title={'Контакты'} link={false} linkTo={''} />
            <form className='grid grid-cols-2 gap-10 mt-4'>
                <label className='relative'>
                    <span className='absolute bg-[#EF9556] text-white text-[12px] px-6 py-1 rounded-md -mt-4 ml-4 z-10'>Имя</span>
                    <input value={name} onChange={e => setName(e.target.value)} className='rounded-xl z-0 w-full outline-0 px-4 py-3' type="text"/>
                </label>
                <label className='relative'>
                    <span className='absolute bg-[#EF9556] text-white text-[12px] px-6 py-1 rounded-md -mt-4 ml-4 z-10'>Фамилия</span>
                    <input value={surname} onChange={e => setSurname(e.target.value)} className='rounded-xl z-0 w-full outline-0 px-4 py-3' type="text"/>
                </label>
                <label className='relative'>
                    <span className='absolute bg-[#EF9556] text-white text-[12px] px-6 py-1 rounded-md -mt-4 ml-4 z-10'>Номер телефона</span>
                    <input value={number} onChange={e => setNumber(e.target.value)} className='rounded-xl z-0 w-full outline-0 px-4 py-3' type="text"/>
                </label>
                <label className='relative'>
                    <span className='absolute bg-[#EF9556] text-white text-[12px] px-6 py-1 rounded-md -mt-4 ml-4 z-10'>Адрес</span>
                    <input value={address} onChange={e => setAddress(e.target.value)} className='rounded-xl z-0 w-full outline-0 px-4 py-3' type="text"/>
                </label>
                <label className='flex justify-between'>
                    <div className='bg-[#EF9556] text-white text-[18px] px-6 py-1 rounded-md'>
                        <p>К оплате: <span className='bg-[#FFECB1] px-2 rounded-md text-[#FF9B00]'>{sum}</span></p>
                        <p className='text-[12px]'>*Оплата происходит при получении, наличными или переводом*</p>
                    </div>
                </label>
                <label className='flex justify-end'>
                    <button onClick={sendTelegram} className='h-full bg-[#EF9556] w-52 cursor-pointer text-white text-[18px] px-6 py-1 rounded-md'>Заказать</button>
                </label>
            </form>
        </div>
    );
};

export default Basket;