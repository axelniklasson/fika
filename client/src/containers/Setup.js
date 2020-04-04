import React, { useState } from 'react'
import Button from '../components/Button'
import { useHistory, useLocation } from 'react-router-dom'

import './Setup.css'

export default function Setup() {
    const history = useHistory()
    const location = useLocation()
    const [name, setName] = useState('')

    const onChange = (evt) => setName(evt.target.value)

    const { item, details } = location.state || {}

    return (
        <div className="wrapper" id="setup">
            {!details?.name && (
                <input
                    placeholder="What's your name?"
                    value={name}
                    onChange={onChange}
                ></input>
            )}
            <div className="content">
                <h1 className="heading">I would like to fika with...</h1>
            </div>
            <Button
                disabled={!name}
                text="Find a buddy"
                onClick={() => history.push('/match', { name })}
            />
        </div>
    )
}
