import {Link, useNavigate} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Profile = ({cart}) => {
  const navigate = useNavigate()
  const orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]')
  const logout = () => {
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('user_email')
    navigate('/login', {replace: true})
  }

  return <div className="page-shell">
    <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
    <main className="profile-page container">
      <p className="eyebrow">YOUR ACCOUNT</p>
      <h1>Profile</h1>
      <section className="profile-card">
        <img src="/zomato-logo.svg" alt="profile avatar" />
        <div>
          <h2>Foodie</h2>
          <p>{localStorage.getItem('user_email') || 'Welcome to Zomato Kitchens'}</p>
          <span className="profile-badge">Zomato member</span>
        </div>
      </section>
      <div className="profile-links">
        <Link to="/cart"><strong>Your orders</strong><span>View your cart and recent order items →</span></Link>
        <Link to="/"><strong>Discover restaurants</strong><span>Find your next favourite meal →</span></Link>
      </div>
      <section className="order-history">
        <h2>Order history</h2>
        {orderHistory.length === 0 ? <p className="history-empty">Your completed orders will appear here.</p> : orderHistory.map(order => <article className="history-order" key={order.id}><div><strong>Order #{order.id.slice(-6)}</strong><span>{new Date(order.placedAt).toLocaleDateString()}</span></div><p>{order.items.map(item => `${item.name} × ${item.quantity}`).join(', ')}</p><b>₹{order.total}</b></article>)}
      </section>
      <button type="button" className="profile-logout" onClick={logout}>Logout</button>
    </main>
    <Footer />
  </div>
}

export default Profile
