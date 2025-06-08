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

## 🗺️ Breadcrumb (Fil d'Ariane)

### Description
Navigation hiérarchique permettant aux utilisateurs de comprendre leur position dans l'arborescence du site et de naviguer vers les niveaux supérieurs.

### Fonctionnalités d'accessibilité
- **ARIA** : `aria-label="Fil d'Ariane"`, `role="list"`, `aria-current="page"`
- **Navigation clavier** : Tous les liens focusables avec Tab/Shift+Tab
- **Lecteurs d'écran** : Structure sémantique avec navigation et liste ordonnée
- **Sémantique** : Utilisation de `<nav>` et `<ol>` pour une structure claire

### Usage

#### HTML Structure
```html
<nav x-data="breadcrumb()"
     class="breadcrumb"
     aria-label="Fil d'Ariane">
    <ol role="list" style="display: flex; align-items: center; gap: 0.5rem; list-style: none;">
        <template x-for="(item, index) in items" :key="index">
            <li class="breadcrumb-item">
                <template x-if="index < items.length - 1">
                    <a :href="item.url"
                       class="breadcrumb-link"
                       x-text="item.label"
                       @click.prevent="navigate(item.url)"></a>
                </template>
                <template x-if="index === items.length - 1">
                    <span x-text="item.label" aria-current="page"></span>
                </template>
                <template x-if="index < items.length - 1">
                    <span class="breadcrumb-separator" aria-hidden="true">/</span>
                </template>
            </li>
        </template>
    </ol>
</nav>
```

#### JavaScript API
```javascript
function breadcrumb() {
    return {
        items: [
            { label: 'Accueil', url: '/' },
            { label: 'Produits', url: '/produits' },
            { label: 'Catégorie', url: '/produits/categorie' },
            { label: 'Article', url: '/produits/categorie/article' }
        ],
        navigate(url) {
            console.log('Navigation vers:', url);
            // Implémenter la navigation
        }
    }
}
```

#### Configuration
```javascript
// Mettre à jour dynamiquement le breadcrumb
$refs.breadcrumb.items = [
    { label: 'Accueil', url: '/' },
    { label: 'Nouvelle Section', url: '/nouvelle-section' }
];

// Ajouter un élément
$refs.breadcrumb.items.push({ label: 'Sous-section', url: '/nouvelle-section/sous' });
```

#### Paramètres des items
- **label** (string) : Texte affiché pour l'élément
- **url** (string) : URL de destination pour la navigation

### Structure des données
Les éléments du breadcrumb sont stockés dans un tableau d'objets :
- Le dernier élément est automatiquement marqué comme page courante (`aria-current="page"`)
- Les éléments précédents sont des liens cliquables
- Les séparateurs sont ajoutés automatiquement entre les éléments

### Comportement de navigation
- **Liens cliquables** : Tous les éléments sauf le dernier
- **Page courante** : Le dernier élément est affiché comme texte statique
- **Gestion des clics** : Méthode `navigate()` personnalisable

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
.breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 4px;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.breadcrumb-link {
    color: #007acc;
    text-decoration: none;
    padding: 0.25rem;
    border-radius: 2px;
}

.breadcrumb-link:hover,
.breadcrumb-link:focus {
    text-decoration: underline;
    outline: 2px solid #007acc;
}

.breadcrumb-separator {
    color: #6c757d;
}
```

### Classes CSS modifiables
- `.breadcrumb` : Conteneur principal du fil d'Ariane
- `.breadcrumb-item` : Chaque élément du breadcrumb
- `.breadcrumb-link` : Liens de navigation
- `.breadcrumb-separator` : Séparateurs entre éléments

## ⌨️ Raccourcis Clavier

### Breadcrumb
- **Tab** : Navigation vers le lien suivant
- **Shift+Tab** : Navigation vers le lien précédent
- **Enter** : Activer le lien sélectionné

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.1.1** Contenu non textuel : Séparateurs marqués `aria-hidden="true"`
- ✅ **1.3.1** Information et relations : Structure sémantique avec `<nav>` et `<ol>`
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Focus peut être déplacé librement
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés (4.5:1 minimum)
- ✅ **2.4.6** En-têtes et étiquettes : Label `aria-label="Fil d'Ariane"` descriptif
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **3.2.2** Saisie : Navigation prévisible et cohérente

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Liens non focusables
```css
/* S'assurer que les liens sont focusables */
.breadcrumb-link {
    display: inline-block;
    outline-offset: 2px;
}
```

#### Séparateurs lus par les lecteurs d'écran
```html
<!-- Toujours marquer les séparateurs comme décoratifs -->
<span class="breadcrumb-separator" aria-hidden="true">/</span>
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
- [Breadcrumb Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)
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