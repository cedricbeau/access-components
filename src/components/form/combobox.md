# Bibliothèque de Composants Alpine.js Accessibles

Une collection de composants Alpine.js entièrement accessibles, conformes aux standards WCAG 2.1 AA, avec support complet de la navigation au clavier et des lecteurs d'écran.

## 🎯 Objectifs

- **Accessibilité complète** : Conformité WCAG 2.1 AA
- **Navigation clavier** : Support total Tab/Shift+Tab/Flèches/Home/End
- **Lecteurs d'écran** : Annonces appropriées et sémantique ARIA
- **Simplicité d'usage** : API intuitive et documentation claire
- **Performance** : Composants légers et optimisés

## 📦 Installation

1. Incluez Alpine.js et ses plugins dans votre projet :
```html
<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

2. Copiez les styles CSS et le JavaScript du composant dans votre projet.

3. Ajoutez les conteneurs des composants dans votre HTML.

## 📑 Combobox/Autocomplete

### Description
Composant de combobox avec fonctionnalité d'autocomplétion pour sélectionner une option parmi une liste prédéfinie. Gestion complète de l'accessibilité avec support de la navigation au clavier, filtrage en temps réel et relations ARIA appropriées entre le champ de saisie et les options.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="combobox"`, `aria-expanded`, `aria-activedescendant`, `aria-haspopup`, `aria-autocomplete`, `role="listbox"`, `role="option"`, `aria-selected`
- **Navigation clavier** : Flèches haut/bas pour navigation, Enter pour sélection, Escape pour fermer
- **Lecteurs d'écran** : Annonces des options filtrées et sélectionnées, états d'ouverture/fermeture
- **Focus management** : Gestion appropriée du focus entre input et options
- **Sémantique** : Structure de combobox avec relations bidirectionnelles
- **États visuels** : Indicateurs visuels d'état actif, focus et sélection

### Usage

#### HTML Structure
```html
<div x-data="combobox()" class="form-group">
    <label for="fruit-combobox" class="form-label">
        Choisissez un fruit
    </label>

    <div class="combobox-container">
        <input
            id="fruit-combobox"
            type="text"
            class="combobox-input"
            role="combobox"
            :aria-expanded="isOpen"
            :aria-activedescendant="activeOptionId"
            aria-haspopup="listbox"
            aria-autocomplete="list"
            aria-describedby="fruit-instructions"
            placeholder="Tapez pour rechercher..."
            x-model="query"
            @input="handleInput"
            @keydown="handleKeydown"
            @focus="handleFocus"
            @blur="handleBlur"
        />

        <ul
            x-show="isOpen"
            x-transition
            class="combobox-listbox"
            role="listbox"
            id="fruit-listbox"
            aria-label="Suggestions de fruits"
        >
            <template x-for="(option, index) in filteredOptions" :key="option.id">
                <li
                    class="combobox-option"
                    role="option"
                    :id="'option-' + option.id"
                    :aria-selected="activeIndex === index"
                    :class="{ 'bg-blue-100': activeIndex === index }"
                    @click="selectOption(option)"
                    @mouseenter="setActiveIndex(index)"
                    tabindex="-1"
                    x-text="option.label"
                ></li>
            </template>

            <li x-show="filteredOptions.length === 0 && query.length > 0"
                class="combobox-option"
                role="option"
                aria-selected="false">
                Aucun résultat trouvé
            </li>
        </ul>
    </div>

    <div x-show="selectedOption" x-transition class="instructions">
        Sélectionné: <strong x-text="selectedOption?.label"></strong>
    </div>
</div>
```

#### JavaScript API
```javascript
function combobox() {
    return {
        query: '',
        isOpen: false,
        activeIndex: -1,
        selectedOption: null,
        options: [
            { id: 1, label: 'Pomme' },
            { id: 2, label: 'Banane' },
            { id: 3, label: 'Orange' },
            { id: 4, label: 'Fraise' },
            { id: 5, label: 'Raisin' },
            { id: 6, label: 'Ananas' },
            { id: 7, label: 'Mangue' },
            { id: 8, label: 'Kiwi' },
            { id: 9, label: 'Pêche' },
            { id: 10, label: 'Abricot' }
        ],

        // Computed properties
        get filteredOptions() {
            if (!this.query) return this.options;
            return this.options.filter(option =>
                option.label.toLowerCase().includes(this.query.toLowerCase())
            );
        },

        get activeOptionId() {
            if (this.activeIndex >= 0 && this.filteredOptions[this.activeIndex]) {
                return 'option-' + this.filteredOptions[this.activeIndex].id;
            }
            return null;
        },

        // Gestion des événements
        handleInput() {
            this.isOpen = true;
            this.activeIndex = -1;
            this.announce(`${this.filteredOptions.length} options disponibles`);
        },

        handleFocus() {
            this.isOpen = true;
        },

        handleBlur() {
            setTimeout(() => {
                this.isOpen = false;
                this.activeIndex = -1;
            }, 150);
        },

        // Navigation clavier
        handleKeydown(event) {
            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    this.isOpen = true;
                    this.activeIndex = Math.min(this.activeIndex + 1, this.filteredOptions.length - 1);
                    this.announceActiveOption();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    if (this.activeIndex > 0) {
                        this.activeIndex--;
                        this.announceActiveOption();
                    }
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (this.activeIndex >= 0 && this.filteredOptions[this.activeIndex]) {
                        this.selectOption(this.filteredOptions[this.activeIndex]);
                    }
                    break;
                case 'Escape':
                    this.isOpen = false;
                    this.activeIndex = -1;
                    break;
                case 'Tab':
                    this.isOpen = false;
                    this.activeIndex = -1;
                    break;
            }
        },

        // Sélection d'option
        selectOption(option) {
            this.selectedOption = option;
            this.query = option.label;
            this.isOpen = false;
            this.activeIndex = -1;
            this.announce(`${option.label} sélectionné`);
        },

        setActiveIndex(index) {
            this.activeIndex = index;
        },

        // Annonces pour lecteurs d'écran
        announce(message) {
            const announcer = document.createElement('div');
            announcer.setAttribute('role', 'status');
            announcer.setAttribute('aria-live', 'polite');
            announcer.className = 'sr-only';
            announcer.textContent = message;
            document.body.appendChild(announcer);
            setTimeout(() => document.body.removeChild(announcer), 1000);
        },

        announceActiveOption() {
            if (this.activeIndex >= 0 && this.filteredOptions[this.activeIndex]) {
                this.announce(this.filteredOptions[this.activeIndex].label);
            }
        }
    }
}

// Exemples d'utilisation
// Sélectionner une option programmatiquement
function selectOptionById(id) {
    const option = this.options.find(opt => opt.id === id);
    if (option) this.selectOption(option);
}

// Écouter les changements de sélection
document.addEventListener('option-selected', (e) => {
    console.log('Option sélectionnée:', e.detail.option);
});

// Configuration avec options dynamiques
const comboboxConfig = {
    options: [
        { id: 1, label: 'Option 1', value: 'opt1' },
        { id: 2, label: 'Option 2', value: 'opt2' },
        { id: 3, label: 'Option 3', value: 'opt3' }
    ],
    placeholder: 'Rechercher...',
    noResultsText: 'Aucun résultat'
};
```

#### Paramètres
- **query** (string) : Texte de recherche dans le champ de saisie
- **isOpen** (boolean) : État d'ouverture de la liste déroulante
- **activeIndex** (number) : Index de l'option actuellement active
- **selectedOption** (object) : Option actuellement sélectionnée
- **options** (array) : Liste des options disponibles

### Types de configuration
- **Combobox simple** : Liste d'options statiques
- **Combobox avec recherche** : Filtrage en temps réel
- **Combobox avec groupes** : Options organisées par catégories
- **Combobox avec icônes** : Ajout d'icônes aux options

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Conteneur principal */
.combobox-container { --position: relative; --width: 100%; --max-width: 300px; }

/* Champ de saisie */
.combobox-input { --padding: 0.75rem; --border: 2px solid #d1d5db; --border-radius: 6px; }
.combobox-input:focus { --border-color: #2563eb; --shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }

/* Liste déroulante */
.combobox-listbox { --bg-color: white; --border: 2px solid #d1d5db; --shadow: 0 4px 6px rgba(0,0,0,0.1); }

/* Options */
.combobox-option { --padding: 0.75rem; --hover-bg: #eff6ff; --selected-bg: #eff6ff; }
```

### Classes CSS modifiables
- `.combobox-container` : Conteneur principal avec positionnement
- `.combobox-input` : Champ de saisie avec états focus
- `.combobox-listbox` : Liste déroulante avec ombre et bordures
- `.combobox-option` : Options individuelles avec états hover et selected

## ⌨️ Raccourcis Clavier

### Combobox
- **Flèche bas** : Option suivante (ouvre la liste si fermée)
- **Flèche haut** : Option précédente
- **Enter** : Sélectionner l'option active
- **Escape** : Fermer la liste
- **Tab** : Fermer la liste et passer au suivant
- **Shift + Tab** : Navigation inverse

## 🔧 Configuration Avancée

### Combobox avec options dynamiques
```javascript
function combobox() {
    return {
        query: '',
        isOpen: false,
        activeIndex: -1,
        selectedOption: null,
        options: [],
        loading: false,

        async loadOptions(searchTerm) {
            this.loading = true;
            try {
                const response = await fetch(`/api/options?search=${searchTerm}`);
                this.options = await response.json();
            } catch (error) {
                console.error('Erreur de chargement:', error);
            } finally {
                this.loading = false;
            }
        },

        async handleInput() {
            this.isOpen = true;
            this.activeIndex = -1;

            if (this.query.length >= 2) {
                await this.loadOptions(this.query);
            }
        },

        get filteredOptions() {
            return this.options.filter(option =>
                option.label.toLowerCase().includes(this.query.toLowerCase())
            );
        }
    }
}
```

### Gestion des événements
```javascript
function combobox() {
    return {
        // ... autres propriétés

        selectOption(option) {
            const previousOption = this.selectedOption;
            this.selectedOption = option;
            this.query = option.label;
            this.isOpen = false;
            this.activeIndex = -1;

            this.$dispatch('option-selected', {
                option,
                previousOption
            });

            this.announce(`${option.label} sélectionné`);
        },

        handleInput() {
            this.isOpen = true;
            this.activeIndex = -1;

            this.$dispatch('search-changed', {
                query: this.query,
                resultsCount: this.filteredOptions.length
            });
        },

        init() {
            this.$dispatch('combobox-initialized', {
                totalOptions: this.options.length,
                selectedOption: this.selectedOption
            });
        }
    }
}

// Écoute des événements
document.addEventListener('option-selected', (e) => {
    console.log('Option sélectionnée:', e.detail.option);
});

document.addEventListener('search-changed', (e) => {
    console.log('Recherche modifiée:', e.detail.query, e.detail.resultsCount);
});
```

### Combobox avec groupes
```javascript
function groupedCombobox() {
    return {
        ...combobox(),

        optionGroups: [
            {
                label: 'Fruits',
                options: [
                    { id: 1, label: 'Pomme', group: 'fruits' },
                    { id: 2, label: 'Banane', group: 'fruits' }
                ]
            },
            {
                label: 'Légumes',
                options: [
                    { id: 3, label: 'Carotte', group: 'legumes' },
                    { id: 4, label: 'Brocoli', group: 'legumes' }
                ]
            }
        ],

        get filteredGroups() {
            return this.optionGroups.map(group => ({
                ...group,
                options: group.options.filter(option =>
                    option.label.toLowerCase().includes(this.query.toLowerCase())
                )
            })).filter(group => group.options.length > 0);
        },

        get flatFilteredOptions() {
            return this.filteredGroups.flatMap(group => group.options);
        }
    }
}
```

### Combobox avec validation
```javascript
function validatedCombobox() {
    return {
        ...combobox(),

        required: true,
        validationError: '',

        validate() {
            if (this.required && !this.selectedOption) {
                this.validationError = 'Veuillez sélectionner une option';
                return false;
            }

            this.validationError = '';
            return true;
        },

        selectOption(option) {
            this.selectedOption = option;
            this.query = option.label;
            this.isOpen = false;
            this.activeIndex = -1;
            this.validate();
            this.announce(`${option.label} sélectionné`);
        },

        handleBlur() {
            setTimeout(() => {
                this.isOpen = false;
                this.activeIndex = -1;
                this.validate();
            }, 150);
        }
    }
}
```

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.3.1** Information et relations : Relations ARIA entre input et options
- ✅ **2.1.1** Clavier : Navigation complète au clavier avec flèches
- ✅ **2.1.2** Pas de piège clavier : Navigation fluide entre input et options
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés pour tous les états
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour le champ
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **4.1.2** Nom, rôle, valeur : États ARIA appropriés (aria-expanded, aria-selected)

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran pour navigation et annonces
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation aux flèches et tabulation

## 🐛 Dépannage

### Problèmes courants

#### Navigation clavier ne fonctionne pas
```javascript
// Vérifier que les événements sont bien attachés
@keydown="handleKeydown"

// S'assurer que preventDefault est utilisé
case 'ArrowDown':
    event.preventDefault();
    // ... logique
```

#### Focus non visible sur les options
```css
/* S'assurer que le focus est bien stylé */
.combobox-option:focus {
    outline: 2px solid #2563eb;
    outline-offset: -2px;
    background-color: #eff6ff;
}
```

#### Aria-activedescendant non fonctionnel
```javascript
// Vérifier la logique de génération des IDs
get activeOptionId() {
    if (this.activeIndex >= 0 && this.filteredOptions[this.activeIndex]) {
        return 'option-' + this.filteredOptions[this.activeIndex].id;
    }
    return null;
}
```

#### Annonces lecteur d'écran manquantes
```html
<!-- Vérifier les attributs ARIA -->
<input role="combobox"
       :aria-expanded="isOpen"
       aria-haspopup="listbox"
       aria-autocomplete="list">
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
- [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [Keyboard Navigation](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)

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