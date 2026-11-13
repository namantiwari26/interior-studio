// 3D Models & 360° Panoramas Registry

export const PANORAMAS = [
  {
    id: 'living',
    name: 'Executive Living Salon',
    subtitle: 'Honed walnut paneling, architectural indirect cove, and tailored linen seating',
    file: '/panoramas/living.jpg',
    thumb: '/images/warm-living.jpg',
    initialYaw: 0,
    initialPitch: 0,
    hotspots: [
      {
        id: 'hs-bedroom',
        targetRoom: 'bedroom',
        label: 'Master Bedroom Suite',
        position: [-14, 0.5, -12],
        description: 'Acoustically isolated private rest wing'
      },
      {
        id: 'hs-dining',
        targetRoom: 'dining',
        label: 'Dining & Formal Banquet',
        position: [15, 0.2, -8],
        description: 'Bespoke marble table with brass pendant fittings'
      },
      {
        id: 'hs-kitchen',
        targetRoom: 'kitchen',
        label: 'Kitchen & Breakfast Lounge',
        position: [-10, -0.8, 14],
        description: 'Quartzite work island with concealed cabinetry'
      }
    ]
  },
  {
    id: 'bedroom',
    name: 'Presidential Master Suite',
    subtitle: 'Smoked oak panelling, wool headboard, and quiet reading alcove',
    file: '/panoramas/bedroom.jpg',
    thumb: '/images/project-4.jpg',
    initialYaw: 45,
    initialPitch: 0,
    hotspots: [
      {
        id: 'hs-living-from-bed',
        targetRoom: 'living',
        label: 'Living Salon',
        position: [12, -0.2, 10],
        description: 'Main central gathering volume'
      },
      {
        id: 'hs-dining-from-bed',
        targetRoom: 'dining',
        label: 'Dining Salon',
        position: [-12, 0.4, 10],
        description: 'Banquet dining area'
      }
    ]
  },
  {
    id: 'kitchen',
    name: 'Atelier Kitchen & Lounge',
    subtitle: 'Hand-rubbed ash cabinetry, natural quartzite, and flush-integrated induction',
    file: '/panoramas/kitchen.jpg',
    thumb: '/images/service-kitchen.jpg',
    initialYaw: -90,
    initialPitch: -5,
    hotspots: [
      {
        id: 'hs-living-from-kitchen',
        targetRoom: 'living',
        label: 'Living Salon',
        position: [14, 0.1, -8],
        description: 'Return to central lounge'
      },
      {
        id: 'hs-dining-from-kitchen',
        targetRoom: 'dining',
        label: 'Dining Room',
        position: [-10, 0.2, -12],
        description: 'Banquet area'
      }
    ]
  },
  {
    id: 'dining',
    name: 'Grand Dining & Banquet',
    subtitle: 'Double-height volume, bespoke marble table, and patinated brass details',
    file: '/panoramas/dining.jpg',
    thumb: '/images/project-3.jpg',
    initialYaw: 180,
    initialPitch: 5,
    hotspots: [
      {
        id: 'hs-living-from-dining',
        targetRoom: 'living',
        label: 'Living Salon',
        position: [-14, -0.1, 8],
        description: 'Central living area'
      },
      {
        id: 'hs-kitchen-from-dining',
        targetRoom: 'kitchen',
        label: 'Chef Kitchen',
        position: [12, -0.3, 10],
        description: 'Culinary preparation room'
      }
    ]
  }
];

export const FURNITURE_MODELS = [
  {
    id: 'sofa',
    name: 'Milano Curved Lounge Sofa',
    subtitle: 'Sculpted form with deep ergonomic feather-blend cushions',
    file: '/models/sofa.glb',
    dimensions: 'W 240cm × D 105cm × H 78cm',
    designer: 'AAKRITI Workshop Study',
    leadTime: '4 to 6 weeks bespoke build',
    price: 'INR 2,45,000',
    scale: 1.55,
    position: [0, -0.4, 0],
    rotation: [0, Math.PI / 4, 0],
    annotation: {
      position: [0.3, 0.45, 0.2],
      label: 'Belgian Linen & Velvet',
      desc: 'High-density natural latex core with hand-tailored piped perimeter seams.'
    },
    swatches: [
      { name: 'Deep Olive', hex: '#2F4A3F', materialName: 'velvet' },
      { name: 'Muted Brass', hex: '#A9814A', materialName: 'velvet' },
      { name: 'Warm Terracotta', hex: '#B5673F', materialName: 'velvet' },
      { name: 'Dark Espresso', hex: '#2B2118', materialName: 'velvet' },
      { name: 'Sand Bouclé', hex: '#EAE1D3', materialName: 'velvet' }
    ]
  },
  {
    id: 'armchair',
    name: 'Aurelia Armchair',
    subtitle: 'Steam-bent solid ash frame with hand-stitched leather upholstery',
    file: '/models/armchair.glb',
    dimensions: 'W 88cm × D 92cm × H 84cm',
    designer: 'Ambala Studio Craft',
    leadTime: '3 to 4 weeks handcrafted',
    price: 'INR 1,15,000',
    scale: 1.6,
    position: [0, -0.5, 0],
    rotation: [0, -Math.PI / 5, 0],
    annotation: {
      position: [0.1, 0.5, 0.15],
      label: 'Solid Ash & Top-Grain Hide',
      desc: 'Treated with natural Danish beeswax and double-stitched perimeter trim.'
    },
    swatches: [
      { name: 'Warm Cognac', hex: '#8B5A2B', materialName: 'sheen' },
      { name: 'Muted Brass', hex: '#A9814A', materialName: 'sheen' },
      { name: 'Olive Green', hex: '#2F4A3F', materialName: 'sheen' },
      { name: 'Deep Espresso', hex: '#2B2118', materialName: 'sheen' },
      { name: 'Natural Sand', hex: '#EAE1D3', materialName: 'sheen' }
    ]
  },
  {
    id: 'accent-chair',
    name: 'Heritage Brocade Accent Chair',
    subtitle: 'Woven metallic thread detailing on ebonized teak structure',
    file: '/models/accent-chair.glb',
    dimensions: 'W 80cm × D 82cm × H 96cm',
    designer: 'Atelier Heritage Series',
    leadTime: '5 weeks artisan build',
    price: 'INR 1,85,000',
    scale: 1.45,
    position: [0, -0.55, 0],
    rotation: [0, Math.PI / 6, 0],
    annotation: {
      position: [0, 0.45, 0.2],
      label: 'Artisan Brocade Textile',
      desc: 'Woven on traditional Indian handlooms with brass thread accents.'
    },
    swatches: [
      { name: 'Brass & Ochre', hex: '#A9814A', materialName: 'damask' },
      { name: 'Olive Forest', hex: '#2F4A3F', materialName: 'damask' },
      { name: 'Terracotta Earth', hex: '#B5673F', materialName: 'damask' },
      { name: 'Espresso Noir', hex: '#2B2118', materialName: 'damask' }
    ]
  },
  {
    id: 'decor-vase',
    name: 'Fluted Studio Vessel',
    subtitle: 'Mouth-blown borosilicate glass with amber refraction',
    file: '/models/decor-vase.glb',
    dimensions: 'Dia 35cm × H 55cm',
    designer: 'Atelier Glassworks',
    leadTime: 'In studio stock',
    price: 'INR 62,000',
    scale: 3.2,
    position: [0, -0.6, 0],
    rotation: [0, 0, 0],
    annotation: {
      position: [0, 0.35, 0.1],
      label: 'Refractive Borosilicate',
      desc: 'Hand-pulled vertical fluting that diffuses ambient daylight.'
    },
    swatches: [
      { name: 'Amber Glow', hex: '#C28B52', materialName: 'glass' },
      { name: 'Smoked Sand', hex: '#8C7A6B', materialName: 'glass' },
      { name: 'Olive Green', hex: '#3B5749', materialName: 'glass' },
      { name: 'Terracotta Tone', hex: '#A85D3B', materialName: 'glass' }
    ]
  }
];
