import React from 'react'

import './Input.css'

export default function Input({ label, onChange, value }) {
    return (
        <div className="inputWrapper">
            <span>{label}</span>
            <input onChange={onChange} value={value} />
        </div>
    )
}
