const it = {
  categories: {
    community: 'Comunità',
    organization: 'Organizzazione',
    product: 'Prodotto',
  },
  topics: {
    software: 'Software',
    nft: 'NFT',
    metaverse: 'Metaverso',
    defi: 'DeFi',
    refi: 'ReFi',
    charity: 'Beneficienza',
    art: 'Arte',
    music: 'Musica',
    iot: 'IoT',
    media: 'Media',
    event: 'Eventi',
    cefi: 'CeFi',
    governance: 'Governance',
    payments: 'Pagamenti',
    gaming: 'Gaming',
  },
  navbar: {
    project: {
      title: 'Progetti',
      info: 'Scopri i progetti blockchain e web3 più interessanti',
      children: {
        product: {
          title: 'Prodotti',
          info: 'Scopri i più recenti prodotti blockchain e web3',
        },
        community: {
          title: 'Comunità',
          info: 'Trova le comunità blockchain e web3 più adatte ai tuoi interessi',
        },
        organization: {
          title: 'Organizzazioni',
          info: 'Individua le aziende più innovative nel mondo blockchain e we3',
        },
      },
    },
  },
  pagination: {
    showAll: 'Vedi tutti',
    pageInfo_one: '{{count}} elemento',
    pageInfo_other: '{{count}} elementi',
  },
  action: {
    addProject: 'Aggiungi progetto',
    contact: 'Contattaci',
    goToWebsite: 'Visita il sito',
  },
  pages: {
    home: {
      title: "Scopri l'ecosistema blockchain italiano!",
      description:
        'Connettiti con chi genera nuovi prodotti, comunità entusiaste, organizzazioni emergenti. Partecipa alla crescita del network e aggiungi i tuoi progetti preferiti.',
      latestProjects: 'Ultimi arrivati',
      latestCommunities: 'Comunità',
      latestProducts: 'Prodotti',
      latestOrganizations: 'Organizzazioni',
    },
    projects: {
      title: 'Progetti blockchain e web3',
      title_community: 'Comunità blockchain e web3',
      title_organization: 'Organizzazioni blockchain e web3',
      title_product: 'Prodotti blockchain e web3',
      searchTitle: 'Tutti i progetti blockchain e web3 🇮🇹',
      searchTitle_community: 'Elenco comunità blockchain 🇮🇹',
      searchTitle_organization: 'Elenco organizzazioni blockchain 🇮🇹',
      searchTitle_product: 'Elenco prodotti blockchain 🇮🇹',
      currentSearch: 'Cerca "{{input}}"',
    },
    projectEntry: {
      back: 'Vedi tutti i progetti',
    },
  },
  addProject: {
    title: 'Aggiungi un progetto',
    description:
      'Aiutaci a rendere 0xItalia una risorsa completa e di valore. Conosci altri prodotti, organizzazioni o comunità dell’ecosistema blockchain italiano? Inseriscile nel repository GitHub di 0xItalia, bastano poche informazioni essenziali.',
    action: 'Vai al repository',
  },
} as const;

export default it;
