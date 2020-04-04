import React from 'react'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'

import './Setup.css'

export default function Setup() {
    const history = useHistory()
    const [name, setName] = React.useState('')

    const onChange = (evt) => setName(evt.target.value)

    return (
        <div id="wrapper">
            <h1>Setup</h1>

            <input
                placeholder="What's your name?"
                value={name}
                onChange={onChange}
            ></input>
            <Button
                text="Find a buddy"
                onClick={() => history.push('/match', { name })}
            />
        </div>
    )
}
