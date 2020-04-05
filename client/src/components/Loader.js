import React from 'react'

import './Loader.css'
import Spinner from '../assets/loader.gif'

export default function Loader({ text }) {
    return (
        <div className="wrapper" id="loader">
            <img src={Spinner} alt="loading..." />
            <p>{text}</p>
        </div>
    )
}
