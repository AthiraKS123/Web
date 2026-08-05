import { MenuItem, Testimonial } from '../types/menu';

export const MENU_ITEMS: MenuItem[] = [
  // --- BURGERS ---
  {
    id: 'smokehouse-wagyu-burger',
    name: 'The Inferno Wagyu Burger',
    tagline: 'Signature Double Smashed Wagyu with Smoked Ghost-Pepper Cheddar',
    category: 'burgers',
    price: 16.95,
    rating: 4.9,
    reviewsCount: 342,
    description: 'Double 100% Japanese Wagyu smash patties seared on cast iron, blanketed in melted flame-torched cheddar, crispy maple bacon, bourbon-caramelized onions, and our secret Ember chipotle glaze on a toasted brioche bun.',
    ingredients: ['Double Wagyu Patties (200g)', 'Smoked Ghost Cheddar', 'Crisp Maple Bacon', 'Bourbon Onions', 'Ember Glaze', 'Brioche Bun'],
    calories: 880,
    prepTime: '10-12 mins',
    spiceLevel: 2,
    dietary: ['chef-special', 'popular'],
    imageUrl: '/images/hero-wagyu-burger.png',
    model3D: 'burger',
    customizableAddons: [
      { id: 'extra-patty', name: 'Extra Wagyu Patty (+100g)', price: 4.50 },
      { id: 'truffle-mayo', name: 'Black Truffle Aioli', price: 1.75 },
      { id: 'fried-egg', name: 'Crispy Fried Sunny Egg', price: 1.50 },
      { id: 'avocado-slices', name: 'Fresh Hass Avocado', price: 2.00 }
    ]
  },
  {
    id: 'truffle-melt-burger',
    name: 'Black Truffle & Shiitake Smash',
    tagline: 'Dry-Aged Angus with Truffle Butter & Melted Swiss',
    category: 'burgers',
    price: 18.50,
    rating: 4.8,
    reviewsCount: 219,
    description: 'Single dry-aged Angus patty kissed with French black truffle butter, pan-roasted shiitake mushrooms, aged Emmental Swiss cheese, and micro-arugula on a butter-brushed potato bun.',
    ingredients: ['Dry-Aged Angus (180g)', 'French Black Truffle Butter', 'Roast Shiitake', 'Emmental Swiss', 'Micro Arugula', 'Potato Bun'],
    calories: 820,
    prepTime: '12 mins',
    spiceLevel: 0,
    dietary: ['chef-special'],
    imageUrl: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    model3D: 'burger',
    customizableAddons: [
      { id: 'extra-cheese', name: 'Double Melted Swiss', price: 1.80 },
      { id: 'bacon', name: 'Smoked Pepper Bacon', price: 2.00 },
      { id: 'crispy-onions', name: 'Crispy Fried Onion Strings', price: 1.25 }
    ]
  },
  {
    id: 'hot-honey-chicken-burger',
    name: 'Hot Honey Nashville Crunch',
    tagline: 'Buttermilk Fried Crispy Thigh with Habanero Glaze',
    category: 'burgers',
    price: 15.25,
    rating: 4.9,
    reviewsCount: 418,
    description: '24-hour buttermilk-brined crispy chicken thigh dredged in secret cayenne spice rub, drenched in wildflower hot honey, topped with crunchy dill pickles and cool herb ranch slaw.',
    ingredients: ['Buttermilk Chicken Thigh', 'Wildflower Hot Honey', 'Cayenne Crust', 'Dill Pickles', 'Herb Slaw', 'Sesame Bun'],
    calories: 790,
    prepTime: '8-10 mins',
    spiceLevel: 3,
    dietary: ['popular', 'spicy'],
    imageUrl: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    model3D: 'burger',
    customizableAddons: [
      { id: 'extra-pickles', name: 'Extra House Dill Pickles', price: 0.75 },
      { id: 'melted-jack', name: 'Monterey Jack Cheese', price: 1.50 },
      { id: 'inferno-sauce', name: 'Ghost Pepper Hot Dip', price: 1.25 }
    ]
  },
  {
    id: 'vegan-green-goddess-burger',
    name: 'Plant Craft Umami Beast',
    tagline: '100% Plant-Based Patty with Smoked Cashew Gouda',
    category: 'burgers',
    price: 16.00,
    rating: 4.7,
    reviewsCount: 156,
    description: 'Smoky char-grilled pea-protein patty, house-made melted smoked cashew gouda, grilled balsamic heirloom tomatoes, avocado crema, and baby spinach on toasted artisanal sourdough.',
    ingredients: ['Pea-Protein Artisan Patty', 'Smoked Cashew Gouda', 'Balsamic Tomatoes', 'Avocado Crema', 'Baby Spinach', 'Artisanal Sourdough'],
    calories: 640,
    prepTime: '10 mins',
    spiceLevel: 0,
    dietary: ['vegetarian', 'chef-special'],
    imageUrl: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=800&q=80',
    model3D: 'burger',
    customizableAddons: [
      { id: 'vegan-bacon', name: 'Smoked Coconut Bacon', price: 2.00 },
      { id: 'guacamole', name: 'Chunky Guacamole', price: 2.20 }
    ]
  },

  // --- PIZZA ---
  {
    id: 'woodfired-diavola-pizza',
    name: 'Wood-Fired Diavola Inferno',
    tagline: 'San Marzano DOP, Spicy Calabrian Salumi & Hot Honey',
    category: 'pizza',
    price: 21.50,
    rating: 4.9,
    reviewsCount: 284,
    description: '72-hour fermented sourdough crust baked at 900°F in our oak wood oven. Crushed San Marzano tomatoes, fresh buffalo mozzarella, spicy Calabrian salami, red pepper flakes, fresh basil, and a drizzle of habanero honey.',
    ingredients: ['72hr Sourdough Crust (12")', 'San Marzano DOP Sauce', 'Buffalo Mozzarella', 'Calabrian Salami', 'Chili Flakes', 'Hot Honey Drizzle'],
    calories: 1150,
    prepTime: '12-15 mins',
    spiceLevel: 2,
    dietary: ['chef-special', 'spicy', 'popular'],
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    model3D: 'pizza',
    customizableAddons: [
      { id: 'burrata-crown', name: 'Fresh Creamy Burrata Crown', price: 4.00 },
      { id: 'garlic-crust', name: 'Garlic Herb Stuffed Crust', price: 3.00 },
      { id: 'extra-salami', name: 'Extra Calabrian Salami', price: 2.50 }
    ]
  },
  {
    id: 'truffle-wild-mushroom-pizza',
    name: 'Truffle & Forest Mushroom Bianca',
    tagline: 'White Garlic Base with Fontina, Thyme & Shaved Truffle',
    category: 'pizza',
    price: 23.00,
    rating: 4.8,
    reviewsCount: 192,
    description: 'Ricotta and roasted garlic white sauce base, medley of sautéed wild chanterelles, cremini and porcini mushrooms, melted Italian fontina, fresh thyme, and aromatic white truffle oil.',
    ingredients: ['Sourdough Bianca Crust', 'Roasted Garlic Ricotta', 'Wild Porcini & Cremini', 'Fontina & Fior Di Latte', 'White Truffle Oil', 'Thyme'],
    calories: 1020,
    prepTime: '14 mins',
    spiceLevel: 0,
    dietary: ['vegetarian', 'chef-special'],
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    model3D: 'pizza',
    customizableAddons: [
      { id: 'prosciutto', name: '24-Month Prosciutto Di Parma', price: 3.80 },
      { id: 'arugula-lemon', name: 'Baby Arugula with Lemon Zest', price: 1.50 }
    ]
  },
  {
    id: 'smokey-bbq-shortrib-pizza',
    name: 'Ember Braised Short-Rib Pizza',
    tagline: '12-Hour Smoked Beef Short Rib with Sweet Corn & Scallions',
    category: 'pizza',
    price: 24.50,
    rating: 4.9,
    reviewsCount: 205,
    description: 'Slow-smoked pulled beef short rib, house tangy bourbon BBQ reduction, smoked provolone and mozzarella blend, fire-roasted sweet corn, pickled red onions, and scallions.',
    ingredients: ['Sourdough Crust', '12hr Smoked Beef Short Rib', 'Bourbon BBQ Reduction', 'Smoked Provolone', 'Charred Sweet Corn', 'Pickled Red Onions'],
    calories: 1280,
    prepTime: '15 mins',
    spiceLevel: 1,
    dietary: ['popular'],
    imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    model3D: 'pizza',
    customizableAddons: [
      { id: 'extra-shortrib', name: 'Extra Smoked Short Rib', price: 4.50 },
      { id: 'jalapenos', name: 'Fire-Roasted Jalapeños', price: 1.20 }
    ]
  },

  // --- LOADED FRIES ---
  {
    id: 'ember-volcano-loaded-fries',
    name: 'Volcano Sizzle Loaded Fries',
    tagline: 'Triple-Cooked Russet Fries with Molten Cheddar & Brisket',
    category: 'fries',
    price: 12.95,
    rating: 4.9,
    reviewsCount: 388,
    description: 'Crispy skin-on triple-cooked hand-cut fries smothered in molten beer-cheese sauce, 14-hour chopped Texas brisket, candied jalapeños, crispy shallots, and spicy Ember ranch.',
    ingredients: ['Triple-Cooked Russet Fries', 'Molten Beer-Cheddar', 'Chopped Smoked Brisket', 'Candied Jalapeños', 'Crispy Shallots', 'Spicy Ember Ranch'],
    calories: 740,
    prepTime: '6-8 mins',
    spiceLevel: 2,
    dietary: ['chef-special', 'popular'],
    imageUrl: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    model3D: 'fries',
    customizableAddons: [
      { id: 'extra-beer-cheese', name: 'Extra Molten Beer Cheese Cup', price: 1.75 },
      { id: 'crispy-bacon-bits', name: 'Thick Cut Bacon Crumbles', price: 2.00 },
      { id: 'guac-dip', name: 'Fresh Guacamole Scoop', price: 2.20 }
    ]
  },
  {
    id: 'parmesan-truffle-fries',
    name: 'Parmigiano & Black Truffle Fries',
    tagline: 'Aged 24-Month Reggiano, Truffle Snow & Rosemary Garlic',
    category: 'fries',
    price: 11.50,
    rating: 4.8,
    reviewsCount: 260,
    description: 'Golden shoestring fries tossed in rosemary-infused olive oil, freshly shaved Parmigiano-Reggiano, black truffle dust, garlic flakes, served with black garlic aioli dip.',
    ingredients: ['Shoestring Golden Fries', '24mo Parmigiano Reggiano', 'Black Truffle Essence', 'Fried Rosemary', 'Black Garlic Aioli'],
    calories: 590,
    prepTime: '6 mins',
    spiceLevel: 0,
    dietary: ['vegetarian', 'chef-special'],
    imageUrl: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    model3D: 'fries',
    customizableAddons: [
      { id: 'truffle-aioli-extra', name: 'Extra Truffle Aioli Jar', price: 1.50 },
      { id: 'extra-parm', name: 'Double Shaved Parmesan', price: 1.80 }
    ]
  },
  {
    id: 'kimchi-bulgogi-fries',
    name: 'Seoul Fire Bulgogi Fries',
    tagline: 'Sweet Soy Marinated Beef, Fermented Kimchi & Sriracha Mayo',
    category: 'fries',
    price: 13.50,
    rating: 4.9,
    reviewsCount: 195,
    description: 'Waffle fries piled high with seared Korean beef bulgogi, aged spicy house kimchi, toasted sesame seeds, green onions, nori strips, and a drizzle of spicy Japanese mayo.',
    ingredients: ['Crisp Waffle Fries', 'Korean Beef Bulgogi', 'Spicy Aged Kimchi', 'Toasted Sesame & Nori', 'Sriracha Kewpie Mayo'],
    calories: 780,
    prepTime: '7-9 mins',
    spiceLevel: 2,
    dietary: ['popular', 'spicy'],
    imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
    model3D: 'fries',
    customizableAddons: [
      { id: 'extra-bulgogi', name: 'Extra Bulgogi Beef', price: 3.50 },
      { id: 'fried-sunny-egg', name: 'Sunny Side Runny Egg', price: 1.50 }
    ]
  },

  // --- SHAKES & DRINKS ---
  {
    id: 'salted-caramel-bourbon-shake',
    name: 'Smoked Salted Caramel Shake',
    tagline: 'Madagascar Vanilla Custard, Smoked Sea Salt & Toffee Crunch',
    category: 'shakes',
    price: 8.50,
    rating: 4.9,
    reviewsCount: 310,
    description: 'Ultra-thick frozen Madagascar vanilla bean custard blended with dark burnt caramel, Maldon smoked sea salt flakes, whipped chantilly cream, and honeycomb toffee shards.',
    ingredients: ['Vanilla Bean Custard', 'Dark Burnt Caramel', 'Maldon Smoked Salt', 'Chantilly Cream', 'Honeycomb Toffee'],
    calories: 620,
    prepTime: '4 mins',
    spiceLevel: 0,
    dietary: ['popular', 'vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    model3D: 'burger',
    customizableAddons: [
      { id: 'bourbon-shot', name: 'Bourbon Infused Caramel Dip', price: 2.00 },
      { id: 'extra-cream', name: 'Extra Whipped Cream & Toffee', price: 1.00 }
    ]
  },
  {
    id: 'blood-orange-ember-lemonade',
    name: 'Blood Orange & Yuzu Ember Cooler',
    tagline: 'Fresh Pressed Blood Orange, Yuzu Juice & Smoked Rosemary Sprig',
    category: 'shakes',
    price: 6.50,
    rating: 4.8,
    reviewsCount: 142,
    description: 'Sparkling botanical refresher made with fresh Sicilian blood oranges, Japanese yuzu juice, agave nectar, crushed ice, and a torched rosemary sprig for smoky aromatics.',
    ingredients: ['Sicilian Blood Orange', 'Japanese Yuzu', 'Agave Nectar', 'Sparkling Mineral Water', 'Charred Rosemary'],
    calories: 140,
    prepTime: '3 mins',
    spiceLevel: 0,
    dietary: ['vegetarian', 'gluten-free'],
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    model3D: 'burger'
  },

  // --- DESSERTS ---
  {
    id: 'molten-lava-brookie',
    name: 'Iron Skillet S’mores Brookie',
    tagline: 'Warm Brownie-Cookie Hybrid with Molten Chocolate & Torched Marshmallow',
    category: 'desserts',
    price: 9.95,
    rating: 5.0,
    reviewsCount: 412,
    description: 'Served sizzling hot in a mini cast-iron skillet: Belgian dark chocolate fudge brownie baked into a chocolate chip cookie crust, topped with flame-torched marshmallow fluff and vanilla bean gelato.',
    ingredients: ['Belgian Dark Fudge Brownie', 'Choc Chip Cookie Dough', 'Torched Marshmallow Fluff', 'Vanilla Bean Gelato', 'Graham Crumbs'],
    calories: 780,
    prepTime: '8 mins',
    spiceLevel: 0,
    dietary: ['chef-special', 'popular', 'vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    model3D: 'burger',
    customizableAddons: [
      { id: 'extra-gelato', name: 'Extra Scoop Bourbon Vanilla Gelato', price: 2.50 },
      { id: 'fudge-drizzle', name: 'Warm Fudge & Salted Caramel Drizzle', price: 1.50 }
    ]
  },
  {
    id: 'churro-icecream-stack',
    name: 'Cinnamon Sugar Churro Bites',
    tagline: 'Crispy Artisan Spanish Churros with Warm Dulce de Leche',
    category: 'desserts',
    price: 8.50,
    rating: 4.8,
    reviewsCount: 180,
    description: 'Made-to-order golden fried churro loops rolled in Mexican cinnamon and raw turbinado sugar, served with twin dipping pots of Mexican spiced chocolate and warm dulce de leche.',
    ingredients: ['Hand-Piped Churros', 'Mexican Cinnamon Sugar', 'Warm Spiced Dark Chocolate Dip', 'Dulce De Leche Dip'],
    calories: 520,
    prepTime: '6 mins',
    spiceLevel: 0,
    dietary: ['vegetarian'],
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80',
    model3D: 'fries'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus Vance',
    role: 'Michelin Food Critic & Author',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote: 'The Inferno Wagyu Burger is nothing short of culinary alchemy. The crust on the smash patties and the ghost pepper cheddar balance heat and smoke flawlessly. Unmatched in the city.',
    rating: 5,
    favoriteDish: 'The Inferno Wagyu Burger',
    verified: true
  },
  {
    id: 't2',
    name: 'Elena Rostova',
    role: 'Executive Chef & Culinary Director',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    quote: '72-hour cold-fermented sourdough pizza crust baked in 900°F oak flame. You can taste the artisanal patience in every bubbly, blistered slice. The Diavola is an absolute masterpiece.',
    rating: 5,
    favoriteDish: 'Wood-Fired Diavola Inferno',
    verified: true
  },
  {
    id: 't3',
    name: 'David Chen',
    role: 'Food & Wine Editor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: 'The atmosphere is intoxicating—dark, sleek, and electric. And the Volcano Sizzle Fries with 14-hour brisket and beer cheese? I dream about them weekly.',
    rating: 5,
    favoriteDish: 'Volcano Sizzle Loaded Fries',
    verified: true
  },
  {
    id: 't4',
    name: 'Sophia Sterling',
    role: 'Lifestyle Blogger & Travel Host',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    quote: 'The 3D interactive ordering experience is so futuristic and fun, but the food is where the real magic happens. Plus, the Cast Iron Brookie is the best dessert in town!',
    rating: 5,
    favoriteDish: 'Iron Skillet S’mores Brookie',
    verified: true
  }
];

export const CAFE_STATS = [
  { value: '100%', label: 'A5 Wagyu & Prime Beef', icon: 'Flame' },
  { value: '72 HR', label: 'Fermented Sourdough Crust', icon: 'Clock' },
  { value: '900°F', label: 'Wood-Fired Oak Oven', icon: 'Sparkles' },
  { value: '4.9 ★', label: 'Over 12,000+ Happy Foodies', icon: 'Star' },
];
