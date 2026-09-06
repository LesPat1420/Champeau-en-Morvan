const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  // Réécrit automatiquement les liens/images selon pathPrefix (sous-dossier github.io)
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  // Passthrough : fichiers copiés tels quels vers le site généré
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/documents": "documents" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  // Interface d'administration (application autonome, copiée telle quelle)
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  eleventyConfig.addWatchTarget("src/assets/");

  // Moteur Markdown (avec {.classe} sur les éléments)
  const md = markdownIt({ html: true, breaks: false, linkify: true }).use(
    markdownItAttrs
  );
  eleventyConfig.setLibrary("md", md);

  // Filtre : rendu Markdown en ligne (pour des champs venant du CMS)
  eleventyConfig.addFilter("markdown", (content) =>
    content ? md.render(content) : ""
  );

  // Encadré : bloc mis en valeur dont le contenu reste du Markdown
  eleventyConfig.addPairedShortcode("encadre", (content) => {
    return `<div class="encadre">\n${md.render(content.trim())}</div>`;
  });

  // Dates en français
  eleventyConfig.addFilter("dateFR", (value) => {
    if (!value) return "";
    const dt =
      value instanceof Date
        ? DateTime.fromJSDate(value, { zone: "utc" })
        : DateTime.fromISO(String(value), { zone: "utc" });
    return dt.setLocale("fr").toFormat("d LLLL yyyy");
  });

  eleventyConfig.addFilter("dateISO", (value) => {
    if (!value) return "";
    const dt =
      value instanceof Date
        ? DateTime.fromJSDate(value, { zone: "utc" })
        : DateTime.fromISO(String(value), { zone: "utc" });
    return dt.toISODate();
  });

  eleventyConfig.addFilter("annee", (value) =>
    value ? DateTime.fromJSDate(new Date(value), { zone: "utc" }).year : ""
  );

  // Tri décroissant par date
  eleventyConfig.addFilter("recent", (arr, n) =>
    [...(arr || [])]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, n || arr.length)
  );

  // Collections
  eleventyConfig.addCollection("actualites", (api) =>
    api
      .getFilteredByGlob("src/actualites/*.md")
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  );

  eleventyConfig.addCollection("comptesRendus", (api) =>
    api
      .getFilteredByGlob("src/mairie/comptes-rendus/*.md")
      .sort((a, b) => new Date(b.data.dateSeance) - new Date(a.data.dateSeance))
  );

  eleventyConfig.addCollection("bulletins", (api) =>
    api
      .getFilteredByGlob("src/mairie/bulletins/*.md")
      .sort((a, b) => new Date(b.data.dateParution) - new Date(a.data.dateParution))
  );

  return {
    // Site hébergé sur https://lespat1420.github.io/Champeau-en-Morvan/
    pathPrefix: "/Champeau-en-Morvan/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html", "11ty.js"],
  };
};
