import React, { useState, useEffect } from 'react'
import { pingServer } from '../data-requests/hello'

export default function Root() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [res, setRes] = useState('')

    useEffect(() => {
        pingServer()
            .then(({ message }) => {
                setIsLoaded(true)
                setRes(message)
            })
            .catch(err => {
                setIsLoaded(true)
                setError(err)
            })
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return <pre>Response back from server: {res}</pre>
    }
}
