import React from 'react'
import Button from '../components/Button'

import './Home.css'

export default function Home() {
    return (
        <div id="wrapper">
            <h1>FIKA</h1>
            <Button
                text="Get started"
                onClick={() => console.log('onClick()')}
            />
        </div>
    )
}
