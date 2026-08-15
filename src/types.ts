export interface CarModel {
  id: string;
  name: string;
  series: string;
  tagline: string;
  category: 'super-sport' | 'electric' | 'heritage' | 'hypercar';
  powerPS: number;
  powerKW: number;
  torqueNm: number;
  zeroToHundred: number; // seconds
  topSpeedKmh: number;
  topSpeedMph: number;
  weightKg: number;
  nurburgringLapTime?: string;
  engineType: string;
  displacement?: string;
  transmission: string;
  basePriceUSD: number;
  heroImage: string;
  galleryImages: {
    title: string;
    url: string;
    description: string;
  }[];
  colors: {
    name: string;
    hex: string;
    accentHex: string;
    type: 'standard' | 'metallic' | 'special' | 'pts'; // Paint to Sample
  }[];
  aerodynamics: {
    downforceKgAt285: number;
    dragCoefficient: number;
    hasDRS: boolean;
    features: string[];
  };
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export interface ConfiguratorState {
  modelId: string;
  selectedColorIndex: number;
  selectedWheelIndex: number;
  hasWeissachPackage: boolean;
  hasPCCB: boolean; // Porsche Ceramic Composite Brakes
  caliperColor: 'yellow' | 'red' | 'acid-green' | 'black';
  interiorTheme: 'race-tex-black' | 'leather-bordeaux' | 'heritage-pepita' | 'carbon-yellow';
  sportExhaustActive: boolean;
}

export interface TestDriveBooking {
  modelId: string;
  experienceCenter: string;
  preferredDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  drivingLicenseValid: boolean;
  trackCoachRequested: boolean;
}
