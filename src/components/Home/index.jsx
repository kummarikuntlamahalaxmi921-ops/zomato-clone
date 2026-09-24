import {useEffect, useRef, useState} from 'react'
import {Oval} from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
import {FiSearch, FiX} from 'react-icons/fi'
import Header from '../Header'
import Footer from '../Footer'
import RestaurantItem from '../RestaurantItem'
import './index.css'

const fallbackRestaurants = [
  {id:'1',name:'Paradise Biryani',cuisine:'Biryani, North Indian',foods:'Chicken Biryani, Mutton Biryani, Double Ka Meetha',rating:4.5,image_url:'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500',cost_for_two:'₹600 for two'},
  {id:'2',name:'Anjappar',cuisine:'South Indian, Chettinad',foods:'Chettinad Chicken, Parotta, Fish Fry',rating:4.2,image_url:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500',cost_for_two:'₹500 for two'},
  {id:'3',name:'Burger Singh',cuisine:'Burgers, Fast Food',foods:'Chicken Burger, Lamb Burger, Fries',rating:4.0,image_url:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',cost_for_two:'₹450 for two'},
  {id:'4',name:'The Spice Route',cuisine:'Asian, Chinese',foods:'Thai Curry, Hakka Noodles, Spring Rolls',rating:3.8,image_url:'https://images.unsplash.com/photo-1547592180-85f173990554?w=500',cost_for_two:'₹800 for two'},
  {id:'5',name:'Pizza Hut',cuisine:'Pizzas, Italian',foods:'Farmhouse Pizza, Pepperoni Pizza, Garlic Bread',rating:3.6,image_url:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',cost_for_two:'₹700 for two'},
  {id:'6',name:'Cafe Mocha',cuisine:'Cafe, Desserts',foods:'Cappuccino, Pancakes, Cheesecake',rating:3.4,image_url:'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500',cost_for_two:'₹500 for two'},
  {id:'7',name:'Coastal Curry House',cuisine:'Seafood, South Indian',rating:4.7,image_url:'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500',cost_for_two:'₹750 for two'},
  {id:'8',name:'Urban Tadka',cuisine:'North Indian, Mughlai',rating:4.4,image_url:'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500',cost_for_two:'₹650 for two'},
  {id:'9',name:'Sushi Express',cuisine:'Japanese, Asian',rating:4.1,image_url:'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',cost_for_two:'₹900 for two'},
  {id:'10',name:'Green Leaf Bistro',cuisine:'Healthy Food, Salads',rating:3.9,image_url:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',cost_for_two:'₹550 for two'},
  {id:'11',name:'Dosa Junction',cuisine:'South Indian, Breakfast',rating:3.7,image_url:'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500',cost_for_two:'₹350 for two'},
  {id:'12',name:'Sweet Truth',cuisine:'Desserts, Bakery',rating:3.5,image_url:'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500',cost_for_two:'₹400 for two'},
  {id:'13',name:'Fire & Smoke BBQ',cuisine:'Barbecue, Continental',rating:4.6,image_url:'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500',cost_for_two:'₹850 for two'},
  {id:'14',name:'Nawab Kitchen',cuisine:'Hyderabadi, Biryani',rating:4.3,image_url:'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=500',cost_for_two:'₹700 for two'},
  {id:'15',name:'The Waffle Co.',cuisine:'Waffles, Desserts',rating:4.0,image_url:'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500',cost_for_two:'₹450 for two'},
  {id:'16',name:'Street Bowl',cuisine:'Thai, Chinese',rating:3.3,image_url:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500',cost_for_two:'₹500 for two'},
]
const fallbackOffers = [
  {id:'o1',image_url:'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?w=1200&h=420&fit=crop'},
  {id:'o2',image_url:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&h=420&fit=crop'},
]
const LIMIT = 6

const Home = ({cart}) => {
  const [offers, setOffers] = useState([])
  const [restaurants, setRestaurants] = useState([])
  const [sortBy, setSortBy] = useState('Lowest')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [offersLoading, setOffersLoading] = useState(true)
  const [listLoading, setListLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const offersRef = useRef(null)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const searchableRestaurants = [...fallbackRestaurants, ...restaurants].filter((restaurant, index, all) =>
    all.findIndex(item => String(item.id) === String(restaurant.id)) === index,
  )
  const visibleRestaurants = (searchQuery ? searchableRestaurants : restaurants).filter(restaurant => {
    const searchableText = `${restaurant.name} ${restaurant.cuisine} ${restaurant.foods || ''}`.toLowerCase()
    return searchableText.includes(searchQuery.trim().toLowerCase())
  })

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/restaurants-list/offers')
        if (!response.ok) throw new Error('Offers unavailable')
        const data = await response.json()
        setOffers(data.offers || fallbackOffers)
      } catch {
        setOffers(fallbackOffers)
      } finally { setOffersLoading(false) }
    }
    loadOffers()
  }, [])
  useEffect(() => {
    const loadRestaurants = async () => {
      setListLoading(true)
      try {
        const offset = (page - 1) * LIMIT
        const response = await fetch(`https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortBy}`)
        if (!response.ok) throw new Error('Restaurants unavailable')
        const data = await response.json()
        setRestaurants(data.restaurants || [])
        setTotal(data.total || 0)
      } catch {
        const sorted = [...fallbackRestaurants].sort((a,b) => sortBy === 'Lowest' ? a.rating - b.rating : b.rating - a.rating)
        setRestaurants(sorted.slice((page - 1) * LIMIT, page * LIMIT))
        setTotal(fallbackRestaurants.length)
      } finally { setListLoading(false) }
    }
    loadRestaurants()
  }, [page, sortBy])
  const totalPages = Math.max(1, Math.ceil(total / LIMIT))
  return <div className="page-shell"><Header cartCount={cartCount} /><main className="main-content">
    <section className="hero container"><div><p className="eyebrow">GOOD FOOD, GREAT MOOD</p><h1>Order the food<br /><span>you love.</span></h1><p className="hero-copy">Discover the best restaurants and delicious meals delivered right to your doorstep.</p><a href="#restaurants" className="hero-button">Explore restaurants</a></div><div className="hero-art"><div className="hero-circle">🍛</div><span className="floating-badge">Free delivery<br /><b>on first order</b></span></div></section>
    <section className="offers-section container"><div className="section-heading"><div><p className="eyebrow">EXCLUSIVE OFFERS</p><h2>Deals you can't resist</h2></div><button type="button" className="slide-note" onClick={() => offersRef.current?.scrollBy({left: 360, behavior: 'smooth'})}>Swipe to explore →</button></div>{offersLoading ? <div testid="restaurants-offers-loader" className="loader"><Oval color="#e23744" height={40} width={50} ariaLabel="loading" /></div> : <div className="offers-container" ref={offersRef}>{offers.map(offer => <img key={offer.id} src={offer.image_url} alt="offer" className="offer-image" />)}</div>}</section>
    <section className="restaurants-section container" id="restaurants"><div className="section-heading"><div><p className="eyebrow">TOP PICKS FOR YOU</p><h2>Popular Restaurants</h2><p className="muted">Search for a restaurant, cuisine or dish.</p></div><label className="sort-control"><BsFilterLeft /> Sort by <select value={sortBy} onChange={e => {setSortBy(e.target.value); setPage(1)}}><option>Lowest</option><option>Highest</option></select></label></div><div className="search-box"><FiSearch aria-hidden="true"/><input aria-label="Search restaurants or food" value={searchQuery} onChange={event => {setSearchQuery(event.target.value); setPage(1)}} placeholder="Search restaurants, cuisines or dishes" />{searchQuery && <button type="button" aria-label="Clear search" onClick={() => {setSearchQuery(''); setPage(1)}}><FiX /></button>}</div>{listLoading ? <div testid="restaurants-list-loader" className="loader"><Oval color="#e23744" height={40} width={50} ariaLabel="loading" /></div> : <>{visibleRestaurants.length > 0 ? <div className="restaurant-list">{visibleRestaurants.map(item => <RestaurantItem key={item.id} restaurant={item} />)}</div> : <div className="no-results"><div>🔎</div><h3>No results found</h3><p>Try searching for another restaurant, cuisine or dish.</p></div>}{!searchQuery && <div className="pagination"><button type="button" testid="pagination-left-button" onClick={() => setPage(p => Math.max(1,p-1))} disabled={page === 1}>←</button><span testid="active-page-number">{page}</span><span>of {totalPages}</span><button type="button" testid="pagination-right-button" onClick={() => setPage(p => Math.min(totalPages,p+1))} disabled={page === totalPages}>→</button></div>}</>}</section>
  </main><Footer /></div>
}
export default Home
