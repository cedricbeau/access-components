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

## 🎠 Carousel

### Description
Composant carrousel/slider pour afficher du contenu rotatif avec navigation par boutons, indicateurs et contrôles clavier. Supporte l'auto-play avec pause au survol et annonces pour lecteurs d'écran.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="region"`, `role="tabpanel"`, `role="tablist"`, `aria-label`, `aria-hidden`, `aria-selected`
- **Navigation clavier** : Flèches gauche/droite pour naviguer, Tab pour les contrôles
- **Lecteurs d'écran** : Annonces automatiques des changements de diapositive
- **Focus management** : Focus visible sur les boutons et indicateurs
- **Auto-play intelligent** : Pause automatique au survol et focus
- **Sémantique** : Structure de région avec panneaux et onglets

### Usage

#### HTML Structure
```html
<div class="carousel"
     x-data="carousel()"
     x-init="init()"
     role="region"
     aria-label="Carrousel d'images">

    <div class="carousel-container">
        <template x-for="(slide, index) in slides" :key="index">
            <div class="carousel-slide"
                 :class="{ 'active': index === currentSlide }"
                 role="tabpanel"
                 :aria-label="`Diapositive ${index + 1} sur ${slides.length}`"
                 :aria-hidden="index !== currentSlide"
                 x-text="slide.content">
            </div>
        </template>
    </div>

    <button class="carousel-controls carousel-prev"
            @click="prevSlide()"
            aria-label="Diapositive précédente"
            :disabled="currentSlide === 0">
        ←
    </button>

    <button class="carousel-controls carousel-next"
            @click="nextSlide()"
            aria-label="Diapositive suivante"
            :disabled="currentSlide === slides.length - 1">
        →
    </button>

    <div class="carousel-indicators" role="tablist" aria-label="Indicateurs de diapositives">
        <template x-for="(slide, index) in slides" :key="index">
            <button class="carousel-indicator"
                    :class="{ 'active': index === currentSlide }"
                    @click="goToSlide(index)"
                    role="tab"
                    :aria-selected="index === currentSlide"
                    :aria-label="`Aller à la diapositive ${index + 1}`">
            </button>
        </template>
    </div>
</div>
```

#### JavaScript API
```javascript
function carousel() {
    return {
        currentSlide: 0,
        autoPlayInterval: null,
        slides: [], // Array des diapositives

        // Aller à la diapositive suivante
        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.announceSlide();
        },

        // Aller à la diapositive précédente
        prevSlide() {
            this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
            this.announceSlide();
        },

        // Aller à une diapositive spécifique
        goToSlide(index) {
            this.currentSlide = index;
            this.announceSlide();
        },

        // Démarrer l'auto-play
        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        },

        // Arrêter l'auto-play
        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
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
// Ajouter une diapositive
$data.slides.push({
    content: 'Nouvelle diapositive',
    alt: 'Description de la nouvelle diapositive'
});

// Aller à une diapositive spécifique
$data.goToSlide(2);

// Contrôler l'auto-play
$data.stopAutoPlay();
$data.startAutoPlay();
```

#### Paramètres
- **currentSlide** (number) : Index de la diapositive active (0-based)
- **slides** (array) : Tableau des diapositives avec `content` et `alt`
- **autoPlayInterval** (number|null) : ID de l'intervalle d'auto-play

### Types de configuration
- **Auto-play configurable** : Démarrage/arrêt automatique avec pause intelligente
- **Navigation multiple** : Boutons, indicateurs et clavier
- **Contenu flexible** : Support de texte, HTML ou images

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Couleurs principales */
.carousel { --shadow: 0 4px 15px rgba(0,0,0,0.2); }
.carousel-controls { --bg-color: rgba(0,0,0,0.7); --hover-bg: rgba(0,0,0,0.9); }
.carousel-indicator { --inactive-color: #ccc; --active-color: #4a90e2; }

/* Durées d'animation */
.carousel-slide { transition: opacity 0.5s ease-in-out; }
.carousel-controls { transition: background 0.3s; }
```

### Classes CSS modifiables
- `.carousel` : Conteneur principal
- `.carousel-container` : Zone d'affichage des diapositives
- `.carousel-slide` : Diapositive individuelle
- `.carousel-controls` : Boutons de navigation
- `.carousel-indicators` : Conteneur des indicateurs

## ⌨️ Raccourcis Clavier

### Carousel
- **Flèche gauche** : Diapositive précédente
- **Flèche droite** : Diapositive suivante
- **Tab** : Naviguer vers les contrôles suivants
- **Shift + Tab** : Naviguer vers les contrôles précédents
- **Enter/Espace** : Activer le bouton ou indicateur focalisé

## 🔧 Configuration Avancée

### Structure de données des diapositives
```javascript
// Format complet d'une diapositive
const slideData = {
    content: 'Contenu de la diapositive', // Texte ou HTML
    alt: 'Description alternative', // Pour l'accessibilité
    // Optionnel : données personnalisées
    title: 'Titre de la diapositive',
    image: 'url/vers/image.jpg',
    link: '/lien-vers-page'
}
```

### Gestion des événements
```javascript
// Événements personnalisés
function carousel() {
    return {
        // ... autres propriétés

        nextSlide() {
            this.currentSlide = (this.currentSlide + 1) % this.slides.length;
            this.$dispatch('slide-changed', {
                currentSlide: this.currentSlide,
                slide: this.slides[this.currentSlide]
            });
        },

        goToSlide(index) {
            this.currentSlide = index;
            this.$dispatch('slide-selected', {
                index,
                slide: this.slides[index]
            });
        }
    }
}

// Écoute des événements
document.addEventListener('slide-changed', (e) => {
    console.log('Diapositive changée:', e.detail);
});
```

### Configuration de l'auto-play
```javascript
function carousel(options = {}) {
    return {
        autoPlayDelay: options.autoPlayDelay || 5000,
        autoPlayEnabled: options.autoPlay !== false,

        init() {
            if (this.autoPlayEnabled) {
                this.startAutoPlay();
            }
        },

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayDelay);
        }
    }
}
```

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.1.1** Contenu non textuel : Descriptions alternatives pour toutes les diapositives
- ✅ **1.3.1** Information et relations : Structure de région avec panneaux et onglets
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Focus peut être déplacé librement
- ✅ **2.2.2** Pause, arrêt, masquer : Auto-play se met en pause au survol/focus

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés pour les contrôles
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour tous les contrôles
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles sur tous les éléments
- ✅ **3.2.2** Saisie : Pas de changement de contexte automatique non attendu

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Diapositives ne changent pas
```javascript
// Vérifier que le tableau slides est bien défini
console.log($data.slides); // Ne doit pas être undefined

// Vérifier l'index courant
console.log($data.currentSlide); // Doit être dans la plage valide
```

#### Auto-play ne s'arrête pas
```javascript
// S'assurer que les événements sont bien liés
this.$el.addEventListener('mouseenter', () => this.stopAutoPlay());
this.$el.addEventListener('focusin', () => this.stopAutoPlay());
```

#### Transitions saccadées
```css
/* Optimiser les performances des transitions */
.carousel-slide {
    will-change: opacity;
    backface-visibility: hidden;
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
- [Carousel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
- [Tabpanel Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/)

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