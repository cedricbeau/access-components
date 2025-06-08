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

## 🔔 Toast Notifications

### Description
Notifications temporaires qui apparaissent en overlay, généralement en haut à droite de l'écran. Elles disparaissent automatiquement après un délai configurable.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="alert"`, `aria-live="polite"`, `aria-labelledby`, `aria-describedby`
- **Navigation clavier** : Bouton de fermeture focusable avec Tab
- **Lecteurs d'écran** : Annonce automatique du contenu lors de l'apparition
- **Focus management** : Pas de piège de focus (permet la navigation continue)

### Usage

#### HTML Structure
```html
<div x-data="toastManager()" x-ref="toastManager" class="toast-container" aria-live="polite" aria-label="Notifications">
    <template x-for="toast in toasts" :key="toast.id">
        <div
            :class="['toast', toast.type, { 'show': toast.visible }]"
            role="alert"
            :aria-labelledby="'toast-title-' + toast.id"
            :aria-describedby="'toast-message-' + toast.id"
            x-show="toast.visible"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="transform translate-x-full opacity-0"
            x-transition:enter-end="transform translate-x-0 opacity-100"
            x-transition:leave="transition ease-in duration-200"
            x-transition:leave-start="transform translate-x-0 opacity-100"
            x-transition:leave-end="transform translate-x-full opacity-0"
        >
            <div class="toast-header">
                <h3 :id="'toast-title-' + toast.id" class="toast-title" x-text="toast.title"></h3>
                <button
                    class="toast-close"
                    @click="hideToast(toast.id)"
                    :aria-label="'Fermer la notification ' + toast.title"
                    type="button"
                >
                    ×
                </button>
            </div>
            <p :id="'toast-message-' + toast.id" class="toast-message" x-text="toast.message"></p>
        </div>
    </template>
</div>
```

#### JavaScript API
```javascript
// Afficher un toast
$refs.toastManager.showToast(type, title, message, duration)

// Exemples
$refs.toastManager.showToast('success', 'Succès !', 'Opération réalisée.', 5000)
$refs.toastManager.showToast('error', 'Erreur !', 'Une erreur est survenue.')
$refs.toastManager.showToast('warning', 'Attention !', 'Vérifiez vos données.')
$refs.toastManager.showToast('info', 'Information', 'Mise à jour disponible.')

// Fermer manuellement un toast
$refs.toastManager.hideToast(toastId)
```

#### Paramètres
- **type** (string) : `'success'`, `'error'`, `'warning'`, `'info'`
- **title** (string) : Titre du toast
- **message** (string) : Message descriptif
- **duration** (number, optionnel) : Durée en ms avant auto-fermeture (défaut: 5000)

### Types disponibles
- **success** : Bordure verte, pour les actions réussies
- **error** : Bordure rouge, pour les erreurs
- **warning** : Bordure orange, pour les avertissements
- **info** : Bordure bleue, pour les informations

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Couleurs par type */
.toast.success { --color: #10b981; }
.toast.error { --color: #ef4444; }
.toast.warning{ --color: #f59e0b; }
.toast.info { --color: #3b82f6; }

/* Durées d'animation */
.toast { transition: all 0.3s ease; }
```

### Classes CSS modifiables
- `.toast-container` : Positionnement des toasts
- `.btn` : Style des boutons

## ⌨️ Raccourcis Clavier

### Toasts
- **Tab** : Navigation vers le bouton de fermeture
- **Enter/Espace** : Fermer le toast

## 🔧 Configuration Avancée

### Durées personnalisées
```javascript
// Toast avec durée personnalisée (0 = pas d'auto-fermeture)
$refs.toastManager.showToast('info', 'Titre', 'Message', 10000) // 10 secondes
$refs.toastManager.showToast('error', 'Erreur', 'Message', 0) // Permanent
```

### Gestion des événements
```javascript
// ID de retour pour gestion personnalisée
const toastId = $refs.toastManager.showToast('info', 'Titre', 'Message');
setTimeout(() => {
    $refs.toastManager.hideToast(toastId);
}, 3000);
```

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.1.1** Contenu non textuel : Images décoratives marquées `aria-hidden="true"`
- ✅ **1.3.1** Information et relations : Structure sémantique avec headings appropriés
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Focus peut être déplacé librement (sauf dialogs)
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés (4.5:1 minimum)
- ✅ **2.4.6** En-têtes et étiquettes : Titres descriptifs pour chaque composant
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **3.2.2** Saisie : Pas de changement de contexte automatique non attendu

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Toast n'apparaît pas
```javascript
// Vérifier que le conteneur est présent
console.log($refs.toastManager); // Ne doit pas être undefined

// Vérifier la structure HTML
// Le conteneur doit avoir x-data="toastManager()" et x-ref="toastManager"
```

#### Animations saccadées
```css
/* Ajouter will-change pour optimiser les performances */
.toast {
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

### Standards d'accessibilité
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)

### Patterns ARIA
- [Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

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