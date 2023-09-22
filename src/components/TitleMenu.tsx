import {Link} from "react-router-dom";
import {FC} from "react";

interface TitleMenuProps {
    title: string
    link: boolean
    linkTo: string | ''
}

const TitleMenu: FC<TitleMenuProps> = ({title, link, linkTo}) => {
    return (
        <div className='flex justify-between items-center mt-12'>
            <p>{title}</p>
            <span className='h-0.5 w-full mx-4 bg-[#FFEAA0]'></span>
            {
                link
                    &&
                    <Link className='flex lg:w-[286px] sm:w-[330px]' to={linkTo}>
                        <p>Смотреть полностью</p>
                        <button className='flex bg-[#EA6A12] justify-center items-center rounded-full w-5 h-5 ml-4'>
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.25 2.5L7.75 6L4.25 9.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
                    </Link>
            }
        </div>
    );
};

export default TitleMenu;