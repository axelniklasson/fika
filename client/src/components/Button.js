import React from 'react'

import './Button.css'

export default function Button({ text, onClick, primary = true }) {
    return (
        <button className={primary ? 'primary' : 'secondary'} onClick={onClick}>
            {text}
        </button>
    )
}
