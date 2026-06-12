export interface DigitalFlower {
  id: string;
  name: string;
  species: "rose" | "tulip" | "hybrid" | "orchid";
  subtitle: string;
  image: string;
  classTag: string; // e.g., "İmza Serisi · Gerçekçi Seviye"
  price: string;
  petalCount: number;
  symmetry: number;
  glowness: number;
  hue: string;
  scentProfile: string;
  lore: string;
  careGuide: string;
}

export interface Exhibition {
  id: string;
  dates: string;
  title: string;
  location: string;
  colorBackground: string;
  synthFrequency: number; // For interactive Web Audio synthesizer
  visualSeed: number;
}

export interface CartItem {
  flower: DigitalFlower;
  quantity: number;
  customDedication?: string;
}
