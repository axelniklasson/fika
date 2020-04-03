import React from 'react'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'

import './Order.css'

export default function Order() {
    const history = useHistory()

    return (
        <div id="wrapper">
            <h1>Order</h1>
            <Button
                text="Place order"
                onClick={() => history.push('/order-confirmation')}
            />
        </div>
    )
}
