import React from 'react'
import Button from '../components/Button'
import { useHistory, useLocation } from 'react-router-dom'

import './OrderConfirmation.css'

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
            <Button
                text="Set up my profile"
                onClick={() => history.push('/setup', { item, details })}
            />
        </div>
    )
}
