import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './css/LandingPage.css';

import whatsappIcon from './images/whatsapp.png';
import emailIcon from './images/email.png';
import facebookIcon from './images/facebook.png';
import instagramIcon from './images/instagram.png';
import backgroundImage from './images/landing_page_background.png';

export default class LandingPage extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-container">
                <head/>
                    <meta charset="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>Wedding Organizer</title>
                    {/* <link rel="stylesheet" href="./css/LandingPage.css"/> */}
                <body>
                <header className="fixed-header">
                    <nav>
                    <div class="container">
                        <a href="#" class="logo">Wedding Organizer</a>
                        <ul class="menu">
                        <li><a href="#services">Services</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <Button className='center' color='primary' variant='contained' name="login" to='/login' component={Link}>Login</Button>
                        </ul>
                    </div>
                    </nav>
                </header>
                
                <main>
                    <section className="hero">
                    <div className="container" style={{background: {backgroundImage}}}>
                        <img src={backgroundImage} alt="Instagram" />
                        <h1>Plan Your Dream Wedding with Us</h1>
                        <p>We make wedding planning easy and stress-free.</p>
                        <a href="#contact" class="cta-btn">Get Started</a>
                    </div>
                    </section>
                
                    <section class="services" id="services">
                    <div class="container">
                        <h2>Our Services</h2>
                        <ul>
                        <li>Full Wedding Planning</li>
                        <li>Partial Wedding Planning</li>
                        <li>Day-of Coordination</li>
                        <li>Venue Selection</li>
                        <li>Vendor Management</li>
                        </ul>
                    </div>
                    </section>

                    <section class="about" id="about">
                    <div class="container">
                        <h2>About Us</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Donec nec dui in mi consectetur tempus.</p>
                    </div>
                    </section>

                    <section className="contact" id="contact">
                        <div className="container">
                            <h2>Contact Us</h2>
                            <div className="contact-icons">
                                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                                    <img src={whatsappIcon} alt="WhatsApp" />
                                </a>
                                <a href="mailto:info@example.com" target="_blank" rel="noopener noreferrer">
                                    <img src={emailIcon} alt="Email" />
                                </a>
                                <a href="https://facebook.com/example" target="_blank" rel="noopener noreferrer">
                                    <img src={facebookIcon} alt="Facebook" />
                                </a>
                                <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer">
                                    <img src={instagramIcon} alt="Instagram" />
                                </a>
                                <a href="https://instagram.com/example" target="_blank" rel="noopener noreferrer">
                                    <img src={backgroundImage} alt="Instagram" />
                                </a>
                            </div>
                        </div>
                    </section>

                </main>
                
                <footer>
                    <div class="container">
                    <p>&copy; 2023 Wedding Organizer. All rights reserved.</p>
                    </div>
                </footer>
                </body>
            </div>
        );
    }
}