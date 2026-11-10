/**
 * ia.ts — IA souveraine de Prompt Magic.
 *
 * Règle nº 5 de l'écosystème : l'IA est Mistral AI (hébergée en France), en
 * BYOK — la clé reste dans le navigateur de l'utilisateur (localStorage),
 * n'est envoyée qu'à api.mistral.ai, et aucune donnée n'est utilisée pour
 * l'entraînement. En cas d'absence de clé ou d'erreur : repli local garanti
 * (moteurs déterministes embarqués dans data.ts).
 */
import {
  extraireJson,
  dossierLocal,
  exemplesLocal,
  sousCategoriesLocal,
  type DossierPrompts,
  type ExempleIde,
} from './data';

export const MODELE_MISTRAL = 'mistral-small-latest';
export const URL_MISTRAL = 'https://api.mistral.ai/v1/chat/completions';
export const CLE_MISTRAL_LS = 'promptmagic.mistral-cle';

export function lireCle(): string | null {
  try {
    return localStorage.getItem(CLE_MISTRAL_LS);
  } catch {
    return null;
  }
}

export function ecrireCle(cle: string | null) {
  try {
    if (cle) localStorage.setItem(CLE_MISTRAL_LS, cle);
    else localStorage.removeItem(CLE_MISTRAL_LS);
  } catch {
    /* mode privé : on ignore. */
  }
}

function lancer(cle: string, systeme: string, utilisateur: string, forceJson: boolean): Promise<string> {
  return fetch(URL_MISTRAL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${cle}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODELE_MISTRAL,
      temperature: forceJson ? 0.4 : 0.6,
      ...(forceJson ? { response_format: { type: 'json_object' } } : {}),
      messages: [
        { role: 'system', content: systeme },
        { role: 'user', content: utilisateur },
      ],
    }),
  }).then(async (reponse) => {
    if (reponse.status === 401) throw new Error('Clé Mistral refusée (401). Vérifie ta clé dans le panneau Clés.');
    if (reponse.status === 429) throw new Error('Mistral a répondu 429 : trop de requêtes, réessaie dans un instant.');
    if (!reponse.ok) throw new Error(`Mistral a répondu ${reponse.status}.`);
    const json = (await reponse.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const texte = json?.choices?.[0]?.message?.content;
    if (!texte) throw new Error('Réponse Mistral vide ou inattendue.');
    return texte;
  });
}

/* ---------------------------------------------------------------------------
   Dossier de 3 prompts (Court / Standard / Détaillé)
--------------------------------------------------------------------------- */

const SYSTEME_DOSSIER =
  'Tu es le Prompt Architecte de Prompt Magic, studio web de l\u2019écosystème alphabette.fr orienté "Tech for Good" (applications utiles à l\u2019humain, mobile-first, accessibles, sans revente de données). ' +
  'Réponds UNIQUEMENT avec un objet JSON valable, exactement : {"court": "…", "standard": "…", "detaille": "…"}. ' +
  '"court" est un prompt MVP court ; "standard" un prompt fonctionnel structuré (Rôle, Projet, Objectif humain, Fonctionnalités) ; "detaille" un cahier des charges complet (Rôle, Vision & impact humain, Architecture UX/UI responsive, Fonctionnalités techniques, Contraintes). Utilise la langue demandée.';

export async function genererDossierMistral(
  cle: string,
  brief: string,
  chemin: string[],
  specs: string[],
  cible: string,
  langue: string,
): Promise<DossierPrompts> {
  const utilisateur = [
    `Brief : ${brief}`,
    `Chemin thématique : ${chemin.join(' > ') || 'Tech for Good'}`,
    `Modules obligatoires : ${specs.join(', ') || 'aucun'}`,
    `Modèle cible : ${cible}`,
    `Langue : ${langue}`,
    'Génère les 3 versions.',
  ].join('\n');

  const brut = await lancer(cle, SYSTEME_DOSSIER, utilisateur, true);
  const o = extraireJson<Record<string, unknown>>(brut);
  const dossier = {
    court: String(o.court ?? ''),
    standard: String(o.standard ?? ''),
    detaille: String(o.detaille ?? ''),
  };
  if (!dossier.court.trim() || !dossier.standard.trim()) throw new Error('Réponse Mistral incomplète.');
  if (!dossier.detaille.trim()) dossier.detaille = dossier.standard;
  return dossier;
}

/** Le point d'entrée unique : Mistral si possible, repli local sinon. */
export async function genererDossier(
  cle: string | null,
  brief: string,
  chemin: string[],
  specs: string[],
  cible: string,
  langue: string,
): Promise<{ dossier: DossierPrompts; source: 'mistral' | 'local'; erreur?: string }> {
  if (cle) {
    try {
      return { dossier: await genererDossierMistral(cle, brief, chemin, specs, cible, langue), source: 'mistral' };
    } catch (e) {
      const erreur = e instanceof Error ? e.message : 'Erreur réseau vers Mistral.';
      return { dossier: dossierLocal(brief, chemin, specs, cible, langue), source: 'local', erreur };
    }
  }
  return {
    dossier: dossierLocal(brief, chemin, specs, cible, langue),
    source: 'local',
    erreur: 'Aucune clé Mistral configurée : moteur local illimité (aucune clé requise).',
  };
}

/* ---------------------------------------------------------------------------
   Sous-catégories de l'arbre (20 niveaux)
--------------------------------------------------------------------------- */

const SYSTEME_ARBORESCENCE =
  'Tu es le cartographe d\u2019idées de Prompt Magic (écosystème alphabette.fr), spécialiste des applications web utiles à l\u2019humain (entraide, accessibilité, écologie, santé mentale…). ' +
  'À partir du chemin thématique fourni, propose exactement 20 sous-thèmes plus précis et concrets, compréhensibles par un débutant, variés et orientés application web responsive. ' +
  'Réponds UNIQUEMENT par un tableau JSON de 20 chaînes courtes.';

export async function sousCategoriesMistral(cle: string, chemin: string[], langue: string): Promise<string[]> {
  const brut = await lancer(
    cle,
    SYSTEME_ARBORESCENCE,
    `Chemin de conception : ${chemin.join(' > ')}.\nLangue : ${langue}.`,
    true,
  );
  const liste = extraireJson<unknown[]>(brut);
  const categories = liste.map((x) => String(x)).filter((x) => x.trim().length > 0).slice(0, 20);
  if (categories.length < 10) throw new Error('Réponse Mistral trop courte pour l\u2019arborescence.');
  return categories;
}

/** Cache : `pmp-arbre:<chemin>` → { source, items } */
export interface ArbreCache {
  source: 'mistral' | 'local';
  items: string[];
}

export function lireCacheArbre(chemin: string[]): ArbreCache | null {
  try {
    const brut = localStorage.getItem('pmp-arbre:' + chemin.join('›'));
    return brut ? (JSON.parse(brut) as ArbreCache) : null;
  } catch {
    return null;
  }
}

export function ecrireCacheArbre(chemin: string[], cache: ArbreCache) {
  try {
    localStorage.setItem('pmp-arbre:' + chemin.join('›'), JSON.stringify(cache));
  } catch {
    /* stockage indisponible : on ignore. */
  }
}

export async function chargerSousCategories(
  cle: string | null,
  chemin: string[],
  langue: string,
): Promise<{ items: string[]; source: 'mistral' | 'local'; erreur?: string }> {
  const enCache = lireCacheArbre(chemin);
  if (enCache && enCache.items.length) {
    return { items: enCache.items, source: enCache.source };
  }
  if (cle) {
    try {
      const items = await sousCategoriesMistral(cle, chemin, langue);
      ecrireCacheArbre(chemin, { source: 'mistral', items });
      return { items, source: 'mistral' };
    } catch (e) {
      const erreur = e instanceof Error ? e.message : 'Erreur réseau vers Mistral.';
      const items = sousCategoriesLocal(chemin);
      ecrireCacheArbre(chemin, { source: 'local', items });
      return { items, source: 'local', erreur };
    }
  }
  const items = sousCategoriesLocal(chemin);
  ecrireCacheArbre(chemin, { source: 'local', items });
  return { items, source: 'local', erreur: 'Aucune clé Mistral : sous-catégories générées localement.' };
}

/* ---------------------------------------------------------------------------
   10 exemples de briefs (débutant vs expert)
--------------------------------------------------------------------------- */

const SYSTEME_EXEMPLES =
  'Tu es le scout d\u2019idées de Prompt Magic (écosystème alphabette.fr). ' +
  'À partir du domaine fourni, donne 10 exemples de projets d\u2019applications web concrètes et utiles à l\u2019humain. ' +
  'Réponds UNIQUEMENT par un tableau JSON de 10 objets : {"debutant": "phrase simple de débutant", "expert": "cahier des charges précis d\u2019architecte UX/UI"}.';

export async function exemplesMistral(cle: string, chemin: string[], langue: string): Promise<ExempleIde[]> {
  const brut = await lancer(
    cle,
    SYSTEME_EXEMPLES,
    `Domaine : ${chemin.join(' > ')}.\nLangue : ${langue}.`,
    true,
  );
  const liste = extraireJson<Array<Record<string, unknown>>>(brut);
  const exemples = liste
    .map((x) => ({ debutant: String(x.debutant ?? ''), expert: String(x.expert ?? '') }))
    .filter((x) => x.debutant.trim() && x.expert.trim())
    .slice(0, 10);
  if (exemples.length < 5) throw new Error('Réponse Mistral trop courte pour les exemples.');
  return exemples;
}

export interface ExemplesCache {
  source: 'mistral' | 'local';
  items: ExempleIde[];
}

export function lireCacheExemples(chemin: string[]): ExemplesCache | null {
  try {
    const brut = localStorage.getItem('pmp-exemples:' + chemin.join('›'));
    return brut ? (JSON.parse(brut) as ExemplesCache) : null;
  } catch {
    return null;
  }
}

export function ecrireCacheExemples(chemin: string[], cache: ExemplesCache) {
  try {
    localStorage.setItem('pmp-exemples:' + chemin.join('›'), JSON.stringify(cache));
  } catch {
    /* stockage indisponible : on ignore. */
  }
}

export async function chargerExemples(
  cle: string | null,
  chemin: string[],
  langue: string,
): Promise<{ items: ExempleIde[]; source: 'mistral' | 'local'; erreur?: string }> {
  const enCache = lireCacheExemples(chemin);
  if (enCache && enCache.items.length) {
    return { items: enCache.items, source: enCache.source };
  }
  if (cle) {
    try {
      const items = await exemplesMistral(cle, chemin, langue);
      ecrireCacheExemples(chemin, { source: 'mistral', items });
      return { items, source: 'mistral' };
    } catch (e) {
      const erreur = e instanceof Error ? e.message : 'Erreur réseau vers Mistral.';
      return { items: exemplesLocal(chemin), source: 'local', erreur };
    }
  }
  return { items: exemplesLocal(chemin), source: 'local', erreur: 'Aucune clé Mistral : exemples générés localement.' };
}

/* ---------------------------------------------------------------------------
   Enrichissement UX/UI & Accessibilité (résultat = prompt amélioré)
--------------------------------------------------------------------------- */

const AJOUT_LOCAL =
  '--- EXIGENCES UX/UI & ACCESSIBILITÉ AJOUTÉES (bloc standard) ---\n' +
  '• Design System : interface claire côté base alphabette (accent du site, thème jour/nuit), transitions fluides.\n' +
  '• Responsive Mobile-First : barre d\u2019action accessible au pouce sur mobile, cibles tactiles >= 48px.\n' +
  '• Accessibilité Humaine : ratio de contraste AAA (>7:1), langage bienveillant sans jargon, zéro création de compte obligatoire.\n' +
  '• Architecture Robuste : gestion hors-ligne via LocalStorage, états vides illustrés et notifications non-bloquantes.';

export async function enrichirViaMistral(cle: string, texte: string): Promise<string> {
  const utilisateur =
    'Améliore ce prompt de création de site/application utile à l\u2019humain en renforçant le design responsive Mobile-First, ' +
    'l\u2019accessibilité WCAG AAA, la clarté fonctionnelle et la bienveillance. Renvoie UNIQUEMENT le prompt amélioré (pas de commentaire) :\n\n' +
    texte;
  return lancer(cle, 'Tu es un expert en prompt engineering et conception d\u2019applications web utiles à l\u2019humain.', utilisateur, false);
}

export async function enrichir(
  cle: string | null,
  texte: string,
): Promise<{ texte: string; source: 'mistral' | 'local'; erreur?: string }> {
  if (cle) {
    try {
      const texteAmeliore = await enrichirViaMistral(cle, texte);
      if (texteAmeliore.trim()) return { texte: texteAmeliore, source: 'mistral' };
    } catch (e) {
      const erreur = e instanceof Error ? e.message : 'Erreur réseau vers Mistral.';
      return { texte: `${texte}\n\n${AJOUT_LOCAL}`, source: 'local', erreur };
    }
  }
  return { texte: `${texte}\n\n${AJOUT_LOCAL}`, source: 'local', erreur: 'Aucune clé Mistral : un bloc standard d\u2019exigences a été ajouté à la fin du prompt.' };
}

/* ---------------------------------------------------------------------------
   Simulation d'exécution du prompt
--------------------------------------------------------------------------- */

/**
 * Sans clé, il n'y a PAS de simulation : on ne peut pas deviner ce qu'une IA
 * répondrait. On rend une simple relecture du texte du prompt (recherche de
 * mots-clés), clairement présentée comme telle — sans note ni « validation ».
 */
export function simulationLocal(texte: string): string {
  const points: Array<[string, RegExp]> = [
    ['le public visé est nommé', /public|cible|utilisateur|personnes|seniors|familles|voisins/i],
    ['les fonctions attendues sont listées', /fonctionnalit|fonctions|modules?|1\.|- /i],
    ['l\u2019affichage sur téléphone est demandé', /mobile|responsive|téléphone|smartphone/i],
    ['l\u2019accessibilité est demandée', /WCAG|accessib|contraste|lecteur d\u2019écran/i],
    ['le stockage des données est précisé', /LocalStorage|hors-ligne|PWA|base de données|compte/i],
  ];
  const lignes = points.map(([libelle, motif]) => `${motif.test(texte) ? '✓' : '✗ à préciser :'} ${libelle}`);
  return (
    'RELECTURE AUTOMATIQUE DU PROMPT (ce n\u2019est pas une réponse d\u2019IA)\n\n' +
    lignes.join('\n') +
    `\n\nLongueur : ${texte.length} caractères.\n\n` +
    'Pour voir une vraie réponse, ajoutez votre clé Mistral dans les réglages, ou copiez ce prompt dans l\u2019IA de votre choix. ' +
    'Cette relecture ne cherche que des mots : elle ne garantit pas la qualité du résultat.'
  );
}

export async function simulerViaMistral(cle: string, texte: string): Promise<string> {
  const utilisateur =
    'Simule la réponse d\u2019un architecte web senior à exécution de ce prompt : donne un plan d\u2019implémentation synthétique et impactant (structure, composants, accessibilité, données locales) :\n\n' +
    texte;
  return lancer(
    cle,
    'Tu es un architecte d\u2019applications web utiles à l\u2019humain. Donne un plan d\u2019implémentation synthétique et impactant.',
    utilisateur,
    false,
  );
}

export async function simuler(
  cle: string | null,
  texte: string,
): Promise<{ texte: string; source: 'mistral' | 'local'; erreur?: string }> {
  if (cle) {
    try {
      const resultat = await simulerViaMistral(cle, texte);
      if (resultat.trim()) return { texte: resultat, source: 'mistral' };
    } catch (e) {
      const erreur = e instanceof Error ? e.message : 'Erreur réseau vers Mistral.';
      return { texte: simulationLocal(texte), source: 'local', erreur };
    }
  }
  return { texte: simulationLocal(texte), source: 'local', erreur: 'Aucune clé Mistral : relecture simple du prompt, pas de réponse d\u2019IA.' };
}
