import "./Footer.css";
import SiteLogo from "../../assets/SiteLogo.png";

const Footer = () => {
  return (
    //<div className="body-div"></div>
    <div className="mfooter">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          <img src={SiteLogo} alt="Logo" className="arcade-logo" />
          <div className="sb_footer-links-div">
            <h4>Learn More</h4>
            <a href="/aboutEventArcade">
              <p>About Event Arcade</p>
            </a>
            <a href="/terms">
              <p>Terms & Conditions</p>
            </a>
            <a href="/privacyPolicy">
              <p>Privacy Policy</p>
            </a>
            <a href="/pressRelease">
              <p>Press Release</p>
            </a>
          </div>
          <div className="sb_footer-links-div">
            <h4>Our Services</h4>
            <a href="/venue">
              <p>Venues</p>
            </a>
            <a href="/caterings">
              <p>Caterings</p>
            </a>
            <a href="/decorations">
              <p>Decoration</p>
            </a>
            <a href="/entertainment">
              <p>Entertainments</p>
            </a>
          </div>
          <div className="sb_footer-links-div">
            <h4>Contact Us</h4>
            <a href="/phone">
              <p>Telephone : 123-456-7890</p>
            </a>
            <a href="/phone">
              <p>Whatsapp : 123-456-7890</p>
            </a>
          </div>
          <div className="sb_footer-links-div">
            <h4>Social</h4>
            <div className="social-icons">
              <a href="#" className="icon">
                <i className="fa-brands fa-google-plus-g"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="icon">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>
              @{new Date().getFullYear()} Event Arcade Media | All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
