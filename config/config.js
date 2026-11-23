/* ==========================================================================
   OASYS RP — FICHIER DE CONFIGURATION
   --------------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour changer les liens, les statuts des
   entreprises et des cités, les chiffres de l'accueil, etc.

   Règles simples :
   - Garde les guillemets "..." autour des textes.
   - Garde la virgule à la fin de chaque ligne / bloc.
   - Statut possible : "Disponible" ou "Occupée"  (majuscules / accents libres)
   ========================================================================== */

window.OASYS = {

  /* ---------------------------------------------------------------- Général */
  nom: "OASYS RP",
  slogan: "Le serveur FiveM RP de Rouen",
  description:
    "Une ville vivante, des services publics actifs, des entreprises à reprendre et un pôle illégal structuré. Ton histoire commence à Rouen.",

  /* ------------------------------------------------------------------ Liens */
  liens: {
    discord: "https://discord.gg/oasysrp",
    tiktok: "https://www.tiktok.com/@TON-COMPTE",        // ← remplace TON-COMPTE
    fivem: "https://cfx.re/join/kqm8jma",                // ← ton lien cfx.re/join/XXXXX
    tebex: "https://oasys-rp.tebex.store",               // ← ton lien Tebex

    // Bouton « Postuler » des entreprises disponibles (salon / ticket Discord)
    candidatureEntreprise: "https://discord.gg/oasysrp",
    // Bouton « Faire une demande » des cités disponibles (salon / ticket Discord)
    demandeCite: "https://discord.gg/oasysrp",
  },

  /* -------------------------------------------------------- Boutique Tebex
     Optionnel : affiche automatiquement tes articles Tebex sur la page
     Boutique (nom + prix + bouton vers Tebex).
     Tebex > Integrations > Headless API > "Public Token" / identifiant
     de la boutique. JAMAIS la clé privée ici (ce fichier est public).
     Laisse vide "" pour simplement afficher le bouton vers la boutique. */
  tebex: {
    publicToken: "",
  },

  /* ------------------------------------------------- Packs Oasys Coins
     Affichés sur la page Boutique (image + quantité + prix + bouton).
     lien : (optionnel) lien direct du pack, sinon le lien Tebex ci-dessus.
     offert : (optionnel) coins offerts inclus dans la quantité. */
  coins: [
    { quantite: "1 000", prix: "12,99 € TTC", image: "assets/img/coins-1000.webp" },
    { quantite: "2 200", prix: "23,99 € TTC", image: "assets/img/coins-2200.webp", tag: "Populaire", offert: "350" },
    { quantite: "3 500", prix: "33,99 € TTC", image: "assets/img/coins-3500.webp", tag: "Meilleure offre", offert: "880" },
  ],

  /* ------------------------------------------------- Chiffres de l'accueil */
  stats: [
    { valeur: "500+", label: "Membres Discord" },
    { valeur: "24/7", label: "Serveur en ligne" },
    { valeur: "auto:entreprises", label: "Entreprises" },  // calculé tout seul
    { valeur: "auto:cites", label: "Cités" },              // calculé tout seul
  ],

  /* ---------------------------------------------------- Entreprises légales
     nom        : nom affiché
     statut     : "Disponible" ou "Occupée"
     categorie  : petit texte au-dessus du nom
     description: une ligne de présentation (peut rester vide "")
     lien       : (optionnel) lien de candidature propre à cette entreprise  */
  entreprises: [
    { nom: "Police Nationale", statut: "Occupée",    categorie: "Service public", description: "Sécurité publique, patrouilles et enquêtes dans toute la ville." },
    { nom: "Douane",           statut: "Occupée",    categorie: "Service public", description: "Contrôles routiers, frontières et lutte contre les trafics." },
    { nom: "SAMU",             statut: "Occupée",    categorie: "Secours",        description: "Prise en charge médicale d'urgence et soins hospitaliers." },
    { nom: "Pompier",          statut: "Occupée",    categorie: "Secours",        description: "Incendies, secours routiers et assistance aux personnes." },
    { nom: "Justice",          statut: "Disponible", categorie: "Institution",    description: "Tribunal, audiences et décisions de justice." },
    { nom: "Mécano",           statut: "Occupée",    categorie: "Automobile",     description: "Réparation, entretien et personnalisation des véhicules." },
    { nom: "Concessionnaire",  statut: "Occupée",    categorie: "Automobile",     description: "Vente de véhicules neufs et d'occasion." },
    { nom: "Kebab",            statut: "Disponible", categorie: "Restauration",   description: "Restauration rapide au cœur de la ville." },
    { nom: "Chez Ryad",        statut: "Occupée",    categorie: "Bar Tabac",      description: "Bar tabac : boissons, tabac et commandes fournisseurs." },
    { nom: "La Suite",         statut: "Disponible", categorie: "Bar · Club",     description: "Bar et club, soirées et événements." },
  ],

  /* ------------------------------------------------------- Cités illégales
     nom        : nom affiché
     statut     : "Disponible" ou "Occupée"
     description: (optionnel) une ligne de présentation
     lien       : (optionnel) lien de demande propre à cette cité            */
  cites: [
    { nom: "Château Blanc",   statut: "Occupée",    description: "" },
    { nom: "Grand-Mare",      statut: "Occupée",    description: "" },
    { nom: "4 Tours",         statut: "Disponible", description: "" },
    { nom: "Le Puchot",       statut: "Occupée",    description: "" },
    { nom: "Camp de gitans",  statut: "Occupée",    description: "" },
  ],
};
