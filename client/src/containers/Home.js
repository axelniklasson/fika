import React from 'react'
import Button from '../components/Button'
import { useHistory } from 'react-router-dom'

import './Home.css'

export default function Home() {
    const history = useHistory()

    return (
        <div id="wrapper">
            <h1>FIKA</h1>
            <Button text="Order" onClick={() => history.push('/order')} />
            <Button text="Go to setup" onClick={() => history.push('/setup')} />
        </div>
    )
}
