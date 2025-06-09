# Bibliothèque de Composants Alpine.js Accessibles

Une collection de composants Alpine.js entièrement accessibles, conformes aux standards WCAG 2.1 AA, avec support complet de la navigation au clavier et des lecteurs d'écran.

## 🎯 Objectifs

- **Accessibilité complète** : Conformité WCAG 2.1 AA
- **Navigation clavier** : Support total Tab/Shift+Tab/Escape
- **Lecteurs d'écran** : Annonces appropriées et sémantique ARIA
- **Simplicité d'usage** : API intuitive et documentation claire
- **Performance** : Composants légers et optimisés

## 📦 Installation

1. Incluez Alpine.js dans votre projet :
```html
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/alpinejs/3.13.3/cdn.min.js"></script>
```

2. Copiez les styles CSS et le JavaScript des composants dans votre projet.

3. Ajoutez les conteneurs des composants dans votre HTML.

## 📊 Progress Bar

### Description
Barre de progression visuelle pour indiquer l'avancement d'une tâche, avec support complet de l'accessibilité et des lecteurs d'écran.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`
- **Navigation clavier** : Boutons de contrôle focusables
- **Lecteurs d'écran** : Annonce du pourcentage de progression
- **Visibilité** : Contraste élevé et indication textuelle du pourcentage

### Usage

#### HTML Structure
```html
<div x-data="progressBar()">
    <div class="progress-container"
         role="progressbar"
         :aria-valuenow="progress"
         aria-valuemin="0"
         aria-valuemax="100"
         :aria-label="'Progression: ' + progress + '%'">
        <div class="progress-bar" :style="`width: ${progress}%`">
            <span x-text="progress + '%'"></span>
        </div>
    </div>
    <div style="margin-top: 1rem;">
        <button class="btn" @click="start()">Démarrer</button>
        <button class="btn" @click="reset()">Reset</button>
    </div>
</div>
```

#### JavaScript API
```javascript
// Composant Progress Bar
function progressBar() {
    return {
        progress: 0,
        interval: null,

        start() {
            if (this.interval) return;
            this.interval = setInterval(() => {
                if (this.progress < 100) {
                    this.progress += 1;
                } else {
                    this.stop();
                }
            }, 50);
        },

        stop() {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
        },

        reset() {
            this.stop();
            this.progress = 0;
        }
    }
}

// Utilisation
// Démarrer la progression
$refs.progressBar.start()

// Arrêter la progression
$refs.progressBar.stop()

// Réinitialiser
$refs.progressBar.reset()

// Définir une valeur spécifique
$refs.progressBar.progress = 50
```

#### Paramètres
- **progress** (number) : Valeur actuelle de progression (0-100)
- **interval** (object) : Référence de l'intervalle pour l'animation automatique

### Méthodes disponibles
- **start()** : Démarre l'animation de progression automatique
- **stop()** : Arrête l'animation en cours
- **reset()** : Remet la progression à zéro

### États de progression
- **0%** : Tâche non commencée
- **1-99%** : Tâche en cours
- **100%** : Tâche terminée (arrêt automatique)

## 🎨 Personnalisation CSS

### Styles par défaut
```css
.progress-container {
    width: 100%;
    background-color: #f0f0f0;
    border-radius: 4px;
    overflow: hidden;
}

.progress-bar {
    height: 20px;
    background-color: #007acc;
    transition: width 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.75rem;
}
```

### Variables CSS principales
```css
/* Couleurs personnalisables */
.progress-container {
    --bg-color: #f0f0f0;
    --progress-color: #007acc;
    --text-color: white;
}

/* Durées d'animation */
.progress-bar {
    transition: width 0.3s ease;
}
```

### Classes CSS modifiables
- `.progress-container` : Conteneur de la barre de progression
- `.progress-bar` : Barre de progression elle-même
- `.btn` : Style des boutons de contrôle

## ⌨️ Raccourcis Clavier

### Progress Bar
- **Tab** : Navigation vers les boutons de contrôle
- **Enter/Espace** : Activer les boutons (Démarrer/Reset)

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.1.1** Contenu non textuel : Pourcentage affiché visuellement et via ARIA
- ✅ **1.3.1** Information et relations : Structure sémantique avec `role="progressbar"`
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Focus peut être déplacé librement
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés (4.5:1 minimum)
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour la progression
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles sur les boutons
- ✅ **3.2.2** Saisie : Pas de changement de contexte automatique non attendu

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Animation saccadée
```css
/* Ajouter will-change pour optimiser les performances */
.progress-bar {
    will-change: width;
}
```

#### Progression non mise à jour
```javascript
// Vérifier que l'intervalle n'est pas déjà actif
if (!this.interval) {
    this.start();
}
```

### Support navigateurs
- **Chrome/Chromium** : 88+
- **Firefox** : 85+
- **Safari** : 14+
- **Edge** : 88+

## 📚 Ressources

### Documentation Alpine.js
- [Alpine.js Documentation](https://alpinejs.dev/)

### Standards d'accessibilité
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)

### Patterns ARIA
- [Progressbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/progressbar/)

## 📄 Licence

MIT License - Utilisez librement dans vos projets commerciaux et personnels.

## 🤝 Contribution

Les contributions sont les bienvenues ! Assurez-vous que toute modification maintient le niveau d'accessibilité WCAG 2.1 AA.

### Étapes pour contribuer
1. Fork du projet
2. Créer une branche pour votre fonctionnalité
3. Tester l'accessibilité avec les outils recommandés
4. Soumettre une pull request avec description détaillée

---

**Développé avec ❤️ pour l'accessibilité web**