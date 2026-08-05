import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame,
  Search,
  Sparkles,
  Star,
  Plus,
  Eye,
  SlidersHorizontal,
  Clock,
} from 'lucide-react';
import { MENU_ITEMS } from '../../data/menuData';
import { MenuItem, MenuCategory, DietaryTag } from '../../types/menu';
import { sfx } from '../../sound/sfx';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

// 3D Card with interactive mouse tilt
const MenuCard: React.FC<{
  item: MenuItem;
  onSelect: () => void;
  onAdd: () => void;
}> = ({ item, onSelect, onAdd }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.04);
    setRotateY(x * 0.04);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sfx.playSizzle();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl bg-charcoal-900/90 border border-white/10 hover:border-ember-500/50 p-4 flex flex-col justify-between shadow-card-elevated hover:shadow-[0_20px_45px_-10px_rgba(255,85,0,0.25)] transition-shadow duration-300"
    >
      {/* Top Image & Floating Badges */}
      <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-charcoal-950 mb-4 cursor-pointer" onClick={onSelect}>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-black/30" />

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <span className="px-3.5 py-2 rounded-xl bg-ember-500/90 text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-ember transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" /> Quick View & Customize
          </span>
        </div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex flex-wrap gap-1">
            {item.dietary.includes('chef-special') && (
              <span className="px-2 py-0.5 rounded-md bg-gold-500 text-charcoal-950 font-black text-[10px] uppercase tracking-wider shadow-md">
                Chef Pick
              </span>
            )}
            {item.dietary.includes('spicy') && (
              <span className="px-2 py-0.5 rounded-md bg-crimson-600 text-white font-bold text-[10px] flex items-center gap-1 shadow-md">
                <Flame className="w-2.5 h-2.5 fill-white" /> Spicy
              </span>
            )}
          </div>

          <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-white font-mono text-[11px]">
            {item.calories} kcal
          </span>
        </div>
      </div>

      {/* Item Body */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Prep Time */}
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{item.rating.toFixed(1)}</span>
              <span className="text-stone-500 font-normal">({item.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1 text-stone-400 text-[11px]">
              <Clock className="w-3 h-3" />
              <span>{item.prepTime}</span>
            </div>
          </div>

          {/* Name & Short Description */}
          <h4
            onClick={onSelect}
            className="font-display font-black text-lg text-white group-hover:text-ember-400 transition-colors cursor-pointer leading-tight line-clamp-1"
          >
            {item.name}
          </h4>
          <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Bottom Price & Quick Add Button */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider block">
              Price
            </span>
            <span className="font-display font-black text-xl text-white text-gradient-flame">
              ${item.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sfx.playClick();
                onSelect();
              }}
              className="p-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-stone-300 hover:text-white border border-white/10 transition-colors"
              title="Inspect in 3D"
              aria-label="Inspect in 3D"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sfx.playAddToCart();
                onAdd();
              }}
              className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-ember-500 to-crimson-600 hover:from-ember-600 hover:to-crimson-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-glow-ember hover:shadow-glow-ember-lg transition-all"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onQuickAdd,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [activeDietary, setActiveDietary] = useState<DietaryTag | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: MenuCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'Full Menu', icon: '✨' },
    { id: 'burgers', label: 'Smashed Burgers', icon: '🍔' },
    { id: 'pizza', label: 'Wood-Fired Pizza', icon: '🍕' },
    { id: 'fries', label: 'Loaded Fries', icon: '🍟' },
    { id: 'shakes', label: 'Shakes & Coolers', icon: '🥤' },
    { id: 'desserts', label: 'Skillet Desserts', icon: '🍨' },
  ];

  const dietaryFilters: { id: DietaryTag | 'all'; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'chef-special', label: "Chef's Specials 👑" },
    { id: 'spicy', label: 'Spicy 🔥' },
    { id: 'popular', label: 'Fan Favorites ⭐️' },
    { id: 'vegetarian', label: 'Vegetarian 🌿' },
  ];

  // Filtered menu logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      // Dietary match
      const matchDiet = activeDietary === 'all' || item.dietary.includes(activeDietary);
      // Search match
      const matchSearch =
        !searchQuery.trim() ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return matchCat && matchDiet && matchSearch;
    });
  }, [activeCategory, activeDietary, searchQuery]);

  return (
    <section id="menu" className="relative py-28 bg-charcoal-950 overflow-hidden">
      {/* Glow Backdrops */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-ember-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-ember-400">
            Interactive Craft Kitchen
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight mt-2">
            EXPLORE THE <span className="text-gradient-flame">3D MENU</span>
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Every dish is rendered with real-time 3D models. Hover to tilt, click to inspect in 360°, and customize ingredients to your liking.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sfx.playClick();
                    setActiveCategory(cat.id);
                  }}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-ember-500 to-crimson-600 text-white shadow-glow-ember'
                      : 'bg-charcoal-900/80 border border-white/10 text-stone-400 hover:text-white hover:border-white/25'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search & Dietary Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            
            {/* Dietary Sub-Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
              {dietaryFilters.map((df) => {
                const isSelected = activeDietary === df.id;
                return (
                  <button
                    key={df.id}
                    onClick={() => {
                      sfx.playClick();
                      setActiveDietary(df.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-ember-500/20 text-ember-400 border border-ember-500/40 shadow-glow-ember'
                        : 'text-stone-400 hover:text-stone-200 bg-charcoal-900/50 border border-white/5'
                    }`}
                  >
                    {df.label}
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search burger, truffle, spicy..."
                className="w-full pl-10 pr-4 py-2 bg-charcoal-900/90 border border-white/10 rounded-xl text-xs text-white placeholder-stone-500 focus:outline-none focus:border-ember-500"
              />
            </div>

          </div>

        </div>

        {/* Food Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-charcoal-900/40 rounded-3xl border border-white/5">
            <SlidersHorizontal className="w-10 h-10 text-stone-600 mx-auto mb-3" />
            <h4 className="font-display font-bold text-lg text-white">No sizzling items found</h4>
            <p className="text-xs text-stone-400 mt-1">
              Try searching for something else or clearing the active filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveDietary('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-charcoal-800 text-stone-200 text-xs font-semibold hover:bg-charcoal-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onSelect={() => onSelectItem(item)}
                  onAdd={() => onQuickAdd(item)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};
