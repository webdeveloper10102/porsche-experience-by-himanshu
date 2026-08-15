import { CarModel } from '../types';

export const PORSCHE_MODELS: CarModel[] = [
  {
    id: '911-gt3-rs',
    name: '911 GT3 RS',
    series: '992 Generation',
    tagline: 'Born from Flacht. Honed for the Nordschleife.',
    category: 'super-sport',
    powerPS: 525,
    powerKW: 386,
    torqueNm: 465,
    zeroToHundred: 3.2,
    topSpeedKmh: 296,
    topSpeedMph: 184,
    weightKg: 1450,
    nurburgringLapTime: '6:49.328 min',
    engineType: '4.0-litre naturally aspirated Boxer 6-cylinder',
    displacement: '3,996 cm³',
    transmission: '7-speed Porsche Doppelkupplung (PDK)',
    basePriceUSD: 241300,
    heroImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      {
        title: 'Track Stance on Carousel',
        url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=85',
        description: 'Aggressive widebody aero kit with central radiator concept inspired by the 911 RSR.'
      },
      {
        title: 'Swan-Neck Carbon Rear Wing',
        url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=85',
        description: 'Hydraulically adjustable two-tier rear wing featuring Formula 1-derived Drag Reduction System (DRS).'
      },
      {
        title: 'Cockpit & Chrono Precision',
        url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=85',
        description: 'Four rotary switches on the steering wheel controlling DRS, PTV+, PASM, and ESC/TC multi-stage traction.'
      }
    ],
    colors: [
      { name: 'Shark Blue', hex: '#0D68A8', accentHex: '#1E90FF', type: 'special' },
      { name: 'Guards Red', hex: '#D11D27', accentHex: '#FF3B30', type: 'standard' },
      { name: 'Python Green', hex: '#29B34A', accentHex: '#30D158', type: 'special' },
      { name: 'Chalk / Crayon', hex: '#C8C9C7', accentHex: '#E5E5EA', type: 'special' },
      { name: 'GT Silver Metallic', hex: '#8A929A', accentHex: '#AEB6BF', type: 'metallic' },
      { name: 'Ruby Star Neo', hex: '#C2185B', accentHex: '#E91E63', type: 'pts' }
    ],
    aerodynamics: {
      downforceKgAt285: 860,
      dragCoefficient: 0.39,
      hasDRS: true,
      features: [
        'Active Drag Reduction System (DRS) with steering-wheel trigger',
        'Front diffuser with continuous hydraulic flap adjustment',
        'Front wheel arch ventilation louvers with dynamic turning blades',
        'Carbon-fibre roof fins directing cooling air to engine intakes'
      ]
    },
    highlights: [
      {
        icon: 'Gauge',
        title: '9,000 RPM Redline',
        description: 'Atmospheric flat-six singing up to 9,000 revs with rigid valve train and individual throttle bodies.'
      },
      {
        icon: 'Wind',
        title: '860 kg Downforce',
        description: 'Generates triple the aerodynamic downforce of a standard 911 GT3 at 285 km/h.'
      },
      {
        icon: 'Layers',
        title: 'Weissach Package',
        description: 'Exposed carbon weave on bonnet, roof, wing, carbon anti-roll bars, and magnesium forged wheels.'
      }
    ]
  },
  {
    id: 'taycan-turbo-gt',
    name: 'Taycan Turbo GT',
    series: 'Weissach Package',
    tagline: 'Record-shattering electric velocity. 1,108 PS of instant fury.',
    category: 'electric',
    powerPS: 1108,
    powerKW: 815,
    torqueNm: 1340,
    zeroToHundred: 2.2,
    topSpeedKmh: 305,
    topSpeedMph: 190,
    weightKg: 2220,
    nurburgringLapTime: '7:07.550 min',
    engineType: 'Dual Permanent Magnet Synchronous Motors + Silicon Carbide Inverter',
    displacement: '97.0 kWh Performance Battery Plus (800V)',
    transmission: '2-speed transmission on rear axle, 1-speed front',
    basePriceUSD: 230000,
    heroImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      {
        title: 'Aerodynamic Studio Stance',
        url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=85',
        description: 'Optimized front splitter with air curtains and carbon fiber B-pillar aero trims.'
      },
      {
        title: 'Continuous LED Tail Lightstrip',
        url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=2000&q=85',
        description: 'Porsche three-dimensional glass look logo integrated into illuminated light bar.'
      }
    ],
    colors: [
      { name: 'Frozen Blue Metallic', hex: '#4A8BB2', accentHex: '#64D2FF', type: 'metallic' },
      { name: 'Ice Grey Metallic', hex: '#D8DEE4', accentHex: '#FFFFFF', type: 'metallic' },
      { name: 'Volcano Grey Metallic', hex: '#3E424B', accentHex: '#636366', type: 'metallic' },
      { name: 'Porsche Racing Green', hex: '#1C3829', accentHex: '#34C759', type: 'pts' },
      { name: 'Pale Blue PTS', hex: '#779ECB', accentHex: '#5AC8FA', type: 'pts' }
    ],
    aerodynamics: {
      downforceKgAt285: 220,
      dragCoefficient: 0.22,
      hasDRS: false,
      features: [
        'Porsche Active Aerodynamics (PAA) with adaptive cooling air flaps',
        'Fixed lightweight carbon rear wing with Gurney flap',
        'Carbon aero blades on front apron',
        'Underbody rear diffuser with carbon aerodynamic fins'
      ]
    },
    highlights: [
      {
        icon: 'Zap',
        title: 'Attack Mode (+120 kW)',
        description: 'Formula E-derived Attack Mode boosts output to 1,108 PS for 10 seconds at the push of a paddle.'
      },
      {
        icon: 'BatteryCharging',
        title: '320 kW Peak Charging',
        description: '800-volt architecture charges 10% to 80% SoC in just 18 minutes.'
      },
      {
        icon: 'Trophy',
        title: 'Laguna Seca & Ring King',
        description: 'Fastest production electric car at both WeatherTech Raceway Laguna Seca and Nürburgring Nordschleife.'
      }
    ]
  },
  {
    id: '718-gt4-rs',
    name: '718 Cayman GT4 RS',
    series: 'Mid-Engine Pinnacle',
    tagline: 'Unfiltered acoustics. Mid-engine balance that defies physics.',
    category: 'super-sport',
    powerPS: 500,
    powerKW: 368,
    torqueNm: 450,
    zeroToHundred: 3.4,
    topSpeedKmh: 315,
    topSpeedMph: 196,
    weightKg: 1415,
    nurburgringLapTime: '7:09.300 min',
    engineType: '4.0-litre naturally aspirated Boxer 6-cylinder (Mid-mounted)',
    displacement: '3,996 cm³',
    transmission: '7-speed Porsche Doppelkupplung (PDK)',
    basePriceUSD: 160700,
    heroImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      {
        title: 'Mid-Engine Track Precision',
        url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=2000&q=85',
        description: 'Process air intakes positioned directly behind driver and passenger windows for visceral acoustic resonance.'
      }
    ],
    colors: [
      { name: 'Arctic Grey', hex: '#484F56', accentHex: '#8E8E93', type: 'special' },
      { name: 'Racing Yellow', hex: '#E5A912', accentHex: '#FFD60A', type: 'standard' },
      { name: 'Guards Red', hex: '#D11D27', accentHex: '#FF3B30', type: 'standard' },
      { name: 'Gentian Blue Metallic', hex: '#1B315B', accentHex: '#0A84FF', type: 'metallic' },
      { name: 'White', hex: '#EBEBEB', accentHex: '#FFFFFF', type: 'standard' }
    ],
    aerodynamics: {
      downforceKgAt285: 410,
      dragCoefficient: 0.34,
      hasDRS: false,
      features: [
        'Swan-neck fixed wing with 3-stage mechanical adjustability',
        'NACA ducts on carbon bonnet for brake cooling',
        'Front wheel arch air vents with carbon slats',
        'Rear diffuser channels with integrated sports exhaust tips'
      ]
    },
    highlights: [
      {
        icon: 'Volume2',
        title: 'Ear-Level Air Intakes',
        description: 'Airbox sits directly behind your ears inside the cabin, delivering an intoxicating intake symphony.'
      },
      {
        icon: 'Weight',
        title: '1,415 kg Lightness',
        description: 'CFRP bonnet, wings, lightweight carpets, reduced insulation, and lightweight rear glass.'
      },
      {
        icon: 'Compass',
        title: 'Perfect 49/51 Balance',
        description: 'Pure mid-engine agility offering pinpoint turn-in and telepathic steering communication.'
      }
    ]
  },
  {
    id: '911-dakar',
    name: '911 Dakar',
    series: 'Roughroads Heritage',
    tagline: '50mm elevated clearance. Conquer asphalt, dunes, and gravel alike.',
    category: 'heritage',
    powerPS: 480,
    powerKW: 353,
    torqueNm: 570,
    zeroToHundred: 3.4,
    topSpeedKmh: 240,
    topSpeedMph: 149,
    weightKg: 1605,
    engineType: '3.0-litre twin-turbo Boxer 6-cylinder',
    displacement: '2,981 cm³',
    transmission: '8-speed Porsche Doppelkupplung (PDK)',
    basePriceUSD: 222000,
    heroImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      {
        title: '1984 Paris-Dakar Rally Tribute',
        url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=2000&q=85',
        description: 'Bespoke Pirelli Scorpion All Terrain Plus tyres and hydraulic lift system providing 191mm ground clearance.'
      }
    ],
    colors: [
      { name: 'Roughroads Two-Tone Rallye Design', hex: '#0B2341', accentHex: '#D11D27', type: 'special' },
      { name: 'Shade Green Metallic', hex: '#586A5E', accentHex: '#30D158', type: 'metallic' },
      { name: 'White', hex: '#F0F0F0', accentHex: '#FFFFFF', type: 'standard' },
      { name: 'Ice Grey Metallic', hex: '#D8DEE4', accentHex: '#AEB6BF', type: 'metallic' }
    ],
    aerodynamics: {
      downforceKgAt285: 150,
      dragCoefficient: 0.37,
      hasDRS: false,
      features: [
        'Stainless steel body protection front and rear with side skirts',
        'Fixed lightweight CFRP rear spoiler',
        'Red forged aluminium recovery eyelets front & rear',
        'CFRP front luggage compartment lid with large air outlets'
      ]
    },
    highlights: [
      {
        icon: 'Mountain',
        title: 'Rallye Launch Control',
        description: 'Allows up to 20% wheel slip on loose gravel for explosive off-road acceleration.'
      },
      {
        icon: 'Shield',
        title: 'Underbody Armor',
        description: 'Stainless steel skid plates protecting front axle, rear axle, and engine components.'
      }
    ]
  },
  {
    id: 'mission-x',
    name: 'Mission X Concept',
    series: 'Future Hypercar Vision',
    tagline: 'The beacon of tomorrow. 1:1 power-to-weight ratio with Le Mans DNA.',
    category: 'hypercar',
    powerPS: 1500,
    powerKW: 1103,
    torqueNm: 1600,
    zeroToHundred: 1.9,
    topSpeedKmh: 350,
    topSpeedMph: 217,
    weightKg: 1520,
    nurburgringLapTime: 'Target: Fastest Road-Legal Car',
    engineType: 'Permanently excited synchronous electric motors (PSM) with e-core battery',
    displacement: '900-volt high-density architecture',
    transmission: 'Single-speed direct drive per axle',
    basePriceUSD: 2500000,
    heroImage: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=2000&q=85',
    galleryImages: [
      {
        title: 'Le Mans-Style Dome Canopy',
        url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=2000&q=85',
        description: 'Lightweight glass dome with carbon-fibre-reinforced plastic exoskeleton that opens forward and upward.'
      }
    ],
    colors: [
      { name: 'Rocket Metallic', hex: '#635348', accentHex: '#C68A4C', type: 'special' },
      { name: 'Weissach Carbon Raw', hex: '#1C1C1E', accentHex: '#3A3A3C', type: 'pts' }
    ],
    aerodynamics: {
      downforceKgAt285: 1200,
      dragCoefficient: 0.28,
      hasDRS: true,
      features: [
        'Downforce values well in excess of the current 911 GT3 RS',
        'Sculpted carbon aerodynamic floor generating massive ground effect',
        'Transparent aeroblades on rear wheels for brake dissipation'
      ]
    },
    highlights: [
      {
        icon: 'Zap',
        title: '1:1 Power-to-Weight Ratio',
        description: 'Roughly one horsepower per kilogram for peerless hypercar dynamics.'
      },
      {
        icon: 'Cpu',
        title: '900V Next-Gen Architecture',
        description: 'Charges approximately twice as fast as the Taycan Turbo S.'
      }
    ]
  }
];

export const MOTORSPORT_MILESTONES = [
  {
    year: '1948',
    title: 'Porsche 356 "No. 1" Roadster',
    category: 'The Genesis',
    description: 'Ferry Porsche builds the first sports car bearing the Porsche name in Gmünd, Austria. The dream begins.',
    icon: 'Flag'
  },
  {
    year: '1970',
    title: 'First Overall Le Mans 24h Victory',
    category: '917 KH Legend',
    description: 'Hans Herrmann and Richard Attwood steer the iconic red-and-white Porsche 917 KH to overall victory in torrential rain.',
    icon: 'Trophy'
  },
  {
    year: '1984',
    title: 'Paris-Dakar Rally Domination',
    category: 'All-Wheel Drive Triumph',
    description: 'The Porsche 953 (911 4x4) wins the brutal 11,000 km desert endurance race, pioneering the Carrera 4 all-wheel drive.',
    icon: 'Mountain'
  },
  {
    year: '2015-2017',
    title: '919 Hybrid Le Mans Hat-Trick',
    category: 'LMP1 Hybrid Mastery',
    description: 'Three consecutive Le Mans 24 Hours victories and FIA World Endurance Championships with 800V hybrid technology.',
    icon: 'Zap'
  },
  {
    year: '2018',
    title: '5:19.546 min Nürburgring All-Time Record',
    category: '919 Hybrid Evo',
    description: 'Timo Bernhard shatters the legendary 35-year-old lap record on the Nürburgring Nordschleife at an average speed of 233.8 km/h.',
    icon: 'Gauge'
  },
  {
    year: 'Today',
    title: '963 LMDh & GT Racing Global Dominance',
    category: 'Endurance Future',
    description: 'Porsche Penske Motorsport battles for overall glory in IMSA GTP and WEC Hypercar championships with synthetic eFuels.',
    icon: 'Award'
  }
];

export const EXPERIENCE_CENTERS = [
  { id: 'pec-atlanta', name: 'Porsche Experience Center Atlanta', country: 'United States', trackLength: '2.6 km Handling Circuit' },
  { id: 'pec-la', name: 'Porsche Experience Center Los Angeles', country: 'United States', trackLength: '6.4 km Dynamic Track & Kick Plate' },
  { id: 'pec-silverstone', name: 'Porsche Experience Center Silverstone', country: 'United Kingdom', trackLength: 'Historic Grand Prix Handling Circuit' },
  { id: 'pec-hockenheim', name: 'Porsche Experience Center Hockenheimring', country: 'Germany', trackLength: '2.8 km Dynamics & On-Road Circuit' },
  { id: 'pec-leipzig', name: 'Porsche Experience Center Leipzig', country: 'Germany', trackLength: 'FIA-Certified Circuit & Off-Road Track' },
  { id: 'pec-shanghai', name: 'Porsche Experience Center Shanghai', country: 'China', trackLength: '1.4 km Handling Track & Low-Friction Ring' },
  { id: 'pec-tokyo', name: 'Porsche Experience Center Tokyo', country: 'Japan', trackLength: '2.1 km 3D Handling Track (Kisarazu)' }
];
