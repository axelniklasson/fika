import React from 'react'
import Home from './containers/Home'
import Order from './containers/Order'
import OrderDetails from './containers/OrderDetails'
import OrderConfirmation from './containers/OrderConfirmation'
import Setup from './containers/Setup'
import Match from './containers/Match'
import VideoCall from './containers/VideoCall'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function Root() {
    return (
        <Router>
            <Switch>
                <Route exact path="/order">
                    <Order />
                </Route>
                <Route path="/order-details">
                    <OrderDetails />
                </Route>
                <Route path="/order-confirmation">
                    <OrderConfirmation />
                </Route>
                <Route path="/setup">
                    <Setup />
                </Route>
                <Route path="/match">
                    <Match />
                </Route>
                <Route path="/video-call">
                    <VideoCall />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}
