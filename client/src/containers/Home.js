import React from 'react'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'
import CoffeeCup from '../assets/coffe_cup.svg'

import './Home.css'

export default function Home() {
    const history = useHistory()

    return (
        <div className="wrapper" id="home">
            <div id="headingWrapper">
                <h1>FIKA</h1>
                <img src={CoffeeCup} alt="Logo" />
            </div>
            <div id="buttonsWrapper">
                <Button
                    text="Order some fika first"
                    onClick={() => history.push('/order')}
                />
                <span>- or -</span>
                <Button
                    text="Start virtual fika now"
                    primary={false}
                    onClick={() => history.push('/setup')}
                />
            </div>
        </div>
    )
}
