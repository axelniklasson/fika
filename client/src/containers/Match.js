import React from 'react'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'

import './Match.css'

export default function Match() {
    const history = useHistory()

    return (
        <div id="wrapper">
            <h1>Match</h1>
            <Button
                text="Get started"
                onClick={() => history.push('/video-call')}
            />
        </div>
    )
}
