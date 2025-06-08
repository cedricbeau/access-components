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

## 📋 Stepper (Indicateur de progression)

### Description
Composant de navigation par étapes qui guide l'utilisateur à travers un processus séquentiel. Affiche visuellement le progrès et permet la navigation entre les étapes avec des indicateurs d'état clairs (actuel, complété, en attente).

### Fonctionnalités d'accessibilité
- **ARIA** : `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Navigation clavier** : Navigation Tab/Shift+Tab, activation Enter/Espace
- **Lecteurs d'écran** : Annonces du progrès et des changements d'étape
- **Visibilité** : Indicateurs visuels clairs pour chaque état (actuel, complété, en attente)

### Usage

#### HTML Structure
```html
<div x-data="stepper()">
    <div class="stepper" role="progressbar" :aria-valuenow="currentStep + 1" aria-valuemin="1" :aria-valuemax="steps.length">
        <template x-for="(step, index) in steps" :key="index">
            <div class="step"
                    :class="{
                        'active': index === currentStep,
                        'completed': index < currentStep
                    }">
                <div class="step-circle">
                    <span x-show="index < currentStep">✓</span>
                    <span x-show="index >= currentStep" x-text="index + 1"></span>
                </div>
                <div x-text="step.label"></div>
                <div class="step-line"></div>
            </div>
        </template>
    </div>

    <!-- Contrôles de navigation -->
    <div style="margin-top: 2rem; text-align: center;">
        <button class="btn" @click="prevStep()" :disabled="currentStep === 0">Précédent</button>
        <button class="btn" @click="nextStep()" :disabled="currentStep === steps.length - 1">Suivant</button>
    </div>

    <!-- Contenu de l'étape actuelle -->
    <div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 4px;">
        <h3 x-text="steps[currentStep].label"></h3>
        <p x-text="steps[currentStep].content"></p>
    </div>
</div>
```

#### JavaScript API
```javascript
// Navigation entre les étapes
$refs.stepper.nextStep()  // Étape suivante
$refs.stepper.prevStep()  // Étape précédente
$refs.stepper.goToStep(2) // Aller à une étape spécifique (index 2)

// Accès aux propriétés
console.log($refs.stepper.currentStep)  // Index de l'étape actuelle
console.log($refs.stepper.steps)        // Tableau des étapes

// Configuration personnalisée
stepper({
    currentStep: 0,
    steps: [
        { label: 'Informations', content: 'Saisissez vos informations personnelles' },
        { label: 'Configuration', content: 'Configurez vos préférences' },
        { label: 'Validation', content: 'Vérifiez et validez vos données' },
        { label: 'Finalisation', content: 'Confirmez et finalisez' }
    ]
})
```

#### Paramètres de configuration
- **currentStep** (number) : Index de l'étape actuelle (défaut: 0)
- **steps** (array) : Tableau des étapes avec `label` et `content`
  - **label** (string) : Titre de l'étape
  - **content** (string) : Description ou contenu de l'étape

### Méthodes disponibles
- **nextStep()** : Avancer à l'étape suivante
- **prevStep()** : Reculer à l'étape précédente
- **goToStep(index)** : Aller directement à une étape spécifique

### États des étapes
- **En attente** : Étapes non encore atteintes (cercle gris avec numéro)
- **Actuelle** : Étape en cours (cercle bleu avec numéro)
- **Complétée** : Étapes déjà franchies (cercle vert avec coche ✓)

### Comportement de navigation
- **Navigation séquentielle** : Étapes suivies dans l'ordre
- **Boutons disabled** : Précédent désactivé sur la première étape, Suivant sur la dernière
- **Progression visuelle** : Lignes de connexion colorées selon l'état

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Conteneur stepper */
.stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0;
}

/* Cercles d'étape */
.step-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f0f0f0;
    border: 2px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

/* États des étapes */
.step.active .step-circle {
    background: #007acc;
    color: white;
    border-color: #007acc;
}

.step.completed .step-circle {
    background: #28a745;
    color: white;
    border-color: #28a745;
}

/* Lignes de connexion */
.step-line {
    position: absolute;
    top: 20px;
    left: 50%;
    width: 100%;
    height: 2px;
    background: #ddd;
    z-index: -1;
}

.step.completed .step-line {
    background: #28a745;
}
```

### Classes CSS modifiables
- `.stepper` : Conteneur principal
- `.step` : Conteneur d'une étape
- `.step-circle` : Cercle indicateur d'étape
- `.step-line` : Ligne de connexion entre étapes
- `.step.active` : Étape actuelle
- `.step.completed` : Étape complétée

## ⌨️ Raccourcis Clavier

### Stepper
- **Tab/Shift+Tab** : Navigation entre les boutons de contrôle
- **Enter/Espace** : Activer les boutons Précédent/Suivant
- **Flèche droite** : Étape suivante (optionnel)
- **Flèche gauche** : Étape précédente (optionnel)

### Navigation
- **Boutons désactivés** : Automatiquement ignorés dans la navigation clavier
- **Focus visible** : Indicateurs de focus sur tous les éléments interactifs

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.1.1** Contenu non textuel : Icônes avec signification claire (✓ pour complété)
- ✅ **1.3.1** Information et relations : Structure sémantique avec progressbar
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Focus peut être déplacé librement
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés (4.5:1 minimum)
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour chaque étape
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **3.2.2** Saisie : Changements d'état prévisibles et cohérents

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Alignement responsive
```css
/* Améliorer l'affichage sur mobile */
@media (max-width: 768px) {
    .stepper {
        flex-direction: column;
        gap: 1rem;
    }

    .step-line {
        display: none;
    }
}
```

#### Gestion des étapes dynamiques
```javascript
// Ajouter/supprimer des étapes dynamiquement
addStep(label, content) {
    this.steps.push({ label, content });
},

removeStep(index) {
    if (this.steps.length > 1 && index >= 0 && index < this.steps.length) {
        this.steps.splice(index, 1);
        if (this.currentStep >= this.steps.length) {
            this.currentStep = this.steps.length - 1;
        }
    }
}
```

#### Validation des étapes
```javascript
// Ajouter validation avant changement d'étape
nextStep() {
    if (this.validateCurrentStep() && this.currentStep < this.steps.length - 1) {
        this.currentStep++;
    }
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
- [Progressbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/progressbar/)
- [Step Indicator Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/stepindicator/)

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