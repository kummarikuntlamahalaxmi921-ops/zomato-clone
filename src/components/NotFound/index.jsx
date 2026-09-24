import {Link} from 'react-router-dom'
import './index.css'
const NotFound=()=> <main className="not-found"><img src="https://assets.ccbp.in/frontend/react-js/tasty-kitchens-not-found-img.png" alt="not found" className="not-found-image" /><h1>Page not found</h1><p>We couldn't find the page you're looking for.</p><Link to="/" className="hero-button">Go to home</Link></main>
export default NotFound
