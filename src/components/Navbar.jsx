import { useState } from 'react';
import logo from '../../images/amazon.png'

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)

    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
           <h2 className='w-full flex md:justify-center items-center text-zinc-50 font-bold text-5xl'><img className='md:w-32 lg:w-40' alt="amazon" src={logo} /> Reviews</h2>
        </nav>
    )
}

export default Navbar;