import { MenuItem, Category, SnackOption, CustomerSegment, CafeInsight } from './types';

// Exporting exact generated image filenames for safe reference
export const HERO_BANNER_PATH = '/src/assets/images/py_aromaa_cafe_banner_1782235492172.jpg';
export const CAFE_LOGO_PATH = '/src/assets/images/py_aromaa_cafe_logo_1782235506938.jpg';
export const VINTAGE_QRS_PATH = '/src/assets/images/vintage_qrs_footer_1782320423399.jpg';

export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'All Parks',
    icon: 'Coffee',
    description: 'Explore the entire variety of Py\'s Aromaa Cafe'
  },
  {
    id: 'tea',
    name: 'Tea Park',
    icon: 'Leaf',
    description: 'Aromatic, hand-brewed traditional and exotic teas'
  },
  {
    id: 'coffee',
    name: 'Coffee Park',
    icon: 'Bean',
    description: 'Premium beans and traditional South Indian chicory-rich blends'
  },
  {
    id: 'milk',
    name: 'Milk Park',
    icon: 'Milk',
    description: 'Comforting, hot and chilled nutrient-rich milk specialties'
  },
  {
    id: 'specials',
    name: 'Aromaa Specials Park',
    icon: 'Sparkles',
    description: 'Chef\'s premium recommendations and customized blends'
  },
  {
    id: 'coolers',
    name: 'Coolers & Mojitos',
    icon: 'IceCream',
    description: 'Refreshing high-margin chilled premium mojitos'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- Tea Park ---
  {
    id: 'tea-1',
    name: 'Traditional Tea',
    price: 12,
    category: 'tea',
    description: 'Py\'s signature everyday milk tea, boiled to perfection with fresh tea dust.',
    tags: ['Traditional', 'Popular'],
    image: '/src/assets/images/traditional_chai_1782320703726.jpg'
  },
  {
    id: 'tea-2',
    name: 'Black Tea',
    price: 20,
    category: 'tea',
    description: 'Strong, clear black tea brew infused with a dash of lemon if preferred.',
    tags: ['Diet-Friendly'],
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tea-3',
    name: 'Ginger Tea',
    price: 20,
    category: 'tea',
    description: 'Aromatic tea crushed with fresh organic ginger root. Best for stress relief!',
    isBestseller: true,
    tags: ['Stomach-Soothing', '⭐ Bestseller'],
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tea-4',
    name: 'Masala Tea',
    price: 25,
    category: 'tea',
    description: 'Traditional tea infused with hand-pounded cardamoms, cloves, cinnamon, and ginger.',
    tags: ['Spicy & Warm'],
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tea-5',
    name: 'Green Tea',
    price: 25,
    category: 'tea',
    description: 'Organic whole-leaf green tea high in antioxidants. Light and revitalizing.',
    tags: ['Healthy'],
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'tea-6',
    name: 'Blue Tea',
    price: 30,
    category: 'tea',
    description: 'Exotic butterfly pea flower infusion, naturally caffeine-free with a magnificent blue hue.',
    tags: ['Exotic', 'Instagrammable'],
    image: 'https://images.unsplash.com/photo-1596149615678-08ef08fbc8ee?auto=format&fit=crop&q=80&w=400'
  },

  // --- Coffee Park ---
  {
    id: 'coffee-1',
    name: 'Black Coffee',
    price: 20,
    category: 'coffee',
    description: 'Freshly pulled espresso shot diluted with hot water. Bold and unsweetened.',
    tags: ['Bold', 'No Sugar'],
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'coffee-2',
    name: 'Classic Coffee',
    price: 25,
    category: 'coffee',
    description: 'Rich, frothy South Indian style filter coffee with creamy milk.',
    tags: ['All-Time Favorite'],
    image: '/src/assets/images/filter_coffee_1782320718674.jpg'
  },
  {
    id: 'coffee-3',
    name: 'Bellam (Jaggery) Coffee',
    price: 25,
    category: 'coffee',
    description: 'Creamy filter coffee sweetened naturally with traditional unrefined bellam (jaggery).',
    isChefSpecial: true,
    tags: ['Signature', 'Sugar-Free Alternative'],
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'coffee-4',
    name: 'Sonti Coffee',
    price: 30,
    category: 'coffee',
    description: 'A powerful medicinal dry-ginger coffee blend. Excellent for cold and throat relief.',
    tags: ['Herbal Remedy'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'coffee-5',
    name: 'Dark Swiss Chocolate Coffee',
    price: 30,
    category: 'coffee',
    description: 'Espresso combined with premium dark Swiss chocolate and steamed milk.',
    tags: ['Decadent', 'Sweet'],
    image: 'https://images.unsplash.com/photo-1606791405792-1004f1718d0c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'coffee-6',
    name: 'Irish Cream Coffee',
    price: 30,
    category: 'coffee',
    description: 'Premium coffee infused with rich, non-alcoholic traditional Irish cream extract.',
    isBestseller: true,
    tags: ['⭐ Bestseller', 'Creamy Premium'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400'
  },

  // --- Milk Park ---
  {
    id: 'milk-1',
    name: 'Plain Steamed Milk',
    price: 20,
    category: 'milk',
    description: 'Warm, wholesomely pasteurized rich milk. Clean and simple.',
    tags: ['Simple'],
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'milk-2',
    name: 'Pepper Milk',
    price: 20,
    category: 'milk',
    description: 'Steamed milk spiced with black pepper powder and a touch of turmeric.',
    tags: ['Immunity Booster'],
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'milk-3',
    name: 'Bellam Milk',
    price: 25,
    category: 'milk',
    description: 'Creamy milk naturally sweetened with liquid organic bellam (jaggery).',
    tags: ['Healthy Sweetness'],
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'milk-4',
    name: 'Boost Milk',
    price: 25,
    category: 'milk',
    description: 'Classic energy chocolate-malt drink stirred into steaming hot milk. Nostalgic taste!',
    tags: ['Kids\' Favorite', 'Nostalgic'],
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'milk-5',
    name: 'Horlicks Milk',
    price: 25,
    category: 'milk',
    description: 'Wholesome, creamy Horlicks malt powder mixed perfectly with hot fresh milk.',
    tags: ['Comforting'],
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'milk-6',
    name: 'Double Chocolate Milk',
    price: 30,
    category: 'milk',
    description: 'Chilled milk shaken with dark Belgian chocolate syrup and cocoa.',
    tags: ['Chilled Delicacy'],
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'milk-7',
    name: 'Rose Milk Special',
    price: 30,
    category: 'milk',
    description: 'Traditional summer cooler made with premium sweet organic rose extract and chilled milk.',
    tags: ['Cooling', 'Sweet'],
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&q=80&w=400'
  },

  // --- Aromaa Specials Park ---
  {
    id: 'special-1',
    name: 'Special Bellam Tea',
    price: 25,
    category: 'specials',
    description: 'Our top recommendation: Hand-brewed strong tea sweetened purely with rich local Jaggery.',
    isChefSpecial: true,
    tags: ['Chef\'s Special', 'Best Seller'],
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'special-2',
    name: 'Allam Elaichi Tea',
    price: 30,
    category: 'specials',
    description: 'Double strength ginger and crushed cardamom infused tea. Absolute sensory delight.',
    tags: ['Aromatic Kick'],
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'special-3',
    name: 'Kadak Ginger-Pepper Tea',
    price: 30,
    category: 'specials',
    description: 'Strong, intense tea boiled extra long with ginger and black pepper. Perfect awakening tea.',
    tags: ['Extra Strong'],
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'special-4',
    name: 'Kashmiri Kahwa Tea',
    price: 30,
    category: 'specials',
    description: 'Premium green tea brewed with real saffron strands, cinnamon sticks, cardamom, and garnished with almonds.',
    isBestseller: true,
    tags: ['⭐ Bestseller', 'Exotic Royal', 'Chef\'s Pick'],
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'special-5',
    name: 'Homemade Masala Tea',
    price: 35,
    category: 'specials',
    description: 'Py\'s home secret recipe tea masala blend using 11 premium grade spices. Wonderfully balanced.',
    isBestseller: true,
    tags: ['⭐ Bestseller', 'Aromaa Signature'],
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'special-6',
    name: 'Café Infused Royal Tea',
    price: 40,
    category: 'specials',
    description: 'Premium full leaf golden Assam tea slow-infused with condensed milk and a secret spice bouquet.',
    isChefSpecial: true,
    tags: ['Luxury Brew', 'Chef\'s Choice'],
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80&w=400'
  },

  // --- Coolers / Mojitos Park ---
  {
    id: 'cooler-1',
    name: 'Lime Mint Cooler',
    price: 59,
    category: 'coolers',
    description: 'Chilled carbonated water with freshly muddled mint leaves, lime wedges, and rock salt.',
    tags: ['High Margin', 'Ultra Refreshing'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cooler-2',
    name: 'Green Apple Mojito',
    price: 59,
    category: 'coolers',
    description: 'Crisp, sweet & tart green apple premium syrup shaken with club soda, mint, and ice.',
    tags: ['Sweet & Sour'],
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cooler-3',
    name: 'Strawberry Mojito',
    price: 59,
    category: 'coolers',
    description: 'A luscious, vibrant red mocktail with sweet strawberry purée, lemon, and fresh mint.',
    tags: ['Fruit Blast'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cooler-4',
    name: 'Watermelon Mojito',
    price: 59,
    category: 'coolers',
    description: 'Cooling fresh watermelon syrup, carbonated to perfection with mint and lemon garnish.',
    tags: ['Hydrating'],
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cooler-5',
    name: 'Mango Mint Mojito',
    price: 59,
    category: 'coolers',
    description: 'Tropical rich mango nectar paired with fresh lime juice, muddled mint, and sparkling water.',
    isBestseller: true,
    tags: ['⭐ Bestseller', 'Tropical Supreme'],
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cooler-6',
    name: 'Blue Curacao Mojito',
    price: 59,
    category: 'coolers',
    description: 'Vibrant blue mocktail with orange peel extracts, mint, lime juice, and carbonated fizz.',
    tags: ['Instagram Hero'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'cooler-7',
    name: 'Kiwi Mojito',
    price: 59,
    category: 'coolers',
    description: 'Exotic tangy kiwi crush blended cleanly with crushed ice, sparkling soda, and mint leaves.',
    tags: ['Zesty Spark'],
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=400'
  }
];

export const SNACK_OPTIONS: SnackOption[] = [
  { id: 'snack-none', name: 'No Snack', price: 0, description: 'Beverage only' },
  { 
    id: 'snack-osmania', 
    name: 'Osmania Biscuits (Set of 2)', 
    price: 10, 
    description: 'Traditional salty-sweet biscuits, perfect for dipping',
    image: 'https://images.unsplash.com/photo-1558961312-50346c099379?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 'snack-samosa', 
    name: 'Hot Vegetable Samosa (1 Pc)', 
    price: 20, 
    description: 'Crispy pastry sheet stuffed with spiced potatoes and peas',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 'snack-bunmaska', 
    name: 'Bun Maska', 
    price: 30, 
    description: 'Soft fruit bun sliced and generously slathered with salted butter',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 'snack-eggpuff', 
    name: 'Fresh Egg Puff', 
    price: 25, 
    description: 'Flaky baked puff pastry with half a spiced boiled egg',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400'
  },
  { 
    id: 'snack-paneerpuff', 
    name: 'Paneer Masala Puff', 
    price: 30, 
    description: 'Crisp golden puff pastry with spiced cottage cheese cubes',
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=400'
  }
];

export const CUSTOMER_SEGMENTS: CustomerSegment[] = [
  {
    name: 'College Students',
    icon: 'GraduationCap',
    description: 'Look for affordable, sweet options, social spots, and refreshing coolers between classes.',
    preferredDrinks: ['Traditional Tea', 'Boost Milk', 'Mango Mint Mojito', 'Blue Curacao Mojito'],
    averageSpend: '₹40 – ₹60',
    timing: '12:00 PM - 4:00 PM'
  },
  {
    name: 'Office Employees',
    icon: 'Briefcase',
    description: 'Seek quick caffeine recharges, strong kadak ginger teas, or bold black coffees to beat fatigue.',
    preferredDrinks: ['Ginger Tea', 'Kadak Ginger-Pepper Tea', 'Irish Cream Coffee', 'Black Coffee'],
    averageSpend: '₹50 – ₹80',
    timing: '9:00 AM - 11:30 AM, 3:30 PM - 6:00 PM'
  },
  {
    name: 'Tea Enthusiasts & Purists',
    icon: 'Heart',
    description: 'Appreciate hand-pounded spices, high grade leaves, and traditional natural jaggery sweetener.',
    preferredDrinks: ['Special Bellam Tea', 'Homemade Masala Tea', 'Kashmiri Kahwa Tea', 'Blue Tea'],
    averageSpend: '₹50 – ₹70',
    timing: '6:00 AM - 9:00 AM, 5:00 PM - 9:00 PM'
  },
  {
    name: 'Families & Kids',
    icon: 'Users',
    description: 'Gather for evening relaxation. Prefer non-caffeinated sweet milk and premium cold mojitos.',
    preferredDrinks: ['Horlicks Milk', 'Double Chocolate Milk', 'Rose Milk Special', 'Strawberry Mojito'],
    averageSpend: '₹80 – ₹150',
    timing: '6:00 PM - 10:00 PM'
  }
];

export const CAFE_INSIGHTS: CafeInsight[] = [
  {
    metric: 'Daily Visitors',
    value: '280+',
    change: '+15% from last month',
    isPositive: true
  },
  {
    metric: 'Average Ticket Size',
    value: '₹62.50',
    change: 'Target: ₹75.00',
    isPositive: true
  },
  {
    metric: 'Most Demanded Category',
    value: 'Aromaa Specials (42%)',
    change: 'Highest growth',
    isPositive: true
  },
  {
    metric: 'Mojito Profit Margin',
    value: '72%',
    change: 'Prime cross-selling target',
    isPositive: true
  }
];

export const SAMPLE_REVIEWS = [
  {
    id: 1,
    name: 'Srinivas R.',
    rating: 5,
    review: 'The Special Bellam Tea is simply outstanding. High legibility of their physical menu is a small issue but this digital app makes it so clear! The jaggery is pure and authentic.',
    date: 'Today',
    itemApproved: 'Special Bellam Tea'
  },
  {
    id: 2,
    name: 'Nikhitha Reddy',
    rating: 5,
    review: 'Best spot for students. We love sitting here and sipping the Mango Mint Mojito with Bun Maska. Super reasonable and delicious!',
    date: 'Yesterday',
    itemApproved: 'Mango Mint Mojito'
  },
  {
    id: 3,
    name: 'Anil Kumar',
    rating: 4,
    review: 'Ginger tea clears your throat instantly. Homemade Masala tea has real spice particles, not synthetic flavoring. Highly recommended!',
    date: '3 days ago',
    itemApproved: 'Ginger Tea'
  }
];

export const OWNER_DETAILS = {
  name: 'Ch. Pawan Kumar',
  role: 'Proprietor & Master Brewer',
  phone: '9392737210',
  instagram: "@pys_aromaa_cafe",
  location: 'Near Main Street, Vinukonda Road',
  upiId: '9392737210@ybl',
  about: 'Driven by a passion for traditional flavors, Ch. Pawan Kumar started Py\'s Aromaa Cafe to bring authentic jaggery-infused hot beverages and vibrant mocktails to the heart of the city.'
};
