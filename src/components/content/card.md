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

2. Copiez les styles CSS et le JavaScript du composant dans votre projet.

3. Ajoutez les conteneurs des composants dans votre HTML.

## 🃏 Card

### Description
Composant carte pour afficher du contenu structuré avec image, titre, description et actions. Supporte la grille responsive et l'interaction complète au clavier.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="article"`, `aria-labelledby`, `aria-describedby`, `role="group"`
- **Navigation clavier** : Tab pour naviguer entre les cartes, Enter/Espace pour sélectionner
- **Lecteurs d'écran** : Annonces automatiques des sélections et actions
- **Focus management** : Focus visible sur les cartes et boutons d'action
- **Sémantique** : Structure d'article avec titre et description liés

### Usage

#### HTML Structure
```html
<div x-data="cardGrid()">
    <div class="card-grid">
        <template x-for="card in cards" :key="card.id">
            <article class="card"
                     role="article"
                     tabindex="0"
                     :aria-labelledby="`card-title-${card.id}`"
                     :aria-describedby="`card-desc-${card.id}`"
                     @click="selectCard(card)"
                     @keydown.enter="selectCard(card)"
                     @keydown.space.prevent="selectCard(card)">

                <div class="card-image"
                     role="img"
                     :aria-label="card.imageAlt">
                     <span x-text="card.imageText"></span>
                </div>

                <div class="card-content">
                    <h3 class="card-title"
                        :id="`card-title-${card.id}`"
                        x-text="card.title">
                    </h3>

                    <p class="card-description"
                       :id="`card-desc-${card.id}`"
                       x-text="card.description">
                    </p>

                    <div class="card-actions" role="group" :aria-label="`Actions pour ${card.title}`">
                        <button class="btn btn-primary"
                                @click.stop="primaryAction(card)"
                                :aria-label="`Voir les détails de ${card.title}`">
                            Voir détails
                        </button>
                        <button class="btn btn-secondary"
                                @click.stop="secondaryAction(card)"
                                :aria-label="`Partager ${card.title}`">
                            Partager
                        </button>
                    </div>
                </div>
            </article>
        </template>
    </div>

    <div role="status" aria-live="polite" class="sr-only">
        <span x-show="selectedCard" x-text="selectedCard ? `Carte sélectionnée: ${selectedCard.title}` : ''"></span>
    </div>
</div>
```

#### JavaScript API
```javascript
function cardGrid() {
    return {
        selectedCard: null,
        cards: [], // Array des cartes

        // Sélectionner une carte
        selectCard(card) {
            this.selectedCard = card;
            this.announce(`Carte sélectionnée: ${card.title}`);
        },

        // Action principale (bouton primaire)
        primaryAction(card) {
            this.announce(`Affichage des détails pour ${card.title}`);
        },

        // Action secondaire (bouton secondaire)
        secondaryAction(card) {
            this.announce(`Partage de ${card.title}`);
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
// Ajouter une carte
$data.cards.push({
    id: 4,
    title: 'Nouveau projet',
    description: 'Description du projet',
    imageText: '✨',
    imageAlt: 'Description de l\'image'
})

// Sélectionner une carte par ID
const card = $data.cards.find(c => c.id === 1);
$data.selectCard(card);
```

#### Paramètres
- **card** (object) : Objet carte avec `id`, `title`, `description`, `imageText`, `imageAlt`
- **selectedCard** (object|null) : Carte actuellement sélectionnée

### Types de configuration
- **Grille responsive** : S'adapte automatiquement à la taille d'écran
- **Actions personnalisables** : Boutons d'action configurables par carte
- **Images flexibles** : Support d'icônes, texte ou images réelles

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Couleurs principales */
.card { --bg-color: white; --shadow: 0 2px 10px rgba(0,0,0,0.1); }
.card:hover { --shadow-hover: 0 4px 20px rgba(0,0,0,0.15); }
.card-title { --text-color: #2c3e50; }
.card-description { --text-color: #666; }

/* Durées d'animation */
.card { transition: transform 0.3s, box-shadow 0.3s; }
```

### Classes CSS modifiables
- `.card-grid` : Grille des cartes
- `.card` : Conteneur de carte
- `.card-image` : Zone d'image
- `.card-content` : Zone de contenu
- `.card-actions` : Zone d'actions

## ⌨️ Raccourcis Clavier

### Card
- **Tab** : Naviguer vers la carte suivante
- **Shift + Tab** : Naviguer vers la carte précédente
- **Enter/Espace** : Sélectionner la carte
- **Tab** (dans une carte) : Naviguer entre les boutons d'action

## 🔧 Configuration Avancée

### Structure de données des cartes
```javascript
// Format complet d'une carte
const cardData = {
    id: 1, // Identifiant unique
    title: 'Titre de la carte',
    description: 'Description détaillée',
    imageText: '🚀', // Emoji ou texte pour l'image
    imageAlt: 'Description alternative de l\'image',
    // Optionnel : données personnalisées
    category: 'projet',
    priority: 'high',
    customActions: ['edit', 'delete']
}
```

### Gestion des événements
```javascript
// Événements personnalisés
function cardGrid() {
    return {
        // ... autres propriétés

        selectCard(card) {
            this.selectedCard = card;
            this.$dispatch('card-selected', { card });
        },

        primaryAction(card) {
            this.$dispatch('card-primary-action', { card });
        }
    }
}

// Écoute des événements
document.addEventListener('card-selected', (e) => {
    console.log('Carte sélectionnée:', e.detail.card);
});
```

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.1.1** Contenu non textuel : Images avec `aria-label` approprié
- ✅ **1.3.1** Information et relations : Structure d'article avec liens sémantiques
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Focus peut être déplacé librement
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés (4.5:1 minimum)
- ✅ **2.4.6** En-têtes et étiquettes : Titres descriptifs pour chaque carte
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **3.2.2** Saisie : Pas de changement de contexte automatique non attendu

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Cartes ne s'affichent pas
```javascript
// Vérifier que le tableau cards est bien défini
console.log($data.cards); // Ne doit pas être undefined

// Vérifier la structure des données
// Chaque carte doit avoir un id unique
```

#### Animations saccadées
```css
/* Ajouter will-change pour optimiser les performances */
.card {
    will-change: transform, box-shadow;
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
- [Article Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/article/)

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