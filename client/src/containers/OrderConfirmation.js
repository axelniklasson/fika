import React from 'react'
import Button from '../components/Button'
import { useHistory, useLocation } from 'react-router-dom'
import Door from '../assets/door.svg'
import Clock from '../assets/clock.svg'
import Money from '../assets/money.png'

import './OrderConfirmation.css'

const instructions = [
    { text: 'Arrives in 15 minutes', icon: Clock },
    { text: "You'll find it at your door", icon: Door },
    {
        text:
            'Please leave the money in cash outside of the door or Swish it to 0701234567',
        icon: Money,
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
                    {/* eslint-disable-next-line */}
                    Time to brew your coffee, your fika is on its way! 😋
                </h1>
            </div>
            <div id="instructions">
                {instructions.map(({ text, icon }) => (
                    <div key={text} className="instruction">
                        <img src={icon} alt={text} />
                        <span>{text}</span>
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
