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

## 📋 Dropdown (Liste déroulante)

### Description
Menu déroulant permettant aux utilisateurs de sélectionner une option parmi une liste. Supporte la navigation au clavier et les interactions tactiles avec une sémantique ARIA complète.

### Fonctionnalités d'accessibilité
- **ARIA** : `aria-expanded`, `aria-haspopup="listbox"`, `aria-activedescendant`, `aria-selected`
- **Navigation clavier** : Flèches haut/bas, Enter pour sélectionner, Escape pour fermer
- **Lecteurs d'écran** : Rôles `listbox` et `option` pour une compréhension claire
- **Focus management** : Gestion du focus avec `aria-activedescendant`

### Usage

#### HTML Structure
```html
<div x-data="dropdown()" class="dropdown">
    <button class="dropdown-button"
            @click="toggle()"
            @keydown.arrow-down.prevent="open(); nextItem()"
            @keydown.arrow-up.prevent="open(); prevItem()"
            @keydown.escape="close()"
            :aria-expanded="isOpen"
            aria-haspopup="listbox"
            :aria-activedescendant="selectedId">
        <span x-text="selectedItem ? selectedItem.label : 'Sélectionner une option'"></span>
        <span>▼</span>
    </button>

    <div x-show="isOpen"
         x-transition
         class="dropdown-menu"
         role="listbox"
         @keydown.arrow-down.prevent="nextItem()"
         @keydown.arrow-up.prevent="prevItem()"
         @keydown.enter.prevent="selectCurrent()"
         @keydown.escape="close()">
        <template x-for="(item, index) in items" :key="item.id">
            <button class="dropdown-item"
                    :class="{ 'selected': selectedItem && selectedItem.id === item.id }"
                    @click="select(item)"
                    role="option"
                    :id="'option-' + item.id"
                    :aria-selected="selectedItem && selectedItem.id === item.id"
                    x-text="item.label">
            </button>
        </template>
    </div>
</div>
```

#### JavaScript API
```javascript
function dropdown() {
    return {
        isOpen: false,
        selectedItem: null,
        focusedIndex: -1,
        selectedId: null,
        items: [
            { id: 1, label: 'Option 1' },
            { id: 2, label: 'Option 2' },
            { id: 3, label: 'Option 3' },
            { id: 4, label: 'Option 4' }
        ],

        toggle() {
            this.isOpen ? this.close() : this.open();
        },

        open() {
            this.isOpen = true;
            this.focusedIndex = this.selectedItem ? this.items.findIndex(item => item.id === this.selectedItem.id) : 0;
            this.updateSelectedId();
        },

        close() {
            this.isOpen = false;
            this.focusedIndex = -1;
            this.selectedId = null;
        },

        select(item) {
            this.selectedItem = item;
            this.close();
        },

        selectCurrent() {
            if (this.focusedIndex >= 0) {
                this.select(this.items[this.focusedIndex]);
            }
        },

        nextItem() {
            if (this.focusedIndex < this.items.length - 1) {
                this.focusedIndex++;
                this.updateSelectedId();
            }
        },

        prevItem() {
            if (this.focusedIndex > 0) {
                this.focusedIndex--;
                this.updateSelectedId();
            }
        },

        updateSelectedId() {
            this.selectedId = this.focusedIndex >= 0 ? `option-${this.items[this.focusedIndex].id}` : null;
        }
    }
}
```

#### Configuration
```javascript
// Mettre à jour les options dynamiquement
$refs.dropdown.items = [
    { id: 1, label: 'Nouvelle Option 1' },
    { id: 2, label: 'Nouvelle Option 2' }
];

// Sélectionner une option par programmation
$refs.dropdown.select({ id: 2, label: 'Option pré-sélectionnée' });

// Ouvrir/fermer le dropdown
$refs.dropdown.open();
$refs.dropdown.close();
```

#### Paramètres des items
- **id** (number/string) : Identifiant unique de l'option
- **label** (string) : Texte affiché pour l'option

### Méthodes disponibles
- **toggle()** : Ouvre ou ferme le dropdown
- **open()** : Ouvre le dropdown et positionne le focus
- **close()** : Ferme le dropdown
- **select(item)** : Sélectionne une option spécifique
- **nextItem()** : Navigue vers l'option suivante
- **prevItem()** : Navigue vers l'option précédente

### États du composant
- **isOpen** : État d'ouverture du dropdown
- **selectedItem** : Option actuellement sélectionnée
- **focusedIndex** : Index de l'option ayant le focus virtuel
- **selectedId** : ID de l'élément focusé pour `aria-activedescendant`

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-button {
    background: #007acc;
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.dropdown-button:hover,
.dropdown-button:focus {
    background: #0056b3;
    outline: 2px solid #007acc;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-width: 200px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 100;
    max-height: 200px;
    overflow-y: auto;
}

.dropdown-item {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    border-bottom: 1px solid #eee;
}

.dropdown-item:hover,
.dropdown-item:focus {
    background: #f8f9fa;
    outline: 2px solid #007acc;
}

.dropdown-item.selected {
    background: #e3f2fd;
    font-weight: bold;
}
```

### Classes CSS modifiables
- `.dropdown` : Conteneur principal du dropdown
- `.dropdown-button` : Bouton déclencheur
- `.dropdown-menu` : Menu déroulant
- `.dropdown-item` : Chaque option du menu
- `.dropdown-item.selected` : Option actuellement sélectionnée

## ⌨️ Raccourcis Clavier

### Dropdown
- **Clic/Espace** : Ouvrir/fermer le dropdown
- **Flèche Bas** : Ouvrir et naviguer vers l'option suivante
- **Flèche Haut** : Ouvrir et naviguer vers l'option précédente
- **Enter** : Sélectionner l'option focusée
- **Escape** : Fermer le dropdown

### Navigation dans le menu
- **Flèche Bas/Haut** : Naviguer entre les options
- **Enter** : Sélectionner l'option focusée
- **Escape** : Fermer sans sélectionner

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.1.1** Contenu non textuel : Icônes décoratives appropriées
- ✅ **1.3.1** Information et relations : Structure sémantique avec `listbox` et `option`
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Focus peut être déplacé librement
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés (4.5:1 minimum)
- ✅ **2.4.6** En-têtes et étiquettes : État du dropdown clairement indiqué
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **3.2.2** Saisie : Comportement prévisible lors des interactions

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Menu coupé par le viewport
```css
/* Ajuster la position du menu selon l'espace disponible */
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    transform-origin: top;
}

/* Alternative : menu vers le haut si pas de place */
.dropdown-menu.dropup {
    top: auto;
    bottom: 100%;
}
```

#### Focus non visible sur les options
```css
.dropdown-item:focus {
    outline: 2px solid #007acc;
    outline-offset: -2px;
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
- [Listbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
- [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

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