import React from 'react'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'

import './OrderConfirmation.css'

export default function OrderConfirmation() {
    const history = useHistory()

    return (
        <div id="wrapper">
            <h1>OrderConfirmation</h1>
            <Button text="Start fika" onClick={() => history.push('/setup')} />
        </div>
    )
}
