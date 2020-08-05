import React from 'react'
import {
    BrowserRouter, 
    Switch, 
    Route
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './index.css'
import MyNavbar from './Navbar.jsx'
import Home from './Home.jsx'
import Tags from './Tags.jsx'
import Images from './Images.jsx'
import GirlEdit from './GirlEdit.jsx'
import Admin from './Admin.jsx'
import Girls from './Girls.jsx'


function pathName(p) {
    return process.env.PUBLIC_URL + p
}


class App extends React.Component {
    render() {

        return (<BrowserRouter>
            <MyNavbar />
            <Switch>
                <Route exact path={pathName('/')}>
                    <Home />
                </Route>

                <Route path={pathName('/Images')}>
                    <Images />
                </Route>

                <Route exact path={pathName('/Tags')}>
                    <Tags />
                </Route>

                <Route path={pathName('/Girls')}>
                    <Girls />
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