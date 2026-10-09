import type { Building } from '../domain/types'

export const BUILDINGS: readonly Building[] = [
  {
    id: 'maison',
    name: 'Maison',
    buildables: [
      {
        id: 'coffre-simple',
        name: 'Coffre Simple',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'coffre',
        name: 'Coffre',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'remise-a-bois-de-chauffe-1',
        name: 'Remise à Bois de Chauffe I',
        requirements: [
          { materialId: 'baton', quantity: 10 },
          { materialId: 'clous-en-bronze', quantity: 2 },
        ],
      },
      {
        id: 'remise-a-bois-de-chauffe-2',
        name: 'Remise à Bois de Chauffe II',
        requirements: [
          { materialId: 'baton', quantity: 20 },
          { materialId: 'clous-en-bronze', quantity: 6 },
          { materialId: 'assemblage-en-bronze', quantity: 2 },
        ],
      },
      {
        id: 'station-de-fournisseur-zombie',
        name: 'Station de Fournisseur Zombie',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
    ],
  },
  {
    id: 'laboratoire-d-alchimie',
    name: "Laboratoire d'Alchimie",
    buildables: [
      {
        id: 'coffre-simple',
        name: 'Coffre Simple',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'coffre',
        name: 'Coffre',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'station-de-fournisseur-zombie',
        name: 'Station de Fournisseur Zombie',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'laboratoire-1',
        name: 'Laboratoire I',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'assemblage-en-bronze', quantity: 3 },
          { materialId: 'verre', quantity: 3 },
        ],
      },
      {
        id: 'laboratoire-2',
        name: 'Laboratoire II',
        requirements: [
          { materialId: 'poutre-huilee', quantity: 2 },
          { materialId: 'assemblage-en-fer', quantity: 3 },
          { materialId: 'lentilles', quantity: 2 },
        ],
      },
      {
        id: 'etagere-a-fioles',
        name: 'Étagère à Fioles',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 6 },
          { materialId: 'clous-en-bronze', quantity: 8 },
        ],
      },
      {
        id: 'cube-a-distiller',
        name: 'Cube à Distiller',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 2 },
          { materialId: 'assemblage-en-bronze', quantity: 2 },
          { materialId: 'brique', quantity: 12 },
        ],
      },
      {
        id: 'paillasse-de-formulation',
        name: 'Paillasse de Formulation',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'assemblage-en-bronze', quantity: 4 },
          { materialId: 'bronze-poli', quantity: 1 },
        ],
      },
      {
        id: 'remise-a-bois-de-chauffe-1',
        name: 'Remise à Bois de Chauffe I',
        requirements: [
          { materialId: 'baton', quantity: 10 },
          { materialId: 'clous-en-bronze', quantity: 2 },
        ],
      },
      {
        id: 'remise-a-bois-de-chauffe-2',
        name: 'Remise à Bois de Chauffe II',
        requirements: [
          { materialId: 'baton', quantity: 20 },
          { materialId: 'clous-en-bronze', quantity: 6 },
          { materialId: 'assemblage-en-bronze', quantity: 2 },
        ],
      },
    ],
  },
  {
    id: 'cour',
    name: 'Cour',
    buildables: [
      {
        id: 'coffre-simple',
        name: 'Coffre Simple',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'coffre',
        name: 'Coffre',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'lanterne-1',
        name: 'Lanterne I',
        requirements: [
          { materialId: 'poutre-huilee', quantity: 2 },
          { materialId: 'assemblage-en-fer', quantity: 2 },
          { materialId: 'verre', quantity: 2 },
        ],
      },
      {
        id: 'station-de-fournisseur-zombie',
        name: 'Station de Fournisseur Zombie',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'reserve-de-bois',
        name: 'Réserve de Bois',
        requirements: [{ materialId: 'baton', quantity: 6 }],
      },
      {
        id: 'chevalet',
        name: 'Chevalet',
        requirements: [
          { materialId: 'bille-de-bois', quantity: 2 },
          { materialId: 'baton', quantity: 4 },
        ],
      },
      { id: 'billot', name: 'Billot', requirements: [{ materialId: 'buche-courte', quantity: 2 }] },
      {
        id: 'etabli-de-menuisier-1',
        name: 'Établi de Menuisier I',
        requirements: [
          { materialId: 'bille-de-bois', quantity: 8 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'etabli-de-menuisier-2',
        name: 'Établi de Menuisier II',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'bronze-poli', quantity: 2 },
        ],
      },
      {
        id: 'scie-circulaire',
        name: 'Scie Circulaire',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 10 },
          { materialId: 'engrenage-en-bronze', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 10 },
        ],
      },
      {
        id: 'etabli-de-tailleur-de-pierre',
        name: 'Établi de Tailleur de Pierre',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 2 },
          { materialId: 'clous-en-bronze', quantity: 2 },
        ],
      },
      {
        id: 'tour-de-potier',
        name: 'Tour de Potier',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 2 },
          { materialId: 'bloc-de-pierre', quantity: 1 },
        ],
      },
      {
        id: 'four-a-poterie',
        name: 'Four à Poterie',
        requirements: [
          { materialId: 'bloc-de-pierre', quantity: 4 },
          { materialId: 'argile', quantity: 5 },
          { materialId: 'eau', quantity: 5 },
        ],
      },
      {
        id: 'caisse-a-outils',
        name: 'Caisse à Outils',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 2 },
          { materialId: 'assemblage-en-bronze', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 6 },
        ],
      },
      {
        id: 'caisse-a-outils-fonctionnelle',
        name: 'Caisse à Outils Fonctionnelle',
        requirements: [
          { materialId: 'assemblage-en-fer', quantity: 6 },
          { materialId: 'planche-de-bois', quantity: 2 },
        ],
      },
      {
        id: 'enclume-en-bois',
        name: 'Enclume en Bois',
        requirements: [
          { materialId: 'buche-courte', quantity: 1 },
          { materialId: 'pierre', quantity: 1 },
        ],
      },
      {
        id: 'enclume-en-fer',
        name: 'Enclume en Fer',
        requirements: [
          { materialId: 'bloc-de-pierre', quantity: 4 },
          { materialId: 'lingot-de-fer', quantity: 2 },
        ],
      },
      {
        id: 'remise-a-bois-de-chauffe-1',
        name: 'Remise à Bois de Chauffe I',
        requirements: [
          { materialId: 'baton', quantity: 10 },
          { materialId: 'clous-en-bronze', quantity: 2 },
        ],
      },
      {
        id: 'remise-a-bois-de-chauffe-2',
        name: 'Remise à Bois de Chauffe II',
        requirements: [
          { materialId: 'baton', quantity: 20 },
          { materialId: 'clous-en-bronze', quantity: 6 },
          { materialId: 'assemblage-en-bronze', quantity: 2 },
        ],
      },
      {
        id: 'fourneau-1',
        name: 'Fourneau I',
        requirements: [
          { materialId: 'bloc-de-pierre', quantity: 6 },
          { materialId: 'brique', quantity: 12 },
        ],
      },
      {
        id: 'fourneau-2',
        name: 'Fourneau II',
        requirements: [
          { materialId: 'pierre-polie', quantity: 6 },
          { materialId: 'bronze-poli', quantity: 2 },
          { materialId: 'brique', quantity: 12 },
        ],
      },
      {
        id: 'soufflet',
        name: 'Soufflet',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
          { materialId: 'parchemin-en-peau', quantity: 2 },
        ],
      },
      {
        id: 'rampe-d-orpaillage',
        name: "Rampe d'Orpaillage",
        requirements: [
          { materialId: 'bille-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'bac-a-trempe',
        name: 'Bac à Trempe',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 8 },
        ],
      },
      {
        id: 'rouet',
        name: 'Rouet',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 3 },
          { materialId: 'baton', quantity: 8 },
          { materialId: 'clous-en-bronze', quantity: 12 },
        ],
      },
      {
        id: 'metier-a-tisser',
        name: 'Métier à Tisser',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'bronze-poli', quantity: 2 },
          { materialId: 'clous-en-bronze', quantity: 8 },
        ],
      },
      {
        id: 'table-de-couture',
        name: 'Table de Couture',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 6 },
          { materialId: 'bronze-poli', quantity: 2 },
          { materialId: 'assemblage-sophistique', quantity: 4 },
        ],
      },
    ],
  },
  {
    id: 'jardin',
    name: 'Jardin',
    buildables: [
      {
        id: 'coffre-simple',
        name: 'Coffre Simple',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'coffre',
        name: 'Coffre',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 6 },
        ],
      },
      { id: 'parcelle-cultivable', name: 'Parcelle Cultivable', requirements: [] },
      {
        id: 'station-de-jardinier',
        name: 'Station de Jardinier',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'assemblage-en-bronze', quantity: 2 },
          { materialId: 'clous-en-bronze', quantity: 6 },
        ],
      },
      {
        id: 'pommier',
        name: 'Pommier',
        requirements: [{ materialId: 'pousse-de-pommier', quantity: 1 }],
      },
      {
        id: 'buisson-a-baies',
        name: 'Buisson à Baies',
        requirements: [{ materialId: 'pousse-de-buisson', quantity: 1 }],
      },
      {
        id: 'buisson-de-rhododendron',
        name: 'Buisson de Rhododendron',
        requirements: [{ materialId: 'pousse-de-rhododendron', quantity: 1 }],
      },
      {
        id: 'buisson-de-myrtilles',
        name: 'Buisson de Myrtilles',
        requirements: [{ materialId: 'pousse-de-myrtillier', quantity: 1 }],
      },
    ],
  },
  {
    id: 'vignoble',
    name: 'Vignoble',
    buildables: [
      {
        id: 'coffre-simple',
        name: 'Coffre Simple',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'coffre',
        name: 'Coffre',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'treillis-de-vigne',
        name: 'Treillis de Vigne',
        requirements: [
          { materialId: 'baton', quantity: 5 },
          { materialId: 'tourbe', quantity: 3 },
        ],
      },
      {
        id: 'ruche',
        name: 'Ruche',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 2 },
          { materialId: 'assemblage-en-bronze', quantity: 1 },
          { materialId: 'clous-en-bronze', quantity: 6 },
        ],
      },
      {
        id: 'station-de-jardinier',
        name: 'Station de Jardinier',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'assemblage-en-bronze', quantity: 2 },
          { materialId: 'clous-en-bronze', quantity: 6 },
        ],
      },
      {
        id: 'station-de-porteur',
        name: 'Station de Porteur',
        requirements: [
          { materialId: 'bloc-de-pierre', quantity: 2 },
          { materialId: 'brique', quantity: 4 },
        ],
      },
    ],
  },
  {
    id: 'cave-de-vignoble',
    name: 'Cave de Vignoble',
    buildables: [
      {
        id: 'coffre-simple',
        name: 'Coffre Simple',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'coffre',
        name: 'Coffre',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'station-de-fournisseur-zombie',
        name: 'Station de Fournisseur Zombie',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'remise-a-bois-de-chauffe-1',
        name: 'Remise à Bois de Chauffe I',
        requirements: [
          { materialId: 'baton', quantity: 10 },
          { materialId: 'clous-en-bronze', quantity: 2 },
        ],
      },
      {
        id: 'remise-a-bois-de-chauffe-2',
        name: 'Remise à Bois de Chauffe II',
        requirements: [
          { materialId: 'baton', quantity: 20 },
          { materialId: 'clous-en-bronze', quantity: 6 },
          { materialId: 'assemblage-en-bronze', quantity: 2 },
        ],
      },
      {
        id: 'station-de-porteur',
        name: 'Station de Porteur',
        requirements: [
          { materialId: 'bloc-de-pierre', quantity: 2 },
          { materialId: 'brique', quantity: 4 },
        ],
      },
      {
        id: 'presse-a-raisin',
        name: 'Presse à Raisin',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 6 },
          { materialId: 'poutre-en-bois', quantity: 4 },
          { materialId: 'assemblage-en-fer', quantity: 8 },
        ],
      },
      {
        id: 'tonneau-de-fermentation',
        name: 'Tonneau de Fermentation',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-fer', quantity: 8 },
        ],
      },
      {
        id: 'alambic',
        name: 'Alambic',
        requirements: [
          { materialId: 'brique', quantity: 12 },
          { materialId: 'assemblage-en-fer', quantity: 8 },
          { materialId: 'assemblage-sophistique', quantity: 2 },
        ],
      },
      {
        id: 'tonneau-de-vin',
        name: 'Tonneau de Vin',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'clous-en-fer', quantity: 8 },
          { materialId: 'assemblage-en-fer', quantity: 2 },
        ],
      },
    ],
  },
  {
    id: 'salle-d-ecriture',
    name: "Salle d'Écriture",
    buildables: [
      {
        id: 'coffre-simple',
        name: 'Coffre Simple',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'coffre',
        name: 'Coffre',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'table-de-bijoutier',
        name: 'Table de Bijoutier',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 12 },
          { materialId: 'verre', quantity: 3 },
        ],
      },
      {
        id: 'station-de-fournisseur-zombie',
        name: 'Station de Fournisseur Zombie',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'bureau',
        name: 'Bureau',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 6 },
          { materialId: 'bronze-poli', quantity: 1 },
        ],
      },
      {
        id: 'presse-a-papier',
        name: 'Presse à Papier',
        requirements: [
          { materialId: 'poutre-en-bois', quantity: 3 },
          { materialId: 'engrenage-en-bronze', quantity: 2 },
          { materialId: 'assemblage-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'presse-d-imprimerie',
        name: "Presse d'Imprimerie",
        requirements: [
          { materialId: 'poutre-huilee', quantity: 3 },
          { materialId: 'engrenage-en-bronze', quantity: 2 },
          { materialId: 'assemblage-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'paillasse-de-formulation',
        name: 'Paillasse de Formulation',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'assemblage-en-bronze', quantity: 4 },
          { materialId: 'bronze-poli', quantity: 1 },
        ],
      },
    ],
  },
  {
    id: 'usine',
    name: 'Usine',
    buildables: [
      {
        id: 'convoyeur-a-bande',
        name: 'Convoyeur à Bande',
        requirements: [
          { materialId: 'engrenage-en-bronze', quantity: 1 },
          { materialId: 'tissu', quantity: 1 },
        ],
      },
      {
        id: 'separateur-de-convoyeur',
        name: 'Séparateur de Convoyeur',
        requirements: [
          { materialId: 'engrenage-en-bronze', quantity: 3 },
          { materialId: 'tissu', quantity: 1 },
        ],
      },
      {
        id: 'convoyeur-souterrain',
        name: 'Convoyeur Souterrain',
        requirements: [
          { materialId: 'engrenage-en-bronze', quantity: 4 },
          { materialId: 'tissu', quantity: 2 },
        ],
      },
      {
        id: 'station-d-approvisionnement',
        name: "Station d'Approvisionnement",
        requirements: [
          { materialId: 'engrenage-en-bronze', quantity: 4 },
          { materialId: 'assemblage-en-fer', quantity: 6 },
          { materialId: 'poutre-en-bois', quantity: 2 },
        ],
      },
      {
        id: 'caisson-de-convoyeur-1',
        name: 'Caisson de Convoyeur I',
        requirements: [
          { materialId: 'engrenage-en-bronze', quantity: 2 },
          { materialId: 'assemblage-en-bronze', quantity: 4 },
          { materialId: 'planche-de-bois', quantity: 2 },
        ],
      },
      {
        id: 'carrousel-a-zombies',
        name: 'Carrousel à Zombies',
        requirements: [
          { materialId: 'engrenage-en-bronze', quantity: 6 },
          { materialId: 'assemblage-en-fer', quantity: 6 },
          { materialId: 'poutre-en-bois', quantity: 4 },
        ],
      },
      {
        id: 'station-de-fournisseur-zombie',
        name: 'Station de Fournisseur Zombie',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-fer', quantity: 8 },
          { materialId: 'assemblage-en-fer', quantity: 2 },
        ],
      },
      {
        id: 'lanterne-d-usine',
        name: "Lanterne d'Usine",
        requirements: [
          { materialId: 'poutre-huilee', quantity: 2 },
          { materialId: 'assemblage-en-fer', quantity: 2 },
          { materialId: 'verre', quantity: 2 },
        ],
      },
      {
        id: 'stockage-de-jardin-2',
        name: 'Stockage de Jardin II',
        requirements: [
          { materialId: 'poutre-en-bois', quantity: 12 },
          { materialId: 'engrenage-en-bronze', quantity: 4 },
          { materialId: 'assemblage-en-fer', quantity: 4 },
        ],
      },
      {
        id: 'banc-d-assemblage-1',
        name: "Banc d'Assemblage I",
        requirements: [
          { materialId: 'planche-renforcee', quantity: 6 },
          { materialId: 'engrenage-en-bronze', quantity: 4 },
          { materialId: 'assemblage-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'banc-d-assemblage-2',
        name: "Banc d'Assemblage II",
        requirements: [
          { materialId: 'poutre-renforcee', quantity: 6 },
          { materialId: 'engrenage-en-bronze', quantity: 8 },
          { materialId: 'assemblage-sophistique', quantity: 6 },
        ],
      },
      {
        id: 'banc-d-assemblage-auto-marteau',
        name: "Banc d'Assemblage : Auto-Marteau",
        requirements: [
          { materialId: 'engrenage-en-bronze', quantity: 2 },
          { materialId: 'assemblage-en-fer', quantity: 6 },
          { materialId: 'lingot-de-fer', quantity: 2 },
        ],
      },
      {
        id: 'banc-d-assemblage-rouet',
        name: "Banc d'Assemblage : Rouet",
        requirements: [
          { materialId: 'engrenage-en-bronze', quantity: 2 },
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-fer', quantity: 4 },
        ],
      },
      {
        id: 'banc-d-assemblage-perceuse',
        name: "Banc d'Assemblage : Perceuse",
        requirements: [
          { materialId: 'engrenage-en-bronze', quantity: 2 },
          { materialId: 'assemblage-en-fer', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
        ],
      },
      {
        id: 'forge-1',
        name: 'Forge I',
        requirements: [
          { materialId: 'planche-renforcee', quantity: 6 },
          { materialId: 'assemblage-en-bronze', quantity: 4 },
          { materialId: 'engrenage-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'forge-2',
        name: 'Forge II',
        requirements: [
          { materialId: 'poutre-renforcee', quantity: 6 },
          { materialId: 'vis-en-acier', quantity: 12 },
          { materialId: 'assemblage-d-ingenierie', quantity: 4 },
        ],
      },
      {
        id: 'forge-marteau',
        name: 'Forge : Marteau',
        requirements: [
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'assemblage-en-fer', quantity: 2 },
          { materialId: 'lingot-de-fer', quantity: 1 },
        ],
      },
      {
        id: 'forge-soufflet',
        name: 'Forge : Soufflet',
        requirements: [
          { materialId: 'parchemin-en-peau', quantity: 4 },
          { materialId: 'assemblage-en-fer', quantity: 2 },
          { materialId: 'planche-de-bois', quantity: 4 },
        ],
      },
      {
        id: 'forge-presse',
        name: 'Forge : Presse',
        requirements: [
          { materialId: 'assemblage-d-ingenierie', quantity: 2 },
          { materialId: 'assemblage-en-acier', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
        ],
      },
      {
        id: 'forge-pierre-a-meuler',
        name: 'Forge : Pierre à Meuler',
        requirements: [
          { materialId: 'assemblage-d-ingenierie', quantity: 2 },
          { materialId: 'assemblage-en-acier', quantity: 4 },
          { materialId: 'bloc-de-pierre', quantity: 1 },
        ],
      },
      {
        id: 'cuisine-1',
        name: 'Cuisine I',
        requirements: [
          { materialId: 'planche-renforcee', quantity: 6 },
          { materialId: 'engrenage-en-bronze', quantity: 4 },
          { materialId: 'assemblage-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'cuisine-2',
        name: 'Cuisine II',
        requirements: [
          { materialId: 'poutre-renforcee', quantity: 4 },
          { materialId: 'engrenage-en-bronze', quantity: 8 },
          { materialId: 'assemblage-sophistique', quantity: 8 },
        ],
      },
      {
        id: 'cuisine-meule',
        name: 'Cuisine : Meule',
        requirements: [
          { materialId: 'pierre-polie', quantity: 2 },
          { materialId: 'baton', quantity: 4 },
          { materialId: 'assemblage-en-fer', quantity: 2 },
        ],
      },
      {
        id: 'cuisine-machine-a-sceller',
        name: 'Cuisine : Machine à Sceller',
        requirements: [
          { materialId: 'assemblage-sophistique', quantity: 4 },
          { materialId: 'lingot-de-fer', quantity: 1 },
          { materialId: 'planche-de-bois', quantity: 2 },
        ],
      },
    ],
  },
  {
    id: 'stockage-de-fournitures',
    name: 'Stockage de Fournitures',
    buildables: [
      {
        id: 'palette-de-fournitures',
        name: 'Palette de Fournitures',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 6 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-bronze', quantity: 12 },
        ],
      },
    ],
  },
  {
    id: 'morgue',
    name: 'Morgue',
    buildables: [
      {
        id: 'coffre-simple',
        name: 'Coffre Simple',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'coffre',
        name: 'Coffre',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'table-d-autopsie-1',
        name: "Table d'Autopsie I",
        requirements: [
          { materialId: 'bille-de-bois', quantity: 4 },
          { materialId: 'bloc-de-pierre', quantity: 2 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'table-d-autopsie-2',
        name: "Table d'Autopsie II",
        requirements: [
          { materialId: 'pierre-polie', quantity: 8 },
          { materialId: 'assemblage-en-fer', quantity: 4 },
        ],
      },
      {
        id: 'palette-1',
        name: 'Palette I',
        requirements: [
          { materialId: 'bille-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'palette-2',
        name: 'Palette II',
        requirements: [
          { materialId: 'planche-huilee', quantity: 8 },
          { materialId: 'assemblage-sophistique', quantity: 4 },
        ],
      },
      {
        id: 'table-de-resurrection-1',
        name: 'Table de Résurrection I',
        requirements: [
          { materialId: 'planche-huilee', quantity: 2 },
          { materialId: 'pierre-polie', quantity: 4 },
          { materialId: 'verre', quantity: 3 },
        ],
      },
      {
        id: 'table-d-embaumement-1',
        name: "Table d'Embaumement I",
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'bronze-poli', quantity: 1 },
          { materialId: 'verre', quantity: 4 },
        ],
      },
    ],
  },
  {
    id: 'nouveau-cimetiere',
    name: 'Nouveau Cimetière',
    buildables: [
      {
        id: 'coffre-simple',
        name: 'Coffre Simple',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'coffre',
        name: 'Coffre',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'etendre-le-cimetiere-3',
        name: 'Étendre le Cimetière III',
        requirements: [{ materialId: 'pierre-polie', quantity: 24 }],
      },
      {
        id: 'ameliorer-la-cloture-1',
        name: 'Améliorer la Clôture I',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 12 },
          { materialId: 'clous-en-bronze', quantity: 12 },
          { materialId: 'bloc-de-pierre', quantity: 12 },
        ],
      },
      {
        id: 'ameliorer-les-routes-et-les-chemins',
        name: 'Améliorer les routes et les chemins',
        requirements: [{ materialId: 'pierre-polie', quantity: 24 }],
      },
      { id: 'tombe-vide', name: 'Tombe Vide', requirements: [] },
      {
        id: 'columbarium-1',
        name: 'Columbarium I',
        requirements: [
          { materialId: 'bloc-de-pierre', quantity: 6 },
          { materialId: 'assemblage-en-bronze', quantity: 4 },
          { materialId: 'urne-avec-cendres-1', quantity: 8 },
        ],
      },
      {
        id: 'crypte',
        name: 'Crypte',
        requirements: [
          { materialId: 'pierre-polie', quantity: 6 },
          { materialId: 'assemblage-en-fer', quantity: 2 },
        ],
      },
      {
        id: 'banc-d-exterieur-1',
        name: "Banc d'Extérieur I",
        requirements: [
          { materialId: 'planche-de-bois', quantity: 3 },
          { materialId: 'assemblage-en-bronze', quantity: 5 },
        ],
      },
      {
        id: 'lanterne-1',
        name: 'Lanterne I',
        requirements: [
          { materialId: 'poutre-huilee', quantity: 2 },
          { materialId: 'assemblage-en-fer', quantity: 2 },
          { materialId: 'verre', quantity: 2 },
        ],
      },
      {
        id: 'monument-1',
        name: 'Monument I',
        requirements: [{ materialId: 'bloc-de-pierre', quantity: 5 }],
      },
      {
        id: 'monument-2',
        name: 'Monument II',
        requirements: [
          { materialId: 'lingot-de-bronze', quantity: 4 },
          { materialId: 'bronze-poli', quantity: 3 },
          { materialId: 'pierre-polie', quantity: 5 },
        ],
      },
      {
        id: 'parterre-de-fleurs-1',
        name: 'Parterre de Fleurs I',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'tourbe', quantity: 3 },
          { materialId: 'rhododendron', quantity: 3 },
        ],
      },
    ],
  },
  {
    id: 'eglise',
    name: 'Église',
    buildables: [
      {
        id: 'coffre-simple',
        name: 'Coffre Simple',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'coffre',
        name: 'Coffre',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'banc-d-interieur-1',
        name: "Banc d'Intérieur I",
        requirements: [
          { materialId: 'planche-de-bois', quantity: 2 },
          { materialId: 'clous-en-bronze', quantity: 6 },
        ],
      },
      {
        id: 'banc-d-interieur-2',
        name: "Banc d'Intérieur II",
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'assemblage-en-bronze', quantity: 6 },
        ],
      },
      {
        id: 'banc-d-interieur-3',
        name: "Banc d'Intérieur III",
        requirements: [
          { materialId: 'poutre-en-bois', quantity: 4 },
          { materialId: 'clous-en-fer', quantity: 6 },
          { materialId: 'tissu', quantity: 4 },
        ],
      },
      {
        id: 'candelabre-1',
        name: 'Candélabre I',
        requirements: [
          { materialId: 'assemblage-en-bronze', quantity: 3 },
          { materialId: 'bougie-simple', quantity: 1 },
        ],
      },
      {
        id: 'candelabre-2',
        name: 'Candélabre II',
        requirements: [
          { materialId: 'assemblage-en-fer', quantity: 3 },
          { materialId: 'bougie-rassurante', quantity: 2 },
        ],
      },
      {
        id: 'confessionnal-1',
        name: 'Confessionnal I',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 6 },
          { materialId: 'clous-en-bronze', quantity: 8 },
        ],
      },
      {
        id: 'confessionnal-2',
        name: 'Confessionnal II',
        requirements: [
          { materialId: 'planche-huilee', quantity: 6 },
          { materialId: 'assemblage-en-bronze', quantity: 8 },
        ],
      },
      {
        id: 'parfums-d-eglise-1',
        name: "Parfums d'Église I",
        requirements: [
          { materialId: 'bloc-de-pierre', quantity: 3 },
          { materialId: 'assemblage-en-bronze', quantity: 4 },
          { materialId: 'encens-simple', quantity: 3 },
        ],
      },
      {
        id: 'autel-d-eglise-1',
        name: "Autel d'Église I",
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 6 },
          { materialId: 'bloc-de-pierre', quantity: 3 },
        ],
      },
      {
        id: 'autel-d-eglise-2',
        name: "Autel d'Église II",
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'assemblage-en-bronze', quantity: 6 },
          { materialId: 'pierre-polie', quantity: 3 },
        ],
      },
    ],
  },
  {
    id: 'scierie-abandonnee',
    name: 'Scierie Abandonnée',
    buildables: [
      {
        id: 'coffre-simple',
        name: 'Coffre Simple',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'coffre',
        name: 'Coffre',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'etabli-de-bucheron',
        name: 'Établi de Bûcheron',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 2 },
          { materialId: 'brique', quantity: 6 },
        ],
      },
      {
        id: 'reserve-de-bois',
        name: 'Réserve de Bois',
        requirements: [
          { materialId: 'poutre-en-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 12 },
        ],
      },
      {
        id: 'station-de-porteur',
        name: 'Station de Porteur',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 2 },
          { materialId: 'brique', quantity: 4 },
        ],
      },
    ],
  },
  {
    id: 'carriere',
    name: 'Carrière',
    buildables: [
      {
        id: 'coffre-simple',
        name: 'Coffre Simple',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
      {
        id: 'coffre',
        name: 'Coffre',
        requirements: [
          { materialId: 'planche-huilee', quantity: 4 },
          { materialId: 'poutre-en-bois', quantity: 2 },
          { materialId: 'clous-en-fer', quantity: 6 },
        ],
      },
      {
        id: 'station-de-fournisseur-zombie',
        name: 'Station de Fournisseur Zombie',
        requirements: [
          { materialId: 'planche-de-bois', quantity: 4 },
          { materialId: 'clous-en-bronze', quantity: 4 },
        ],
      },
    ],
  },
  {
    id: 'caserne',
    name: 'Caserne',
    buildables: [
      {
        id: 'barricade-1',
        name: 'Barricade I',
        requirements: [
          { materialId: 'clous-en-bronze', quantity: 6 },
          { materialId: 'buche-courte', quantity: 2 },
          { materialId: 'planche-renforcee', quantity: 2 },
        ],
      },
      {
        id: 'barricade-2',
        name: 'Barricade II',
        requirements: [
          { materialId: 'clous-en-fer', quantity: 8 },
          { materialId: 'assemblage-en-fer', quantity: 4 },
          { materialId: 'poutre-renforcee', quantity: 2 },
        ],
      },
      {
        id: 'barricade-3',
        name: 'Barricade III',
        requirements: [
          { materialId: 'vis-en-acier', quantity: 8 },
          { materialId: 'assemblage-en-acier', quantity: 4 },
          { materialId: 'montage-du-bois', quantity: 2 },
        ],
      },
      {
        id: 'barricade-a-pieux-1',
        name: 'Barricade à Pieux I',
        requirements: [
          { materialId: 'clous-en-bronze', quantity: 6 },
          { materialId: 'buche-courte', quantity: 2 },
          { materialId: 'planche-renforcee', quantity: 2 },
        ],
      },
      {
        id: 'barricade-a-pieux-2',
        name: 'Barricade à Pieux II',
        requirements: [
          { materialId: 'clous-en-fer', quantity: 8 },
          { materialId: 'assemblage-en-fer', quantity: 4 },
          { materialId: 'poutre-renforcee', quantity: 2 },
        ],
      },
      {
        id: 'barricade-a-pieux-3',
        name: 'Barricade à Pieux III',
        requirements: [
          { materialId: 'vis-en-acier', quantity: 8 },
          { materialId: 'assemblage-en-acier', quantity: 4 },
          { materialId: 'montage-du-bois', quantity: 2 },
        ],
      },
      {
        id: 'barricade-fortifiee-1',
        name: 'Barricade Fortifiée I',
        requirements: [
          { materialId: 'clous-en-bronze', quantity: 6 },
          { materialId: 'buche-courte', quantity: 2 },
          { materialId: 'planche-renforcee', quantity: 2 },
        ],
      },
      {
        id: 'barricade-fortifiee-2',
        name: 'Barricade Fortifiée II',
        requirements: [
          { materialId: 'clous-en-fer', quantity: 8 },
          { materialId: 'assemblage-en-fer', quantity: 4 },
          { materialId: 'poutre-renforcee', quantity: 2 },
        ],
      },
      {
        id: 'barricade-fortifiee-3',
        name: 'Barricade Fortifiée III',
        requirements: [
          { materialId: 'vis-en-acier', quantity: 8 },
          { materialId: 'assemblage-en-acier', quantity: 4 },
          { materialId: 'montage-du-bois', quantity: 2 },
        ],
      },
      {
        id: 'tour-d-archer-1',
        name: "Tour d'Archer I",
        requirements: [
          { materialId: 'clous-en-bronze', quantity: 6 },
          { materialId: 'planche-renforcee', quantity: 2 },
          { materialId: 'arc-renforce', quantity: 1 },
        ],
      },
      {
        id: 'tour-d-archer-2',
        name: "Tour d'Archer II",
        requirements: [
          { materialId: 'clous-en-fer', quantity: 8 },
          { materialId: 'poutre-renforcee', quantity: 2 },
          { materialId: 'arc-renforce', quantity: 1 },
        ],
      },
      {
        id: 'tour-d-archer-3',
        name: "Tour d'Archer III",
        requirements: [
          { materialId: 'vis-en-acier', quantity: 8 },
          { materialId: 'montage-du-bois', quantity: 2 },
          { materialId: 'arc-de-combat', quantity: 1 },
        ],
      },
      {
        id: 'etendre-la-zone-de-construction-militaire',
        name: 'Étendre la zone de construction militaire',
        requirements: [{ materialId: 'banniere-de-victoire', quantity: 1 }],
      },
    ],
  },
]
