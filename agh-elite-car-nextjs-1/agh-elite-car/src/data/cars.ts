export type Car = {
  id: string;
  name: string;
  title?: string;
  year: number;
  trans: "Auto" | "Manuelle";
  fuel: "Essence" | "Diesel";
  seats: number;
  price: number;
  type: "Berline" | "SUV";
  img: string;
  popular?: boolean;
  gallery?: string[];
  description?: string;
};

export const CARS: Car[] = [
  {
    id: "hyundai-accent-2025",
    name: "Hyundai Accent",
    year: 2025,
    trans: "Auto",
    fuel: "Diesel",
    seats: 5,
    price: 330,
    type: "Berline",
    img: "/images/hyundai-accent.jpg",
    popular: true,
    description:
      "Berline économique et fiable, idéale pour la ville et les trajets quotidiens à Fès. Confort moderne et consommation maîtrisée.",
  },
  {
    id: "peugeot-2008",
    name: "Peugeot 2008",
    year: 2024,
    trans: "Auto",
    fuel: "Essence",
    seats: 5,
    price: 450,
    type: "SUV",
    img: "/images/peugeot-2008.jpg",
    description:
      "SUV compact élégant, parfait pour les familles et les escapades autour de Fès. Habitabilité et style français.",
  },
  {
    id: "dacia-duster",
    name: "Dacia Duster",
    year: 2024,
    trans: "Manuelle",
    fuel: "Diesel",
    seats: 5,
    price: 400,
    type: "SUV",
    img: "/images/dacia-duster.jpg",
    description:
      "SUV robuste et économique, idéal pour les routes marocaines et les trajets longue distance.",
  },
  {
    id: "bmw-320i",
    name: "BMW 320i",
    title: "BMW Série 3",
    year: 2023,
    trans: "Auto",
    fuel: "Essence",
    seats: 5,
    price: 800,
    type: "Berline",
    img: "/images/bmw-320i.jpg",
    popular: true,
    gallery: [
      "/images/bmw-1.jpg",
      "/images/bmw-2.jpg",
      "/images/bmw-3.jpg",
      "/images/bmw-4.jpg",
      "/images/bmw-interieur-1.jpg",
      "/images/bmw-interieur-2.jpg",
    ],
    description:
      "Berline premium allemande. Plaisir de conduite, finitions luxueuses et performances pour une expérience haut de gamme à Fès.",
  },
  {
    id: "renault-arkana",
    name: "Renault Arkana",
    year: 2023,
    trans: "Auto",
    fuel: "Essence",
    seats: 5,
    price: 550,
    type: "SUV",
    img: "/images/renault-arkana.jpg",
    description:
      "SUV coupé au design distinctif, alliant élégance et praticité pour vos déplacements à Fès et au-delà.",
  },
  {
    id: "kia-sportage",
    name: "Kia Sportage",
    year: 2023,
    trans: "Auto",
    fuel: "Diesel",
    seats: 5,
    price: 600,
    type: "SUV",
    img: "/images/kia-sportage.jpg",
    description:
      "SUV spacieux et bien équipé, excellent choix pour les familles et les longs trajets en tout confort.",
  },
  {
    id: "golf-8",
    name: "Volkswagen Golf 8",
    year: 2022,
    trans: "Auto",
    fuel: "Essence",
    seats: 5,
    price: 700,
    type: "Berline",
    img: "/images/golf-8.jpg",
    description:
      "La référence des compactes. Dynamisme, qualité de fabrication et technologies modernes.",
  },
  {
    id: "hyundai-accent-2022",
    name: "Hyundai Accent",
    year: 2022,
    trans: "Manuelle",
    fuel: "Diesel",
    seats: 5,
    price: 330,
    type: "Berline",
    img: "/images/hyundai-accent-bleue.jpg",
    description:
      "Version manuelle économique, parfaite pour un budget maîtrisé sans sacrifier le confort.",
  },
];

export function getCarById(id: string): Car | undefined {
  return CARS.find((c) => c.id === id);
}

export function getPopularCars(): Car[] {
  return CARS.filter((c) => c.popular).slice(0, 4);
}
