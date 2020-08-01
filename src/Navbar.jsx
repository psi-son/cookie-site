import React from 'react';
import {
    Link,
    useLocation
} from 'react-router-dom';


function Navbar() {
    const locObj = useLocation();
    var getLiLink = function(path, name) {
        var currPath = locObj.location;
        return (<li className={"nav-item " + currPath === path ? "active" : ""}>
            <Link to={process.env.PUBLIC_URL + path} className="nav-link">{name}</Link>
        </li>)
    }

    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to={process.env.PUBLIC_URL + '/'} className="navbar-brand">Totally Not Porn</Link>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                {getLiLink("/", "Home")}
                {getLiLink("/Girls", "Girls")}
                {getLiLink("/Tags", "Tags")}
                
            </ul>
        </div>
    </nav>);
}

export default Navbar;