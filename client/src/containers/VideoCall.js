import React from 'react'
import Button from '../components/Button'

import './VideoCall.css'

export default function VideoCall() {
    return (
        <div id="wrapper">
            <h1>VideoCall</h1>
            <Button text="Call" onClick={() => console.log('onClick()')} />
        </div>
    )
}
