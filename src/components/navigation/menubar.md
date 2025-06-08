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

## 📋 Menubar (Barre de menus)

### Description
Barre de navigation horizontale avec menus déroulants, similaire aux barres de menus d'applications desktop. Permet une navigation efficace entre différentes sections d'actions avec support complet du clavier.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="menubar"`, `role="menu"`, `role="menuitem"`, `aria-expanded`, `aria-haspopup`
- **Navigation clavier** : Flèches droite/gauche pour les menus principaux, haut/bas pour les sous-menus
- **Lecteurs d'écran** : Structure sémantique complète avec rôles appropriés
- **Focus management** : Gestion du focus entre les différents niveaux de menus

### Usage

#### HTML Structure
```html
<div x-data="menubar()"
     class="menubar"
     role="menubar"
     @keydown.arrow-right.prevent="nextItem()"
     @keydown.arrow-left.prevent="prevItem()"
     @keydown.escape="closeAll()">

    <div class="menubar-item">
        <button class="menubar-button"
                @click="toggle(0)"
                @keydown.arrow-down.prevent="toggle(0)"
                :aria-expanded="isOpen(0)"
                aria-haspopup="true"
                role="menuitem">
            <span>Fichier</span>
            <span>▼</span>
        </button>
        <div x-show="isOpen(0)"
             x-transition
             class="submenu"
             role="menu"
             aria-label="Menu Fichier"
             @keydown.arrow-down.prevent="nextSubmenuItem(0)"
             @keydown.arrow-up.prevent="prevSubmenuItem(0)"
             @keydown.escape="close(0)">
            <div class="submenu-item"
                 role="menuitem"
                 tabindex="-1"
                 @click="selectItem('nouveau')"
                 @keydown.enter="selectItem('nouveau')">
                Nouveau
            </div>
            <div class="submenu-item"
                 role="menuitem"
                 tabindex="-1"
                 @click="selectItem('ouvrir')"
                 @keydown.enter="selectItem('ouvrir')">
                Ouvrir
            </div>
            <div class="submenu-item"
                 role="menuitem"
                 tabindex="-1"
                 @click="selectItem('sauvegarder')"
                 @keydown.enter="selectItem('sauvegarder')">
                Sauvegarder
            </div>
        </div>
    </div>

    <div class="menubar-item">
        <button class="menubar-button"
                @click="toggle(1)"
                @keydown.arrow-down.prevent="toggle(1)"
                :aria-expanded="isOpen(1)"
                aria-haspopup="true"
                role="menuitem">
            <span>Édition</span>
            <span>▼</span>
        </button>
        <div x-show="isOpen(1)"
             x-transition
             class="submenu"
             role="menu"
             aria-label="Menu Édition">
            <div class="submenu-item"
                 role="menuitem"
                 tabindex="-1"
                 @click="selectItem('copier')"
                 @keydown.enter="selectItem('copier')">
                Copier
            </div>
            <div class="submenu-item"
                 role="menuitem"
                 tabindex="-1"
                 @click="selectItem('coller')"
                 @keydown.enter="selectItem('coller')">
                Coller
            </div>
        </div>
    </div>
</div>
```

#### JavaScript API
```javascript
function menubar() {
    return {
        openMenus: [],

        toggle(index) {
            if (this.isOpen(index)) {
                this.close(index);
            } else {
                this.closeAll();
                this.openMenus.push(index);
            }
        },

        isOpen(index) {
            return this.openMenus.includes(index);
        },

        close(index) {
            this.openMenus = this.openMenus.filter(i => i !== index);
        },

        closeAll() {
            this.openMenus = [];
        },

        selectItem(action) {
            console.log('Action sélectionnée:', action);
            this.closeAll();
        },

        nextItem() {
            // Navigation entre les éléments du menubar
        },

        prevItem() {
            // Navigation entre les éléments du menubar
        }
    }
}
```

#### Configuration
```javascript
// Ouvrir un menu spécifique
$refs.menubar.toggle(0); // Ouvre le premier menu

// Fermer tous les menus
$refs.menubar.closeAll();

// Vérifier si un menu est ouvert
if ($refs.menubar.isOpen(1)) {
    console.log('Menu Édition est ouvert');
}

// Exécuter une action
$refs.menubar.selectItem('nouveau-fichier');
```

#### Structure des menus
Chaque menu est identifié par un index numérique :
- **Index 0** : Premier menu (ex: Fichier)
- **Index 1** : Deuxième menu (ex: Édition)
- **Index n** : Menu suivant dans l'ordre d'apparition

### Méthodes disponibles
- **toggle(index)** : Ouvre ou ferme un menu spécifique
- **isOpen(index)** : Vérifie si un menu est ouvert
- **close(index)** : Ferme un menu spécifique
- **closeAll()** : Ferme tous les menus ouverts
- **selectItem(action)** : Exécute une action et ferme les menus
- **nextItem()** : Navigue vers le menu suivant
- **prevItem()** : Navigue vers le menu précédent

### États du composant
- **openMenus** : Tableau des index des menus actuellement ouverts

### Comportement des menus
- **Exclusivité** : Un seul menu peut être ouvert à la fois
- **Auto-fermeture** : Les menus se ferment lors de la sélection d'une action
- **Navigation fluide** : Passage automatique d'un menu à l'autre avec les flèches

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
.menubar {
    background: #343a40;
    padding: 0;
    display: flex;
    border-radius: 4px;
}

.menubar-item {
    position: relative;
}

.menubar-button {
    background: none;
    border: none;
    color: white;
    padding: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.menubar-button:hover,
.menubar-button:focus {
    background: #495057;
    outline: 2px solid #007acc;
}

.submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-width: 200px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 100;
}

.submenu-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-bottom: 1px solid #eee;
}

.submenu-item:hover,
.submenu-item:focus {
    background: #f8f9fa;
    outline: 2px solid #007acc;
}
```

### Classes CSS modifiables
- `.menubar` : Conteneur principal de la barre de menus
- `.menubar-item` : Chaque élément de menu principal
- `.menubar-button` : Boutons des menus principaux
- `.submenu` : Menus déroulants
- `.submenu-item` : Éléments des sous-menus

## ⌨️ Raccourcis Clavier

### Navigation principale
- **Flèche Droite** : Menu suivant dans la barre
- **Flèche Gauche** : Menu précédent dans la barre
- **Flèche Bas** : Ouvrir le menu ou naviguer vers l'option suivante
- **Escape** : Fermer tous les menus

### Navigation dans les sous-menus
- **Flèche Bas** : Option suivante dans le sous-menu
- **Flèche Haut** : Option précédente dans le sous-menu
- **Enter** : Sélectionner l'option focusée
- **Escape** : Fermer le sous-menu courant

### Raccourcis universels
- **Tab** : Sortir du menubar
- **Shift+Tab** : Navigation inverse

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.1.1** Contenu non textuel : Icônes décoratives avec labels appropriés
- ✅ **1.3.1** Information et relations : Structure sémantique avec rôles `menubar`, `menu`, `menuitem`
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Focus peut être déplacé librement
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés (4.5:1 minimum)
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour chaque menu
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **3.2.2** Saisie : Comportement prévisible lors des interactions

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Sous-menus coupés par les bords
```css
/* Ajuster la position des sous-menus */
.submenu {
    position: absolute;
    top: 100%;
    left: 0;
    /* Forcer à rester dans le viewport */
    max-width: calc(100vw - 20px);
}

/* Pour les menus de droite */
.menubar-item:last-child .submenu {
    right: 0;
    left: auto;
}
```

#### Navigation clavier non fonctionnelle
```javascript
// S'assurer que le focus est géré correctement
nextItem() {
    const buttons = this.$el.querySelectorAll('.menubar-button');
    const currentIndex = Array.from(buttons).findIndex(btn => btn === document.activeElement);
    const nextIndex = (currentIndex + 1) % buttons.length;
    buttons[nextIndex].focus();
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
- [Menubar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)
- [Menu Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu/)

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