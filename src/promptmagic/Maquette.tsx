/**
 * Maquette.tsx — Aperçu interactif de l'architecture responsive.
 *
 * Un « téléphone » contenu dans le cadre de l'atelier : en-tête, mission
 * humaine, fonctionnalités clés et modules techniques actifs. Toute la
 * teinte vient de la couleur d'identité du site (variables --ab-*).
 */
import type { IdeeHumaine } from './data';

interface MaquetteProps {
  idee: IdeeHumaine;
  specs: string[];
}

export function Maquette({ idee, specs }: MaquetteProps) {
  return (
    <div className="pm-maquette-interieur">
      {/* En-tête simulée de l'application */}
      <div className="pm-maq-tete">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div className="pm-maq-logo">{idee.titre.slice(0, 2).toUpperCase()}</div>
          <div>
            <div className="pm-maq-nom">{idee.titre}</div>
            <div className="pm-maq-ligne">Maquette d’exemple — pas une vraie application</div>
          </div>
        </div>
        <span className="pm-maq-domaine">{idee.domaine}</span>
      </div>

      {/* Bannière mission humaine */}
      <div className="pm-maq-mission">
        <div className="pm-maq-mission-lib">Mission Humaine</div>
        <p className="pm-maq-mission-texte">{idee.probleme}</p>
      </div>

      {/* Fonctionnalités clés */}
      <div>
        <div className="pm-maq-lib">Fonctionnalités Clés (Mobile-First)</div>
        <div className="pm-maq-fonctions" style={{ marginTop: '0.4rem' }}>
          {idee.fonctions.map((f, i) => (
            <div className="pm-maq-fonction" key={f}>
              <span className="pm-maq-fonction-num">{i + 1}</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modules techniques actifs */}
      <div>
        <div className="pm-maq-lib">Modules Techniques Actifs</div>
        <div className="pm-maq-capsules" style={{ marginTop: '0.35rem' }}>
          {specs.map((s) => (
            <span
              key={s}
              className="pm-idee-fonction"
              style={{
                color: 'var(--ab-ok)',
                borderColor: 'color-mix(in srgb, var(--ab-ok) 32%, transparent)',
                background: 'color-mix(in srgb, var(--ab-ok) 10%, transparent)',
              }}
            >
              ✓ {s.split('(')[0].trim()}
            </span>
          ))}
          {specs.length === 0 && (
            <span className="pm-idee-fonction">Aucun module actif — activez-en dans le Brief</span>
          )}
        </div>
      </div>

      {/* Barre d'action mobile */}
      <div className="pm-barre-app">
        <span className="pm-barre-app-actif">🏠 Accueil</span>
        <span>🗺️ Proximité</span>
        <span className="pm-barre-app-action">＋ Agir</span>
        <span>🤝 Entraide</span>
      </div>
    </div>
  );
}
