import React from 'react';
import {
    Link
} from 'react-router-dom';
import { Navbar, NavbarBrand, Nav } from 'react-bootstrap';


function MyNavbar() {

    function createLink(path, name) {
        return (<Nav.Link as={Link} to={process.env.PUBLIC_URL + path}>
            {name}
        </Nav.Link>)
    }

    return (<Navbar bg='dark' expand='md' variant='dark'>
        <NavbarBrand as={Link} to={process.env.PUBLIC_URL + '/'}>Totally Not Porn</NavbarBrand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
            <Nav className="mr-auto">
                {createLink('/', 'Home')}
                {createLink('/Images', 'Images')}
                {createLink('/Girls', 'Girls')}
                {createLink('/Tags', 'Tags')}
                {createLink('/Admin', 'Admin')}
            </Nav>
        </Navbar.Collapse>
    </Navbar>)

    /*
    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to={process.env.PUBLIC_URL + '/'} className="navbar-brand">Totally Not Porn</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                {getLiLink("/", "Home")}
                {getLiLink("/Images", "Images")}
                {getLiLink("/Girls", "Girls")}
                {getLiLink("/Tags", "Tags")}
                {getLiLink("/Admin", "Admin")}
            </ul>
        </div>
    </nav>);
    */
}

export default MyNavbar;