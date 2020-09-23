import React, { useState } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Nav, Collapse, NavItem, Jumbotron, Modal, Button, ModalBody, ModalHeader, Form,
     FormGroup, Label, Input } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';

function Header (props) {

    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const username = useRef('')
    const password = useRef('')
    const remember = useRef(false)

    function toggleModal(){
        setIsModalOpen(prevState => !prevState);
    }

    function toggleNav(){
        setIsNavOpen(prevState => !prevState);
    }    
    //alert é para chegar se o this.toogleModal() está passando os dados corretamente
    function handleLogin(event){
        event.preventDefault();
        toggleModal();
        alert("Username: " + username.value + "Password: " +password.value + "Remember: " + remember.checked);
    }

        return (
            <>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">      
                            <img src="../assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion"/>
                        </NavbarBrand>
                            <Collapse isOpen={isNavOpen} navbar>
                                <Nav navbar>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/home">
                                            <span className="fa fa-home fa-lg"> Home</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"> About Us</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg"> Menu</span>   
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink className="nav-link" to="/contactus">
                                            <span className="fa fa-address-card fa-lg"> Contact Us</span>   
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <Button outline onClick={toggleModal}>
                                            <span className="fa fa-sign-in fa-lg"></span> Login
                                        </Button>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante Con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. 
                                    Our lipsmacking creations willl tickle your culinaire 
                                </p>
                            </div>
                        </div>    
                    </div>
                </Jumbotron>
                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                innerRef={(input)=> username.current = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                //recuperando os valores adicionados pelo usuário
                                innerRef={(input)=> password.current = input} />
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" name="remember" 
                                    innerRef={(input)=> remember.current = input}/>
                                    Remember Me  
                                </Label>
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
}

export default Header;