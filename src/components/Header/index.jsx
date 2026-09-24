import {NavLink, Link} from 'react-router-dom'
import {FiShoppingBag} from 'react-icons/fi'
import './index.css'

const Header = ({cartCount = 0}) => {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <img
            src="/zomato-logo.svg"
            alt="website logo"
            className="brand-logo"
          />
          <span><strong>Zomato</strong><small>Discover the best food</small></span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/cart" className={({isActive}) => isActive ? 'active cart-link' : 'cart-link'}>
            <FiShoppingBag /> Cart {cartCount > 0 && <b>{cartCount}</b>}
          </NavLink>
          <NavLink to="/profile" className={({isActive}) => isActive ? 'active' : ''}>Profile</NavLink>
        </nav>
      </div>
    </header>
  )
}
export default Header
