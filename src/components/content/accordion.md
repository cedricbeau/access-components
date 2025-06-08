# Bibliothèque de Composants Alpine.js Accessibles

Une collection de composants Alpine.js entièrement accessibles, conformes aux standards WCAG 2.1 AA, avec support complet de la navigation au clavier et des lecteurs d'écran.

## 🎯 Objectifs

- **Accessibilité complète** : Conformité WCAG 2.1 AA
- **Navigation clavier** : Support total Tab/Shift+Tab/Escape
- **Lecteurs d'écran** : Annonces appropriées et sémantique ARIA
- **Simplicité d'usage** : API intuitive et documentation claire
- **Performance** : Composants légers et optimisés

## 📦 Installation

1. Incluez Alpine.js et le plugin Collapse dans votre projet :
```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/collapse@3.x.x/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

2. Copiez les styles CSS et le JavaScript du composant dans votre projet.

3. Ajoutez les conteneurs des composants dans votre HTML.

## 🎨 Accordion

### Description
Composant accordéon permettant d'afficher/masquer des sections de contenu. Supporte l'ouverture multiple de sections et offre une navigation clavier complète.

### Fonctionnalités d'accessibilité
- **ARIA** : `aria-expanded`, `aria-controls`, `aria-labelledby`, `role="region"`
- **Navigation clavier** : Tab pour naviguer entre les en-têtes, Enter/Espace pour ouvrir/fermer
- **Lecteurs d'écran** : Relations sémantiques entre en-têtes et contenus
- **Focus management** : Indicateurs de focus visibles et navigation logique
- **États visuels** : Rotation d'icône pour indiquer l'état ouvert/fermé

### Usage

#### HTML Structure
```html
<div x-data="accordion()" class="accordion">
    <div class="accordion-item">
        <button class="accordion-header"
                @click="toggle(0)"
                :aria-expanded="isOpen(0)"
                aria-controls="panel-0"
                id="heading-0">
            <span>Titre de la section</span>
            <span class="accordion-icon" :class="{ 'rotated': isOpen(0) }">▼</span>
        </button>
        <div x-show="isOpen(0)"
                x-collapse
                class="accordion-content"
                role="region"
                aria-labelledby="heading-0"
                id="panel-0">
            <p>Contenu de la section de l'accordéon.</p>
        </div>
    </div>

    <!-- Répéter pour chaque section avec des index incrémentés -->
</div>
```

#### JavaScript API
```javascript
function accordion() {
    return {
        openItems: [], // Array des sections ouvertes

        // Basculer l'état d'une section
        toggle(index) {
            if (this.isOpen(index)) {
                this.openItems = this.openItems.filter(i => i !== index);
            } else {
                this.openItems.push(index);
            }
        },

        // Vérifier si une section est ouverte
        isOpen(index) {
            return this.openItems.includes(index);
        }
    }
}

// Exemples d'utilisation
// Ouvrir/fermer une section
$el.toggle(0) // Bascule la première section

// Vérifier l'état d'une section
$el.isOpen(0) // Retourne true si la section 0 est ouverte
```

#### Paramètres
- **index** (number) : Index de la section à manipuler (commence à 0)

### Types de configuration
- **Accordéon multiple** : Plusieurs sections peuvent être ouvertes simultanément
- **Accordéon exclusif** : Une seule section ouverte à la fois
- **Section par défaut** : Possibilité d'avoir une section ouverte au chargement

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Couleurs principales */
.accordion { --border-color: #ddd; }
.accordion-header { --bg-color: #f8f9fa; --hover-bg: #e9ecef; }
.accordion-content { --bg-color: white; }

/* Durées d'animation */
.accordion-icon { transition: transform 0.3s; }
```

### Classes CSS modifiables
- `.accordion` : Conteneur principal
- `.accordion-item` : Élément de section
- `.accordion-header` : Bouton d'en-tête
- `.accordion-content` : Zone de contenu

## ⌨️ Raccourcis Clavier

### Accordion
- **Tab** : Naviguer vers l'en-tête suivant
- **Shift + Tab** : Naviguer vers l'en-tête précédent
- **Enter/Espace** : Ouvrir/fermer la section

## 🔧 Configuration Avancée

### Variantes d'accordéon
```javascript
// Accordéon à section unique (exclusif)
function accordion() {
    return {
        openItem: null, // Une seule section ouverte

        toggle(index) {
            this.openItem = this.openItem === index ? null : index;
        },

        isOpen(index) {
            return this.openItem === index;
        }
    }
}

// Accordéon avec section ouverte par défaut
function accordion() {
    return {
        openItems: [0], // Section 0 ouverte par défaut
        // ... reste du code identique
    }
}
```

### Gestion des événements
```javascript
// Événements personnalisés
function accordion() {
    return {
        openItems: [],

        toggle(index) {
            const wasOpen = this.isOpen(index);

            if (wasOpen) {
                this.openItems = this.openItems.filter(i => i !== index);
                this.$dispatch('accordion-closed', { index });
            } else {
                this.openItems.push(index);
                this.$dispatch('accordion-opened', { index });
            }
        },

        isOpen(index) {
            return this.openItems.includes(index);
        }
    }
}
```

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.3.1** Information et relations : Structure sémantique avec boutons et régions appropriés
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Focus peut être déplacé librement
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation
- ✅ **4.1.2** Nom, rôle, valeur : Éléments correctement exposés aux technologies d'assistance

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés (4.5:1 minimum)
- ✅ **2.4.6** En-têtes et étiquettes : Titres descriptifs pour chaque section
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **3.2.2** Saisie : Pas de changement de contexte automatique non attendu

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Accordion ne s'ouvre pas
```javascript
// Vérifier que la fonction accordion() est bien définie
console.log($data); // Ne doit pas être undefined

// Vérifier la structure HTML
// Chaque section doit avoir un index unique (0, 1, 2...)
```

#### Animations saccadées
```css
/* Ajouter will-change pour optimiser les performances */
.accordion-content {
    will-change: transform, opacity;
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
- [Alpine.js Collapse Plugin](https://alpinejs.dev/plugins/collapse)

### Standards d'accessibilité
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)

### Patterns ARIA
- [Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

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