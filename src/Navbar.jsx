import React from 'react';
import {
    Link,
    useLocation
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';




function Navbar() {
    const locObj = useLocation();
    var getLiLink = function(path, name) {
        var currPath = locObj.location;
        return (<li className={"nav-item " + currPath === path ? "active" : ""}>
            <Link to={path} className="nav-link">{name}</Link>
        </li>)
    }

    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">Totally Not Porn</Link>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                {getLiLink("/", "Home")}
            </ul>
        </div>
    </nav>);
}


export default Navbar;