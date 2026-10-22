/**
 * ExplorateurPane.tsx — Arbre d'idéation profonde (20 niveaux).
 *
 * À chaque niveau : 20 sous-thèmes. On sélectionne, on descend, on remonte,
 * on peut s'injecter le chemin dans le Brief de l'atelier. Les sous-catégories
 * viennent du cache local, de Mistral (BYOK) ou du moteur local de repli.
 */
import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES_RACINES, exemplesLocal, type ExempleIde } from './data';
import { chargerExemples, chargerSousCategories, type ArbreCache } from './ia';
import { usePM } from './store';

const NIVEAU_MAX = 20;

export function ExplorateurPane() {
  const { chemin, setChemin, langue, cleMistral, specs, setBrief, setOnglet, notifier } = usePM();
  const [arbre, setArbre] = useState<ArbreCache>({ source: 'local', items: CATEGORIES_RACINES });
  const [enChargement, setEnChargement] = useState(false);
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [requete, setRequete] = useState('');

  const [exemplesOuvert, setExemplesOuvert] = useState(false);
  const [exemples, setExemples] = useState<ExempleIde[]>([]);
  const [exemplesSource, setExemplesSource] = useState<'mistral' | 'local'>('local');
  const [exemplesEnChargement, setExemplesEnChargement] = useState(false);

  const niveau = chemin.length + 1;

  /* Chargement des 20 sous-thèmes du niveau courant (cache → Mistral → local). */
  useEffect(() => {
    let annule = false;
    if (chemin.length === 0) {
      setArbre({ source: 'local', items: CATEGORIES_RACINES });
      setEnChargement(false);
      return;
    }
    setEnChargement(true);
    chargerSousCategories(cleMistral || null, chemin, langue)
      .then((res) => {
        if (!annule) setArbre({ source: res.source, items: res.items });
      })
      .finally(() => {
        if (!annule) setEnChargement(false);
      });
    return () => {
      annule = true;
    };
  }, [chemin, cleMistral, langue]);

  const visibles = useMemo(() => {
    const r = requete.trim().toLowerCase();
    return r ? arbre.items.filter((x) => x.toLowerCase().includes(r)) : arbre.items;
  }, [arbre, requete]);

  const basculer = (v: string) => {
    setSel((prev) => {
      const suivant = new Set(prev);
      if (suivant.has(v)) suivant.delete(v);
      else suivant.add(v);
      return suivant;
    });
  };

  const descendre = () => {
    if (!sel.size) {
      notifier('Choisissez au moins une catégorie avant de descendre.', 'warn');
      return;
    }
    if (chemin.length >= NIVEAU_MAX - 1) {
      notifier('Niveau 20/20 maximum atteint !', 'warn');
      return;
    }
    setChemin([...chemin, [...sel].join(' + ')]);
    setSel(new Set());
    setExemplesOuvert(false);
    setRequete('');
  };

  const remonter = () => {
    if (!chemin.length) {
      notifier('Vous êtes déjà au premier niveau des racines.', 'info');
      return;
    }
    setChemin(chemin.slice(0, -1));
    setSel(new Set());
    setExemplesOuvert(false);
  };

  const surprendre = () => {
    if (!arbre.items.length) return;
    const choix = arbre.items[Math.floor(Math.random() * arbre.items.length)];
    setSel(new Set([choix]));
    notifier(`Catégorie sélectionnée : ${choix}`, 'info');
  };

  const cheminComplet = () => {
    const p = [...chemin];
    if (sel.size) p.push([...sel].join(' + '));
    return p;
  };

  const injecter = () => {
    const p = cheminComplet();
    setBrief(
      `Domaine d'impact humain : ${p.join(' › ') || 'Application Citoyenne'}\nModules requis : ${specs.join(', ')}\n\nObjectif de l'application : créer un site ou une web-app responsive qui aide concrètement les utilisateurs sur ce sujet.`,
    );
    setOnglet('studio');
    notifier('Chemin injecté dans votre Brief !', 'ok');
  };

  const montrerExemples = async () => {
    const p = cheminComplet();
    if (!p.length) {
      notifier("Sélectionnez d'abord au moins une catégorie ci-dessus.", 'warn');
      return;
    }
    setExemplesOuvert(true);
    setExemplesEnChargement(true);
    try {
      const res = await chargerExemples(cleMistral || null, p, langue);
      setExemples(res.items ?? exemplesLocal(p));
      setExemplesSource(res.source);
    } catch {
      setExemples(exemplesLocal(p));
      setExemplesSource('local');
    } finally {
      setExemplesEnChargement(false);
    }
  };

  const chargerExemple = (p: ExempleIde, expert: boolean) => {
    setBrief(expert ? p.expert : p.debutant);
    setOnglet('studio');
    notifier('Exemple chargé dans le Brief !', 'ok');
  };

  return (
    <div className="pm-carte" style={{ padding: '1.4rem' }}>
      <div className="pm-tete-section">
        <div>
          <span className="pm-etiquette">🌳 Arbre d'idéation profonde (niveau {niveau}/20)</span>
          <h2 className="pm-titre" style={{ fontSize: '1.3rem', marginTop: '0.45rem' }}>
            Explorateur de niches & besoins humains
          </h2>
          <p className="pm-chapeau">
            Source du niveau :{' '}
            {arbre.source === 'mistral' ? '🤖 Mistral AI (BYOK)' : enChargement ? '⏳' : '⚙️ moteur local'} ·{' '}
            {arbre.items.length} sous-thèmes proposés
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div className="pm-progres" aria-hidden="true">
            <div className="pm-progres-remplie" style={{ width: `${Math.min(100, (niveau / NIVEAU_MAX) * 100)}%` }} />
          </div>
          <span className="pm-graduation">Niv. {niveau}/{NIVEAU_MAX}</span>
        </div>
      </div>

      {/* Fil d'Ariane */}
      <div className="pm-fil">
        <button
          type="button"
          className="pm-fil-bouton"
          onClick={() => {
            setChemin([]);
            setSel(new Set());
          }}
        >
          🏠 Racines ({CATEGORIES_RACINES.length})
        </button>
        {chemin.map((p, i) => (
          <span key={`${i}-${p}`} style={{ display: 'contents' }}>
            <span className="pm-fil-sep">›</span>
            <button
              type="button"
              className="pm-fil-bouton"
              onClick={() => {
                setChemin(chemin.slice(0, i + 1));
                setSel(new Set());
              }}
            >
              {p}
            </button>
          </span>
        ))}
      </div>

      {/* Recherche + surprise */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', margin: '0.6rem 0' }}>
        <input
          className="pm-champ"
          style={{ flex: '1 1 14rem' }}
          type="search"
          placeholder="Rechercher une thématique ou sous-catégorie…"
          aria-label="Rechercher dans le niveau courant"
          value={requete}
          onChange={(e) => setRequete(e.target.value)}
        />
        <button type="button" className="pm-bouton" onClick={surprendre}>
          🎲 Surprends-moi
        </button>
      </div>

      {/* Grille des sous-thèmes */}
      {enChargement ? (
        <div className="pm-vide">
          <span aria-hidden="true">⏳</span> Génération intelligente des 20 sous-catégories à impact
          humain…
        </div>
      ) : (
        <div className="pm-niveaux-grid">
          {visibles.map((x, i) => (
            <button
              key={x}
              type="button"
              className="pm-puce"
              style={{
                animationDelay: `${i * 15}ms`,
                animation: 'pm-arrive 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
                justifyContent: 'space-between',
                whiteSpace: 'normal',
                textAlign: 'left',
                ...(sel.has(x)
                  ? { background: 'var(--ab-accent)', color: 'var(--pm-sure-accent)', borderColor: 'transparent' }
                  : {}),
              }}
              onClick={() => basculer(x)}
            >
              <span style={{ lineHeight: 1.35 }}>{x}</span>
              <span aria-hidden="true">{sel.has(x) ? '✓' : '+'}</span>
            </button>
          ))}
          {visibles.length === 0 && <div className="pm-vide">Aucun sous-thème ne correspond.</div>}
        </div>
      )}

      {/* Navigation & actions */}
      <div className="pm-ligne-separee">
        <div className="pm-boutons">
          <button type="button" className="pm-bouton pm-bouton--principal" onClick={descendre}>
            Descendre plus précis ›
          </button>
          <button type="button" className="pm-bouton" onClick={remonter}>
            ↩ Retour
          </button>
        </div>
        <div className="pm-boutons">
          <button
            type="button"
            className="pm-bouton pm-bouton--or"
            disabled={exemplesEnChargement}
            onClick={montrerExemples}
          >
            {exemplesEnChargement ? '⏳ Préparation…' : '💡 10 Exemples d’Apps ici'}
          </button>
          <button type="button" className="pm-bouton pm-bouton--eco" onClick={injecter}>
            ✅ Injecter ce chemin dans le Brief
          </button>
        </div>
      </div>

      {/* 10 exemples (débutant vs expert) */}
      {exemplesOuvert && (
        <div className="pm-ligne-separee" style={{ display: 'block', marginTop: '0.9rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', marginBottom: '0.6rem' }}>
            <span className="pm-graduation">
              💡 10 Idées de Briefs (source : {exemplesSource === 'mistral' ? 'Mistral' : 'moteur local'})
            </span>
            <button type="button" className="pm-silent" onClick={() => setExemplesOuvert(false)}>
              Fermer ✕
            </button>
          </div>
          <div className="pm-libro" style={{ maxHeight: '24rem', overflowY: 'auto' }}>
            {exemples.map((x, i) => (
              <div className="pm-echange" key={i}>
                <button type="button" className="pm-exemple" onClick={() => chargerExemple(x, false)}>
                  <span className="pm-exemple-tag">🌱 Formulation Débutant</span>
                  {x.debutant}
                </button>
                <button
                  type="button"
                  className="pm-exemple pm-exemple--expert"
                  onClick={() => chargerExemple(x, true)}
                >
                  <span className="pm-exemple-tag">🚀 Architecture Expert</span>
                  {x.expert}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
