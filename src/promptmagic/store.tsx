/**
 * store.tsx — État partagé de Prompt Magic.
 *
 * Un seul contexte : le brief, les modules actifs, le chemin de l'explorateur,
 * l'idée chargée, le dossier de prompts courant, la bibliothèque (favoris +
 * historique), la clé Mistral BYOK et les notifications. Tout persiste en
 * localStorage — l'application reste 100 % locale.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { IDEES_HUMAINES, MODULES_SPEC, type DossierPrompts, type IdeeHumaine } from './data';
import { ecrireCle as ecrireCleMistral } from './ia';

/* --------------------------- Types --------------------------- */

export type Onglet = 'catalogue' | 'explorateur' | 'studio' | 'bibliotheque';
export type TypeNote = 'info' | 'ok' | 'warn';

export interface Note {
  id: number;
  type: TypeNote;
  icone: string;
  texte: string;
}

export interface EntreeBibliotheque {
  p: string;
  d: number;
}

const LIRE = (k: string, defaut: string): string => {
  try {
    return localStorage.getItem(k) ?? defaut;
  } catch {
    return defaut;
  }
};
const LIRE_JSON = <T,>(k: string, defaut: T): T => {
  try {
    const brut = localStorage.getItem(k);
    return brut ? (JSON.parse(brut) as T) : defaut;
  } catch {
    return defaut;
  }
};
const ECRIRE = (k: string, v: string | null) => {
  try {
    if (v === null) localStorage.removeItem(k);
    else localStorage.setItem(k, v);
  } catch {
    /* mode privé / stockage indisponible : on ignore. */
  }
};

const CLE = {
  brief: 'pmp.brief',
  specs: 'pmp.specs',
  chemin: 'pmp.chemin',
  idee: 'pmp.idee',
  dossier: 'pmp.dossier',
  onglet: 'pmp.onglet',
  favoris: 'pmp.favoris',
  historique: 'pmp.historique',
  cfg: 'pmp.cfg',
};

const ONGLETS_VALIDES: Onglet[] = ['catalogue', 'explorateur', 'studio', 'bibliotheque'];

/* --------------------------- Contexte --------------------------- */

interface EtatPM {
  brief: string;
  setBrief: (v: string) => void;

  specs: string[];
  basculerSpec: (texte: string) => void;

  chemin: string[];
  setChemin: (v: string[]) => void;

  idee: IdeeHumaine;
  chargerIdee: (idee: IdeeHumaine, naviguer?: boolean) => void;

  dossier: DossierPrompts;
  /** Mise à jour silencieuse (édition) — sans inscription à l'historique. */
  setDossier: (d: DossierPrompts) => void;
  /** Mise à jour + inscription à l'historique (génération, idée chargée). */
  enregistrerDossier: (d: DossierPrompts, titreNote?: string) => void;

  onglet: Onglet;
  setOnglet: (o: Onglet) => void;

  langue: string;
  cible: string;
  setLangue: (v: string) => void;
  setCible: (v: string) => void;

  cleMistral: string;
  setCleMistral: (v: string) => void;

  favoris: EntreeBibliotheque[];
  historique: EntreeBibliotheque[];
  ajouterFavori: (texte: string) => void;
  viderFavoris: () => void;
  viderHistorique: () => void;

  notifier: (texte: string, type?: TypeNote) => void;
  notes: Note[];
  fermerNote: (id: number) => void;
}

const ContextePM = createContext<EtatPM | null>(null);

export function usePM(): EtatPM {
  const ctx = useContext(ContextePM);
  if (!ctx) throw new Error('usePM doit être utilisé dans <PMProvider>.');
  return ctx;
}

/* --------------------------- Fournisseur --------------------------- */

export function PMProvider({ children }: { children: ReactNode }) {
  const compteur = useRef(0);
  const prochainId = () => Date.now() * 2 + (compteur.current++ % 2);

  const [brief, setBrut] = useState<string>(() => LIRE(CLE.brief, ''));
  const [specs, setSpecs] = useState<string[]>(() =>
    LIRE_JSON<string[]>(CLE.specs, MODULES_SPEC.filter((m) => m.defaut).map((m) => m.texte)),
  );
  const [chemin, setCheminLocal] = useState<string[]>(() => LIRE_JSON<string[]>(CLE.chemin, []));
  const [idee, setIdee] = useState<IdeeHumaine>(() => {
    const stocke = LIRE_JSON<number>(CLE.idee, IDEES_HUMAINES[0].id);
    return IDEES_HUMAINES.find((i) => i.id === stocke) ?? IDEES_HUMAINES[0];
  });
  const [dossier, setDossierLocal] = useState<DossierPrompts>(() =>
    LIRE_JSON<DossierPrompts>(CLE.dossier, IDEES_HUMAINES[0].prompts),
  );
  const [onglet, setOngletLocal] = useState<Onglet>(() => {
    const stocke = LIRE(CLE.onglet, 'catalogue');
    return (ONGLETS_VALIDES as string[]).includes(stocke) ? (stocke as Onglet) : 'catalogue';
  });
  const [cfg, setCfg] = useState<{ langue: string; cible: string }>(() =>
    LIRE_JSON(CLE.cfg, { langue: 'Français', cible: 'Tous modèles (Architecture Web)' }),
  );
  const [cleMistral, setCleLocale] = useState<string>(() => LIRE('promptmagic.mistral-cle', ''));
  const [favoris, setFavoris] = useState<EntreeBibliotheque[]>(() => LIRE_JSON(CLE.favoris, []));
  const [historique, setHistorique] = useState<EntreeBibliotheque[]>(() => LIRE_JSON(CLE.historique, []));
  const [notes, setNotes] = useState<Note[]>([]);

  /* --- Persistance --- */
  useEffect(() => ECRIRE(CLE.brief, brief), [brief]);
  useEffect(() => ECRIRE(CLE.specs, JSON.stringify(specs)), [specs]);
  useEffect(() => ECRIRE(CLE.chemin, JSON.stringify(chemin)), [chemin]);
  useEffect(() => ECRIRE(CLE.idee, JSON.stringify(idee.id)), [idee]);
  useEffect(() => ECRIRE(CLE.dossier, JSON.stringify(dossier)), [dossier]);
  useEffect(() => ECRIRE(CLE.onglet, onglet), [onglet]);
  useEffect(() => ECRIRE(CLE.cfg, JSON.stringify(cfg)), [cfg]);

  /* --- Notifications éphémères --- */
  const notifier = useCallback((texte: string, type: TypeNote = 'info') => {
    const icone = type === 'ok' ? '✅' : type === 'warn' ? '⚠️' : '✨';
    const note: Note = { id: prochainId(), type, icone, texte };
    setNotes((prev) => [...prev.slice(-2), note]);
    window.setTimeout(() => {
      setNotes((prev) => prev.filter((n) => n.id !== note.id));
    }, 3600);
  }, []);

  const fermerNote = useCallback((id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  /* --- Actions --- */
  const setBrief = useCallback((v: string) => setBrut(v), []);

  const basculerSpec = useCallback((texte: string) => {
    setSpecs((prev) => (prev.includes(texte) ? prev.filter((s) => s !== texte) : [...prev, texte]));
  }, []);

  const setChemin = useCallback((v: string[]) => setCheminLocal(v), []);
  const setOnglet = useCallback((o: Onglet) => setOngletLocal(o), []);
  const setLangue = useCallback((v: string) => setCfg((c) => ({ ...c, langue: v })), []);
  const setCible = useCallback((v: string) => setCfg((c) => ({ ...c, cible: v })), []);

  const setCleMistral = useCallback((v: string) => {
    const nettoyee = v.trim();
    setCleLocale(nettoyee);
    ecrireCleMistral(nettoyee || null);
  }, []);

  const setDossier = useCallback((d: DossierPrompts) => setDossierLocal(d), []);

  const enregistrerDossier = useCallback(
    (d: DossierPrompts, titreNote?: string) => {
      setDossierLocal(d);
      setHistorique((prev) => {
        const suivant = [{ p: d.standard, d: Date.now() }, ...prev].slice(0, 40);
        ECRIRE(CLE.historique, JSON.stringify(suivant));
        return suivant;
      });
      if (titreNote) notifier(titreNote, 'ok');
    },
    [notifier],
  );

  const chargerIdee = useCallback(
    (choisie: IdeeHumaine, naviguer = true) => {
      const specsBloc = specs.length ? `\nModules Responsives & Éthiques : ${specs.join(' | ')}` : '';
      setIdee(choisie);
      setBrut(
        `Projet : ${choisie.titre} (${choisie.domaine})\nProblème humain résolu : ${choisie.probleme}\nPublic cible : ${choisie.publicCible}\nFonctionnalités clés : ${choisie.fonctions.join(', ')}${specsBloc}`,
      );
      enregistrerDossier(choisie.prompts);
      if (naviguer) setOngletLocal('studio');
      notifier(`Idée "${choisie.titre}" chargée avec ses 3 prompts et sa maquette !`, 'ok');
    },
    [specs, enregistrerDossier, notifier],
  );

  const ajouterFavori = useCallback((texte: string) => {
    setFavoris((prev) => {
      const suivant = [{ p: texte, d: Date.now() }, ...prev].slice(0, 30);
      ECRIRE(CLE.favoris, JSON.stringify(suivant));
      return suivant;
    });
  }, []);

  const viderFavoris = useCallback(() => {
    setFavoris([]);
    ECRIRE(CLE.favoris, '[]');
  }, []);

  const viderHistorique = useCallback(() => {
    setHistorique([]);
    ECRIRE(CLE.historique, '[]');
  }, []);

  /** Premier démarrage : l'atelier arrive avec l'idée n°1 chargée, prêt à l'emploi. */
  useEffect(() => {
    // Un lien de partage (fragment encodé) prime sur tout : il recharge le prompt partagé.
    let chargeDuLien = false;
    try {
      if (location.hash.length > 1) {
        const decode = decodeURIComponent(escape(atob(location.hash.slice(1))));
        if (decode.trim()) {
          const partage: DossierPrompts = { court: decode, standard: decode, detaille: decode };
          setDossierLocal(partage);
          setOngletLocal('studio');
          chargeDuLien = true;
        }
      }
    } catch {
      /* lien de partage illisible : on ignore. */
    }
    if (!chargeDuLien && !LIRE(CLE.brief, '')) {
      const premiere = IDEES_HUMAINES[0];
      setIdee(premiere);
      setBrut(
        `Projet : ${premiere.titre} (${premiere.domaine})\nProblème humain résolu : ${premiere.probleme}\nPublic cible : ${premiere.publicCible}\nFonctionnalités clés : ${premiere.fonctions.join(', ')}`,
      );
      setDossierLocal(premiere.prompts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const valeur = useMemo<EtatPM>(
    () => ({
      brief,
      setBrief,
      specs,
      basculerSpec,
      chemin,
      setChemin,
      idee,
      chargerIdee,
      dossier,
      setDossier,
      enregistrerDossier,
      onglet,
      setOnglet,
      langue: cfg.langue,
      cible: cfg.cible,
      setLangue,
      setCible,
      cleMistral,
      setCleMistral,
      favoris,
      historique,
      ajouterFavori,
      viderFavoris,
      viderHistorique,
      notifier,
      notes,
      fermerNote,
    }),
    [
      brief,
      setBrief,
      specs,
      basculerSpec,
      chemin,
      setChemin,
      idee,
      chargerIdee,
      dossier,
      setDossier,
      enregistrerDossier,
      onglet,
      setOnglet,
      cfg.langue,
      cfg.cible,
      setLangue,
      setCible,
      cleMistral,
      setCleMistral,
      favoris,
      historique,
      ajouterFavori,
      viderFavoris,
      viderHistorique,
      notifier,
      notes,
      fermerNote,
    ],
  );

  return <ContextePM.Provider value={valeur}>{children}</ContextePM.Provider>;
}
