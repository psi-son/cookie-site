import React from 'react';
import {
    BrowserRouter, 
    Switch, 
    Route
} from 'react-router-dom';
import Navbar from './Navbar.jsx'


class App extends React.Component {
    render() {

        return (<BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/">

                </Route>


            </Switch>
        </BrowserRouter>);
    }
}

export default App;