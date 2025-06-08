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

## 📑 Tabs

### Description
Composant d'onglets pour organiser et naviguer entre différents contenus. Gestion complète de l'accessibilité avec support des flèches directionnelles, gestion du focus et relations ARIA appropriées entre onglets et panneaux.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`, `aria-labelledby`
- **Navigation clavier** : Flèches gauche/droite, Home/End pour navigation, Tab pour sortir
- **Lecteurs d'écran** : Relations claires entre onglets et contenus, états sélectionnés
- **Focus management** : Seul l'onglet actif est focusable (tabindex="0"), gestion roving tabindex
- **Sémantique** : Structure d'onglets avec relations bidirectionnelles
- **États visuels** : Indicateurs visuels d'état actif et focus

### Usage

#### HTML Structure
```html
<div x-data="tabs()" class="tabs-container">
    <!-- Liste des onglets -->
    <div class="tabs-list"
         role="tablist"
         aria-label="Exemple d'onglets"
         @keydown.arrow-right.prevent="nextTab()"
         @keydown.arrow-left.prevent="prevTab()"
         @keydown.home.prevent="firstTab()"
         @keydown.end.prevent="lastTab()">

        <button class="tab-button"
                :class="{ 'active': activeTab === 0 }"
                @click="setActive(0)"
                role="tab"
                :aria-selected="activeTab === 0"
                aria-controls="tabpanel-0"
                id="tab-0"
                :tabindex="activeTab === 0 ? '0' : '-1'">
            Onglet 1
        </button>

        <button class="tab-button"
                :class="{ 'active': activeTab === 1 }"
                @click="setActive(1)"
                role="tab"
                :aria-selected="activeTab === 1"
                aria-controls="tabpanel-1"
                id="tab-1"
                :tabindex="activeTab === 1 ? '0' : '-1'">
            Onglet 2
        </button>

        <button class="tab-button"
                :class="{ 'active': activeTab === 2 }"
                @click="setActive(2)"
                role="tab"
                :aria-selected="activeTab === 2"
                aria-controls="tabpanel-2"
                id="tab-2"
                :tabindex="activeTab === 2 ? '0' : '-1'">
            Onglet 3
        </button>
    </div>

    <!-- Panneaux de contenu -->
    <div x-show="activeTab === 0"
         class="tab-panel"
         role="tabpanel"
         aria-labelledby="tab-0"
         id="tabpanel-0">
        <h3>Contenu de l'onglet 1</h3>
        <p>Voici le contenu du premier onglet.</p>
    </div>

    <div x-show="activeTab === 1"
         class="tab-panel"
         role="tabpanel"
         aria-labelledby="tab-1"
         id="tabpanel-1">
        <h3>Contenu de l'onglet 2</h3>
        <p>Voici le contenu du deuxième onglet.</p>
    </div>

    <div x-show="activeTab === 2"
         class="tab-panel"
         role="tabpanel"
         aria-labelledby="tab-2"
         id="tabpanel-2">
        <h3>Contenu de l'onglet 3</h3>
        <p>Voici le contenu du troisième onglet.</p>
    </div>
</div>
```

#### JavaScript API
```javascript
function tabs() {
    return {
        activeTab: 0,

        // Activer un onglet spécifique
        setActive(index) {
            this.activeTab = index;
            this.announce(`Onglet ${index + 1} sélectionné`);
        },

        // Naviguer vers l'onglet suivant
        nextTab() {
            const nextIndex = this.activeTab < 2 ? this.activeTab + 1 : 0;
            this.setActive(nextIndex);
        },

        // Naviguer vers l'onglet précédent
        prevTab() {
            const prevIndex = this.activeTab > 0 ? this.activeTab - 1 : 2;
            this.setActive(prevIndex);
        },

        // Aller au premier onglet
        firstTab() {
            this.setActive(0);
        },

        // Aller au dernier onglet
        lastTab() {
            this.setActive(2);
        },

        // Annoncer aux lecteurs d'écran
        announce(message) {
            const announcer = document.createElement('div');
            announcer.setAttribute('role', 'status');
            announcer.setAttribute('aria-live', 'polite');
            announcer.className = 'sr-only';
            announcer.textContent = message;
            document.body.appendChild(announcer);
            setTimeout(() => document.body.removeChild(announcer), 1000);
        }
    }
}

// Exemples d'utilisation
// Activer un onglet programmatiquement
function activateTab(index) {
    this.setActive(index);
}

// Écouter les changements d'onglets
document.addEventListener('tab-changed', (e) => {
    console.log('Onglet changé:', e.detail.index);
});

// Configuration avec onglets dynamiques
const tabsConfig = {
    tabs: [
        { id: 'home', label: 'Accueil', content: 'Contenu accueil' },
        { id: 'about', label: 'À propos', content: 'Contenu à propos' },
        { id: 'contact', label: 'Contact', content: 'Contenu contact' }
    ],
    activeTab: 0
};
```

#### Paramètres
- **activeTab** (number) : Index de l'onglet actuellement actif (commence à 0)

### Types de configuration
- **Onglets statiques** : Contenu défini directement dans le HTML
- **Onglets dynamiques** : Contenu généré à partir de données
- **Onglets avec icônes** : Ajout d'icônes aux labels d'onglets
- **Onglets verticaux** : Orientation verticale des onglets

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Conteneur principal */
.tabs-container { --border-color: #ddd; --border-radius: 4px; }

/* Liste des onglets */
.tabs-list { --bg-color: #f8f9fa; --border-bottom: 1px solid #ddd; }

/* Boutons d'onglets */
.tab-button { --padding: 1rem; --hover-bg: #e9ecef; --focus-color: #007acc; }
.tab-button.active { --active-border: #007acc; --active-bg: white; }

/* Panneaux de contenu */
.tab-panel { --padding: 1.5rem; --bg-color: white; }
```

### Classes CSS modifiables
- `.tabs-container` : Conteneur principal avec bordures
- `.tabs-list` : Barre des onglets avec fond coloré
- `.tab-button` : Boutons d'onglets individuels
- `.tab-button.active` : État actif d'un onglet
- `.tab-panel` : Zones de contenu des panneaux

## ⌨️ Raccourcis Clavier

### Tabs
- **Flèche droite** : Onglet suivant (navigation cyclique)
- **Flèche gauche** : Onglet précédent (navigation cyclique)
- **Home** : Premier onglet
- **End** : Dernier onglet
- **Tab** : Sortir de la liste d'onglets vers le contenu
- **Shift + Tab** : Navigation inverse

## 🔧 Configuration Avancée

### Onglets avec contenu dynamique
```javascript
function tabs() {
    return {
        activeTab: 0,
        tabsData: [
            { id: 'tab1', label: 'Onglet 1', content: 'Contenu dynamique 1' },
            { id: 'tab2', label: 'Onglet 2', content: 'Contenu dynamique 2' },
            { id: 'tab3', label: 'Onglet 3', content: 'Contenu dynamique 3' }
        ],

        get totalTabs() {
            return this.tabsData.length;
        },

        setActive(index) {
            if (index >= 0 && index < this.totalTabs) {
                this.activeTab = index;
                this.$dispatch('tab-changed', { index, tab: this.tabsData[index] });
                this.announce(`${this.tabsData[index].label} sélectionné`);
            }
        },

        nextTab() {
            this.setActive(this.activeTab < this.totalTabs - 1 ? this.activeTab + 1 : 0);
        },

        prevTab() {
            this.setActive(this.activeTab > 0 ? this.activeTab - 1 : this.totalTabs - 1);
        },

        lastTab() {
            this.setActive(this.totalTabs - 1);
        }
    }
}
```

### Gestion des événements
```javascript
// Événements personnalisés
function tabs() {
    return {
        // ... autres propriétés

        setActive(index) {
            const previousTab = this.activeTab;
            this.activeTab = index;

            this.$dispatch('tab-changing', {
                from: previousTab,
                to: index
            });

            this.$nextTick(() => {
                this.$dispatch('tab-changed', {
                    index,
                    tabElement: document.getElementById(`tab-${index}`)
                });
            });
        },

        init() {
            this.$dispatch('tabs-initialized', {
                totalTabs: this.totalTabs,
                activeTab: this.activeTab
            });
        }
    }
}

// Écoute des événements
document.addEventListener('tab-changing', (e) => {
    console.log('Changement d\'onglet:', e.detail.from, '->', e.detail.to);
});

document.addEventListener('tab-changed', (e) => {
    console.log('Onglet changé:', e.detail.index);
    // Exemple: charger du contenu lazy
    loadTabContent(e.detail.index);
});
```

### Onglets avec chargement lazy
```javascript
function lazyTabs() {
    return {
        ...tabs(),

        loadedTabs: new Set([0]), // Premier onglet préchargé

        setActive(index) {
            this.activeTab = index;

            if (!this.loadedTabs.has(index)) {
                this.loadTabContent(index);
                this.loadedTabs.add(index);
            }

            this.announce(`Onglet ${index + 1} sélectionné`);
        },

        async loadTabContent(index) {
            // Simuler chargement de contenu
            const response = await fetch(`/api/tab-content/${index}`);
            const content = await response.text();

            // Mettre à jour le contenu
            document.getElementById(`tabpanel-${index}`).innerHTML = content;
        },

        isTabLoaded(index) {
            return this.loadedTabs.has(index);
        }
    }
}
```

### Onglets verticaux
```javascript
function verticalTabs() {
    return {
        ...tabs(),

        // Navigation adaptée pour orientation verticale
        nextTab() {
            // Flèche bas = suivant
            this.setActive(this.activeTab < this.totalTabs - 1 ? this.activeTab + 1 : 0);
        },

        prevTab() {
            // Flèche haut = précédent
            this.setActive(this.activeTab > 0 ? this.activeTab - 1 : this.totalTabs - 1);
        }
    }
}
```

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.3.1** Information et relations : Relations ARIA entre onglets et panneaux
- ✅ **2.1.1** Clavier : Navigation complète au clavier avec flèches
- ✅ **2.1.2** Pas de piège clavier : Navigation fluide entre onglets et contenu
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés pour tous les états
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour onglets
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **4.1.2** Nom, rôle, valeur : États ARIA appropriés (aria-selected)

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
<div class="tabs-list"
     @keydown.arrow-right.prevent="nextTab()"
     @keydown.arrow-left.prevent="prevTab()">

// S'assurer que prevent est utilisé pour éviter le scroll
@keydown.arrow-right.prevent="nextTab()"
```

#### Focus non visible sur onglets
```css
/* S'assurer que le focus est bien stylé */
.tab-button:focus {
    outline: 2px solid #007acc;
    outline-offset: 2px;
}

/* Éviter outline: none sans alternative */
.tab-button:focus:not(:focus-visible) {
    outline: none;
}
```

#### Tabindex non géré correctement
```javascript
// Vérifier la logique roving tabindex
:tabindex="activeTab === 0 ? '0' : '-1'"
:tabindex="activeTab === 1 ? '0' : '-1'"

// Seul l'onglet actif doit avoir tabindex="0"
```

#### Contenu des panneaux non associé
```html
<!-- Vérifier les IDs et relations ARIA -->
<button role="tab"
        aria-controls="tabpanel-0"
        id="tab-0">

<div role="tabpanel"
     aria-labelledby="tab-0"
     id="tabpanel-0">
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
- [Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
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