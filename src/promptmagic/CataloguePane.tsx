/**
 * CataloguePane.tsx — Les 20 idées d'applications responsives utiles à l'humain.
 * Un clic charge l'idée (brief + 3 prompts + maquette) dans l'atelier.
 */
import { useMemo, useState } from 'react';
import { IDEES_HUMAINES, type IdeeHumaine } from './data';
import { usePM } from './store';

function ideeFiltre(idee: IdeeHumaine, requete: string): boolean {
  if (!requete) return true;
  const cible = [idee.titre, idee.probleme, idee.domaine, ...idee.fonctions].join(' ').toLowerCase();
  return cible.includes(requete);
}

export function CataloguePane() {
  const { chargerIdee, setOnglet } = usePM();
  const [domaine, setDomaine] = useState('Tous');
  const [requete, setRequete] = useState('');

  const domaines = useMemo(() => ['Tous', ...Array.from(new Set(IDEES_HUMAINES.map((i) => i.domaine)))], []);

  const ideeAffichees = useMemo(() => {
    const r = requete.trim().toLowerCase();
    return IDEES_HUMAINES.filter(
      (i) => (domaine === 'Tous' || i.domaine === domaine) && ideeFiltre(i, r),
    );
  }, [domaine, requete]);

  const auHasard = () => {
    const idee = IDEES_HUMAINES[Math.floor(Math.random() * IDEES_HUMAINES.length)];
    chargerIdee(idee, true);
  };

  return (
    <div className="pm-section">
      {/* Bannière d'ambition */}
      <div className="pm-carte">
        <span className="pm-etiquette">🤍 Tech for Good · Conception web & mobile-first</span>
        <h1 className="pm-titre" style={{ marginTop: '0.6rem' }}>
          Créez des applications qui{' '}
          <span className="pm-titre--accent">changent vraiment</span> le quotidien.
        </h1>
        <p className="pm-chapeau">
          Explorez <strong>20 idées d'applications citoyennes et humaines</strong> déjà intégrées,
          descendez jusqu'à 20 niveaux de précision thématique dans l'explorateur, puis générez
          d'un clic le cahier des charges complet, le prompt développeur et une maquette
          responsive interactive (mobile, tablette, bureau).
        </p>
        <div className="pm-boutons" style={{ marginTop: '0.9rem' }}>
          <button type="button" className="pm-bouton pm-bouton--principal" onClick={auHasard}>
            ✨ Inspirer une app utile au hasard
          </button>
          <button type="button" className="pm-bouton" onClick={() => setOnglet('catalogue')}>
            📚 Parcourir les 20 idées
          </button>
          <button type="button" className="pm-bouton" onClick={() => setOnglet('explorateur')}>
            🌳 Arbre de catégories
          </button>
        </div>

        <div className="pm-grille-stats">
          <div className="pm-stat">
            <div className="pm-stat-lib">🧠 Idées intégrées</div>
            <div className="pm-stat-valeur">20 apps</div>
            <p className="pm-stat-detail">Cahier des charges & prompts prêts en 1 clic</p>
          </div>
          <div className="pm-stat">
            <div className="pm-stat-lib">🌳 Arborescence</div>
            <div className="pm-stat-valeur">20 niveaux</div>
            <p className="pm-stat-detail">Exploration infinie de niches à fort impact</p>
          </div>
          <div className="pm-stat">
            <div className="pm-stat-lib">📱 Responsive</div>
            <div className="pm-stat-valeur">Mobile-first</div>
            <p className="pm-stat-detail">Simulateur visuel mobile, tablette & bureau</p>
          </div>
          <div className="pm-stat">
            <div className="pm-stat-lib">🇫🇷 IA souveraine</div>
            <div className="pm-stat-valeur">100% local</div>
            <p className="pm-stat-detail">
              Moteur autonome + Mistral AI (France) en BYOK, avec repli local
            </p>
          </div>
        </div>
      </div>

      {/* Catalogue */}
      <div className="pm-carte">
        <div className="pm-tete-section">
          <div>
            <span className="pm-etiquette">🧳 Catalogue intégré</span>
            <h2 className="pm-titre" style={{ fontSize: '1.25rem', marginTop: '0.5rem' }}>
              20 Idées d'applications responsives utiles à l'humain
            </h2>
            <p className="pm-chapeau">
              Cliquez sur une idée pour charger automatiquement son <strong>Brief</strong>, ses{' '}
              <strong>3 Prompts Architectes</strong> (MVP, Standard, Cahier des charges complet) et
              sa <strong>Maquette Mobile/Tablette/Bureau</strong>.
            </p>
          </div>
          <input
            className="pm-champ"
            style={{ maxWidth: '16rem' }}
            type="search"
            placeholder="Filtrer les 20 idées…"
            aria-label="Filtrer les idées"
            value={requete}
            onChange={(e) => setRequete(e.target.value)}
          />
        </div>

        <div className="pm-filtres" role="tablist" aria-label="Filtres de domaine">
          {domaines.map((d) => (
            <button
              key={d}
              type="button"
              className={`pm-puce${d === domaine ? ' pm-puce--active' : ''}`}
              onClick={() => setDomaine(d)}
            >
              {d}
              <span className="pm-puce-compteur">
                {d === 'Tous' ? IDEES_HUMAINES.length : IDEES_HUMAINES.filter((i) => i.domaine === d).length}
              </span>
            </button>
          ))}
        </div>

        {ideeAffichees.length === 0 ? (
          <div className="pm-vide">
            Aucune idée ne correspond à ce filtre.{' '}
            <button
              type="button"
              className="pm-silent"
              onClick={() => {
                setDomaine('Tous');
                setRequete('');
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="pm-idees">
            {ideeAffichees.map((idee, index) => (
              <button
                key={idee.id}
                type="button"
                className="pm-idee"
                style={{ animationDelay: `${index * 25}ms` }}
                onClick={() => chargerIdee(idee)}
              >
                <div>
                  <div className="pm-idee-tete">
                    <span className="pm-idee-badge">
                      {idee.emoji} #{idee.id} · {idee.domaine}
                    </span>
                    <span className="pm-idee-impact" title="Indice d'impact humain">
                      ♥ {idee.impact}%
                    </span>
                  </div>
                  <h3 className="pm-idee-titre">{idee.titre}</h3>
                  <p className="pm-idee-probleme">{idee.probleme}</p>
                  <div>
                    {idee.fonctions.slice(0, 3).map((f) => (
                      <span key={f} className="pm-idee-fonction">
                        • {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pm-idee-pied">
                  <span>Charger Brief + 3 Prompts</span>
                  <span aria-hidden="true">↗</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
