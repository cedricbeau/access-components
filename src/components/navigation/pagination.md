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

## 📄 Pagination

### Description
Composant de navigation entre les pages d'un contenu paginé. Permet de naviguer efficacement dans de grandes collections de données avec support des raccourcis clavier et annonces pour les lecteurs d'écran.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="navigation"`, `aria-label`, `aria-current`, `aria-live`
- **Navigation clavier** : Flèches directionnelles, Home/End pour navigation rapide
- **Lecteurs d'écran** : Annonces des changements de page et état actuel
- **Visibilité** : Informations contextuelles sur la position actuelle

### Usage

#### HTML Structure
```html
<div x-data="pagination()" x-init="init()">
    <!-- Navigation de pagination -->
    <nav aria-label="Navigation de pagination" role="navigation">
        <div class="pagination-info" aria-live="polite" aria-atomic="true">
            Page <span x-text="currentPage"></span> sur <span x-text="totalPages"></span>
            (Total: <span x-text="totalItems"></span> éléments)
        </div>

        <ul class="pagination" role="list">
            <!-- Bouton Précédent -->
            <li>
                <button
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    :aria-label="`Aller à la page précédente (page ${currentPage - 1})`"
                    class="pagination-button"
                    type="button">
                    « Précédent
                </button>
            </li>

            <!-- Pages -->
            <template x-for="page in visiblePages" :key="page">
                <li>
                    <button
                        @click="goToPage(page)"
                        :class="{'pagination-button': true, 'current': page === currentPage}"
                        :aria-label="page === currentPage ? `Page courante, page ${page}` : `Aller à la page ${page}`"
                        :aria-current="page === currentPage ? 'page' : null"
                        type="button"
                        x-text="page">
                    </button>
                </li>
            </template>

            <!-- Bouton Suivant -->
            <li>
                <button
                    @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    :aria-label="`Aller à la page suivante (page ${currentPage + 1})`"
                    class="pagination-button"
                    type="button">
                    Suivant »
                </button>
            </li>
        </ul>
    </nav>
</div>
```

#### JavaScript API
```javascript
// Initialiser la pagination
function pagination() {
    return {
        currentPage: 1,
        totalPages: 10,
        totalItems: 95,
        itemsPerPage: 10,
        maxVisiblePages: 5,

        // Aller à une page spécifique
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
                this.currentPage = page;
                this.announcePageChange();
            }
        }
    }
}

// Exemples d'utilisation
// Navigation programmatique
$refs.pagination.goToPage(5)

// Configuration personnalisée
pagination({
    totalPages: 20,
    totalItems: 200,
    itemsPerPage: 10,
    maxVisiblePages: 7
})
```

#### Paramètres de configuration
- **currentPage** (number) : Page actuellement sélectionnée (défaut: 1)
- **totalPages** (number) : Nombre total de pages
- **totalItems** (number) : Nombre total d'éléments
- **itemsPerPage** (number) : Nombre d'éléments par page (défaut: 10)
- **maxVisiblePages** (number) : Nombre maximum de pages visibles (défaut: 5)

### Méthodes disponibles
- **goToPage(pageNumber)** : Navigation vers une page spécifique
- **announcePageChange()** : Annonce le changement pour les lecteurs d'écran
- **handleKeyNavigation(event)** : Gestion de la navigation clavier

### Comportement de navigation
- **Pages visibles** : Affichage intelligent des pages autour de la page courante
- **Boutons de navigation** : Précédent/Suivant avec états disabled appropriés
- **Annonces live** : Notification des changements de page pour les lecteurs d'écran

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Styles de base */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 20px 0;
}

.pagination-button {
    padding: 8px 12px;
    border: 1px solid #ddd;
    background: white;
    color: #333;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.pagination-button.current {
    background: #007acc;
    color: white;
    border-color: #007acc;
}

.pagination-info {
    text-align: center;
    color: #666;
}
```

### Classes CSS modifiables
- `.pagination` : Conteneur de la pagination
- `.pagination-button` : Style des boutons de page
- `.pagination-button.current` : Style de la page courante
- `.pagination-info` : Informations contextuelles

## ⌨️ Raccourcis Clavier

### Pagination
- **Tab/Shift+Tab** : Navigation entre les boutons
- **Flèche gauche** : Page précédente dans la liste
- **Flèche droite** : Page suivante dans la liste
- **Home** : Premier bouton de pagination
- **End** : Dernier bouton de pagination
- **Enter/Espace** : Aller à la page sélectionnée

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.1.1** Contenu non textuel : Boutons avec labels appropriés
- ✅ **1.3.1** Information et relations : Structure de navigation sémantique
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Focus peut être déplacé librement
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés (4.5:1 minimum)
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour chaque bouton
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **3.2.2** Saisie : Changements de contexte appropriés et annoncés

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Performance avec nombreuses pages
```javascript
// Optimiser pour de nombreuses pages
const pagination = {
    maxVisiblePages: 5, // Limiter les pages visibles
    // Utiliser la pagination côté serveur pour de gros datasets
}
```

#### Focus management
```css
/* Améliorer la visibilité du focus */
.pagination-button:focus {
    outline: 2px solid #007acc;
    outline-offset: 2px;
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
- [Pagination Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/pagination/)
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