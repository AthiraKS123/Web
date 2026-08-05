export type MenuCategory = 'burgers' | 'pizza' | 'fries' | 'shakes' | 'desserts';

export type DietaryTag = 'chef-special' | 'spicy' | 'vegetarian' | 'popular' | 'gluten-free';

export interface MenuItemAddon {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  category: MenuCategory;
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  ingredients: string[];
  calories: number;
  prepTime: string;
  spiceLevel: 0 | 1 | 2 | 3; // 0 none, 1 mild, 2 hot, 3 inferno
  dietary: DietaryTag[];
  imageUrl: string;
  model3D: 'burger' | 'pizza' | 'fries';
  customizableAddons?: MenuItemAddon[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedAddons: MenuItemAddon[];
  specialInstructions?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  favoriteDish: string;
  verified: boolean;
}

export interface TableReservation {
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  seatingZone: 'indoor-lounge' | 'chef-counter' | 'patio-terrace' | 'vip-booth';
  specialRequests?: string;
}
