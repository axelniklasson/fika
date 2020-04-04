import React from 'react'

import './Button.css'

export default function Button({
    text,
    onClick,
    primary = true,
    disabled = false,
}) {
    return (
        <button
            className={primary ? 'primary' : 'secondary'}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}
