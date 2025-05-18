// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'API Mercado Inclusivo',
  tagline: 'Documentação da API para inclusão de PCDs no mercado de trabalho',
  url: 'http://localhost',
  baseUrl: '/',
  favicon: 'img/favicon.ico',

  organizationName: 'seu-usuario',
  projectName: 'API-Mercado-Inclusivo',

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // docs na raiz
          sidebarPath: require.resolve('../sidebars.js'),
        },
        blog: false,
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'API Inclusiva',
      logo: {
        alt: 'Logo',
        src: 'img/logo.svg',
      },
      items: [],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Squad 5.`,
    },
  },
};

module.exports = config;




