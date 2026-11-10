/**
 * StudioPane.tsx — L'atelier Prompt Magic.
 *
 * Colonne gauche : réglages IA (Mistral BYOK), modules éthiques, brief.
 * Colonne droite : les 3 prompts (Court / Standard / Détaillé), les actions
 * (copier, enrichir, simuler, favori, partager, exporter) et la maquette
 * responsive simulée (mobile / tablette / bureau).
 */
import { useState, type ChangeEvent } from 'react';
import { MODULES_SPEC, type DossierPrompts } from './data';
import { enrichir, genererDossier, simuler } from './ia';
import { Maquette } from './Maquette';
import { usePM } from './store';

/** Les 3 vues de sortie + la maquette. */
type Vue = 'court' | 'standard' | 'detaille' | 'maquette';

const VUES: Array<{ id: Vue; label: string }> = [
  { id: 'court', label: '⚡ Court (MVP)' },
  { id: 'standard', label: '🎯 Standard' },
  { id: 'detaille', label: '📐 Cahier des Charges' },
  { id: 'maquette', label: '📱 Aperçu UI Responsive' },
];

const CIBLES = [
  'Tous modèles (Architecture Web)',
  'Claude Artifacts / Cursor',
  'Gemini Canvas Web',
  'ChatGPT / v0 / Bolt',
];

const LANGUES = ['Français', 'English', 'Español', 'Deutsch'];

const LARGEURS = ['340px', '520px', '100%'] as const;
const LARGEURS_LABELS = ['📱 Mobile', '📟 Tablette', '💻 Desktop'] as const;

function copier(texte: string): boolean {
  try {
    const ta = document.createElement('textarea');
    ta.value = texte;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function StudioPane() {
  const {
    brief,
    setBrief,
    specs,
    basculerSpec,
    chemin,
    idee,
    dossier,
    setDossier,
    enregistrerDossier,
    langue,
    cible,
    setLangue,
    setCible,
    cleMistral,
    setCleMistral,
    ajouterFavori,
    notifier,
  } = usePM();

  const [vue, setVue] = useState<Vue>('standard');
  const [genere, setGenere] = useState(false);
  const [enrichit, setEnrichit] = useState(false);
  const [simule, setSimule] = useState(false);
  const [resultat, setResultat] = useState('');
  const [largeur, setLargeur] = useState<(typeof LARGEURS)[number]>('340px');

  const texte = dossier[vue === 'maquette' ? 'standard' : vue] ?? '';
  const majTextePrompt = (v: string) =>
    setDossier({ ...dossier, [vue === 'maquette' ? 'standard' : vue]: v } as DossierPrompts);
  const editer = (e: ChangeEvent<HTMLTextAreaElement>) => majTextePrompt(e.target.value);

  /* --- Générer les 3 prompts (Mistral si possible, moteur local sinon) --- */
  const generer = async () => {
    const t = brief.trim();
    if (!t) {
      notifier("Écrivez un brief ou cliquez sur l'une des 20 idées du catalogue.", 'warn');
      return;
    }
    setGenere(true);
    try {
      const res = await genererDossier(cleMistral || null, t, chemin, specs, cible, langue);
      setVue('standard');
      setResultat('');
      enregistrerDossier(
        res.dossier,
        res.source === 'mistral'
          ? 'Prompt Architecte généré par Mistral en 3 niveaux !'
          : 'Prompt Architecte généré en 3 niveaux (moteur local) !',
      );
      if (res.erreur && res.source === 'local' && cleMistral) notifier(res.erreur, 'warn');
    } finally {
      setGenere(false);
    }
  };

  /* --- Actions sur le prompt courant --- */
  const copierPrompt = () => {
    if (!texte.trim()) {
      notifier('Aucun prompt à copier.', 'warn');
      return;
    }
    const succes = () => notifier('Prompt copié dans le presse-papiers !', 'ok');
    if (!copier(texte) && navigator.clipboard) {
      navigator.clipboard
        .writeText(texte)
        .then(succes)
        .catch(() => notifier('Copie impossible dans ce contexte.', 'warn'));
    } else {
      succes();
    }
  };

  const optimiser = async () => {
    const t = texte.trim();
    if (!t) {
      notifier("Générez ou sélectionnez d'abord un prompt.", 'warn');
      return;
    }
    setEnrichit(true);
    try {
      const res = await enrichir(cleMistral || null, t);
      majTextePrompt(res.texte);
      notifier(
        res.source === 'mistral'
          ? 'Prompt réécrit par Mistral (relisez-le avant de l\u2019utiliser).'
          : 'Sans clé Mistral : un bloc standard d\u2019exigences UX/accessibilité a été ajouté à la fin.',
        'ok',
      );
    } finally {
      setEnrichit(false);
    }
  };

  const simulerPrompt = async () => {
    const t = texte.trim();
    if (!t) {
      notifier('Aucun prompt à simuler.', 'warn');
      return;
    }
    setSimule(true);
    try {
      const res = await simuler(cleMistral || null, t);
      setResultat(res.texte);
      notifier(
        res.source === 'mistral'
          ? 'Réponse de Mistral affichée sous le prompt (une IA peut se tromper).'
          : 'Sans clé Mistral : relecture simple du prompt affichée, pas une réponse d\u2019IA.',
        res.source === 'mistral' ? 'info' : 'warn',
      );
    } finally {
      setSimule(false);
    }
  };

  const favoriser = () => {
    const t = texte.trim();
    if (!t) {
      notifier('Rien à ajouter aux favoris.', 'warn');
      return;
    }
    ajouterFavori(t);
    notifier('Ajouté à vos favoris ⭐', 'ok');
  };

  const partager = () => {
    const t = texte.trim();
    if (!t) {
      notifier('Aucun prompt à partager.', 'warn');
      return;
    }
    const lien = `${location.origin}${location.pathname}#${btoa(unescape(encodeURIComponent(t)))}`;
    const succes = () => notifier('Lien de partage copié dans le presse-papiers !', 'ok');
    if (!copier(lien) && navigator.clipboard) {
      navigator.clipboard
        .writeText(lien)
        .then(succes)
        .catch(() => notifier('Partage indisponible ici.', 'warn'));
    } else {
      succes();
    }
  };

  const exporter = (e: ChangeEvent<HTMLSelectElement>) => {
    const format = e.target.value;
    if (!format) return;
    const contenu =
      format === 'json'
        ? JSON.stringify({ projet: idee.titre, domaine: idee.domaine, chemin, modules: specs, prompt: texte }, null, 2)
        : texte;
    const mime = { txt: 'text/plain', md: 'text/markdown', json: 'application/json' }[format] ?? 'text/plain';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([contenu], { type: mime }));
    a.download = `prompt-promptmagic.${format}`;
    a.click();
    URL.revokeObjectURL(a.href);
    e.target.value = '';
    notifier(`Fichier .${format.toUpperCase()} téléchargé !`, 'ok');
  };

  return (
    <div className="pm-atelier">
      {/* -------- Colonne gauche : brief & réglages -------- */}
      <div className="pm-section" style={{ gap: '0.9rem' }}>
        <div className="pm-carte">
          <div className="pm-ligne-separee" style={{ borderTop: 'none', paddingTop: 0, marginBottom: '0.6rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>⚙️ Réglages IA & Modèle Cible</h2>
            <span className="pm-graduation">{cleMistral ? '🤖 Mistral (votre clé)' : '⚙️ Modèles intégrés, sans IA'}</span>
          </div>
          <div className="pm-reglages">
            <label>
              <span className="pm-fichier-lib">Clé Mistral (optionnelle)</span>
              <input
                className="pm-champ"
                type="password"
                autoComplete="off"
                placeholder="Sans clé : moteur local actif"
                value={cleMistral}
                onChange={(e) => setCleMistral(e.target.value)}
              />
            </label>
            <label>
              <span className="pm-fichier-lib">Langue de génération</span>
              <select className="pm-champ" value={langue} onChange={(e) => setLangue(e.target.value)}>
                {LANGUES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="pm-fichier-lib">Cible d'export / Builder</span>
              <select className="pm-champ" value={cible} onChange={(e) => setCible(e.target.value)}>
                {CIBLES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="pm-chapeau" style={{ fontSize: '0.78rem', marginTop: '0.5rem' }}>
            💡 <strong>À savoir :</strong> l'IA est Mistral AI (entreprise française), avec votre propre
            clé : elle reste dans votre navigateur et n'est envoyée qu'à Mistral, comme vos textes.
            Sans clé, les 20 idées et les modèles de prompts intégrés fonctionnent sans limite, mais
            ce ne sont pas des réponses d'IA.
          </p>
        </div>

        <div className="pm-carte">
          <div className="pm-ligne-separee" style={{ borderTop: 'none', paddingTop: 0, marginBottom: '0.6rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>✍️ Votre Brief de Conception</h2>
            <button type="button" className="pm-silent" onClick={() => setBrief('')}>
              Effacer
            </button>
          </div>

          <span className="pm-fichier-lib">Modules responsives & éthiques à inclure :</span>
          <div className="pm-capsules" style={{ marginBottom: '0.7rem' }}>
            {MODULES_SPEC.map((m) => {
              const actif = specs.includes(m.texte);
              return (
                <button
                  key={m.texte}
                  type="button"
                  className={`pm-capsule${actif ? ' pm-capsule--active' : ''}`}
                  onClick={() => basculerSpec(m.texte)}
                >
                  {actif ? '✓ ' : '＋ '}
                  {m.label}
                </button>
              );
            })}
          </div>

          <textarea
            className="pm-champ"
            rows={6}
            placeholder="Décrivez le site ou l'application utile à l'humain que vous souhaitez créer, ou cliquez sur l'une des 20 idées du catalogue…"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            style={{ marginBottom: '0.7rem' }}
          />

          <button
            type="button"
            className="pm-bouton pm-bouton--principal"
            style={{ width: '100%' }}
            disabled={genere}
            onClick={generer}
          >
            {genere ? '⏳ Génération…' : '🪄 Créer le Prompt Architecte Magique'}
          </button>
        </div>
      </div>

      {/* -------- Colonne droite : sortie + maquette -------- */}
      <div className="pm-carte" style={{ padding: '1.2rem' }}>
        <div className="pm-ligne-separee" style={{ borderTop: 'none', paddingTop: 0, marginBottom: '0.7rem' }}>
          <span className="pm-graduation" style={{ textTransform: 'none' }}>
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: '0.55rem',
                height: '0.55rem',
                borderRadius: '50%',
                background: 'var(--ab-ok)',
                marginRight: '0.4rem',
              }}
            />
            Atelier Prompt & Cahier des Charges {idee ? `· ${idee.titre}` : ''}
          </span>
          <div className="pm-onglets" role="tablist" aria-label="Vues de sortie">
            {VUES.map((v) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={vue === v.id}
                className={`pm-onglet${vue === v.id ? ' pm-onglet--actif' : ''}`}
                onClick={() => setVue(v.id)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {vue === 'maquette' ? (
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            <div className="pm-appareils">
              <span className="pm-chapeau" style={{ margin: 0 }}>
                🖥️ Aperçu de l'architecture responsive de l'application :
              </span>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                {LARGEURS.map((l, i) => (
                  <button
                    key={l}
                    type="button"
                    className={`pm-puce${l === largeur ? ' pm-puce--active' : ''}`}
                    onClick={() => setLargeur(l)}
                  >
                    {LARGEURS_LABELS[i]}
                  </button>
                ))}
              </div>
            </div>
            <div className="pm-scene">
              <div className="pm-appareil" style={{ width: largeur }}>
                <Maquette idee={idee} specs={specs} />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="pm-compteur">
              <textarea
                className="pm-zone-mono"
                value={texte}
                onChange={editer}
                placeholder="Sélectionnez une idée ou générez un prompt pour voir apparaître l'architecture complète ici…"
                spellCheck={false}
              />
              <span className="pm-compteur-badge">{texte.length} car.</span>
            </div>

            <div className="pm-ligne-separee" style={{ marginTop: '0.7rem' }}>
              <div className="pm-boutons">
                <button type="button" className="pm-bouton pm-bouton--solide" onClick={copierPrompt}>
                  📋 Copier le Prompt
                </button>
                <button type="button" className="pm-bouton" disabled={enrichit} onClick={optimiser}>
                  {enrichit ? '⏳ Optimisation…' : '✨ Enrichir UX/UI'}
                </button>
                <button type="button" className="pm-bouton pm-bouton--eco" disabled={simule} onClick={simulerPrompt}>
                  {simule ? '⏳ En cours…' : cleMistral ? '▶ Tester avec Mistral' : '▶ Relire le prompt'}
                </button>
                <button type="button" className="pm-bouton pm-bouton--or" onClick={favoriser}>
                  ⭐ Favori
                </button>
                <button type="button" className="pm-bouton" onClick={partager}>
                  🔗 Partager
                </button>
              </div>
              <select className="pm-champ" style={{ width: 'auto', fontSize: '0.8rem' }} defaultValue="" onChange={exporter}>
                <option value="">⬇️ Exporter…</option>
                <option value="txt">Fichier .TXT</option>
                <option value="md">Documentation .MD</option>
                <option value="json">Blueprint .JSON</option>
              </select>
            </div>

            {resultat && (
              <pre className="pm-resultat" style={{ marginTop: '0.7rem' }}>
                {resultat}
              </pre>
            )}
          </>
        )}
      </div>
    </div>
  );
}
