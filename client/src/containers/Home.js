import React from 'react'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'

import './Home.css'

export default function Home() {
    const history = useHistory()

    return (
        <div className="wrapper" id="home">
            <h1>FIKA</h1>
            <div id="buttonsWrapper">
                <Button
                    text="Order some fika"
                    onClick={() => history.push('/order')}
                />
                <span>- or -</span>
                <Button
                    text="Start virtual fika"
                    primary={false}
                    onClick={() => history.push('/setup')}
                />
            </div>
        </div>
    )
}
