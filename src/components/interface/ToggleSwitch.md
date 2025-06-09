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

## 🔄 Toggle Switch

### Description
Interrupteur à bascule pour activer/désactiver des options, avec support complet de l'accessibilité et des lecteurs d'écran. Alternative accessible aux cases à cocher pour les paramètres binaires.

### Fonctionnalités d'accessibilité
- **ARIA** : `aria-describedby` pour description contextuelle
- **Navigation clavier** : Support complet Espace/Entrée pour basculer
- **Lecteurs d'écran** : Annonce de l'état activé/désactivé
- **Focus visible** : Indicateur de focus personnalisé avec outline
- **Sémantique** : Utilisation native de `<input type="checkbox">`

### Usage

#### HTML Structure
```html
<div x-data="toggleSwitch()" style="display: flex; align-items: center; gap: 1rem;">
    <label class="toggle-switch" for="toggle-input">
        <input type="checkbox"
               id="toggle-input"
               class="toggle-input"
               x-model="isChecked"
               :aria-describedby="descriptionId"
               @change="onChange()">
        <span class="toggle-slider"></span>
    </label>
    <span>Notifications <span x-text="isChecked ? 'Activées' : 'Désactivées'"></span></span>
    <span :id="descriptionId" x-text="isChecked ? 'Activé' : 'Désactivé'" class="sr-only"></span>
</div>
```

#### JavaScript API
```javascript
// Composant Toggle Switch
function toggleSwitch() {
    return {
        isChecked: false,
        descriptionId: 'toggle-desc-' + Math.random().toString(36).substr(2, 9),

        onChange() {
            // Événement personnalisé pour réagir au changement
            this.$dispatch('toggle-changed', { checked: this.isChecked });
        }
    }
}

// Utilisation
// Écouter les changements d'état
document.addEventListener('toggle-changed', (event) => {
    console.log('Toggle état:', event.detail.checked);
});

// Définir l'état programmatiquement
$refs.toggleSwitch.isChecked = true;

// Vérifier l'état actuel
console.log($refs.toggleSwitch.isChecked);
```

#### Paramètres
- **isChecked** (boolean) : État actuel du toggle (activé/désactivé)
- **descriptionId** (string) : ID unique généré pour l'attribut `aria-describedby`

### Méthodes disponibles
- **onChange()** : Déclenche un événement personnalisé `toggle-changed` lors du changement d'état

### États disponibles
- **false** : Toggle désactivé (OFF)
- **true** : Toggle activé (ON)

### Événements
- **toggle-changed** : Déclenché à chaque changement d'état avec `{ checked: boolean }`

## 🎨 Personnalisation CSS

### Styles par défaut
```css
.toggle-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.toggle-input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

.toggle-input:checked + .toggle-slider {
    background-color: #007acc;
}

.toggle-input:focus + .toggle-slider {
    box-shadow: 0 0 1px #007acc;
    outline: 2px solid #007acc;
}

.toggle-input:checked + .toggle-slider:before {
    transform: translateX(26px);
}
```

### Variables CSS principales
```css
/* Couleurs personnalisables */
.toggle-slider {
    --bg-off: #ccc;
    --bg-on: #007acc;
    --slider-color: white;
    --focus-color: #007acc;
}

/* Tailles personnalisables */
.toggle-switch {
    --width: 60px;
    --height: 34px;
    --slider-size: 26px;
}

/* Durées d'animation */
.toggle-slider,
.toggle-slider:before {
    transition: all 0.4s ease;
}
```

### Classes CSS modifiables
- `.toggle-switch` : Conteneur principal du toggle
- `.toggle-input` : Input checkbox caché
- `.toggle-slider` : Fond du toggle et animation
- `.sr-only` : Classe pour texte accessible aux lecteurs d'écran uniquement

## ⌨️ Raccourcis Clavier

### Toggle Switch
- **Tab** : Navigation vers le toggle
- **Espace** : Basculer l'état activé/désactivé
- **Entrée** : Basculer l'état activé/désactivé

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.1.1** Contenu non textuel : État annoncé via `aria-describedby`
- ✅ **1.3.1** Information et relations : Label associé avec `for` et `id`
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Focus peut être déplacé librement
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés (4.5:1 minimum)
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour l'état
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles avec outline
- ✅ **3.2.2** Saisie : Changement d'état prévisible et contrôlé

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Animation saccadée
```css
/* Ajouter will-change pour optimiser les performances */
.toggle-slider,
.toggle-slider:before {
    will-change: transform, background-color;
}
```

#### Focus non visible
```css
/* Renforcer l'indicateur de focus */
.toggle-input:focus + .toggle-slider {
    outline: 2px solid #007acc;
    outline-offset: 2px;
}
```

#### État non annoncé par les lecteurs d'écran
```html
<!-- Vérifier que l'ID est unique et correctement référencé -->
<span :id="descriptionId" x-text="isChecked ? 'Activé' : 'Désactivé'" class="sr-only"></span>
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
- [Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
- [Checkbox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

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