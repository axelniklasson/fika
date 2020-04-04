import React from 'react'
import Button from '../components/Button'
import { useHistory, useLocation } from 'react-router-dom'

import './OrderConfirmation.css'

const instructions = [
    { text: 'Arrives in 15 minutes', icon: null },
    { text: 'Dropped outside of your door', icon: null },
    {
        text:
            'Please leave the money in cash outside of the door or Swish it to 0701234567',
        icon: null,
    },
]

export default function OrderConfirmation() {
    const history = useHistory()
    const location = useLocation()

    const { item, details } = location.state || {}
    if (!item || !details) {
        history.push('/order')
        return null
    }

    return (
        <div className="wrapper" id="orderConfirmation">
            <div className="content">
                <h1 className="heading">
                    Brew your coffee, your fika is on its way! 😋
                </h1>
            </div>
            <div id="instructions">
                {instructions.map(({ text }) => (
                    <div key={text} className="instruction">
                        {text}
                    </div>
                ))}
            </div>
            <Button
                text="Set up my profile"
                onClick={() => history.push('/setup', { item, details })}
            />
        </div>
    )
}
