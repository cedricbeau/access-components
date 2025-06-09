# Bibliothèque de Composants Alpine.js Accessibles

Une collection de composants Alpine.js entièrement accessibles, conformes aux standards WCAG 2.1 AA, avec support complet de la navigation au clavier et des lecteurs d'écran.

## 🎯 Objectifs

- **Accessibilité complète** : Conformité WCAG 2.1 AA
- **Navigation clavier** : Support total Tab/Shift+Tab/Enter/Espace
- **Lecteurs d'écran** : Annonces appropriées et sémantique ARIA
- **Simplicité d'usage** : API intuitive et documentation claire
- **Performance** : Composants légers et optimisés

## 📦 Installation

1. Incluez Alpine.js dans votre projet :
```html
<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

2. Copiez les styles CSS et le JavaScript du composant dans votre projet.

3. Ajoutez les conteneurs des composants dans votre HTML.

## 📊 Table Sortable

### Description
Composant de tableau avec tri par colonnes et filtrage en temps réel. Gestion complète de l'accessibilité avec annonces aux lecteurs d'écran, navigation clavier et états ARIA appropriés pour une expérience utilisateur optimale.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="table"`, `role="columnheader"`, `aria-sort`, `aria-live`, `aria-label`
- **Navigation clavier** : Tab/Shift+Tab pour navigation, Enter/Espace pour tri
- **Lecteurs d'écran** : Annonces automatiques de tri et comptage des résultats
- **Focus management** : Indicateurs de focus visibles sur en-têtes cliquables
- **Sémantique** : Structure de tableau avec rôles et labels appropriés
- **Filtrage accessible** : Champ de filtre avec labels descriptifs

### Usage

#### HTML Structure
```html
<div x-data="sortableTable()">
    <!-- Champ de filtrage -->
    <label for="table-filter" class="sr-only">Filtrer les données du tableau</label>
    <input type="text"
           id="table-filter"
           class="table-filter"
           x-model="filter"
           placeholder="Filtrer les données..."
           aria-describedby="filter-help">
    <div id="filter-help" class="sr-only">Tapez pour filtrer les lignes du tableau</div>

    <!-- Conteneur du tableau -->
    <div class="table-container">
        <table class="sortable-table" role="table" aria-label="Données des employés">
            <thead>
                <tr role="row">
                    <template x-for="column in columns" :key="column.key">
                        <th role="columnheader"
                            :aria-sort="getSortState(column.key)"
                            tabindex="0"
                            @click="sort(column.key)"
                            @keydown.enter="sort(column.key)"
                            @keydown.space.prevent="sort(column.key)">
                            <span x-text="column.label"></span>
                            <span class="sort-indicator"
                                  :class="{ 'active': sortColumn === column.key }"
                                  x-text="getSortIcon(column.key)"
                                  aria-hidden="true">
                            </span>
                        </th>
                    </template>
                </tr>
            </thead>
            <tbody>
                <template x-for="row in filteredAndSortedData" :key="row.id">
                    <tr role="row">
                        <td role="cell" x-text="row.nom"></td>
                        <td role="cell" x-text="row.poste"></td>
                        <td role="cell" x-text="row.departement"></td>
                        <td role="cell" x-text="row.salaire"></td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>

    <!-- Annonce du nombre de résultats -->
    <div role="status" aria-live="polite" class="sr-only">
        <span x-text="`${filteredAndSortedData.length} résultats affichés`"></span>
    </div>
</div>
```

#### JavaScript API
```javascript
function sortableTable() {
    return {
        sortColumn: '',
        sortDirection: 'asc',
        filter: '',
        columns: [
            { key: 'nom', label: 'Nom' },
            { key: 'poste', label: 'Poste' },
            { key: 'departement', label: 'Département' },
            { key: 'salaire', label: 'Salaire' }
        ],
        data: [
            { id: 1, nom: 'Marie Dupont', poste: 'Développeuse', departement: 'IT', salaire: '45000€' },
            { id: 2, nom: 'Jean Martin', poste: 'Designer', departement: 'UX', salaire: '42000€' },
            { id: 3, nom: 'Sophie Leroy', poste: 'Chef de projet', departement: 'Management', salaire: '55000€' },
            { id: 4, nom: 'Pierre Dubois', poste: 'Analyste', departement: 'IT', salaire: '40000€' },
            { id: 5, nom: 'Julie Moreau', poste: 'Consultante', departement: 'Business', salaire: '48000€' }
        ],

        // Données filtrées et triées (computed)
        get filteredAndSortedData() {
            let filtered = this.data;

            // Filtrage
            if (this.filter) {
                filtered = filtered.filter(row =>
                    Object.values(row).some(value =>
                        value.toString().toLowerCase().includes(this.filter.toLowerCase())
                    )
                );
            }

            // Tri
            if (this.sortColumn) {
                filtered.sort((a, b) => {
                    let aVal = a[this.sortColumn];
                    let bVal = b[this.sortColumn];

                    // Traitement spécial pour les montants
                    if (this.sortColumn === 'salaire') {
                        aVal = parseInt(aVal.replace(/[€\s]/g, ''));
                        bVal = parseInt(bVal.replace(/[€\s]/g, ''));
                    }

                    if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
                    if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
                    return 0;
                });
            }

            return filtered;
        },

        // Trier par colonne
        sort(column) {
            if (this.sortColumn === column) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortColumn = column;
                this.sortDirection = 'asc';
            }

            const columnLabel = this.columns.find(col => col.key === column).label;
            const direction = this.sortDirection === 'asc' ? 'croissant' : 'décroissant';
            this.announce(`Tableau trié par ${columnLabel} en ordre ${direction}`);
        },

        // État de tri pour ARIA
        getSortState(column) {
            if (this.sortColumn !== column) return 'none';
            return this.sortDirection === 'asc' ? 'ascending' : 'descending';
        },

        // Icône de tri
        getSortIcon(column) {
            if (this.sortColumn !== column) return '↕';
            return this.sortDirection === 'asc' ? '↑' : '↓';
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
// Initialiser avec des données personnalisées
const customData = [
    { id: 1, nom: 'Alice Martin', poste: 'Développeuse Senior', departement: 'IT', salaire: '52000€' },
    { id: 2, nom: 'Bob Dupont', poste: 'Product Owner', departement: 'Product', salaire: '58000€' }
];

// Modifier les données dynamiquement
function updateTableData(newData) {
    // Utiliser avec Alpine.store ou directement dans le composant
    this.data = newData;
}

// Réinitialiser le tri et le filtre
function resetTable() {
    this.sortColumn = '';
    this.sortDirection = 'asc';
    this.filter = '';
}
```

#### Paramètres
- **sortColumn** (string) : Colonne actuellement triée
- **sortDirection** (string) : Direction du tri ('asc' ou 'desc')
- **filter** (string) : Terme de recherche pour le filtrage
- **columns** (array) : Configuration des colonnes avec key et label
- **data** (array) : Données du tableau avec objets contenant un id unique

### Types de configuration
- **Tableau simple** : Données textuelles avec tri alphabétique
- **Tableau avec montants** : Tri numérique pour colonnes de prix/salaires
- **Tableau mixte** : Combinaison de colonnes textuelles et numériques
- **Tableau avec filtrage avancé** : Recherche dans toutes les colonnes

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Tableau principal */
.table-container { --shadow: 0 2px 10px rgba(0,0,0,0.1); --border-radius: 8px; }
.sortable-table { --bg-color: white; --border-color: #eee; }

/* En-têtes */
.sortable-table th { --bg-color: #f8f9fa; --hover-bg: #e9ecef; --font-weight: 600; }
.sort-indicator { --active-color: #4a90e2; --inactive-opacity: 0.5; }

/* Champ de filtre */
.table-filter { --border-color: #ddd; --focus-color: #4a90e2; --border-radius: 4px; }
```

### Classes CSS modifiables
- `.table-container` : Conteneur principal avec scroll horizontal
- `.sortable-table` : Tableau avec bordures et espacement
- `.sort-indicator` : Icônes de tri dans les en-têtes
- `.table-filter` : Champ de recherche/filtrage
- `.sr-only` : Classe pour éléments visibles uniquement aux lecteurs d'écran

## ⌨️ Raccourcis Clavier

### Table Sorter
- **Tab** : Naviguer entre le filtre et les en-têtes de colonnes
- **Shift + Tab** : Navigation inverse
- **Enter/Espace** : Trier la colonne focalisée
- **Caractères** : Saisir dans le champ de filtre (quand focalisé)

## 🔧 Configuration Avancée

### Tableau avec colonnes personnalisées
```javascript
function sortableTable() {
    return {
        sortColumn: '',
        sortDirection: 'asc',
        filter: '',
        columns: [
            { key: 'name', label: 'Nom complet', sortable: true },
            { key: 'email', label: 'Email', sortable: true },
            { key: 'status', label: 'Statut', sortable: false },
            { key: 'created', label: 'Date création', sortable: true, type: 'date' }
        ],

        sort(column) {
            const col = this.columns.find(c => c.key === column);
            if (!col.sortable) return;

            if (this.sortColumn === column) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortColumn = column;
                this.sortDirection = 'asc';
            }

            this.announce(`Tableau trié par ${col.label} en ordre ${this.sortDirection === 'asc' ? 'croissant' : 'décroissant'}`);
        },

        get filteredAndSortedData() {
            let filtered = this.data;

            if (this.filter) {
                filtered = filtered.filter(row =>
                    Object.values(row).some(value =>
                        value.toString().toLowerCase().includes(this.filter.toLowerCase())
                    )
                );
            }

            if (this.sortColumn) {
                const column = this.columns.find(c => c.key === this.sortColumn);
                filtered.sort((a, b) => {
                    let aVal = a[this.sortColumn];
                    let bVal = b[this.sortColumn];

                    // Tri par type de données
                    if (column.type === 'date') {
                        aVal = new Date(aVal);
                        bVal = new Date(bVal);
                    } else if (column.type === 'number') {
                        aVal = parseFloat(aVal);
                        bVal = parseFloat(bVal);
                    }

                    if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
                    if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
                    return 0;
                });
            }

            return filtered;
        }
    }
}
```

### Gestion des événements
```javascript
// Événements personnalisés
function sortableTable() {
    return {
        // ... autres propriétés

        sort(column) {
            // ... logique de tri
            this.$dispatch('table-sorted', { column, direction: this.sortDirection });
        },

        filter: '',

        init() {
            this.$watch('filter', (value) => {
                this.$dispatch('table-filtered', { filter: value, resultCount: this.filteredAndSortedData.length });
            });
        }
    }
}

// Écoute des événements
document.addEventListener('table-sorted', (e) => {
    console.log('Tableau trié:', e.detail.column, e.detail.direction);
});

document.addEventListener('table-filtered', (e) => {
    console.log('Tableau filtré:', e.detail.filter, 'résultats:', e.detail.resultCount);
});
```

### Tableau avec pagination
```javascript
function paginatedSortableTable() {
    return {
        ...sortableTable(),

        currentPage: 1,
        itemsPerPage: 10,

        get paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredAndSortedData.slice(start, end);
        },

        get totalPages() {
            return Math.ceil(this.filteredAndSortedData.length / this.itemsPerPage);
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.announce(`Page ${this.currentPage} sur ${this.totalPages}`);
            }
        },

        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.announce(`Page ${this.currentPage} sur ${this.totalPages}`);
            }
        }
    }
}
```

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.3.1** Information et relations : Structure de tableau avec en-têtes et cellules liés
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Navigation fluide dans le tableau
- ✅ **2.4.3** Ordre de focus : Navigation logique du filtre vers les en-têtes

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés pour tous les éléments
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour filtre et colonnes
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles sur éléments interactifs
- ✅ **4.1.3** Messages de statut : Annonces de tri et comptage des résultats

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran pour annonces de tri
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation et tri au clavier

## 🐛 Dépannage

### Problèmes courants

#### Tri ne fonctionne pas
```javascript
// Vérifier que la colonne existe dans les données
if (!this.data[0].hasOwnProperty(column)) {
    console.error('Colonne inexistante:', column);
    return;
}

// Vérifier le type de données pour le tri
console.log('Type de données:', typeof this.data[0][column]);
```

#### Filtrage trop lent
```javascript
// Optimiser le filtrage avec debounce
let filterTimeout;
filterData() {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => {
        // Logique de filtrage
    }, 300);
}
```

#### Annonces lecteur d'écran non entendues
```javascript
// S'assurer que l'élément announcer est correctement créé
announce(message) {
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'sr-only';
    announcer.textContent = message;
    document.body.appendChild(announcer);

    // Nettoyer après annonce
    setTimeout(() => {
        if (document.body.contains(announcer)) {
            document.body.removeChild(announcer);
        }
    }, 1000);
}
```

#### Performance avec grandes données
```javascript
// Virtualisation pour grandes listes
get visibleData() {
    if (this.data.length > 1000) {
        // Implémenter la virtualisation
        return this.filteredAndSortedData.slice(0, 100);
    }
    return this.filteredAndSortedData;
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
- [Alpine.js Directives](https://alpinejs.dev/directives)

### Standards d'accessibilité
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)

### Patterns ARIA
- [Table Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/)
- [Sortable Table Pattern](https://www.w3.org/WAI/ARIA/apg/example-index/table/sortable-table.html)

## 📄 Licence