import { Link } from "react-router-dom";;
export default function Navbar(){
    return (
        <div className="w-full bg-neutral-900 p-2 z-[999] fixed top-0 left-0 text-center text-white select-none">
            <div className="mx-auto max-w-[1000px] h-full w-[90%] flex items-center justify-between">
                <div className="text-2xl">MuniBlog</div>
                <div><Link to={'/'}>index</Link></div>
            </div>
        </div>
    )
}