import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="Footer">
            <p>
                Copyright &copy; <span id="copyright-year">{currentYear}</span> 
                . Developed By{" "}
                <a
                    href="https://www.linkedin.com/in/ahmed-maher-algohary"
                    title="About Developer"
                    aria-label="Visit Ahmed Maher on LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ahmed Maher
                </a>
            </p>
            <span>All Rights Reserved</span>
        </footer>
    );
};

export default Footer;
