import React from 'react'
import { useHistory } from 'react-router-dom'
import Chevron from '../assets/chevron.svg'

import './Order.css'

const items = [
    { title: 'Cinnamon bun', price: '20 SEK' },
    { title: 'Budapest pastry', price: '35 SEK' },
    { title: 'Chocolate cake', price: '20 SEK' },
]

export default function Order() {
    const history = useHistory()

    return (
        <div className="wrapper" id="order">
            <div className="content">
                {/* eslint-disable-next-line */}
                <h1 className="heading">What fika would you like today? 🧁</h1>
                <p>Click on your fika of choice</p>
            </div>
            <div id="items">
                {items.map((item) => (
                    <div
                        key={item.title}
                        className="item"
                        onClick={() => history.push('/order-details', { item })}
                    >
                        <div>
                            <span>{item.title}</span>
                        </div>
                        <div>
                            <span id="itemPrice">{item.price}</span>
                            <img src={Chevron} alt="Select" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
