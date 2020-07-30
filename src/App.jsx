import React from 'react';
import {
    BrowserRouter, 
    Switch, 
    Route
} from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';

function pathName(p) {
    return process.env.PUBLIC_URL + p
}


class App extends React.Component {
    render() {

        return (<BrowserRouter>
            <Navbar />
            <Switch>
                <Route path={pathName('/')}>
                    <Home />
                </Route>


            </Switch>
        </BrowserRouter>);
    }
}

export default App;