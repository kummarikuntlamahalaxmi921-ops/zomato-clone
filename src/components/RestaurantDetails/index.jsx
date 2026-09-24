import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Oval} from 'react-loader-spinner'
import {FaStar, FaRupeeSign} from 'react-icons/fa'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const restaurantMenus = {
  '1': {
    name: 'Paradise Biryani', cuisine: 'Biryani, North Indian', rating: 4.5, location: 'Banjara Hills, Hyderabad',
    image_url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800',
    foods: [
      ['Mutton Biryani', 420, 'Slow-cooked mutton with fragrant basmati rice.'],
      ['Paneer Tikka', 280, 'Chargrilled paneer cubes with peppers and aromatic spices.'],
      ['Mirchi Ka Salan', 180, 'Roasted chillies in a creamy peanut and sesame gravy.'],
      ['Raita', 90, 'Cool yoghurt with cucumber, herbs and mild spices.'],
      ['Mutton Sheekh Kebab', 360, 'Minced mutton kebabs grilled with herbs and spices.'],
    ],
  },
  '2': {
    name: 'Anjappar', cuisine: 'South Indian, Chettinad', rating: 4.2, location: 'T. Nagar, Chennai',
    image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
    foods: [['Chettinad Chicken', 290, 'A spicy, aromatic Chettinad speciality.'], ['Parotta with Salna', 180, 'Flaky layered parotta with rich curry.'], ['Fish Fry', 340, 'Crispy coastal fish marinated in spices.']],
  },
  '3': {
    name: 'Burger Singh', cuisine: 'Burgers, Fast Food', rating: 4.0, location: 'Hitech City, Hyderabad',
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
    foods: [['Punjabi Lamb Burger', 280, 'Juicy lamb patty with Indian spices.'], ['Crispy Chicken Burger', 240, 'Crunchy chicken, lettuce and signature sauce.'], ['Peri Peri Fries', 140, 'Golden fries tossed in peri peri seasoning.']],
  },
  '4': {
    name: 'The Spice Route', cuisine: 'Asian, Chinese', rating: 3.8, location: 'Indiranagar, Bengaluru',
    image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
    foods: [['Thai Green Curry', 340, 'Creamy coconut curry with fresh vegetables.'], ['Veg Hakka Noodles', 220, 'Wok-tossed noodles with crunchy vegetables.'], ['Spring Rolls', 180, 'Crispy rolls served with sweet chilli sauce.']],
  },
  '5': {
    name: 'Pizza Hut', cuisine: 'Pizzas, Italian', rating: 3.6, location: 'Koregaon Park, Pune',
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800',
    foods: [['Farmhouse Pizza', 399, 'A cheesy pizza loaded with fresh vegetables.'], ['Chicken Pepperoni Pizza', 499, 'Classic pepperoni with extra mozzarella.'], ['Garlic Bread', 149, 'Toasted bread with garlic herb butter.']],
  },
  '6': {
    name: 'Cafe Mocha', cuisine: 'Cafe, Desserts', rating: 3.4, location: 'Park Street, Kolkata',
    image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    foods: [['Cappuccino', 160, 'Rich espresso topped with silky milk foam.'], ['Chocolate Pancakes', 240, 'Fluffy pancakes with chocolate sauce.'], ['Blueberry Cheesecake', 220, 'Creamy cheesecake with blueberry compote.'], ['Choco Lava Cake', 220, 'Warm chocolate cake with a molten centre.'], ['Tiramisu Pastry', 240, 'Coffee-soaked pastry layered with mascarpone cream.'], ['Americano', 140, 'Bold espresso lengthened with hot water.']],
  },
  '7': {
    name: 'Coastal Curry House', cuisine: 'Seafood, South Indian', rating: 4.7, location: 'Panampilly Nagar, Kochi',
    image_url: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=800',
    foods: [['Kerala Fish Curry', 360, 'Fish cooked in a tangy coconut gravy.'], ['Prawn Ghee Roast', 420, 'Prawns roasted with fragrant ghee and spices.'], ['Appam', 120, 'Soft lacy rice pancakes with coconut flavour.']],
  },
  '8': {
    name: 'Urban Tadka', cuisine: 'North Indian, Mughlai', rating: 4.4, location: 'Connaught Place, New Delhi',
    image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
    foods: [
      ['Butter Chicken', 380, 'Tandoori chicken in a buttery tomato gravy.'],
      ['Dal Makhani', 260, 'Slow-cooked black lentils finished with cream.'],
      ['Paneer Butter Masala', 320, 'Soft paneer in a rich tomato and butter gravy.'],
      ['Tandoori Chicken', 360, 'Chargrilled chicken marinated in yoghurt and spices.'],
      ['Chole Bhature', 240, 'Spiced chickpea curry served with fluffy fried bhature.'],
      ['Malai Kofta', 300, 'Soft paneer koftas simmered in a creamy gravy.'],
      ['Aloo Gobi', 220, 'Potatoes and cauliflower cooked with aromatic spices.'],
      ['Seekh Kebab', 340, 'Minced meat kebabs grilled with herbs and warming spices.'],
    ],
  },
  '9': {
    name: 'Sushi Express', cuisine: 'Japanese, Asian', rating: 4.1, location: 'Bandra West, Mumbai',
    image_url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800',
    foods: [['California Roll', 420, 'Fresh avocado and cucumber sushi roll.'], ['Salmon Nigiri', 520, 'Delicate salmon over seasoned sushi rice.'], ['Miso Soup', 140, 'Warm Japanese soup with tofu and seaweed.']],
  },
  '10': {
    name: 'Green Leaf Bistro', cuisine: 'Healthy Food, Salads', rating: 3.9, location: 'Kalyani Nagar, Pune',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
    foods: [['Buddha Bowl', 320, 'Colourful grains, greens and roasted vegetables.'], ['Avocado Toast', 260, 'Sourdough toast with seasoned avocado.'], ['Berry Smoothie', 190, 'A refreshing blend of seasonal berries.']],
  },
  '11': {
    name: 'Dosa Junction', cuisine: 'South Indian, Breakfast', rating: 3.7, location: 'Mylapore, Chennai',
    image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800',
    foods: [['Masala Dosa', 180, 'Crispy dosa filled with spiced potato.'], ['Idli Sambar', 130, 'Soft steamed idlis with homestyle sambar.'], ['Filter Coffee', 90, 'Traditional South Indian filter coffee.']],
  },
  '12': {
    name: 'Sweet Truth', cuisine: 'Desserts, Bakery', rating: 3.5, location: 'Koramangala, Bengaluru',
    image_url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800',
    foods: [['Chocolate Truffle Cake', 280, 'Moist chocolate cake with silky ganache.'], ['Red Velvet Pastry', 180, 'Velvety sponge with cream cheese frosting.'], ['Cinnamon Roll', 150, 'Warm roll glazed with vanilla icing.']],
  },
  '13': {
    name: 'Fire & Smoke BBQ', cuisine: 'Barbecue, Continental', rating: 4.6, location: 'Jubilee Hills, Hyderabad',
    image_url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800',
    foods: [['Smoked Chicken', 440, 'Juicy chicken smoked over aromatic wood.'], ['BBQ Ribs', 620, 'Tender ribs coated in house barbecue sauce.'], ['Grilled Corn', 160, 'Charred corn with herb butter and lime.']],
  },
  '14': {
    name: 'Nawab Kitchen', cuisine: 'Hyderabadi, Biryani', rating: 4.3, location: 'Charminar, Hyderabad',
    image_url: 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=800',
    foods: [['Nawabi Biryani', 360, 'Royal biryani cooked with aromatic spices.'], ['Haleem', 280, 'Slow-cooked meat and lentil delicacy.'], ['Qubani Ka Meetha', 180, 'Sweet apricots served with cream.']],
  },
  '15': {
    name: 'The Waffle Co.', cuisine: 'Waffles, Desserts', rating: 4.0, location: 'Viman Nagar, Pune',
    image_url: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=800',
    foods: [['Belgian Chocolate Waffle', 260, 'Crisp waffle with warm chocolate sauce.'], ['Strawberry Cream Waffle', 280, 'Fresh strawberries, cream and a soft waffle.'], ['Lotus Biscoff Waffle', 300, 'Waffle topped with Biscoff spread and crumbs.']],
  },
  '16': {
    name: 'Street Bowl', cuisine: 'Thai, Chinese', rating: 3.3, location: 'Salt Lake, Kolkata',
    image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800',
    foods: [
      ['Pad Thai Noodles', 260, 'Thai rice noodles with vegetables and peanuts.'],
      ['Schezwan Rice Bowl', 240, 'Spicy wok-tossed rice with vegetables.'],
      ['Chicken Manchurian', 320, 'Crispy chicken tossed in a tangy Manchurian sauce.'],
      ['Vegetable Spring Rolls', 180, 'Crispy rolls filled with fresh vegetables.'],
      ['Thai Basil Chicken', 340, 'Wok-fried chicken with Thai basil and chillies.'],
      ['Chilli Garlic Rice', 260, 'Fragrant wok-tossed rice with garlic, chilli and vegetables.'],
      ['Sweet and Sour Vegetables', 240, 'Crisp vegetables coated in a bright sweet and sour sauce.'],
      ['Honey Chilli Potato', 220, 'Crispy potato fingers glazed with honey chilli sauce.'],
      ['Hakka Noodles', 220, 'Wok-tossed noodles with crunchy vegetables and sauces.'],
    ],
  },
}

const foodImageFor = name => {
  const item = name.toLowerCase()
  const exactImages = {
    'belgian chocolate waffle': 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500',
    'strawberry cream waffle': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500',
    'lotus biscoff waffle': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500',
    'mutton biryani': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500',
    haleem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqnDC-D5QpOR4AvaA3Lj5uNNcr8tVtiC6YT-GRS0R5Aw&s=10',
    'nawabi biryani': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpXY3_Qtp8mfkQJv3QIVsivIhcPpDQgEO173ArPAVJvN-jW9q_5SAvS5E&s=10',
    'qubani ka meetha': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkL_pLb4fSsGs4iKSAthTlDwrNJ_g8PP5kZ4ZrH5dgKw&s=10',
    'paneer tikka': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500',
    'mirchi ka salan': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXpeVQb5zGwsGQav2Hm3NL9r9cEvgGSMNS3afn423ilg&s=10',
    raita: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=500',
    'mutton sheekh kebab': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
    'paneer butter masala': 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500',
    'butter chicken': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP3mgeFUXMHYVHzvCxLz2Bysg6mx13mpwhHrL59DIGoQ&s=10',
    'dal makhani': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj69CQoaUB983VVTvNDUaKrHfX4v5ECnOn1eNZyLT_FA&s=10',
    'malai kofta': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi-dvxgdgMnN_W6eh-9_kG-FSLRfUI-noLQGejAfop-Q&s=10',
    'aloo gobi': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKMsC9bN4e2xnlJXuiyna21BAxlZ-iut9PewgSUT2H5Q&s=10',
    'tandoori chicken': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500',
    'chole bhature': 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=500',
    'seekh kebab': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500',
    'chicken tikka': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500',
    'farmhouse pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500',
    'chicken pepperoni pizza': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500',
    'garlic bread': 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=500',
    'cappuccino': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500',
    'blueberry cheesecake': 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500',
    'masala dosa': 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500',
    'chicken burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
    'chocolate pancakes': 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500',
    'chocolate truffle cake': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRiSwQ8AFIMaGNMe-ZTrk21IuPK_XuYCKhRPppnKqGUg&s=10',
    'red velvet pastry': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu67x3RBC9A9TgCg3JwihM0yuYpTOElHTf4BHcWQG8BQ&s=10',
    'cinnamon roll': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEWcUuevu2m3hdx95o2kMd8POM6vt1X1SJUGY107Or6Q&s=10',
    'choco lava cake': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500',
    'tiramisu pastry': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500',
    americano: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=500',
    'buddha bowl': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
    'avocado toast': 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500',
    'berry smoothie': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500',
    'smoked chicken': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW0Z57zuA18vzgho_bZJoF_Q9N4iMr_OED3_GEQlMdwg&s=10',
    'bbq ribs': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKibBHu3uAaXKWzOaU2lKZ2JBXLtMVYsoXNz1wZc8nxg&s=10',
    'grilled corn': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHmvTYoi4NKCy8HPH8E2W5cocQ6Dc5zawjlaemF9Fclw&s=10',
    'peri peri fries': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500',
    'punjabi lamb burger': 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500',
    'crispy chicken burger': 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500',
    'miso soup': 'https://images.unsplash.com/photo-1607301406259-dfb186e15de8?w=500',
    'california roll': 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500',
    'chettinad chicken': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSphQc2wtbkJbIFhZpQg6NOyg-xjqaouHfyvjfTd7DGA&s=10',
    'parotta with salna': 'https://semmozhikitchen.com/wp-content/uploads/2023/11/parotta-Salna.jpg',
    'fish fry': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_JABc8S7EKf0wbeW8qlxtNW7HLjH3mWbqV0L3VdBMLw&s=10',
    'kerala fish curry': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_JABc8S7EKf0wbeW8qlxtNW7HLjH3mWbqV0L3VdBMLw&s=10',
    'prawn ghee roast': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdGGwR6IFwKoCwI54-X9tyO17dSnMH4xL3qXc1d-CnIg&s=10',
    appam: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6McRQvt8yIF2F7vI3pKO5xmBcW49HTb0hTNH4qD6WmQ&s=10',
    'veg hakka noodles': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500',
    'pad thai noodles': 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500',
    'schezwan rice bowl': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLF6hz7GAIhx0yAEE-hX57_GKk7fAE4fg7wnR7AwE5Q&s=10',
    'thai green curry': 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500',
    'spring rolls': '/spring-rolls.svg',
    'crispy spring rolls': '/spring-rolls.svg',
    'vegetable spring rolls': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpasiDF-grKX80YeYjRl5mqI-D9Bsu_iNtlpl3-6GMwg&s=10',
    'chicken manchurian': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZhplM6oEc56jMdjuyDbBbTvABVezzX_7NzfWTf126WQ&s=10',
    'thai basil chicken': 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=500',
    'chilli garlic rice': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500',
    'sweet and sour vegetables': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuagp5pRNVLwOOU8U6ee7yq5ahoZPP0pK1ppGI8BHuRg&s=10',
    'honey chilli potato': 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500',
    'hakka noodles': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500',
  }
  if (exactImages[item]) return exactImages[item]
  if (/pizza/.test(item)) return 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500'
  if (/burger/.test(item)) return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500'
  if (/dosa/.test(item)) return 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500'
  if (/idli|appam|parotta|naan/.test(item)) return 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500'
  if (/sushi|nigiri/.test(item)) return 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500'
  if (/noodle|hakka|spring roll/.test(item)) return 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500'
  if (/salad|bowl|avocado|vegetable|corn/.test(item)) return 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500'
  if (/coffee|cappuccino|smoothie|filter/.test(item)) return 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500'
  if (/cake|cheesecake|pastry|brownie|meetha|dessert|pancake|waffle|mango|biscoff|strawberry/.test(item)) return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500'
  if (/fries|bread|toast|soup/.test(item)) return 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500'
  return 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500'
}

const createFoods = (restaurantId, menu) => menu.map(([name, cost, description], index) => ({
  id: `${restaurantId}-food-${index + 1}`,
  name,
  cost,
  description,
  category: /coffee|smoothie|juice|lassi|tea|americano|cappuccino/i.test(name) ? 'Beverages' : /cake|dessert|waffle|pancake|roll|pastry|tiramisu|meetha|mango sticky|cheesecake|brownie|ice cream|pudding/i.test(name) ? 'Desserts' : /soup|spring|fries|bread|corn|toast/i.test(name) ? 'Starters & Sides' : 'Main Course',
  image_url: foodImageFor(name),
}))

const categoryOrder = ['Starters & Sides', 'Main Course', 'Desserts', 'Beverages']

const RestaurantDetails = ({cart, setCart}) => {
  const {id} = useParams()
  const localRestaurant = restaurantMenus[id] || restaurantMenus['1']
  const [restaurant, setRestaurant] = useState(localRestaurant)
  const [foods, setFoods] = useState(createFoods(id, localRestaurant.foods))
  const [loading, setLoading] = useState(true)
  const [counts, setCounts] = useState({})

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`https://apis.ccbp.in/restaurants-list/${id}`)
        if (response.ok) {
          const data = await response.json()
          const apiRestaurant = data.restaurant || data
          setRestaurant({...localRestaurant, ...apiRestaurant})
          if (apiRestaurant.food_items?.length) {
            setFoods(apiRestaurant.food_items.map(food => ({
              id: food.id,
              name: food.name,
              cost: food.cost || food.price,
              description: food.description || 'Deliciously prepared for you.',
              category: food.category || 'Main Course',
              image_url: foodImageFor(food.name) || food.image_url || '/food-placeholder.svg',
            })))
          }
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, localRestaurant])

  const addItem = (food, delta) => {
    const next = Math.max(0, (counts[food.id] || 0) + delta)
    setCounts({...counts, [food.id]: next})
    setCart(current => {
      const exists = current.find(item => item.id === food.id)
      if (next === 0) return current.filter(item => item.id !== food.id)
      if (exists) return current.map(item => item.id === food.id ? {...item, quantity: next} : item)
      return [...current, {cost: food.cost, quantity: next, id: food.id, imageUrl: food.image_url, name: food.name}]
    })
  }

  if (loading) return <><Header/><div testid="restaurant-details-loader" className="loader"><Oval color="#e23744" height={40} width={50} ariaLabel="loading"/></div></>
  const groupedFoods = categoryOrder.map(category => ({
    category,
    items: foods.filter(food => food.category === category),
  })).filter(group => group.items.length > 0)

  return <div className="page-shell"><Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}/><main className="details-page container"><div className="restaurant-hero"><img src={restaurant.image_url} alt="restaurant"/><div><p className="eyebrow">RESTAURANT DETAILS</p><h1>{restaurant.name}</h1><p>{restaurant.cuisine}</p><p>{restaurant.location || 'Hyderabad'}</p><span className="detail-rating"><FaStar/> {restaurant.rating || restaurant.user_rating?.rating}</span></div></div><h2>Menu at {restaurant.name}</h2>{groupedFoods.map(group => <section className="menu-category" key={group.category}><div className="menu-category-heading"><h3>{group.category}</h3><span>{group.items.length} items</span></div><div className="food-list">{group.items.map(food => <div className="food-item" testid="foodItem" key={food.id}><img src={food.image_url} alt={food.name} onError={event => {event.currentTarget.onerror = null; event.currentTarget.src = '/food-placeholder.svg'}}/><div className="food-info"><h3>{food.name}</h3><p><FaRupeeSign/>{food.cost}</p><small>{food.description}</small><div className="quantity-controls"><button type="button" testid="decrement-count" onClick={() => addItem(food, -1)}>-</button><span testid="active-count">{counts[food.id] || 0}</span><button type="button" testid="increment-count" onClick={() => addItem(food, 1)}>+</button></div></div></div>)}</div></section>)}</main><Footer/></div>
}

export default RestaurantDetails
