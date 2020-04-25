import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MDBNavbar, MDBNavLink, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse } from "mdbreact";

export default function Nav() {
    return (
        <div>
            <MDBNavbar color="indigo" dark expand="md">
                <MDBNavbarBrand>
                <Link to="/"><strong className="white-text">Home</strong></Link>
                </MDBNavbarBrand>
                <MDBNavbarToggler/>
                <MDBCollapse id="navbarCollapse3" navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem>
                            <MDBNavLink to="/member">Member</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/project">Project</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/assign">Assign</MDBNavLink>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </div>
    )
}
