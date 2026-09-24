import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './index.css'
const Login = () => {
  const navigate = useNavigate()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const [loading,setLoading] = useState(false)
  const submitLogin = async event => {
    event.preventDefault(); setError(''); setLoading(true)
    try {
      const response = await fetch('https://apis.ccbp.in/login',{method:'POST',body:JSON.stringify({username,password})})
      const data = await response.json()
      if (!response.ok) throw new Error(data.error_msg || 'Invalid username or password')
      localStorage.setItem('jwt_token',data.jwt_token)
      localStorage.setItem('user_email',username)
      navigate('/',{replace:true})
    } catch (err) { setError(err.message || 'Unable to login. Please try again.') } finally { setLoading(false) }
  }
  return <main className="login-page"><div className="login-visual"><img src="https://assets.ccbp.in/frontend/react-js/tasty-kitchens-login-img.png" alt="website login" className="login-image" /><div className="visual-content"><h1>Good food.<br /><span>Good mood.</span></h1><p>Happiness is just a meal away.</p></div></div><section className="login-container"><div className="login-card"><div className="login-brand"><img src="/zomato-logo.svg" alt="Zomato logo" className="login-logo" /><strong>Zomato</strong></div><h2>Welcome back!</h2><p className="login-subtitle">Login to continue your food journey</p><form onSubmit={submitLogin}><label htmlFor="username">USERNAME</label><input id="username" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Enter your username" required /><label htmlFor="password">PASSWORD</label><input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" required /><button className="login-button" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>{error && <p className="error-message">* {error}</p>}</form><p className="demo-hint">Use your Tasty Kitchens credentials to sign in.</p></div></section></main>
}
export default Login
