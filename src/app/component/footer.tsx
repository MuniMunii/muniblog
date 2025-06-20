export default function FooterComp(){
    return <footer className="w-full h-fit border-t border-t-slate-500 text-neutral-300 bg-gradient-t from-[#000000] to-[#0e1f15] p-4 pb-0 flex flex-col justify-between items-center mt-8">
        <div className="flex-wrap flex gap-x-12 gap-y-2 justify-center select-none">
        <a href="https://muniporto.my.id" target="_blank"  className="hover:text-blue-400 transition duration-200">Portofolio</a>
        <a href="https://github.com/MuniMunii" target="_blank" className="hover:text-blue-400 transition duration-200">Github</a>
        <a href="https://www.linkedin.com/in/ramzi-akbar-ramadhan-b8b05a243/" target="_blank" className="hover:text-blue-400 transition duration-200">LinkedIn</a>
        </div>
        <div className="mt-4 text-xs text-center">
        <p >Copyright © 2025. All Rights Reserved</p>
        <p >Made with love ❤</p>
        </div>
    </footer>
}