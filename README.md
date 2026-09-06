# Site de la commune de Champeau-en-Morvan

Site statique reconstruit avec [Eleventy](https://www.11ty.dev/), hébergeable
**gratuitement** sur GitHub Pages, avec une interface d'édition pour la mairie.

- **But :** remplacer le site loué actuel par un site que la commune possède,
  sans abonnement mensuel.
- **Contenu :** repris de l'ancien site (`Champeau-en-Morvan.fr`), corrigé
  (les menus « Histoire » et « Vie de la commune » qui pointaient vers
  `firebrick-donkey-502994.hostingersite.com` sont désormais internes) et
  complété (accès rapides, page contact, carte, bandeau d'alerte, actualités,
  informations utiles, mentions légales, accessibilité, plan du site, flux RSS).

---

## 1. Prérequis (poste de la personne qui gère le site)

- [Node.js](https://nodejs.org/) version 18 ou plus.
- Un compte [GitHub](https://github.com/) (gratuit).

## 2. Aperçu en local

```bash
npm install
npm start
```

Le site est visible sur <http://localhost:8080>. Toute modification d'un fichier
est prise en compte automatiquement.

Pour générer le site final dans le dossier `_site/` :

```bash
npm run build
```

## 3. Mise en ligne sur GitHub Pages (une seule fois)

1. Créer un dépôt GitHub, par exemple `Champeau-en-Morvan`.
2. Pousser ce dossier dans le dépôt :
   ```bash
   git init
   git add .
   git commit -m "Site initial"
   git branch -M main
   git remote add origin https://github.com/LesPat1420/Champeau-en-Morvan.git
   git push -u origin main
   ```
3. Dans le dépôt GitHub : **Settings → Pages → Build and deployment → Source :
   GitHub Actions**.
4. À chaque `git push` sur `main`, le site est reconstruit et publié
   automatiquement (voir l'onglet **Actions**).

### Nom de domaine `Champeau-en-Morvan.fr`

Le fichier `src/CNAME` contient déjà `Champeau-en-Morvan.fr`.
Chez le registrar du domaine, faire pointer :

| Type | Nom | Valeur |
|------|-----|--------|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |
| CNAME | www | `LesPat1420.github.io` |

Puis, dans **Settings → Pages**, renseigner le domaine et cocher
**Enforce HTTPS**. Tant que le domaine n'est pas transféré, le site reste
accessible sur `https://LesPat1420.github.io/Champeau-en-Morvan/`
(dans ce cas, éditer temporairement `pathPrefix` — voir commentaires du fichier
`eleventy.config.js`).

## 4. Interface d'édition pour la mairie (`/admin/`)

L'interface [Sveltia CMS](https://github.com/sveltia/sveltia-cms) permet de
gérer, sans toucher au code : **actualités**, **comptes rendus**,
**bulletins municipaux**, **bandeau d'alerte**, **page d'accueil**,
**coordonnées de la mairie** et le contenu des **pages courantes**.

Configuration (une seule fois) :

1. Dans `src/admin/config.yml`, remplacer `LesPat1420/Champeau-en-Morvan`
   par le vrai chemin du dépôt.
2. Créer une **GitHub OAuth App**
   (<https://github.com/settings/developers> → *New OAuth App*) :
   - *Homepage URL* : `https://Champeau-en-Morvan.fr`
   - *Authorization callback URL* : `https://Champeau-en-Morvan.fr/admin/` puis,
     si vous utilisez le proxy Cloudflare (voir `oauth-proxy/`),
     `https://NOM-DU-WORKER.xxx.workers.dev/callback`.
3. Déployer le proxy d'authentification (dossier `oauth-proxy/`, gratuit sur
   Cloudflare Workers) — instructions dans `oauth-proxy/wrangler.toml`.
4. Donner aux personnes de la mairie un accès **write** au dépôt GitHub
   (Settings → Collaborators).

Elles se connectent ensuite sur `https://Champeau-en-Morvan.fr/admin/` avec leur
compte GitHub. Chaque enregistrement crée un *commit* et déclenche la
reconstruction automatique du site (mise en ligne en 1 à 2 minutes).

> Variante sans proxy : Sveltia CMS sait aussi utiliser un service
> d'authentification hébergé. Pour revenir à Decap CMS, voir le commentaire dans
> `src/admin/index.html`.

## 5. Formulaire de contact

La page `/contact/` contient un formulaire prêt pour
[Formspree](https://formspree.io/) (offre gratuite). Créer un compte, indiquer
`mairie-st-agnan-morvan@wanadoo.fr` comme destinataire, puis remplacer
`VOTRE_ID` dans `src/contact.md`. Sans cette étape, le téléphone et le courriel
direct restent affichés.

---

## Structure du projet

```
src/
  _data/            Données du site (coordonnées, menu, accueil, alerte)
  _includes/         Gabarits et fragments (en-tête, pied de page…)
  assets/            CSS, JavaScript, images (img/uploads = photos de l'ancien site)
  documents/         PDF (bulletins, comptes rendus, arrêtés…)
  admin/             Interface d'édition (Sveltia CMS)
  actualites/        Une actualité = un fichier Markdown
  mairie/            Renseignements, équipe, comptes rendus, bulletins, formalités
  histoire/          Histoire, église, anciens maires, cartes postales…
  vie-de-la-commune/ Vie associative, déchets, biodiversité, randonnée, galerie…
  pratique/          Situation géographique, salle, objets trouvés, liens, aides…
  index.njk          Page d'accueil
oauth-proxy/         Proxy d'authentification GitHub (Cloudflare Worker)
.github/workflows/   Construction et publication automatiques
```

## Ajouter une actualité sans l'interface

Créer `src/actualites/AAAA-MM-JJ-titre.md` :

```markdown
---
title: "Titre de l'actualité"
date: 2026-03-15
chapo: "Résumé court affiché sur les cartes."
image: /assets/img/uploads/mon-image.jpg
---

Le contenu de l'actualité, en Markdown.
```

## Crédits

- Contenu et photographies : commune de Champeau-en-Morvan et ses partenaires.
- Certaines pages historiques citent Wikipédia (CC BY-SA) et
  *Le patrimoine des communes de la Nièvre* ; crédits en bas des pages
  concernées.
- Reconstruction du site : 2026.
