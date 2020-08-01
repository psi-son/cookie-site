import React from 'react';
import {
    BrowserRouter, 
    Switch, 
    Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import Tags from './Tags.jsx';
import GirlEdit from './GirlEdit.jsx';
import Admin from './Admin.jsx';


function pathName(p) {
    return process.env.PUBLIC_URL + p
}


class App extends React.Component {
    render() {

        return (<BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path={pathName('/')}>
                    <Home />
                </Route>

                <Route exact path={pathName('/Tags')}>
                    <Tags />
                </Route>

                <Route path={pathName("/Girl/:id")}>
                    <GirlEdit />
                </Route>

                <Route path={pathName("/Admin")}>
                    <Admin />
                </Route>

            </Switch>
        </BrowserRouter>);
    }
}

export default App;