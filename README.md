# Site OASYS RP

Site vitrine statique (HTML / CSS / JavaScript), sans serveur ni base de données : compatible GitHub Pages.

## Structure

```
oasys_rp_site/
├── index.html          Accueil
├── serveur.html        Le serveur
├── reglement.html      Règlement
├── entreprises.html    Entreprises légales
├── cites.html          Cités illégales
├── boutique.html       Boutique (redirige vers Tebex)
├── rejoindre.html      Nous rejoindre (Discord, TikTok, FiveM)
├── 404.html            Page introuvable
├── config/
│   ├── config.js       ← LIENS, ENTREPRISES, CITÉS, CHIFFRES
│   └── reglement.js    ← TEXTE DU RÈGLEMENT
└── assets/
    ├── css/style.css   Design
    ├── js/main.js      Menu, animations, listes, règlement
    └── img/            Logo, favicon, images du serveur (banniere.webp = fond de l'accueil)
```

## Modifier le contenu

Tout se fait dans **`config/config.js`** :

| Quoi | Où |
|---|---|
| Lien Discord, TikTok, FiveM, Tebex | `liens: { ... }` |
| Lien du bouton « Postuler » (entreprises) | `liens.candidatureEntreprise` |
| Lien du bouton « Faire une demande » (cités) | `liens.demandeCite` |
| Statut d'une entreprise | `entreprises: [...]` → `statut: "Disponible"` ou `"Occupée"` |
| Statut d'une cité | `cites: [...]` → `statut: "Disponible"` ou `"Occupée"` |
| Chiffres sous le titre de l'accueil | `stats: [...]` |

Exemple — passer le Kebab en occupé :

```js
{ nom: "Kebab", statut: "Occupée", categorie: "Restauration", description: "..." },
```

Ajouter une entreprise ou une cité : copie une ligne existante, colle-la en dessous et change le nom.
Une entreprise peut avoir son propre lien de candidature avec `lien: "https://..."`.

Le **règlement** se modifie dans **`config/reglement.js`** (syntaxe expliquée en haut du fichier :
`#` pour une partie, `##` pour un article, `-` pour une liste). Le sommaire se génère tout seul.

Les images se remplacent dans `assets/img/` en gardant le même nom de fichier.

## Mettre le site en ligne sur GitHub Pages

1. Crée un compte sur https://github.com (si ce n'est pas déjà fait).
2. Clique sur **New repository** (bouton vert « New »).
   - Nom : par exemple `oasys-rp`
   - Visibilité : **Public** (obligatoire pour GitHub Pages gratuit)
   - Clique sur **Create repository**.
3. Sur la page du dépôt, clique sur **uploading an existing file**.
4. Ouvre le dossier `oasys_rp_site` sur ton PC, sélectionne **tout son contenu**
   (les fichiers `.html`, les dossiers `assets` et `config`, `.nojekyll`, `README.md`)
   et glisse-le dans la page GitHub. Ne glisse pas le dossier lui-même, mais ce qu'il contient.
   > Le fichier `.nojekyll` est caché sous Windows : active « Éléments masqués » dans l'onglet
   > Affichage de l'explorateur. S'il manque, le site fonctionne quand même.
5. En bas, clique sur **Commit changes**.
6. Va dans **Settings** → **Pages** (menu de gauche).
   - Source : **Deploy from a branch**
   - Branch : **main** et dossier **/ (root)** → **Save**.
7. Attends 1 à 2 minutes puis recharge la page : l'adresse du site s'affiche en haut,
   du type `https://ton-pseudo.github.io/oasys-rp/`.

### Mettre à jour le site

Dans ton dépôt GitHub, ouvre le fichier à changer (par exemple `config/config.js`),
clique sur l'icône crayon ✏️, modifie, puis **Commit changes**. Le site se met à jour en 1 à 2 minutes.

### Nom de domaine personnalisé (optionnel)

Settings → Pages → **Custom domain** : entre ton domaine (ex : `oasys-rp.fr`), puis chez ton
registrar crée un enregistrement `CNAME` pointant vers `ton-pseudo.github.io`. Coche ensuite **Enforce HTTPS**.

## Boutique Tebex

- Le bouton « Accéder à la boutique » ouvre ta boutique Tebex (`liens.tebex`). Aucun paiement ne passe par ce site.
- Optionnel : renseigne `tebex.publicToken` (Tebex → Integrations → Headless API, la clé **publique**)
  pour afficher automatiquement tes articles et leurs prix sur la page Boutique.
  **Ne mets jamais la clé privée** : ce fichier est visible par tout le monde.

## Tester sur ton PC

Double-clique sur `index.html`. Tout fonctionne en local, sauf la liste d'articles Tebex
qui nécessite que le site soit en ligne.
