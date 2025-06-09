# Bibliothèque de Composants Alpine.js Accessibles

Une collection de composants Alpine.js entièrement accessibles, conformes aux standards WCAG 2.1 AA, avec support complet de la navigation au clavier et des lecteurs d'écran.

## 🎯 Objectifs

- **Accessibilité complète** : Conformité WCAG 2.1 AA
- **Navigation clavier** : Support total Tab/Shift+Tab/Escape
- **Lecteurs d'écran** : Annonces appropriées et sémantique ARIA
- **Simplicité d'usage** : API intuitive et documentation claire
- **Performance** : Composants légers et optimisés

## 📦 Installation

1. Incluez Alpine.js et ses plugins dans votre projet :
```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/focus@3.x.x/dist/cdn.min.js"></script>
<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

2. Copiez les styles CSS et le JavaScript des composants dans votre projet.

3. Ajoutez les conteneurs des composants dans votre HTML.

## 📱 Sidebar/Navigation Drawer

### Description
Menu de navigation latéral qui s'ouvre en glissant depuis le côté gauche de l'écran. Idéal pour les interfaces mobiles et desktop, avec gestion complète du focus et fermeture par overlay ou touche Escape.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="dialog"`, `aria-modal`, `aria-expanded`, `aria-controls`
- **Navigation clavier** : Piégeage du focus, Escape pour fermer, navigation Tab/Shift+Tab
- **Lecteurs d'écran** : Annonces des changements d'état et de sélection
- **Gestion du focus** : Sauvegarde et restauration du focus précédent

### Usage

#### HTML Structure
```html
<div x-data="sidebar()" @keydown.escape="closeSidebar()">
    <!-- Bouton d'ouverture -->
    <button
        @click="openSidebar()"
        class="sidebar-toggle"
        type="button"
        aria-expanded="false"
        :aria-expanded="isOpen.toString()"
        aria-controls="main-sidebar"
        aria-label="Ouvrir le menu de navigation">
        ☰ Ouvrir le menu
    </button>

    <!-- Overlay -->
    <div
        x-show="isOpen"
        @click="closeSidebar()"
        class="sidebar-overlay"
        :class="{'active': isOpen}"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
        aria-hidden="true">
    </div>

    <!-- Sidebar -->
    <aside
        x-show="isOpen"
        id="main-sidebar"
        class="sidebar"
        :class="{'active': isOpen}"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title-header"
        x-transition:enter="transition ease-out duration-300"
        x-transition:enter-start="transform -translate-x-full"
        x-transition:enter-end="transform translate-x-0"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="transform translate-x-0"
        x-transition:leave-end="transform -translate-x-full"
        x-trap="isOpen">

        <!-- En-tête du sidebar -->
        <header class="sidebar-header">
            <h3 id="sidebar-title-header">Menu Navigation</h3>
            <button
                @click="closeSidebar()"
                class="sidebar-close"
                type="button"
                aria-label="Fermer le menu de navigation">
                ×
            </button>
        </header>

        <!-- Navigation -->
        <nav role="navigation" aria-label="Menu principal">
            <ul class="sidebar-nav" role="list">
                <li role="none">
                    <a href="#"
                        role="menuitem"
                        :class="{'active': activeItem === 'accueil'}"
                        @click="setActiveItem('accueil')"
                        @keydown.enter="setActiveItem('accueil')"
                        @keydown.space.prevent="setActiveItem('accueil')">
                        🏠 Accueil
                    </a>
                </li>
                <li role="none">
                    <a href="#"
                        role="menuitem"
                        :class="{'active': activeItem === 'produits'}"
                        @click="setActiveItem('produits')"
                        @keydown.enter="setActiveItem('produits')"
                        @keydown.space.prevent="setActiveItem('produits')">
                        📦 Produits
                    </a>
                </li>
                <!-- Autres éléments de menu... -->
            </ul>
        </nav>
    </aside>
</div>
```

#### JavaScript API
```javascript
// Ouvrir le sidebar
$refs.sidebar.openSidebar()

// Fermer le sidebar
$refs.sidebar.closeSidebar()

// Définir l'élément actif
$refs.sidebar.setActiveItem('produits')

// Vérifier l'état
console.log($refs.sidebar.isOpen) // true/false
console.log($refs.sidebar.activeItem) // 'accueil', 'produits', etc.
```

#### Méthodes disponibles
- **openSidebar()** : Ouvre le sidebar et gère le focus
- **closeSidebar()** : Ferme le sidebar et restaure le focus précédent
- **setActiveItem(item)** : Définit l'élément de menu actif

### Propriétés de configuration
- **isOpen** (boolean) : État d'ouverture du sidebar
- **activeItem** (string) : Élément de menu actuellement sélectionné
- **previouslyFocusedElement** : Élément ayant le focus avant l'ouverture

### Comportement responsive
- **Desktop** : Sidebar reste ouvert après sélection
- **Mobile (≤768px)** : Sidebar se ferme automatiquement après sélection
- **Largeur adaptative** : 300px sur desktop, 280px sur mobile

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Sidebar principal */
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    background: white;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 999;
}

.sidebar.active {
    transform: translateX(0);
}

/* Overlay */
.sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
}

/* Bouton toggle */
.sidebar-toggle {
    padding: 10px 15px;
    background: #007acc;
    color: white;
    border: none;
    border-radius: 4px;
}

/* Navigation */
.sidebar-nav a {
    display: block;
    padding: 15px 20px;
    color: #333;
    text-decoration: none;
    transition: background 0.2s ease;
}

.sidebar-nav a.active {
    background: #e3f2fd;
    color: #1976d2;
    font-weight: 500;
}
```

### Classes CSS modifiables
- `.sidebar` : Style du panneau principal
- `.sidebar-overlay` : Style de l'overlay de fond
- `.sidebar-toggle` : Style du bouton d'ouverture
- `.sidebar-nav` : Style de la navigation
- `.sidebar-header` : Style de l'en-tête

## ⌨️ Raccourcis Clavier

### Sidebar
- **Tab/Shift+Tab** : Navigation entre les éléments focusables
- **Escape** : Fermer le sidebar
- **Enter/Espace** : Activer un élément de menu
- **Focus trap** : Le focus reste dans le sidebar quand ouvert

### Gestion du focus
- **Ouverture** : Focus automatique sur le bouton de fermeture
- **Fermeture** : Retour du focus sur l'élément précédent
- **Piégeage** : Navigation limitée aux éléments du sidebar

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.1.1** Contenu non textuel : Boutons avec labels appropriés
- ✅ **1.3.1** Information et relations : Structure de navigation sémantique
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Gestion appropriée du focus trap
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés (4.5:1 minimum)
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour tous les éléments
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **3.2.2** Saisie : Changements d'état appropriés et prévisibles

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Z-index conflicts
```css
/* Ajuster les z-index si nécessaire */
.sidebar {
    z-index: 999;
}
.sidebar-overlay {
    z-index: 998;
}
```

#### Performance des animations
```css
/* Optimiser les animations */
.sidebar {
    will-change: transform;
}
.sidebar-overlay {
    will-change: opacity;
}
```

#### Focus management issues
```javascript
// Vérifier que les éléments focusables sont correctement identifiés
const firstFocusable = this.$el.querySelector('.sidebar-close');
if (firstFocusable) {
    firstFocusable.focus();
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
- [Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Navigation Landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/navigation.html)

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