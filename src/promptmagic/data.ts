/**
 * data.ts — Les 20 idées « utiles à l'humain », les racines de l'arbre
 * d'idéation et les moteurs de repli local (aucune clé API requise).
 */

/* ---------------------------------------------------------------------------
   Types
--------------------------------------------------------------------------- */

export interface DossierPrompts {
  court: string;
  standard: string;
  detaille: string;
}

export interface IdeeHumaine {
  id: number;
  titre: string;
  domaine: string;
  emoji: string;
  /** Indice d'impact humain (0 à 100). */
  impact: number;
  probleme: string;
  publicCible: string;
  fonctions: string[];
  prompts: DossierPrompts;
}

export interface ExempleIde {
  debutant: string;
  expert: string;
}

/* ---------------------------------------------------------------------------
   Les 20 idées d'applications responsives utiles à l'être humain
--------------------------------------------------------------------------- */

export const IDEES_HUMAINES: IdeeHumaine[] = [
  {
    id: 1,
    titre: 'Proxilien Solidaires',
    domaine: 'Entraide',
    emoji: '🤝',
    impact: 98,
    probleme:
      "L'isolement urbain et rural empêche les personnes âgées ou démunies de demander un petit coup de main à leurs voisins immédiats.",
    publicCible: 'Voisins d\u2019un même quartier, personnes isolées, étudiants, familles.',
    fonctions: [
      'Carte hyper-locale (rayon 500m)',
      'Bouton SOS course / bricolage en 1 clic',
      'Prêt d\u2019outils entre voisins',
      'Validation par confiance mutuelle',
    ],
    prompts: {
      court:
        'Crée une web-app responsive Mobile-First nommée "Proxilien Solidaires" permettant l\u2019entraide de voisinage dans un rayon de 500m (prêt d\u2019outils, aide aux courses, petits services gratuits). Inclus un mur d\u2019annonces filtrable, un bouton d\u2019urgence bienveillante et une interface accessible.',
      standard:
        'Rôle : Architecte Full-Stack UX/UI spécialisé dans l\u2019économie sociale et solidaire.\nProjet : Développer "Proxilien Solidaires", une application web responsive d\u2019entraide hyper-locale entre voisins.\nObjectif humain : Briser l\u2019isolement et favoriser l\u2019entraide gratuite de proximité.\nFonctionnalités clés :\n1. Tableau de bord en 2 colonnes : "J\u2019ai besoin d\u2019un coup de main" et "Je propose mon aide".\n2. Filtres rapides par catégorie : Courses, Bricolage/Prêt d\u2019objets, Garde ponctuelle, Visite de courtoisie.\n3. Système de badges de bienveillance et compteur d\u2019heures d\u2019entraide du quartier.\n4. Interface Mobile-First ultra-lisible avec mode contraste élevé.',
      detaille:
        'RÔLE : Lead Product Designer & Développeur Senior Front-End.\nPROJET : Application Web Responsive "Proxilien Solidaires" (Tech for Good).\n\n1. VISION & IMPACT HUMAIN :\nPermettre à toute personne isolée ou en besoin ponctuel de solliciter un voisin vérifié à moins de 500 mètres sans barrière technologique ni monétaire.\n\n2. ARCHITECTURE UX/UI & RESPONSIVE :\n- Design chaleureux, police sans-serif 16px minimum, cibles tactiles de 48x48px.\n- Navigation par barre inférieure sur mobile (Accueil, Carte 500m, Publier un besoin, Mes voisins).\n- Thème Clair/Sombre automatique et mode "Accessibilité Senior" (gros boutons).\n\n3. FONCTIONNALITÉS TECHNIQUES À IMPLÉMENTER :\n- Flux interactif temps réel des demandes locales avec étiquettes d\u2019urgence (Urgent aujourd\u2019hui, Cette semaine, Prêt matériel).\n- Formulaire de création rapide en 3 clics avec dictée vocale simulée.\n- Simulateur de distance (ex : "À 120m de chez vous - 2 min à pied").\n- Persistance complète via LocalStorage et export des annonces.',
    },
  },
  {
    id: 2,
    titre: 'FrigoZéroGâchis',
    domaine: 'Écologie',
    emoji: '🥗',
    impact: 96,
    probleme:
      'Des tonnes d\u2019aliments proches de la date de péremption sont jetées alors que des étudiants et familles peinent à remplir leur panier.',
    publicCible: 'Foyers, étudiants, commerçants de quartier, épiceries solidaires.',
    fonctions: [
      'Scan rapide des dates de péremption',
      'Générateur de recettes anti-gaspi avec les restes',
      'Don de paniers entre voisins en 2 clics',
      'Compteur CO2 et Euros économisés',
    ],
    prompts: {
      court:
        'Conçois une application web responsive "FrigoZéroGâchis" qui aide à gérer les aliments proches de la péremption, génère des recettes avec ce qu\u2019il reste dans le frigo et permet de donner ses surplus alimentaires aux voisins.',
      standard:
        'Rôle : Expert GreenTech & Designer UI/UX.\nTâche : Créer l\u2019application web responsive "FrigoZéroGâchis".\nObjectif : Réduire le gaspillage alimentaire domestique et créer du lien solidaire.\nFonctionnalités :\n- Inventaire visuel du frigo avec code couleur d\u2019urgence (Rouge : < 24h, Orange : 3 jours, Vert : OK).\n- Moteur "Cuisiner mes restes" proposant des recettes immédiates.\n- Bouton "Partager à un voisin" générant une annonce géolocalisée de don gratuit.\n- Tableau d\u2019impact écologique (kg sauvés, repas partagés, économies en €).',
      detaille:
        'RÔLE : Architecte Web GreenTech & UX Designer Mobile-First.\nPROJET : "FrigoZéroGâchis" — Plateforme anti-gaspillage et partage alimentaire.\n\n1. PROBLÉMATIQUE HUMAINE :\nAllier écologie pratique et pouvoir d\u2019achat en transformant chaque fin de frigo en recette savoureuse ou en don solidaire de proximité.\n\n2. STRUCTURE DE L\u2019INTERFACE :\n- En-tête avec jauge d\u2019impact ("14,2 kg sauvés ce mois-ci • 48 € économisés").\n- Onglet 1 : Mon Frigo Intelligent (ajout rapide d\u2019ingrédients, tri par date limite).\n- Onglet 2 : Chef Anti-Gaspi (sélection multiple d\u2019ingrédients -> génération de recettes en 15 min).\n- Onglet 3 : Frigo Partagé du Quartier (carte et liste des dons disponibles autour de soi).\n\n3. CONTRAINTES DESIGN :\n- Ambiance assiége apaisée dérivée de la couleur d\u2019identité du site.\n- Animations fluides à l\u2019ajout d\u2019un aliment sauvé.',
    },
  },
  {
    id: 3,
    titre: 'AccessiMap Live',
    domaine: 'Accessibilité',
    emoji: '♿',
    impact: 99,
    probleme:
      'Les personnes en fauteuil roulant ou avec poussette découvrent trop tard un ascenseur en panne, un trottoir bloqué ou une marche infranchissable.',
    publicCible: 'Personnes à mobilité réduite (PMR), parents avec poussette, seniors, collectivités.',
    fonctions: [
      'Signalement communautaire d\u2019obstacles en temps réel',
      'Calcul d\u2019itinéraire 100% sans marche',
      'Filtres : Rampes, Toilettes PMR, Ascenseurs vérifiés',
      'Commande à une main sur mobile',
    ],
    prompts: {
      court:
        'Développe l\u2019application web responsive "AccessiMap Live", une carte collaborative d\u2019accessibilité urbaine permettant aux personnes en fauteuil roulant de vérifier l\u2019état des ascenseurs, rampes et trottoirs en temps réel.',
      standard:
        'Rôle : Ingénieur Accessibilité Numérique (WCAG AAA) & Développeur Web.\nProjet : "AccessiMap Live" — GPS et radar communautaire d\u2019accessibilité urbaine.\nFonctionnalités principales :\n1. Carte interactive et liste des lieux accessibles autour de l\u2019utilisateur.\n2. Système d\u2019alerte temps réel : "Ascenseur en panne", "Travaux sur trottoir", "Rampe disponible".\n3. Score d\u2019accessibilité vérifié par la communauté pour les commerces et transports.\n4. Ergonomie utilisable d\u2019une seule main (barre d\u2019action basse, contraste maximal).',
      detaille:
        'RÔLE : Lead Developer & Spécialiste Accessibilité Universelle (WCAG 2.2 AAA).\nPROJET : Web-App "AccessiMap Live" — Mobilité urbaine sans obstacle.\n\n1. MISSION HUMAINE :\nGarantir l\u2019autonomie de déplacement des personnes à mobilité réduite grâce à une intelligence collective en temps réel.\n\n2. EXIGENCES ERGONOMIQUES STRICTES :\n- Ratio de contraste supérieur à 7:1.\n- Tous les boutons d\u2019action situés dans le tiers inférieur de l\u2019écran mobile (zone du pouce).\n- Navigation clavier complète et attributs ARIA exemplaires.\n\n3. MODULES FONCTIONNELS :\n- Radar des obstacles signalés dans l\u2019heure avec vote de confirmation ("Toujours présent" / "Résolu").\n- Calculateur de trajet sécurisé (évitement des pentes > 5% et des pavés).\n- Annuaire des commerces équipés de rampes et sanitaires PMR.',
    },
  },
  {
    id: 4,
    titre: 'MémoireVive Seniors',
    domaine: 'Seniors',
    emoji: '🧠',
    impact: 97,
    probleme:
      'Le déclin cognitif et la solitude des aînés s\u2019accélèrent faute de stimulation quotidienne douce et de lien vivant avec leurs petits-enfants.',
    publicCible: 'Seniors, personnes atteintes de troubles de la mémoire débutants, aidants familiaux.',
    fonctions: [
      'Interface ultra-simplifiée zéro menu complexe',
      'Boîte à souvenirs photo & audio familiale',
      'Jeux doux de mémoire autobiographique',
      'Tableau de bord rassurant pour l\u2019aidant',
    ],
    prompts: {
      court:
        'Crée "MémoireVive Seniors", une application web ultra-simple avec de très gros boutons permettant aux seniors de consulter des photos familiales commentées en audio et de faire des jeux doux de mémoire quotidienne.',
      standard:
        'Rôle : Designer spécialisé en Silver Economy & Ergonomie Cognitive.\nProjet : "MémoireVive Seniors" — Compagnon de mémoire et lien intergénérationnel.\nFonctionnalités :\n1. Écran d\u2019accueil apaisant affichant la date en toutes lettres, la météo et le souvenir du jour.\n2. Album "Raconte-moi cette photo" où la famille envoie une photo et le senior enregistre son souvenir.\n3. Quiz bienveillant (sans jamais mettre en échec) sur les chansons, métiers d\u2019autrefois et prénoms de la famille.\n4. Mode Aidant pour ajouter du contenu à distance.',
      detaille:
        'RÔLE : Expert UX Senior & Développeur Front-End Accessible.\nPROJET : "MémoireVive Seniors" — Stimulation cognitive et capsule temporelle familiale.\n\n1. PRINCIPES DE DESIGN "ZÉRO ÉCHEC" :\n- Aucun message d\u2019erreur culpabilisant, uniquement des encouragements chaleureux.\n- Typographie 20px minimum, boutons larges explicites avec icône + texte clair.\n- Repères temporels constants en haut d\u2019écran ("Aujourd\u2019hui nous sommes le jeudi matin…").\n\n2. FONCTIONNALITÉS CLÉS :\n- Capsule Souvenir du Jour : Photo + message vocal des enfants/petits-enfants.\n- Atelier Réminiscence : Questions ouvertes stimulantes ("Quel était ton plat préféré enfant ?").\n- Rituel Quotidien : Hydratation, humeur du jour en 3 sourires et agenda familial illustré.',
    },
  },
  {
    id: 5,
    titre: 'SouffleCalme SOS',
    domaine: 'Santé',
    emoji: '🌬️',
    impact: 98,
    probleme:
      'Lors d\u2019une crise d\u2019angoisse, de panique ou de surcharge émotionnelle, les applications classiques sont trop complexes ou demandent de créer un compte.',
    publicCible: 'Toute personne traversant du stress aigu, crises de panique, étudiants, soignants.',
    fonctions: [
      'Démarrage immédiat en 0 seconde sans compte',
      'Bulle de cohérence cardiaque animée (4-7-8 / 5-5)',
      'Ancrage sensoriel guidé 5-4-3-2-1',
      'Générateur de sons doux via Web Audio API',
    ],
    prompts: {
      court:
        'Crée une PWA "SouffleCalme SOS" qui s\u2019ouvre directement sur un guide visuel de respiration et de cohérence cardiaque animé, accompagné de la méthode d\u2019ancrage 5-4-3-2-1 pour calmer une crise d\u2019angoisse en 3 minutes.',
      standard:
        'Rôle : Thérapeute TCC & Creative Technologist Web.\nProjet : "SouffleCalme SOS" — Trousse de secours émotionnelle instantanée.\nFonctionnalités :\n1. Bulle respiratoire organique en CSS/Canvas avec rythmes configurables (Cohérence 5/5, Calme 4-7-8, Carré).\n2. Parcours interactif d\u2019ancrage sensoriel "5 choses que je vois, 4 que je touche, 3 que j\u2019entends…".\n3. Synthétiseur sonore apaisant intégré (bruit rose, pluie douce) sans fichier externe.\n4. Journal de décharge mentale éphémère.',
      detaille:
        'RÔLE : Lead Creative Developer & Expert Santé Mentale Numérique.\nPROJET : "SouffleCalme SOS" — Application d\u2019apaisement immédiat en 3 minutes.\n\n1. IMPÉRATIF ÉTHIQUE :\nZéro inscription, zéro publicité, lancement instantané dès la première seconde d\u2019ouverture pour une personne en détresse émotionnelle.\n\n2. EXPÉRIENCE VISUELLE & SONORE :\n- Palette nocturne bioluminescente douce dérivée du thème de la base.\n- Sphère de respiration fluide avec indications textuelles synchronisées ("Inspirez lentement…", "Relâchez…").\n- Module interactif 5-4-3-2-1 avec validation tactile douce étape par étape.\n- Bouton d\u2019appel rapide vers les lignes d\u2019écoute : 3114 (prévention du suicide, gratuit, 24h/24) et 15 ou 112 en cas d\u2019urgence vitale.\n- Mention claire : l\u2019application ne remplace ni un médecin ni un psychologue.',
    },
  },
  {
    id: 6,
    titre: 'DroitClair Citoyen',
    domaine: 'Civisme',
    emoji: '⚖️',
    impact: 95,
    probleme:
      'La phobie administrative et le jargon juridique privent des millions de citoyens de leurs droits sociaux, aides au logement ou recours légaux.',
    publicCible: 'Jeunes actifs, familles modestes, personnes étrangères, travailleurs sociaux.',
    fonctions: [
      'Traducteur de courrier administratif en français simple',
      'Générateur de lettres de recours et résiliation',
      'Simulateur d\u2019aides sociales sans jargon',
      'Checklist interactive des pièces à fournir',
    ],
    prompts: {
      court:
        'Conçois "DroitClair Citoyen", une web-app qui traduit n\u2019importe quel texte administratif ou juridique complexe en explications simples (FALC) et génère des modèles de courriers prêts à envoyer.',
      standard:
        'Rôle : Juriste Social & Product Designer Civique.\nProjet : "DroitClair Citoyen" — L\u2019interprète administratif pour tous.\nFonctionnalités :\n1. Zone "Décoder un courrier" : transforme un texte jargonneux en 3 points : "Ce que ça veut dire", "Ce que vous devez faire", "Avant quelle date".\n2. Générateur de courriers types (contestation, demande de délai de paiement, préavis logement).\n3. Guide visuel étape par étape des démarches courantes (Santé, Logement, Travail, Famille).',
      detaille:
        'RÔLE : Architecte CivicTech & Spécialiste en Langage Clair (FALC — Facile à Lire et à Comprendre).\nPROJET : "DroitClair Citoyen" — Lutte contre le non-recours aux droits et l\u2019angoisse administrative.\n\n1. FONCTIONNALITÉS MAJEURES :\n- Décodeur de jargon : Analyse d\u2019un texte collé et extraction automatique des délais légaux, montants et actions requises.\n- Bibliothèque interactive de 15 lettres juridiques auto-remplies avec les informations de l\u2019utilisateur (stockées uniquement en local).\n- Planificateur d\u2019échéances administratives avec alertes visuelles claires.\n\n2. GARDE-FOUS :\n- Information générale, pas un conseil juridique : renvoyer vers service-public.fr, un point d\u2019accès au droit ou un avocat pour les cas sérieux.\n- Chaque montant ou délai affiché cite sa source officielle et sa date.',
    },
  },
  {
    id: 7,
    titre: 'RépareTout Café',
    domaine: 'Écologie',
    emoji: '🔧',
    impact: 94,
    probleme:
      'On jette des appareils électroménagers ou vélos pour une panne mineure faute de savoir les diagnostiquer ou de trouver un réparateur bénévole.',
    publicCible: 'Citoyens, bricoleurs, associations Repair Café, étudiants.',
    fonctions: [
      'Arbre de diagnostic de panne en 4 questions',
      'Indice de réparabilité et tutoriels illustrés',
      'Mise en relation avec les Repair Cafés locaux',
      'Bourse aux pièces détachées et outils',
    ],
    prompts: {
      court:
        'Crée l\u2019application web "RépareTout Café" pour diagnostiquer facilement les pannes d\u2019objets du quotidien (électroménager, vélo, électronique) et trouver un Repair Café ou un voisin bricoleur.',
      standard:
        'Rôle : Ingénieur Économie Circulaire & Développeur Web.\nProjet : "RépareTout Café" — L\u2019assistant d\u2019auto-réparation et d\u2019entraide technique.\nFonctionnalités :\n1. Assistant interactif de diagnostic ("Mon appareil ne s\u2019allume plus / fait du bruit / fuit").\n2. Fiches de réparation pas-à-pas avec niveau de difficulté, outils requis et consignes de sécurité électrique.\n3. Carte et calendrier des prochains ateliers Repair Café participatifs.',
      detaille:
        'RÔLE : Lead Developer GreenTech & Designer UX.\nPROJET : "RépareTout Café" — Prolonger la durée de vie des objets grâce à l\u2019intelligence collective.\n\n1. MODULES CLÉS :\n- Arbre décisionnel interactif de diagnostic pour 6 grandes familles d\u2019objets (Petit électroménager, Vélo, Smartphone/PC, Vêtements, Meubles, Gros électroménager).\n- Calculateur d\u2019économie : coût de la pièce (ex : 8€) vs rachat neuf (ex : 180€) + poids de déchet évité.\n- Système de prise de rendez-vous avec un bénévole réparateur du quartier.',
    },
  },
  {
    id: 8,
    titre: 'DysLecteur Fluide',
    domaine: 'Éducation',
    emoji: '📖',
    impact: 98,
    probleme:
      'Les élèves et adultes dyslexiques, TDAH ou malvoyants souffrent devant les blocs de texte denses des sites web et documents scolaires.',
    publicCible: 'Élèves dyslexiques, parents, enseignants, adultes neuroatypiques.',
    fonctions: [
      'Colorisation automatique des syllabes et sons complexes',
      'Règle de lecture lumineuse qui suit le curseur',
      'Espacement dynamique des lettres/lignes',
      'Synthèse vocale synchronisée mot à mot',
    ],
    prompts: {
      court:
        'Développe "DysLecteur Fluide", un studio de lecture web adaptatif pour personnes dyslexiques avec syllabation colorée, règle de lecture focalisée, police adaptée et lecture vocale.',
      standard:
        'Rôle : Orthophoniste Numérique & Développeur Front-End.\nProjet : "DysLecteur Fluide" — Liseur universel pour cerveaux neuroatypiques (Dyslexie, TDAH).\nFonctionnalités :\n1. Zone d\u2019importation de texte instantanée avec transformation typographique en temps réel.\n2. Options d\u2019adaptation : alternance de couleurs par syllabe ou par ligne, surlignage des sons complexes (ou, on, an, ch), police haute lisibilité.\n3. Guide-ligne (règle virtuelle) et synthèse vocale Web Speech API avec contrôle de vitesse.',
      detaille:
        'RÔLE : Expert Accessibilité Cognitive & Ingénieur Front-End.\nPROJET : "DysLecteur Fluide" — Rendre le plaisir de lire à chaque enfant et adulte dyslexique.\n\n1. PARAMÈTRES D\u2019ADAPTATION EN TEMPS RÉEL :\n- Curseurs fluides pour : Taille du texte (16px à 36px), Espacement des lettres, Espacement des mots, Hauteur de ligne.\n- Thèmes de fond anti-stress visuel (Sépia doux, Crème pastel, Bleu nuit apaisant, Menthe).\n- Colorisation syllabique intelligente et mise en évidence des lettres muettes en gris clair.\n- Règle de focalisation horizontale mobile et lecteur vocal intégré.',
    },
  },
  {
    id: 9,
    titre: 'AlerteCanicule & Froid',
    domaine: 'Urgence',
    emoji: '🌡️',
    impact: 97,
    probleme:
      'Lors des canicules à +40°C ou grands froids, les personnes sans-abri et les aînés isolés sont en danger vital faute d\u2019îlots de fraîcheur et de veille citoyenne.',
    publicCible: 'Citoyens solidaires, maraudes, personnes vulnérables, mairies.',
    fonctions: [
      'Carte des fontaines d\u2019eau potable, parcs frais et refuges',
      'Veille bienveillante des aînés du quartier',
      'Signalement citoyen d\u2019une personne en détresse thermique',
      'Guide des gestes de premiers secours thermiques',
    ],
    prompts: {
      court:
        'Crée l\u2019application web responsive "AlerteCanicule & Froid" qui cartographie les îlots de fraîcheur, fontaines à eau et refuges d\u2019urgence, et organise des rondes d\u2019appels bienveillants aux personnes âgées isolées.',
      standard:
        'Rôle : Architecte de Résilience Urbaine & Sécurité Civile.\nProjet : "AlerteCanicule & Froid" — Bouclier citoyen face aux extrêmes climatiques.\nFonctionnalités :\n1. Bascule automatique ou manuelle entre "Mode Canicule" (îlots de fraîcheur, fontaines, brumisateurs) et "Mode Grand Froid" (haltes de nuit, boissons chaudes).\n2. Carnet de "Veille Voisins" pour s\u2019assurer que les aînés inscrits ont été contactés dans la journée.\n3. Protocole d\u2019urgence illustré en cas d\u2019insolation, déshydratation ou hypothermie.',
      detaille:
        'RÔLE : Lead Developer CivicTech & Urgence Climatique.\nPROJET : "AlerteCanicule & Froid" — Sauver des vies lors des vagues de chaleur et de gel.\n\n1. FONCTIONNALITÉS OPÉRATIONNELLES :\n- Tableau de bord météo/alerte sanitaire avec indice de risque local.\n- Annuaire géolocalisé hors-ligne des ressources vitales gratuites : Eau potable, Salles climatisées publiques, Douches municipales, Accueils de jour.\n- Module "Check-in Solidaire" : suivi horodaté des appels ou visites aux personnes fragiles du quartier.',
    },
  },
  {
    id: 10,
    titre: 'TrocSavoirs 1h',
    domaine: 'Éducation',
    emoji: '⏳',
    impact: 95,
    probleme:
      'Tout le monde possède un talent utile mais n\u2019a pas forcément les moyens financiers de payer des cours particuliers ou des services.',
    publicCible: 'Étudiants, retraités, autodidactes, citoyens de tous horizons.',
    fonctions: [
      'Égalité stricte : 1h donnée = 1h reçue (quel que soit le savoir)',
      'Portefeuille de crédits-temps solidaire',
      'Matchmaking intelligent (Ce que j\u2019offre ↔ Ce que je cherche)',
      'Visio ou rencontre en lieu public',
    ],
    prompts: {
      court:
        'Conçois "TrocSavoirs 1h", une banque de temps citoyenne responsive où chaque heure de savoir partagé (cuisine, maths, informatique, guitare) donne droit à 1 heure d\u2019apprentissage auprès d\u2019un autre membre.',
      standard:
        'Rôle : Designer de Plateformes Collaboratives & Économie Sociale.\nProjet : "TrocSavoirs 1h" — La banque de temps où tous les talents ont la même valeur.\nFonctionnalités :\n1. Compteur de Temps Personnel (ex : "Solde : 4 heures disponibles").\n2. Catalogue de savoirs avec double badge : "Je peux enseigner" et "J\u2019aimerais apprendre".\n3. Algorithme de réciprocité mettant en avant les binômes complémentaires.\n4. Validation d\u2019échange d\u2019heure en 1 clic avec message de remerciement.',
      detaille:
        'RÔLE : Product Architect & Full-Stack Designer.\nPROJET : "TrocSavoirs 1h" — Réseau d\u2019échange réciproque de savoirs sans argent.\n\n1. PHILOSOPHIE HUMAINE :\n1 heure de cours de tricot = 1 heure de soutien en mathématiques = 1 heure d\u2019initiation à l\u2019informatique. Dignité et valorisation de chacun.\n\n2. ARCHITECTURE DE L\u2019APPLICATION :\n- Crédit de bienvenue de 2 heures offert à chaque nouvel inscrit pour lancer la boucle d\u2019entraide.\n- Filtres par catégories : Langues, Numérique, Cuisine, Bricolage, Musique, Soutien scolaire, Jardinage.\n- Historique transparent des heures offertes et reçues dans la communauté.',
    },
  },
  {
    id: 11,
    titre: 'MediPilule Zen',
    domaine: 'Santé',
    emoji: '💊',
    impact: 96,
    probleme:
      'Les patients chroniques ou polymédiqués oublient leurs prises ou doutent d\u2019avoir déjà pris leur comprimé, générant anxiété et risques médicaux.',
    publicCible: 'Patients sous traitement régulier, seniors, aidants familiaux.',
    fonctions: [
      'Pilulier visuel Matin / Midi / Soir / Coucher avec photo et forme',
      'Validation en 1 tap avec horodatage anti-doublon',
      'Notification rassurante pour le proche aidant',
      'Alerte de renouvellement d\u2019ordonnance',
    ],
    prompts: {
      court:
        'Crée l\u2019application web responsive "MediPilule Zen", un pilulier numérique ultra-clair qui évite les oublis et les doubles prises de médicaments grâce à une validation visuelle par moment de la journée.',
      standard:
        'Rôle : Designer Santé e-Health & Ergonomie Médicale.\nProjet : "MediPilule Zen" — Suivi de traitement serein et lien avec l\u2019aidant.\nFonctionnalités :\n1. Vue chronologique de la journée (Matin, Midi, Soir, Nuit) avec représentation visuelle de chaque médicament (forme et couleur du comprimé).\n2. Bouton large "Je viens de le prendre" qui verrouille la prise avec l\u2019heure exacte pour éviter tout surdosage par doute.\n3. Jauge de stock restant et rappel de renouvellement d\u2019ordonnance.',
      detaille:
        'RÔLE : Lead UX HealthTech & Développeur Front-End.\nPROJET : "MediPilule Zen" — Sécuriser l\u2019observance médicamenteuse sans stress.\n\n1. SÉCURITÉ HUMAINE :\nRépondre à la question angoissante "Est-ce que j\u2019ai déjà pris mon cachet de 12h ?" par un retour visuel immédiat, vert et horodaté ("Pris aujourd\u2019hui à 12h14").\n\n2. FONCTIONNALITÉS DÉTAILLÉES :\n- Création de fiche médicament avec choix d\u2019icône (gélule, comprimé rond, gouttes, inhalateur) et couleur.\n- Journal d\u2019observance sur 7 jours exportable pour le médecin traitant.\n- Lien de partage rassurant avec l\u2019aidant familial.\n\n3. GARDE-FOUS SANTÉ :\n- Aucun conseil de dosage ni de changement de traitement : renvoyer vers le médecin ou le pharmacien (15 en cas d\u2019urgence).\n- Mention visible : l\u2019application n\u2019est pas un dispositif médical.',
    },
  },
  {
    id: 12,
    titre: 'ÉcoBâtisseur Sol',
    domaine: 'Écologie',
    emoji: '☀️',
    impact: 93,
    probleme:
      'Les particuliers veulent réduire leurs factures d\u2019eau et d\u2019électricité mais sont perdus face aux devis opaques et calculs techniques complexes.',
    publicCible: 'Propriétaires, locataires, collectifs d\u2019habitat participatif.',
    fonctions: [
      'Simulateur d\u2019autonomie solaire et économies annuelles',
      'Calculateur de récupération d\u2019eau de pluie selon la toiture',
      'Guide des éco-gestes à fort retour sur investissement',
      'Comparateur neutre sans démarchage commercial',
    ],
    prompts: {
      court:
        'Développe "ÉcoBâtisseur Sol", un calculateur web interactif et neutre permettant d\u2019estimer le potentiel solaire et la récupération d\u2019eau de pluie d\u2019un logement en quelques secondes.',
      standard:
        'Rôle : Ingénieur Thermicien & Designer d\u2019Outils Pédagogiques Web.\nProjet : "ÉcoBâtisseur Sol" — Simulateur citoyen d\u2019autonomie énergétique et hydrique.\nFonctionnalités :\n1. Curseurs interactifs : Surface de toiture, Région d\u2019ensoleillement, Facture mensuelle actuelle.\n2. Calcul instantané : Production kWh/an, Litres d\u2019eau de pluie récupérables/an, Économies en €/an et amortissement.\n3. Plan d\u2019action par budget (0€, < 500€, > 2000€).',
      detaille:
        'RÔLE : Architecte Logiciel Climat & Énergie.\nPROJET : "ÉcoBâtisseur Sol" — Démocratiser l\u2019autonomie résidentielle sans jargon ni publicité.\n\n1. MODULES DE SIMULATION TEMPS RÉEL :\n- Module Solaire Plug & Play vs Toiture : estimation immédiate du taux d\u2019autoconsommation.\n- Module Eau de Pluie : calcul du volume de cuve idéal pour arroser le potager et alimenter les sanitaires.\n- Graphiques visuels clairs et export du bilan énergétique PDF/Markdown.',
    },
  },
  {
    id: 13,
    titre: 'VoixDesMains LSF',
    domaine: 'Accessibilité',
    emoji: '🤟',
    impact: 98,
    probleme:
      'Lors d\u2019un rendez-vous médical, à la mairie ou dans un commerce, les personnes sourdes ou malentendantes font face à un mur de communication.',
    publicCible: 'Personnes sourdes/malentendantes, soignants, commerçants, citoyens.',
    fonctions: [
      'Écran de dialogue face-à-face (texte grand format réversible)',
      'Dictionnaire visuel des 100 signes d\u2019urgence et du quotidien',
      'Tableaux de pictogrammes médicaux (douleur, symptômes)',
      'Synthèse vocale en 1 tap pour s\u2019exprimer',
    ],
    prompts: {
      court:
        'Conçois "VoixDesMains LSF", une web-app de communication immédiate entre personnes sourdes et entendantes avec écran face-à-face, pictogrammes médicaux d\u2019urgence et initiation à la Langue des Signes.',
      standard:
        'Rôle : Spécialiste Accessibilité Sourds/Malentendants & UI Designer.\nProjet : "VoixDesMains LSF" — Pont de communication universel et apprentissage LSF.\nFonctionnalités :\n1. Mode "Conversation Face-à-Face" : zone de texte géante + transcription rapide et bouton pour retourner l\u2019écran vers l\u2019interlocuteur.\n2. Grille de communication rapide par icônes (Urgences médicales, Pharmacie, Transports, Administration).\n3. Cartes d\u2019apprentissage visuel des signes essentiels en LSF (Bonjour, Merci, Aide, Douleur, Où).',
      detaille:
        'RÔLE : Lead UX Designer Inclusif & Développeur Web.\nPROJET : "VoixDesMains LSF" — Briser la barrière du silence au quotidien et aux urgences.\n\n1. TROIS MODULES COMPLÉMENTAIRES :\n- Module Urgence & Santé : Échelle visuelle de la douleur (1 à 10), localisation corporelle cliquable et phrases pré-enregistrées diffusables en audio.\n- Module Dialogue Instantané : Clavier rapide + historique de la conversation lisible à 1 mètre de distance.\n- Module Micro-Learning LSF : Défis quotidiens de 5 signes illustrés pour sensibiliser le grand public.',
    },
  },
  {
    id: 14,
    titre: 'PotagerPartagé',
    domaine: 'Écologie',
    emoji: '🌱',
    impact: 92,
    probleme:
      'Les jardins partagés urbains manquent souvent de coordination : certaines parcelles sèchent pendant que d\u2019autres débordent de courgettes non récoltées.',
    publicCible: 'Associations de jardins partagés, écoles, copropriétés, citoyens urbains.',
    fonctions: [
      'Planning collaboratif des tours d\u2019arrosage selon la météo',
      'Calendrier des semis et associations de plantes amies',
      'Alerte "Récolte prête à partager"',
      'Journal de bord illustré des parcelles',
    ],
    prompts: {
      court:
        'Crée l\u2019application web responsive "PotagerPartagé" pour organiser un jardin partagé de quartier : tours d\u2019arrosage, plan des parcelles, calendrier des semis et partage des récoltes.',
      standard:
        'Rôle : Permaculteur Urbain & Développeur Web Collaboratif.\nProjet : "PotagerPartagé" — Le compagnon numérique des jardins citoyens.\nFonctionnalités :\n1. Grille interactive des bacs et parcelles du jardin avec état d\u2019humidité (Arrosé aujourd\u2019hui / À arroser).\n2. Tableau des tours d\u2019arrosage hebdomadaires où chaque voisin s\u2019inscrit en 1 clic.\n3. Panneau "Panier du Jardin" annonçant les légumes et aromates prêts à être cueillis.',
      detaille:
        'RÔLE : Product Designer GreenTech & Développeur Full-Stack.\nPROJET : "PotagerPartagé" — Cultiver la terre et le lien social en ville.\n\n1. FONCTIONNALITÉS CLÉS :\n- Carte visuelle des parcelles (Tomates, Aromates, Compost, Verger) avec statut en temps réel.\n- Guide intégré de compagnonnage végétal (ex : Basilic + Tomate = Association bénéfique).\n- Gestionnaire du bac à compost collectif (matières sèches vs matières vertes, date du dernier brassage).',
    },
  },
  {
    id: 15,
    titre: 'BudgetSerein',
    domaine: 'Entraide',
    emoji: '👛',
    impact: 95,
    probleme:
      'Les applications bancaires classiques affichent un solde trompeur sans déduire les prélèvements à venir, plongeant les foyers modestes dans les frais de découvert.',
    publicCible: 'Étudiants, jeunes travailleurs, familles à budget serré, conseillers sociaux.',
    fonctions: [
      'Calcul du VRAI "Reste à vivre par jour" et par semaine',
      'Zéro connexion bancaire intrusive (100% privé en local)',
      'Météo budgétaire bienveillante sans culpabilisation',
      'Simulateur "Puis-je me permettre cet achat ?"',
    ],
    prompts: {
      court:
        'Développe "BudgetSerein", un coach budgétaire web bienveillant et 100% privé qui calcule le vrai reste-à-vivre par jour après déduction des charges fixes pour éviter tout découvert bancaire.',
      standard:
        'Rôle : Conseiller en Économie Sociale et Familiale (CESF) & UX Designer.\nProjet : "BudgetSerein" — Le pilote automatique du reste-à-vivre sans stress.\nFonctionnalités :\n1. Formule claire en temps réel : (Revenus - Charges Fixes à venir - Épargne de sécurité) ÷ Jours restants dans le mois = Budget quotidien disponible.\n2. Enveloppes visuelles souples (Alimentation, Transport, Imprévus, Plaisirs).\n3. Simulateur d\u2019impact avant achat ("Si je dépense 35€ aujourd\u2019hui, mon budget quotidien passe de 18€ à 15,50€").',
      detaille:
        'RÔLE : Lead FinTech Éthique & Designer UX Bienveillant.\nPROJET : "BudgetSerein" — Redonner le contrôle financier sans anxiété ni espionnage des données.\n\n1. DIFFÉRENCIATION MAJEURE :\nAu lieu de montrer des graphiques comptables anxiogènes du passé, l\u2019application éclaire l\u2019avenir immédiat : "Aujourd\u2019hui, vous pouvez dépenser jusqu\u2019à 22 € en toute sérénité".\n\n2. MODULES TECHNIQUES :\n- Calendrier des prélèvements fixes pour anticiper les fins de mois.\n- Coffre-fort 100% LocalStorage avec export/import JSON anonyme.',
    },
  },
  {
    id: 16,
    titre: 'RefugeSécurisé',
    domaine: 'Urgence',
    emoji: '🛡️',
    impact: 100,
    probleme:
      'Les personnes victimes de violences conjugales, intrafamiliales ou de harcèlement de rue ont besoin d\u2019un outil d\u2019aide discret, immédiat et capable de se masquer en 1 fraction de seconde.',
    publicCible: 'Victimes de violences, témoins, associations d\u2019aide aux victimes.',
    fonctions: [
      'Bouton d\u2019urgence "Sortie Discrète" transformant l\u2019app en site météo/recette',
      'Numéros d\u2019écoute et SMS d\u2019urgence (3919, 114)',
      'Coffre-fort de conseils juridiques et préparation de départ',
      'Lieux sûrs et pharmacies partenaires à proximité',
    ],
    prompts: {
      court:
        'Crée l\u2019application web "RefugeSécurisé" destinée aux personnes victimes de violences, intégrant un bouton de camouflage instantané en application météo, les numéros d\u2019urgence (3919, 114 SMS) et une checklist de mise en sécurité.',
      standard:
        'Rôle : Architecte Cybersécurité & Designer CivicTech de Protection.\nProjet : "RefugeSécurisé" — Interface d\u2019aide discrète et de mise en sécurité.\nFonctionnalités critiques :\n1. Barre flottante permanente "Camouflage Rapide (Touche Échap ou Double Tap)" qui remplace instantanément l\u2019interface par un bulletin météo anodin sans laisser d\u2019historique.\n2. Accès en 1 clic aux secours silencieux (114 par SMS) et écoute spécialisée (3919).\n3. Violentomètre interactif d\u2019auto-évaluation et liste des documents essentiels à rassembler.',
      detaille:
        'RÔLE : Lead Engineer Safety-by-Design & UX Specialist.\nPROJET : "RefugeSécurisé" — Protéger, informer et accompagner en toute discrétion.\n\n1. EXIGENCES DE SÉCURITÉ VITALE :\n- Mode Camouflage Instantané : bascule rapide vers une fausse page "Météo & Jardinage" au clic sur le bouton d\u2019alerte ou touche Échap.\n- Aucune donnée sensible stockée par défaut sans action explicite.\n- Violentomètre gradué (23 situations types sur 3 niveaux : "Profite" / "Vigilance" / "Protège-toi") pour aider à la prise de conscience.',
    },
  },
  {
    id: 17,
    titre: 'MentorJeunes Pro',
    domaine: 'Éducation',
    emoji: '🎓',
    impact: 94,
    probleme:
      'Des milliers de jeunes diplômés ou lycéens issus de quartiers populaires ou ruraux échouent à trouver un stage ou un premier emploi uniquement par absence de réseau familial.',
    publicCible: 'Étudiants, jeunes chercheurs d\u2019emploi, professionnels actifs et retraités bénévoles.',
    fonctions: [
      'Parrainage flash de 30 minutes (relecture CV, simulation entretien)',
      'Générateur de messages d\u2019approche professionnelle',
      'Ouverture solidaire de carnet d\u2019adresses',
      'Zéro jugement, 100% encouragement',
    ],
    prompts: {
      court:
        'Conçois "MentorJeunes Pro", une plateforme web responsive connectant des jeunes sans réseau avec des professionnels bienveillants pour des sessions de 30 minutes (correction de CV, simulation d\u2019entretien, conseils métier).',
      standard:
        'Rôle : Product Manager EdTech & Inclusion Professionnelle.\nProjet : "MentorJeunes Pro" — Le réseau professionnel pour ceux qui n\u2019en ont pas.\nFonctionnalités :\n1. Catalogue de Mentors filtrable par secteur (Tech, Santé, Artisanat, Droit, Commerce, Culture) et par coup de pouce proposé (Relire mon CV, Simuler un entretien de 20 min, Découvrir un métier).\n2. Assistant de rédaction du premier message de prise de contact pour vaincre le syndrome de l\u2019imposteur.\n3. Suivi des objectifs et kit de préparation d\u2019entretien.',
      detaille:
        'RÔLE : Architecte Plateforme Sociale & UX Designer.\nPROJET : "MentorJeunes Pro" — Rétablir l\u2019égalité des chances face à l\u2019emploi.\n\n1. PARCOURS UTILISATEUR FLUIDE :\n- Micro-mentorat sans engagement lourd : des créneaux de 20 à 30 minutes faciles à offrir pour un actif ou un jeune retraité.\n- Studio de préparation intégré : générateur de pitch de présentation en 60 secondes et checklist avant entretien.',
    },
  },
  {
    id: 18,
    titre: 'BruitZéro & Sommeil',
    domaine: 'Santé',
    emoji: '🎧',
    impact: 93,
    probleme:
      'La pollution sonore urbaine, l\u2019hyperacousie et les acouphènes épuisent le système nerveux et dégradent le sommeil de millions de personnes.',
    publicCible: 'Personnes souffrant d\u2019acouphènes, hypersensibles au bruit, travailleurs concentrés.',
    fonctions: [
      'Mixeur acoustique thérapeutique temps réel (Web Audio API)',
      'Carte participative des cafés, parcs et bibliothèques calmes',
      'Minuteur d\u2019endormissement avec fondu progressif',
      'Mesure indicative d\u2019ambiance sonore',
    ],
    prompts: {
      court:
        'Crée l\u2019application web "BruitZéro & Sommeil" combinant un mixeur de fréquences acoustiques apaisantes pour masquer les acouphènes et une carte des lieux calmes en ville.',
      standard:
        'Rôle : Ingénieur Audio Web & Spécialiste du Sommeil.\nProjet : "BruitZéro & Sommeil" — Sanctuaire acoustique et refuge de calme urbain.\nFonctionnalités :\n1. Table de mixage sonore génératrice (Bruit blanc, Bruit rose, Bruit brun profond, Ondes binaurales douces) générée nativement en JavaScript.\n2. Annuaire participatif des "Zones Silencieuses" (parcs abrités, cafés sans musique forte, salles de repos).\n3. Minuteur de sommeil avec atténuation douce du volume.',
      detaille:
        'RÔLE : Creative Audio Developer & UX Designer Minimaliste.\nPROJET : "BruitZéro & Sommeil" — Soulager les acouphènes et retrouver le calme mental.\n\n1. SPÉCIFICATIONS TECHNIQUES :\n- Synthèse sonore pure via Web Audio API (aucune dépendance externe fragile).\n- Égaliseur de fréquences personnalisable pour s\u2019adapter à la tonalité propre de chaque utilisateur.\n- Interface ultra-sombre compatible OLED pour ne pas éblouir la nuit.',
    },
  },
  {
    id: 19,
    titre: 'DonDirect Asso',
    domaine: 'Entraide',
    emoji: '🎁',
    impact: 96,
    probleme:
      'Les particuliers ne savent pas à quelle association donner leurs objets utiles, tandis que les associations locales manquent d\u2019équipements précis à l\u2019instant T.',
    publicCible: 'Citoyens donateurs, associations caritatives locales, refuges, écoles.',
    fonctions: [
      'Liste de besoins précis en temps réel (ex : 3 poussettes, 5 PC portables)',
      'Jauge de complétion par besoin (ex : 2/5 collectés)',
      'Promesse de don en 2 clics avec adresse de dépôt',
      'Traçabilité transparente de l\u2019impact du don',
    ],
    prompts: {
      court:
        'Développe "DonDirect Asso", une bourse aux besoins matériels précis où les associations locales publient ce dont elles ont exactement besoin aujourd\u2019hui (couvertures, matériel scolaire, informatique) et où les citoyens réservent leur don.',
      standard:
        'Rôle : Architecte Philanthropie Locale & Designer UI/UX.\nProjet : "DonDirect Asso" — Donner exactement ce qui est utile, là où c\u2019est utile.\nFonctionnalités :\n1. Flux des besoins vérifiés des associations locales avec barre de progression (ex : "4 sacs de couchage sur 6 trouvés").\n2. Filtres par type d\u2019objet : Vêtements chauds, Puériculture, Matériel informatique, Hygiène, Petit électroménager.\n3. Bouton "J\u2019ai cet objet, je l\u2019apporte !" qui met à jour la jauge et affiche les horaires d\u2019accueil.',
      detaille:
        'RÔLE : Lead Full-Stack Developer & Designer Social Impact.\nPROJET : "DonDirect Asso" — Logistique solidaire zéro friction entre citoyens et associations.\n\n1. PROBLÈME RÉSOLU :\nÉviter aux associations d\u2019être submergées de dons inadaptés tout en permettant une réponse citoyenne ultra-rapide aux urgences matérielles locales.\n\n2. ARCHITECTURE :\n- Cartes de besoins avec badge d\u2019urgence, quartier, horaires de dépôt et compteur interactif.\n- Mode Association permettant de publier un nouveau besoin matériel en 30 secondes.',
    },
  },
  {
    id: 20,
    titre: 'VigieOcéan & Plages',
    domaine: 'Écologie',
    emoji: '🌊',
    impact: 95,
    probleme:
      'Les déchets plastiques échoués sur le littoral ou les berges de rivières repartent à la marée suivante faute de signalement rapide et de ramassages coordonnés.',
    publicCible: 'Promeneurs, surfeurs, familles, associations de protection du littoral, communes.',
    fonctions: [
      'Signalement géolocalisé d\u2019une zone de déchets côtiers ou fluviaux',
      'Organisation de "Clean-up Express" de 20 minutes à plusieurs',
      'Compteur collectif de déchets retirés de l\u2019océan',
      'Guide de préservation de la laisse de mer et biodiversité',
    ],
    prompts: {
      court:
        'Conçois l\u2019application web responsive "VigieOcéan & Plages" pour signaler les déchets sur le littoral ou les rivières, organiser des ramassages citoyens express de 20 minutes et comptabiliser les kilos de plastique sauvés des eaux.',
      standard:
        'Rôle : Océanographe Citoyen & Développeur Web Mobile-First.\nProjet : "VigieOcéan & Plages" — Mobilisation citoyenne pour des côtes et rivières vivantes.\nFonctionnalités :\n1. Carte et liste des zones signalées à nettoyer avant la prochaine marée ou crue.\n2. Bouton "Lancer un Ramassage Express 20 min" pour inviter les promeneurs présents sur place.\n3. Bilan participatif post-collecte (sacs remplis, mégots, filets, plastiques) et guide écologique pour ne pas perturber la biodiversité naturelle (laisse de mer).',
      detaille:
        'RÔLE : Lead Developer Environnement & Designer UX Mobile-First.\nPROJET : "VigieOcéan & Plages" — Protéger l\u2019océan et les cours d\u2019eau par l\u2019action citoyenne immédiate.\n\n1. FONCTIONNALITÉS TERRAIN (PLAGE & RIVIÈRE) :\n- Interface haute lisibilité en plein soleil au bord de l\u2019eau.\n- Signalement en 3 taps : Type de pollution (Plastiques, Engins de pêche, Décharge sauvage), Volume estimé, Point de repère.\n- Éco-Guide intégré expliquant la différence entre les déchets humains à ramasser et la laisse de mer naturelle indispensable aux oiseaux marins.',
    },
  },
];

/* ---------------------------------------------------------------------------
   Arbre d'idéation : 20 racines
--------------------------------------------------------------------------- */

export const CATEGORIES_RACINES: string[] = [
  'Santé & Prévention',
  'Entraide & Voisinage',
  'Écologie & Zéro Déchet',
  'Accessibilité & Handicap',
  'Éducation & Savoirs',
  'Seniors & Intergénération',
  'Urgence & Sécurité Civile',
  'Inclusion & Droits Sociaux',
  'Santé Mentale & Apaisement',
  'Alimentation Durable',
  'Mobilité Douce & Urbaine',
  'Économie Circulaire & Réparation',
  'Budget & Entraide Financière',
  'Emploi & Mentorat',
  'Culture & Patrimoine Local',
  'Enfance & Parentalité',
  'Agriculture & Jardins Urbains',
  'Protection Animale & Biodiversité',
  'Sport Santé & Mouvement',
  'Civisme & Démocratie Locale',
];

/* ---------------------------------------------------------------------------
   Modules techniques & éthiques activables
--------------------------------------------------------------------------- */

export interface ModuleSpec {
  /** Texte injecté dans les prompts. */
  texte: string;
  /** Libellé court du bouton. */
  label: string;
  /** Activé par défaut. */
  defaut: boolean;
}

export const MODULES_SPEC: ModuleSpec[] = [
  { texte: 'Mobile-First PWA installable', label: '📱 Mobile-First PWA', defaut: true },
  {
    texte: 'Accessibilité WCAG AAA (contraste élevé, gros boutons, lecteur d\u2019écran)',
    label: '♿ Accessibilité AAA',
    defaut: true,
  },
  { texte: 'Mode Hors-Ligne (LocalStorage / Service Worker)', label: '📡 Mode Hors-Ligne', defaut: false },
  {
    texte: 'Zéro création de compte obligatoire & respect vie privée RGPD',
    label: '🔒 Anonyme / Sans Compte',
    defaut: true,
  },
  { texte: 'Cartographie interactive & géolocalisation de proximité', label: '🗺️ Carte Interactive', defaut: false },
  { texte: 'Interface apaisante Zéro Anxiété (Mode Sombre & Clair)', label: '🌿 Design Apaisant', defaut: true },
];

/* ---------------------------------------------------------------------------
   Moteur local (repli garanti) — sous-catégories, exemples, dossiers prompts
--------------------------------------------------------------------------- */

/** Extrait la plus grande structure JSON d'un texte de modèle. */
export function extraireJson<T>(texte: string): T {
  const m = texte.match(/[\[{][\s\S]*[\]}]/);
  if (!m) throw new Error('Format JSON non détecté');
  return JSON.parse(m[0]) as T;
}

/** 20 sous-catégories déterministes pour continuer à descendre l'arbre. */
export function sousCategoriesLocal(chemin: string[]): string[] {
  const dernier = chemin[chemin.length - 1] || 'Impact Humain';
  const profondeur = chemin.length;
  const prefixes = [
    'Application Mobile-First :',
    'Plateforme Citoyenne :',
    'Outil d\u2019Urgence :',
    'Réseau de Proximité :',
    'Assistant Vocal & Visuel :',
    'Carte Collaborative :',
    'Compagnon Quotidien :',
    'Kit d\u2019Autonomie :',
    'Bourse d\u2019Entraide :',
    'Simulateur Simplifié :',
    'Journal de Suivi :',
    'Espace Intergénérationnel :',
    'Diagnostic Rapide :',
    'Micro-Learning :',
    'Tiers-Lieu Numérique :',
    'Alerte Bienveillante :',
    'Coffre-fort Citoyen :',
    'Coach Zéro Stress :',
    'Observatoire Local :',
    'Communauté d\u2019Action :',
  ];
  const angles = [
    'pour personnes isolées',
    'en quartier prioritaire ou rural',
    'accessible 100% hors-ligne',
    'sans création de compte',
    'pour aidants familiaux',
    'pour étudiants et jeunes',
    'à très fort contraste (Seniors/PMR)',
    'avec entraide en moins de 15 min',
    'zéro jargon administratif',
    'basé sur le don et le troc',
    'pour familles monoparentales',
    'en partenariat associatif local',
    'avec prévention des risques',
    'pour réduire l\u2019empreinte carbone',
    'adapté aux troubles DYS et TDAH',
    'en temps réel géolocalisé',
    'collaboratif entre voisins',
    'avec gamification bienveillante',
    'pour préserver le pouvoir d\u2019achat',
    'à impact mesurable immédiat',
  ];
  return prefixes.map((prefixe, i) => {
    const angle = angles[(i + profondeur * 3) % angles.length];
    const sujet = dernier.split(':')[0]?.trim() ?? dernier;
    return `${prefixe} ${sujet} ${angle}`;
  });
}

/** 10 exemples de briefs, du débutant (\u201cje voudrais un site simple\u201d) à l\u2019expert. */
export function exemplesLocal(chemin: string[]): ExempleIde[] {
  const sujet = chemin.join(' › ') || 'Application utile à l\u2019humain';
  return [
    {
      debutant: `Je voudrais un site simple autour de "${sujet}" pour aider mes voisins facilement sur téléphone.`,
      expert: `Conçois une PWA Mobile-First dédiée à "${sujet}" avec géolocalisation de proximité (500m), interface WCAG AAA sans inscription et persistance locale.`,
    },
    {
      debutant: `Fais une application pour que les personnes âgées puissent utiliser "${sujet}" sans se tromper.`,
      expert: `Développe une interface cognitive ultra-accessible pour "${sujet}" : boutons de 56px, contraste 7:1, zéro menu caché, retour vocal et tableau de bord aidant.`,
    },
    {
      debutant: `Je cherche une idée d'application d'urgence rapide sur "${sujet}".`,
      expert: `Crée un outil d'intervention citoyenne en moins de 3 clics sur "${sujet}" avec mode hors-ligne, protocole guidé étape par étape et numéros d'appel rapide.`,
    },
    {
      debutant: `Comment faire un site gratuit d'échange et de partage dans le domaine "${sujet}" ?`,
      expert: `Architecture une bourse solidaire zéro monnaie pour "${sujet}" intégrant un système de réciprocité, des jauges de besoins en temps réel et des filtres par quartier.`,
    },
    {
      debutant: `Je veux une application rassurante et pas stressante sur "${sujet}".`,
      expert: `Conçois une expérience utilisateur "Calm Technology" appliquée à "${sujet}" : palette apaisante, micro-interactions douces et formulation non-culpabilisante.`,
    },
    {
      debutant: `Une application qui explique les choses compliquées de "${sujet}" avec des mots simples.`,
      expert: `Implémente un traducteur et vulgarisateur FALC (Facile à Lire et à Comprendre) pour "${sujet}" avec synthèse en 3 points d'action et checklist interactive.`,
    },
    {
      debutant: `Un outil pour suivre ses progrès chaque jour dans "${sujet}".`,
      expert: `Développe un compagnon quotidien respectueux de la vie privée (100% LocalStorage) pour "${sujet}" avec visualisation d'impact positif et export JSON/Markdown.`,
    },
    {
      debutant: `Une carte interactive pour trouver de l'aide près de chez soi sur "${sujet}".`,
      expert: `Crée un radar participatif temps réel pour "${sujet}" permettant aux citoyens de signaler, vérifier et filtrer les ressources gratuites accessibles autour d'eux.`,
    },
    {
      debutant: `Une application qui connecte les jeunes et les retraités autour de "${sujet}".`,
      expert: `Bâtis une plateforme de mentorat et de transmission intergénérationnelle sur "${sujet}" avec sessions flash de 30 minutes et matchmaking d'affinités.`,
    },
    {
      debutant: `Un calculateur ou simulateur pratique pour "${sujet}".`,
      expert: `Réalise un simulateur interactif temps réel pour "${sujet}" avec curseurs dynamiques, jauge d'impact humain/écologique et recommandations personnalisées.`,
    },
  ];
}

/** Génère les 3 niveaux de prompt architecte, entièrement hors-ligne. */
export function dossierLocal(
  brief: string,
  chemin: string[],
  specs: string[],
  cible: string,
  langue: string,
): DossierPrompts {
  const listeSpecs = specs.length
    ? specs.join(', ')
    : 'Mobile-First, Accessible, Responsive';
  const contexte = chemin.length ? chemin.join(' > ') : 'Tech for Good & Impact Humain';

  const court = `[Cible : ${cible} | Langue : ${langue}]
Crée une application web responsive complète et fonctionnelle basée sur ce brief :
"${brief}"
Domaine : ${contexte}.
Exigences techniques : ${listeSpecs}.
Fournis une interface moderne, accessible, avec des données de démonstration réalistes et aucune dépendance cassée.`;

  const standard =
    'RÔLE : Architecte Full-Stack Senior & Product Designer spécialisé en "Tech for Good" (Applications utiles à l\u2019être humain).\n\n' +
    'CONTEXTE & DOMAINE :\n' +
    contexte +
    '\n\nBRIEF DU PROJET :\n' +
    brief +
    '\n\nSPÉCIFICATIONS RESPONSIVES & ÉTHIQUES OBLIGATOIRES :\n' +
    specs.map((s) => `- ${s}`).join('\n') +
    '\n\nTÂCHE :\nConçois et développe une application web responsive clé en main (Mobile, Tablette, Desktop) qui répond directement à ce besoin humain avec empathie, clarté et efficacité.\n' +
    '1. Structure l\u2019interface avec une hiérarchie visuelle immédiate et une grille claire.\n' +
    '2. Intègre des fonctionnalités interactives complètes (filtres temps réel, formulaires fonctionnels, sauvegarde LocalStorage, indicateurs d\u2019impact).\n' +
    '3. Évite tout jargon complexe et remplace les alertes natives par des notifications bienveillantes.';

  const detaille =
    '===================================================================\n' +
    'CAHIER DES CHARGES & PROMPT ARCHITECTE — TECH FOR GOOD STUDIO\n' +
    `Modèle Cible : ${cible} | Langue : ${langue}\n` +
    '===================================================================\n\n' +
    '1. RÔLE & POSTURE :\n' +
    'Tu es un Lead Product Designer (UX/UI) et Ingénieur Full-Stack spécialisé dans les applications citoyennes, solidaires et accessibles. Ton objectif est de créer un outil numérique qui rend un service concret, immédiat et mesurable à l\u2019être humain.\n\n' +
    '2. VISION DU PROJET & CHEMIN THÉMATIQUE :\n' +
    `- Arborescence : ${contexte}\n` +
    '- Brief Utilisateur :\n' +
    brief +
    '\n\n3. EXIGENCES D\u2019ARCHITECTURE & MODULES ACTIVÉS :\n' +
    specs.map((s) => `✔ ${s}`).join('\n') +
    '\n\n4. DESIGN SYSTEM & ERGONOMIE RESPONSIVE :\n' +
    '- Approche Mobile-First stricte : navigation utilisable à une main sur smartphone, grille fluide adaptative sur tablette et desktop.\n' +
    '- Accessibilité cognitive et visuelle : contrastes élevés, boutons explicites (icône + libellé clair), états de survol et focus visibles.\n' +
    '- Zéro friction : l\u2019utilisateur doit pouvoir accomplir l\u2019action principale en moins de 3 clics dès l\u2019ouverture de la page.\n\n' +
    '5. FONCTIONNALITÉS ATTENDUES DANS LE CODE :\n' +
    '- Tableau de bord d\u2019accueil avec indicateurs d\u2019impact humain en temps réel.\n' +
    '- Système complet de création, recherche, filtrage et validation des entrées.\n' +
    '- Persistance locale automatique (LocalStorage) + jeu de données initial réaliste et inspirant.\n' +
    '- Export des données (.json / .md) et mode démonstration interactif.';

  return { court, standard, detaille };
}
