import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'
const RestaurantItem = ({restaurant}) => <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card" testid="restaurant-item"><img src={restaurant.image_url} alt="restaurant" /><div className="restaurant-card-info"><h3>{restaurant.name}</h3><p>{restaurant.cuisine}</p><span className="rating"><FaStar /> {restaurant.user_rating?.rating || restaurant.rating}</span><small>{restaurant.cost_for_two || '₹600 for two'}</small></div></Link>
export default RestaurantItem
