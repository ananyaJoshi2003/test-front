import React from "react";
import "./Contact.css";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import {FaInstagram, FaFacebook } from "react-icons/fa";
import { FaX } from "react-icons/fa6";


const ContactSection = () => {
  return (
    <section id="ContactUs" className="contact-section container">
      <div className="contact-content">
        <h1 className="contact-heading">
          Let's Work Together
        </h1>
        <div className="contact-arrow">
          <HiOutlineArrowUpRight />
        </div>
      </div>

      <div className="contact-info container">

        <div className="contact-item">
          <h3 className="contact-title">
            <div className="contact-link">
             <a href="https://docs.google.com/forms/d/e/1FAIpQLSee9Ux_mhFC7a2n06wzahH7zjyKsPZlbjYqAs7M5V8601csVw/viewform ">Join our team{" "}</a>
              <span className="arrow">
                <HiOutlineArrowUpRight />
              </span>
            </div>
          </h3>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSee9Ux_mhFC7a2n06wzahH7zjyKsPZlbjYqAs7M5V8601csVw/viewform  " className="contact-details">explore exciting opportunities and grow with us!</a>
        </div>
          <div className="vertical-line">
        </div>

        <div className="contact-item">
          <h3 className="contact-title">
            <a
              href="mailto:partnerships@kartalucia.com"
              className="contact-link"
            >
              Hire Us{" "}
              <span className="arrow">
                <HiOutlineArrowUpRight />
              </span>
            </a>
          </h3>
          <p className="contact-details">
            <a href="mailto:partnerships@kartalucia.com">
              partnerships@kartalucia.com
            </a>
          </p>
        </div>

        <div className="vertical-line">
        </div>

        <div className="contact-item">
          <h3 className="contact-title">
            <div className="contact-link">
              Social Links{" "}
              <span className="arrow">
                <HiOutlineArrowUpRight />
              </span>
            </div>
          </h3>
          {/* <p className="contact-details"><a href="tel:+91 9876543210" class="contact-link"  >+91 9876543210</a></p> */}
          <div className="footer-icons">
                  <a href="https://www.instagram.com/1shdeep/?hl=en" target="_blank" rel="noopener noreferrer" className="footer-icon">
                    <FaInstagram />
                  </a>
                  <a href="https://m.facebook.com/p/1shdeep-100069412633422/" target="_blank" rel="noopener noreferrer" className="footer-icon">
                    <FaFacebook />
                  </a>
                  <a href="https://twitter.com/1shdeep_?lang=en" target="_blank" rel="noopener noreferrer" className="footer-icon">
                    <FaX />
                  </a>
                </div>

        </div>
        
      </div>
    </section>
  );
};

export default ContactSection;
