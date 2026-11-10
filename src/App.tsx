/**
 * App.tsx — PROMPT MAGIC — Architecte d'apps utiles à l'humain.
 *
 * Le contenu vit à l'intérieur de <AppShell> (@alphabette/shell) : les barres
 * écosystème et application, les cinq panneaux, le thème et la densité sont
 * fournis par la base commune — JAMAIS recodés ici. Le bouton ☰ de la barre
 * application ouvre le menu latéral ci-dessous.
 */
import { useState } from 'react';
import { AppShell } from '@alphabette/shell';
import '@alphabette/shell/style.css';
import { APP } from './alphabette.app';
import { BibliothequePane } from './promptmagic/BibliothequePane';
import { CataloguePane } from './promptmagic/CataloguePane';
import { ExplorateurPane } from './promptmagic/ExplorateurPane';
import { StudioPane } from './promptmagic/StudioPane';
import { PMProvider, usePM, type Onglet } from './promptmagic/store';
import './promptmagic/app.css';

const ONGLETS: Array<{ id: Onglet; label: string }> = [
  { id: 'catalogue', label: '🧳 Catalogue (20 idées)' },
  { id: 'explorateur', label: '🌳 Explorateur (20 niveaux)' },
  { id: 'studio', label: '✨ Atelier & Prompts' },
  { id: 'bibliotheque', label: '📚 Bibliothèque' },
];

function Contenu({ menu, fermeMenu }: { menu: boolean; fermeMenu: () => void }) {
  const { onglet, setOnglet, notes, fermerNote } = usePM();

  return (
    <>
      {/* Menu latéral (ouvert par ☰ de la barre application) */}
      {menu && (
        <>
          <button
            type="button"
            aria-label="Fermer le menu"
            className="pm-menu-retour"
            onClick={fermeMenu}
          />
          <aside className="pm-menu" aria-label="Menu latéral">
            <h3>Prompt Magic</h3>
            <p>
              Studio d'architecture d'applications web utiles à l'humain : 20 idées intégrées, arbre
              d'idéation à 20 niveaux, prompts prêts pour Claude, Gemini ou Cursor, maquette
              responsive simulée.
            </p>
            <ul>
              {ONGLETS.map((o) => (
                <li key={o.id}>
                  <button
                    type="button"
                    className={onglet === o.id ? 'actif' : ''}
                    onClick={() => {
                      setOnglet(o.id);
                      fermeMenu();
                    }}
                  >
                    {o.label}
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <a href="https://alphabette.fr" target="_blank" rel="noreferrer">
                ⭐ L'écosystème alphabette.fr
              </a>
              <a href={APP.donUrl} target="_blank" rel="noreferrer">
                ♥ Soutenir l'écosystème
              </a>
              <a href={`https://${APP.subdomain}.alphabette.fr`} target="_blank" rel="noreferrer">
                🏅 Cette app : {APP.subdomain}.alphabette.fr
              </a>
            </div>
          </aside>
        </>
      )}

      <nav className="pm-nav" aria-label="Sections de l'application">
        {ONGLETS.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`pm-nav-btn${onglet === o.id ? ' pm-nav-btn--actif' : ''}`}
            onClick={() => {
              setOnglet(o.id);
              fermeMenu();
            }}
          >
            {o.label}
          </button>
        ))}
      </nav>

      <main style={{ color: 'var(--ab-ink)' }}>
        {onglet === 'catalogue' && <CataloguePane />}
        {onglet === 'explorateur' && <ExplorateurPane />}
        {onglet === 'studio' && <StudioPane />}
        {onglet === 'bibliotheque' && <BibliothequePane />}
      </main>

      <footer className="pm-pied">
        <p>
          🪄 Prompt Magic — partie de l'écosystème{' '}
          <a href="https://alphabette.fr" target="_blank" rel="noreferrer">
            alphabette.fr
          </a>
          . Sans publicité, sans revente de données. Votre travail reste dans votre navigateur ;
          vos textes ne partent chez Mistral AI que si vous ajoutez votre clé.{' '}
          <a href="https://alphabette.fr/don" target="_blank" rel="noreferrer">
            ♥ Faire un don
          </a>
        </p>
      </footer>

      {/* Notes flottantes */}
      <div className="pm-notes" role="status" aria-live="polite">
        {notes.map((n) => (
          <div key={n.id} className={`pm-note pm-note--${n.type}`}>
            <span aria-hidden="true">{n.icone}</span>
            <span style={{ flex: 1 }}>{n.texte}</span>
            <button
              type="button"
              className="pm-silent"
              onClick={() => fermerNote(n.id)}
              aria-label="Fermer la note"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export function App() {
  const [menu, setMenu] = useState(false);

  return (
    <PMProvider>
      <AppShell app={APP} onToggleNav={() => setMenu((m) => !m)}>
        <Contenu menu={menu} fermeMenu={() => setMenu(false)} />
      </AppShell>
    </PMProvider>
  );
}
