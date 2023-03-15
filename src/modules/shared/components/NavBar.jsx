import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
} from 'reactstrap';


function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar color="dark" dark={true} expand="md">
                <NavbarBrand className='text-warning'>Test GML Software</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavLink
                            to="/"
                            className={({ isActive }) => `nav-item nav-link  ${isActive ? 'active' : ''}`}
                        >
                            Usuarios
                        </NavLink>
                        <NavLink
                            to="other"
                            className={({ isActive }) => `nav-item nav-link  ${isActive ? 'active' : ''}`}
                        >
                            Otros
                        </NavLink>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
}

export default NavBar;