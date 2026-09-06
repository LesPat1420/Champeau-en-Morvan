// Menu principal du site. Modifier ici pour changer l'ordre ou les libellés.
module.exports = [
  { titre: "Accueil", url: "/" },
  {
    titre: "Mairie",
    url: "/mairie/renseignements/",
    enfants: [
      { titre: "Renseignements", url: "/mairie/renseignements/" },
      { titre: "Comptes rendus du conseil", url: "/mairie/comptes-rendus/" },
      { titre: "Bulletins municipaux", url: "/mairie/bulletins/" },
      { titre: "Équipe municipale", url: "/mairie/equipe-municipale/" },
      { titre: "Formalités administratives", url: "/mairie/formalites/" },
    ],
  },
  { titre: "La commune", url: "/la-commune/" },
  { titre: "Histoire & patrimoine", url: "/histoire/" },
  {
    titre: "Vie de la commune",
    url: "/vie-de-la-commune/vie-associative/",
    enfants: [
      { titre: "Vie associative", url: "/vie-de-la-commune/vie-associative/" },
      { titre: "Activités économiques", url: "/vie-de-la-commune/activites-economiques/" },
      { titre: "Collecte des déchets", url: "/vie-de-la-commune/collecte-des-dechets/" },
      { titre: "Tourisme & randonnée", url: "/vie-de-la-commune/tourisme/" },
    ],
  },
  {
    titre: "Pratique",
    url: "/pratique/situation-geographique/",
    enfants: [
      { titre: "Situation géographique", url: "/pratique/situation-geographique/" },
      { titre: "Salle communale", url: "/pratique/salle-des-associations/" },
      { titre: "Actualités", url: "/actualites/" },
      { titre: "Objets trouvés", url: "/pratique/objets-trouves/" },
      { titre: "Liens utiles", url: "/pratique/liens/" },
    ],
  },
];
