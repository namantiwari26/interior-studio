// 3D Models & 360° Panoramas Registry

export const PANORAMAS = [
  {
    id: 'living',
    name: 'Executive Living Salon',
    subtitle: 'Warm walnut, architectural cove lighting, bespoke Italian seating',
    file: '/panoramas/living.jpg',
    thumb: '/images/warm-living.jpg',
    initialYaw: 0,
    initialPitch: 0,
    hotspots: [
      {
        id: 'hs-bedroom',
        targetRoom: 'bedroom',
        label: 'Go to Master Suite',
        position: [-14, 0.5, -12],
        description: 'Private rest sanctuary with acoustic walls'
      },
      {
        id: 'hs-dining',
        targetRoom: 'dining',
        label: 'Enter Grand Dining & Ballroom',
        position: [15, 0.2, -8],
        description: 'Entertain 16 guests beneath crystal luminaires'
      },
      {
        id: 'hs-kitchen',
        targetRoom: 'kitchen',
        label: 'Visit Designer Kitchen & Atelier',
        position: [-10, -0.8, 14],
        description: 'Calacatta Viola marble kitchen with concealed storage'
      }
    ]
  },
  {
    id: 'bedroom',
    name: 'Presidential Master Suite',
    subtitle: 'Smoked oak panelling, velvet headboard, private reading nook',
    file: '/panoramas/bedroom.jpg',
    thumb: '/images/project-4.jpg',
    initialYaw: 45,
    initialPitch: 0,
    hotspots: [
      {
        id: 'hs-living-from-bed',
        targetRoom: 'living',
        label: 'Return to Living Salon',
        position: [12, -0.2, 10],
        description: 'Main entertainment and gathering pavilion'
      },
      {
        id: 'hs-dining-from-bed',
        targetRoom: 'dining',
        label: 'Walk to Dining Salon',
        position: [-12, 0.4, 10],
        description: 'Chandelier banquet area'
      }
    ]
  },
  {
    id: 'kitchen',
    name: 'Atelier Kitchen & Lounge',
    subtitle: 'Handcrafted cabinetry, quartzite stone, architectural lighting',
    file: '/panoramas/kitchen.jpg',
    thumb: '/images/service-kitchen.jpg',
    initialYaw: -90,
    initialPitch: -5,
    hotspots: [
      {
        id: 'hs-living-from-kitchen',
        targetRoom: 'living',
        label: 'Return to Living Salon',
        position: [14, 0.1, -8],
        description: 'Back to the central lounge'
      },
      {
        id: 'hs-dining-from-kitchen',
        targetRoom: 'dining',
        label: 'Go to Dining Banquet',
        position: [-10, 0.2, -12],
        description: 'Formal reception and banquet space'
      }
    ]
  },
  {
    id: 'dining',
    name: 'Grand Dining & Banquet',
    subtitle: 'Dramatic double-height volume, bespoke marble table, custom brass fixtures',
    file: '/panoramas/dining.jpg',
    thumb: '/images/project-3.jpg',
    initialYaw: 180,
    initialPitch: 5,
    hotspots: [
      {
        id: 'hs-living-from-dining',
        targetRoom: 'living',
        label: 'Back to Living Salon',
        position: [-14, -0.1, 8],
        description: 'Central living area'
      },
      {
        id: 'hs-kitchen-from-dining',
        targetRoom: 'kitchen',
        label: 'Pantry & Chef Kitchen',
        position: [12, -0.3, 10],
        description: 'Culinary preparation suite'
      }
    ]
  }
];

export const FURNITURE_MODELS = [
  {
    id: 'sofa',
    name: 'The Milano Curved Velvet Sofa',
    subtitle: 'Sculptural silhouette with deep comfort ergonomic seating',
    file: '/models/sofa.glb',
    dimensions: 'W 240cm × D 105cm × H 78cm',
    designer: 'AAKRITI Atelier Studio',
    leadTime: '4 - 6 Weeks Custom Order',
    price: '₹ 2,45,000',
    scale: 1.55,
    position: [0, -0.4, 0],
    rotation: [0, Math.PI / 4, 0],
    annotation: {
      position: [0.3, 0.45, 0.2],
      label: 'Bespoke Belgian Velvet',
      desc: 'Treated with water-repellent nanotech coating and high-density memory latex foam.'
    },
    swatches: [
      { name: 'Forest Emerald', hex: '#1B4332', materialName: 'velvet' },
      { name: 'Warm Ochre Gold', hex: '#C9A46A', materialName: 'velvet' },
      { name: 'Midnight Charcoal', hex: '#1C1C1F', materialName: 'velvet' },
      { name: 'Terracotta Rust', hex: '#9E4731', materialName: 'velvet' },
      { name: 'Ivory Bouclé', hex: '#EBE5D8', materialName: 'velvet' }
    ]
  },
  {
    id: 'armchair',
    name: 'The Aurelia Sheen Lounge Chair',
    subtitle: 'Precision steam-bent solid ash frame with hand-stitched cushion',
    file: '/models/armchair.glb',
    dimensions: 'W 88cm × D 92cm × H 84cm',
    designer: 'Milanese Collaboration',
    leadTime: '3 - 4 Weeks Handcrafted',
    price: '₹ 1,15,000',
    scale: 1.6,
    position: [0, -0.5, 0],
    rotation: [0, -Math.PI / 5, 0],
    annotation: {
      position: [0.1, 0.5, 0.15],
      label: 'Solid Ash & Top-Grain Leather',
      desc: 'Hand-finished with natural Danish oils and double-stitched perimeter piping.'
    },
    swatches: [
      { name: 'Cognac Saddle', hex: '#8B4513', materialName: 'sheen' },
      { name: 'Imperial Gold', hex: '#D4AF37', materialName: 'sheen' },
      { name: 'Emerald Velvet', hex: '#0F2A24', materialName: 'sheen' },
      { name: 'Jet Noir', hex: '#141416', materialName: 'sheen' },
      { name: 'Oatmeal Bouclé', hex: '#F0ECE1', materialName: 'sheen' }
    ]
  },
  {
    id: 'accent-chair',
    name: 'The Royal Damask Accent Throne',
    subtitle: 'Hand-embroidered gold filigree brocade on ebonized teak base',
    file: '/models/accent-chair.glb',
    dimensions: 'W 80cm × D 82cm × H 96cm',
    designer: 'AAKRITI Heritage Collection',
    leadTime: '5 Weeks Artisanal Handloom',
    price: '₹ 1,85,000',
    scale: 1.45,
    position: [0, -0.55, 0],
    rotation: [0, Math.PI / 6, 0],
    annotation: {
      position: [0, 0.45, 0.2],
      label: 'Gold Thread Brocade',
      desc: 'Handwoven in Varanasi using metallic threads on natural silk warp.'
    },
    swatches: [
      { name: 'Imperial Gold & Onyx', hex: '#C9A46A', materialName: 'damask' },
      { name: 'Royal Emerald', hex: '#143D32', materialName: 'damask' },
      { name: 'Ruby Wine', hex: '#722F37', materialName: 'damask' },
      { name: 'Deep Sapphire', hex: '#1A2A44', materialName: 'damask' }
    ]
  },
  {
    id: 'decor-vase',
    name: 'The Murano Hand-Blown Fluted Vessel',
    subtitle: 'Organic translucent crystal glassware reflecting ambient interior light',
    file: '/models/decor-vase.glb',
    dimensions: 'Dia 35cm × H 55cm',
    designer: 'Venetian Master Artisan',
    leadTime: 'Ready to Ship',
    price: '₹ 62,000',
    scale: 3.2,
    position: [0, -0.6, 0],
    rotation: [0, 0, 0],
    annotation: {
      position: [0, 0.35, 0.1],
      label: 'Borosilicate Crystal',
      desc: 'Layered refractive glass that casts warm amber caustic reflections.'
    },
    swatches: [
      { name: 'Amber Glow', hex: '#D4A373', materialName: 'glass' },
      { name: 'Smoked Quartz', hex: '#4A4238', materialName: 'glass' },
      { name: 'Emerald Mist', hex: '#2D6A4F', materialName: 'glass' },
      { name: 'Opaline Rose', hex: '#B5838D', materialName: 'glass' }
    ]
  }
];

