import React from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { useHistory, useLocation } from 'react-router-dom'

import './OrderDetails.css'

export default function OrderDetails() {
    const history = useHistory()
    const location = useLocation()
    const [details, setDetails] = React.useState({
        name: '',
        street: '',
        houseNo: '',
    })

    const { item } = location.state || {}
    if (!item) {
        history.push('/order')
        return null
    }

    const isValid = () => {
        return !!details.name && !!details.street && !!details.houseNo
    }

    return (
        <div className="wrapper" id="orderDetails">
            <div className="content">
                <h1 className="heading">
                    {/* eslint-disable-next-line */}
                    Where should we deliver the fika to? 🏠
                </h1>
            </div>

            <div id="inputWrappers">
                <Input
                    label="Name"
                    onChange={(e) =>
                        setDetails({ ...details, name: e.target.value })
                    }
                    value={details.name}
                />
                <Input
                    label="Street"
                    onChange={(e) =>
                        setDetails({ ...details, street: e.target.value })
                    }
                    value={details.street}
                />
                <Input
                    label="House no."
                    onChange={(e) =>
                        setDetails({ ...details, houseNo: e.target.value })
                    }
                    value={details.houseNo}
                />
            </div>

            <Button
                text="Submit address"
                onClick={() =>
                    history.push('/order-confirmation', { item, details })
                }
                disabled={!isValid()}
            />
        </div>
    )
}
