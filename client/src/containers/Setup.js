import React from 'react'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'

import './Setup.css'

export default function Setup() {
    const history = useHistory()

    return (
        <div id="wrapper">
            <h1>Setup</h1>
            <Button
                text="Find a buddy"
                onClick={() => history.push('/match')}
            />
        </div>
    )
}
