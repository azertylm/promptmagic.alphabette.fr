/**
 * BibliothequePane.tsx — Favoris & historique des prompts, sauvegardés en
 * localStorage. Un clic recharge le prompt dans l'atelier.
 */
import { usePM } from './store';

function dateHeure(d: number): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(d));
  } catch {
    return '';
  }
}

export function BibliothequePane() {
  const { favoris, historique, setDossier, viderFavoris, viderHistorique, setOnglet, notifier } = usePM();

  const charger = (texte: string) => {
    setDossier({ court: texte, standard: texte, detaille: texte });
    setOnglet('studio');
    notifier('Prompt chargé depuis votre bibliothèque !', 'ok');
  };

  const section = (titre: string, entrees: Array<{ p: string; d: number }>) => (
    <div className="pm-carte">
      <div className="pm-ligne-separee" style={{ borderTop: 'none', paddingTop: 0, marginBottom: '0.6rem' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>
          {titre} ({entrees.length})
        </h2>
        {entrees.length > 0 && (
          <button
            type="button"
            className="pm-silent"
            onClick={() => {
              if (titre.includes('Favoris')) viderFavoris();
              else viderHistorique();
              notifier(`${titre} vidés.`, 'info');
            }}
          >
            Vider
          </button>
        )}
      </div>
      {entrees.length === 0 ? (
        <div className="pm-vide">Aucun élément enregistré — générez un prompt puis mettez-le en favori ⭐.</div>
      ) : (
        <div className="pm-libro" style={{ maxHeight: '26rem', overflowY: 'auto' }}>
          {entrees.map((x, i) => (
            <button type="button" key={`${i}-${x.d}`} className="pm-libro-entree" onClick={() => charger(x.p)}>
              <span className="pm-libro-date">{dateHeure(x.d)}</span>
              <p className="pm-libro-texte">{x.p}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="pm-section">
      <div className="pm-carte">
        <span className="pm-etiquette">📚 Sauvegarde locale</span>
        <h1 className="pm-titre" style={{ fontSize: '1.3rem', marginTop: '0.5rem' }}>
          Bibliothèque de Prompt Magic
        </h1>
        <p className="pm-chapeau">
          Vos prompts favoris et votre historique récent, conservés dans votre navigateur (aucun
          serveur, aucune donnée qui part). Cliquez sur une entrée pour la remonter dans l'atelier.
        </p>
      </div>
      {section('⭐ Prompts Favoris', favoris)}
      {section('🕘 Historique Récent', historique)}
    </div>
  );
}
