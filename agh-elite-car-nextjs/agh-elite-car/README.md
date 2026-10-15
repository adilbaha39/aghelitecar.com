# AGH Elite Car – Site Next.js

Site de location de voitures haut de gamme à Fès, reconstruit avec :

- **Next.js 15** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- Focus SEO (metadata, JSON-LD LocalBusiness, OpenGraph)
- Réservation via **WhatsApp** (liens pré-remplis)

## Démarrage

```bash
cd agh-elite-car
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/                 # Pages (App Router)
    page.tsx           # Accueil
    flotte/            # Liste + filtres
    voiture/[id]/     # Fiche véhicule
    apropos/
    conditions/
    contact/
  components/          # Header, Footer, CarCard, WhatsAppFloat
  data/cars.ts         # Données des véhicules
  lib/whatsapp.ts      # Helpers WhatsApp + contact
public/images/         # Placer les images ici (voir README.txt)
```

## Images

Les images ne sont pas incluses. Placez-les dans `public/images/` en respectant les noms listés dans `public/images/README.txt` (issus de l’ancien site).

## WhatsApp

Numéro configuré : **+212 6 64 44 31 73**  
Tous les boutons « Réserver » ouvrent WhatsApp avec un message pré-rempli.

## SEO

- Metadata dynamique par page
- JSON-LD LocalBusiness
- URLs sémantiques (`/voiture/bmw-320i`)
- generateStaticParams pour les fiches véhicules

## Déploiement

Compatible Vercel, Netlify, ou tout hébergeur Node.

```bash
npm run build
npm start
```
