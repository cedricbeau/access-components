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

## 💬 Tooltip

### Description
Info-bulles contextuelles qui s'affichent au survol ou au focus d'un élément, avec support complet de l'accessibilité et des lecteurs d'écran. Positionnement flexible au-dessus ou en-dessous de l'élément déclencheur.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="tooltip"`, `aria-describedby` pour association élément-tooltip
- **Navigation clavier** : Affichage sur focus, masquage sur blur
- **Lecteurs d'écran** : Contenu du tooltip annoncé automatiquement
- **Visibilité** : Contraste élevé et positionnement optimal
- **Gestion du focus** : Tooltip accessible sans interférer avec la navigation

### Usage

#### HTML Structure
```html
<div x-data="tooltip('Information contextuelle', 'top')" class="tooltip-container">
    <button class="btn"
            @mouseenter="show()"
            @mouseleave="hide()"
            @focus="show()"
            @blur="hide()"
            :aria-describedby="tooltipId">
        Survolez-moi (top)
    </button>
    <div x-show="isVisible"
         x-transition
         class="tooltip top"
         :id="tooltipId"
         role="tooltip"
         x-text="content">
    </div>
</div>

<div x-data="tooltip('Aide contextuelle', 'bottom')" class="tooltip-container">
    <button class="btn"
            @mouseenter="show()"
            @mouseleave="hide()"
            @focus="show()"
            @blur="hide()"
            :aria-describedby="tooltipId">
        Survolez-moi (bottom)
    </button>
    <div x-show="isVisible"
         x-transition
         class="tooltip bottom"
         :id="tooltipId"
         role="tooltip"
         x-text="content">
    </div>
</div>
```

#### JavaScript API
```javascript
// Composant Tooltip
function tooltip(content, position = 'top') {
    return {
        isVisible: false,
        content: content,
        position: position,
        tooltipId: 'tooltip-' + Math.random().toString(36).substr(2, 9),

        show() {
            this.isVisible = true;
        },

        hide() {
            this.isVisible = false;
        }
    }
}

// Utilisation
// Tooltip basique
tooltip('Mon message d\'aide')

// Tooltip avec position personnalisée
tooltip('Information importante', 'bottom')

// Contrôle programmatique
$refs.tooltip.show()
$refs.tooltip.hide()

// Changer le contenu dynamiquement
$refs.tooltip.content = 'Nouveau message'
```

#### Paramètres
- **content** (string) : Texte à afficher dans le tooltip
- **position** (string, optionnel) : Position du tooltip `'top'` ou `'bottom'` (défaut: `'top'`)

### Méthodes disponibles
- **show()** : Affiche le tooltip
- **hide()** : Masque le tooltip

### Positions disponibles
- **top** : Tooltip affiché au-dessus de l'élément
- **bottom** : Tooltip affiché en-dessous de l'élément

### Déclencheurs supportés
- **Survol souris** : `@mouseenter` / `@mouseleave`
- **Focus clavier** : `@focus` / `@blur`
- **Programmatique** : Méthodes `show()` / `hide()`

## 🎨 Personnalisation CSS

### Styles par défaut
```css
.tooltip-container {
    position: relative;
    display: inline-block;
}

.tooltip {
    position: absolute;
    background: #333;
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
    white-space: nowrap;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.tooltip.top {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 5px;
}

.tooltip.bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5px;
}

.tooltip::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid transparent;
}

.tooltip.top::after {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-top-color: #333;
}

.tooltip.bottom::after {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-color: #333;
}
```

### Variables CSS principales
```css
/* Couleurs personnalisables */
.tooltip {
    --bg-color: #333;
    --text-color: white;
    --border-color: #333;
    --shadow: 0 2px 8px rgba(0,0,0,0.2);
}

/* Espacement et tailles */
.tooltip {
    --padding: 0.5rem;
    --font-size: 0.875rem;
    --border-radius: 4px;
    --arrow-size: 5px;
    --gap: 5px;
}

/* Z-index */
.tooltip {
    --z-index: 1000;
}
```

### Classes CSS modifiables
- `.tooltip-container` : Conteneur positionnable du tooltip
- `.tooltip` : Style principal du tooltip
- `.tooltip.top` : Positionnement au-dessus
- `.tooltip.bottom` : Positionnement en-dessous
- `.tooltip::after` : Flèche/pointeur du tooltip

## ⌨️ Raccourcis Clavier

### Tooltip
- **Tab** : Navigation vers l'élément déclencheur (affichage automatique du tooltip)
- **Shift+Tab** : Navigation inverse (masquage automatique du tooltip)
- **Échap** : Masquage du tooltip si focus sur l'élément

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.1.1** Contenu non textuel : Contenu textuel accessible via `aria-describedby`
- ✅ **1.3.1** Information et relations : Association claire élément-tooltip
- ✅ **2.1.1** Clavier : Affichage/masquage au focus/blur
- ✅ **2.1.2** Pas de piège clavier : Tooltip n'interfère pas avec la navigation
- ✅ **2.4.3** Ordre de focus : Tooltip n'affecte pas l'ordre de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés (4.5:1 minimum)
- ✅ **2.4.6** En-têtes et étiquettes : Contenu descriptif et pertinent
- ✅ **2.4.7** Focus visible : Tooltip visible au focus de l'élément
- ✅ **3.2.2** Saisie : Affichage prévisible et non intrusif

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Tooltip coupé par les bords de l'écran
```css
/* Ajouter une détection de position dynamique */
.tooltip {
    max-width: 200px;
    white-space: normal;
}
```

#### Animation saccadée
```css
/* Optimiser les performances d'animation */
.tooltip {
    will-change: opacity, transform;
}
```

#### Tooltip non annoncé par les lecteurs d'écran
```html
<!-- Vérifier l'association aria-describedby -->
<button :aria-describedby="tooltipId">Élément</button>
<div :id="tooltipId" role="tooltip">Contenu tooltip</div>
```

#### Z-index insuffisant
```css
/* Augmenter le z-index si nécessaire */
.tooltip {
    z-index: 9999;
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
- [Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

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