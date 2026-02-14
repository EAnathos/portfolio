# Portfolio EAnathos

Portfolio personnel construit avec Astro et Tailwind CSS. Le site presente les projets, competences, et une section photo.

## Apercu

- Site one-page avec sections A propos, Competences, Projets, Photo, Contact.
- Hero et cartes personnalisees dans un theme spatial bleu.
- Favicon configuree sur le logo du site.

## Structure du projet

```text
/
├── public/
│   ├── logo.png
│   ├── photo.jpg
│   └── projects/
├── src/
│   ├── components/
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Contenu principal

- [src/components/Welcome.astro](src/components/Welcome.astro) : contenu de la page et sections.
- [src/layouts/Layout.astro](src/layouts/Layout.astro) : layout global, meta, favicon.
- [src/styles/global.css](src/styles/global.css) : styles globaux.

## Commandes

Toutes les commandes se lancent a la racine du projet :

| Commande         | Action                                |
| :--------------- | :------------------------------------ |
| `npm install`    | Installe les dependances              |
| `npm run dev`    | Lance le serveur local (localhost:4321) |
| `npm run build`  | Genere le build de production         |
| `npm run preview`| Previsualise le build                 |
