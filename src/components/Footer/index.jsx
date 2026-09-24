import {FaFacebookSquare, FaInstagram, FaPinterestSquare, FaTwitter} from 'react-icons/fa'
import './index.css'
const Footer = () => <footer className="footer"><div className="footer-inner"><div className="footer-content"><div className="footer-brand"><img src="/zomato-logo.svg" alt="website-footer-logo" className="footer-logo" /><strong>Zomato</strong></div><p>Discover the best food & drinks in your city.</p></div><div className="socials" aria-label="Social media links"><FaPinterestSquare testid="pintrest-social-icon" /><FaInstagram testid="instagram-social-icon" /><FaTwitter testid="twitter-social-icon" /><FaFacebookSquare testid="facebook-social-icon" /></div></div><p className="copyright">© 2026 Zomato Kitchens. Made with love for foodies.</p></footer>
export default Footer
