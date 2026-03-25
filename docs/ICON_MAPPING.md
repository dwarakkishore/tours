# Icon Mapping Reference

This document lists all available icons in the centralized icon mapping utility (`/src/utils/iconMapping.js`).

## Usage

```javascript
import { getIcon, getColorClass } from '@/utils/iconMapping';

// Get an icon component by name
const IconComponent = getIcon('Flame');

// Get a color class by color name
const colorClass = getColorClass('orange'); // returns "text-orange-600"

// Use in JSX
<IconComponent className={colorClass} />
```

## Available Icons (50+)

### Travel & Transportation
- `Plane` - Airplane icon
- `Ship` / `Ferry` - Ship/ferry icon
- `Bike` / `Bicycle` - Bicycle icon
- `Compass` - Compass navigation icon

### Nature & Landscapes
- `Flame` / `Fire` - Fire/flame icon
- `Mountain` / `Peak` / `Rock` - Mountain icon
- `Trees` / `Tree` / `TreePine` - Tree icons
- `Leaf` - Leaf icon
- `Palmtree` / `Palm` - Palm tree icon
- `Flower2` / `Flowers` - Flower icon
- `Sun` - Sun icon
- `Snowflake` / `Snowflakes` - Snowflake icon

### Water & Beach
- `Waves` / `Beach` / `Lake` / `River` - Water/wave icons
- `Droplets` / `Droplet` / `Water` - Water droplet icons
- `Anchor` - Anchor icon

### Landmarks & Architecture
- `Landmark` - Landmark icon
- `Building2` / `Building` - Building icon
- `Theater` / `Theatre` - Theater icon
- `Church` - Church icon
- `Castle` - Castle icon
- `Bridge` - Bridge icon
- `Crown` / `Crone` - Crown icon

### Activities & Entertainment
- `Camera` - Camera icon
- `Binoculars` - Binoculars icon
- `Music` - Music icon
- `Wine` - Wine glass icon
- `Beer` / `Whisky` - Beer/whisky icon
- `Coffee` - Coffee cup icon
- `Utensils` / `Food` - Utensils/food icon
- `IceCream` / `Iceland` - Ice cream icon

### Shopping & Gifts
- `ShoppingBag` / `Shopping` - Shopping bag icon
- `Gift` / `GiftIcon` - Gift box icon

### Art & Design
- `Palette` / `Palate` - Art palette icon
- `Paintbrush` / `Paint` - Paintbrush icon

### People & Social
- `Users` - Multiple users icon
- `Smile` - Smile/happy face icon
- `Heart` - Heart icon
- `MessageCircle` / `Blogs` - Message/blog icon

### Information & UI
- `Info` - Information icon (default fallback)
- `MapPin` / `Map` - Map pin/location icon
- `Sparkles` / `Sparkle` - Sparkles/star effect icon
- `Zap` / `Lightning` - Lightning bolt icon
- `Star` / `Stars` - Star icon
- `Eye` - Eye icon

### Time & Calendar
- `CalendarClock` / `Calendar` - Calendar icon
- `Clock4` / `Clock` - Clock icon

### Finance & Documents
- `Wallet` - Wallet icon
- `Banknote` / `Money` - Money/banknote icon
- `FileCheck` - File with checkmark icon

### Weather & Climate
- `ThermometerSun` / `Thermometer` - Thermometer icon
- `Wind` / `Windmil` / `Width` - Wind icon

### Misc
- `Globe` - Globe/world icon
- `ShieldCheck` / `Shield` - Shield/security icon
- `Triangle` / `Trib` - Triangle icon

## Available Colors

The `getColorClass()` function supports the following color names:

- `blue` → `text-blue-600`
- `amber` → `text-amber-600`
- `emerald` → `text-emerald-600`
- `orange` → `text-orange-600`
- `indigo` → `text-indigo-600`
- `teal` → `text-teal-600`
- `violet` → `text-violet-600`
- `pink` → `text-pink-600`
- `rose` → `text-rose-600`
- `slate` → `text-slate-600`
- `purple` → `text-purple-600`
- `green` → `text-green-600`
- `red` → `text-red-600`
- `yellow` → `text-yellow-600`
- `cyan` → `text-cyan-600`

Default fallback: `text-blue-600`

## Dynamic Data Format

When using dynamic data (from API or CMS), structure your data like this:

```javascript
{
  "icon": "Flame",           // Icon name (case-insensitive)
  "text": "Description",     // Display text
  "color": "orange"          // Color name (optional)
}
```

## Example Usage in Components

```javascript
// Example 1: Simple icon rendering
const attractions = [
  { icon: "Flame", text: "Yanar Dag", color: "orange" },
  { icon: "Landmark", text: "Baku Old City", color: "amber" },
  { icon: "Mountain", text: "Gabala Mountains", color: "blue" }
];

attractions.map((item, idx) => {
  const IconComponent = getIcon(item.icon);
  const colorClass = getColorClass(item.color);
  
  return (
    <div key={idx}>
      <IconComponent className={colorClass} />
      <span>{item.text}</span>
    </div>
  );
});

// Example 2: With fallback
const IconComponent = getIcon(data?.icon || 'Info');
```

## Notes

- Icon names are **case-insensitive** (e.g., "flame", "Flame", "FLAME" all work)
- Multiple aliases are supported (e.g., "Ship" and "Ferry" return the same icon)
- If an icon name is not found, it defaults to the `Info` icon
- All icons are from [Lucide React](https://lucide.dev/)
