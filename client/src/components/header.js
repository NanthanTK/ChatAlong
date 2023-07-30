import React from "react";
import {Link} from 'react-router-dom'

const Header = ()=> {
    return (
        <>
        <h1>I am a header</h1>
        <h2 > <Link to = '/'>Logo</Link></h2>
        </>
    )
}

export default Header;