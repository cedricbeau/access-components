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

## 💬 Dialog de Confirmation

### Description
Boîtes de dialogue modales pour demander confirmation d'une action (oui/non). Bloquent l'interaction avec le reste de la page jusqu'à la réponse.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`
- **Navigation clavier** : Tab/Shift+Tab, Escape pour fermer
- **Focus management** : Piège de focus (`x-trap`), restauration du focus précédent
- **Lecteurs d'écran** : Annonce du contenu et du contexte modal

### Usage

#### HTML Structure
```html
<div x-data="confirmDialog()" x-ref="confirmDialog">
    <div
        x-show="isOpen"
        class="dialog-overlay"
        :class="{ 'show': isOpen }"
        role="dialog"
        :aria-labelledby="dialogId + '-title'"
        :aria-describedby="dialogId + '-message'"
        aria-modal="true"
        x-trap="isOpen"
        @keydown.escape="cancel()"
        @click.self="cancel()"
        x-transition:enter="transition ease-out duration-200"
        x-transition:enter-start="opacity-0"
        x-transition:enter-end="opacity-100"
        x-transition:leave="transition ease-in duration-200"
        x-transition:leave-start="opacity-100"
        x-transition:leave-end="opacity-0"
    >
        <div class="dialog">
            <div class="dialog-header">
                <div class="dialog-icon" :class="iconType">
                    <span x-show="iconType === 'warning'">⚠️</span>
                    <span x-show="iconType === 'error'">❌</span>
                </div>
                <h2 :id="dialogId + '-title'" class="dialog-title" x-text="title"></h2>
            </div>
            <p :id="dialogId + '-message'" class="dialog-message" x-text="message"></p>
            <div class="dialog-actions">
                <button
                    class="btn btn-secondary"
                    @click="cancel()"
                    x-ref="cancelButton"
                >
                    Annuler
                </button>
                <button
                    class="btn btn-danger"
                    @click="confirm()"
                    x-ref="confirmButton"
                >
                    Confirmer
                </button>
            </div>
        </div>
    </div>
</div>
```

#### JavaScript API
```javascript
// Ouvrir un dialog (retourne une Promise)
$refs.confirmDialog.open(title, message, iconType)

// Exemples avec gestion de la réponse
$refs.confirmDialog.open(
    'Supprimer l\'élément ?',
    'Cette action est irréversible.',
    'warning'
).then(confirmed => {
    if (confirmed) {
        console.log('Action confirmée');
        // Exécuter l'action
    } else {
        console.log('Action annulée');
    }
});

// Version async/await
async function deleteItem() {
    const confirmed = await $refs.confirmDialog.open(
        'Supprimer l\'élément ?',
        'Cette action ne peut pas être annulée.',
        'error'
    );

    if (confirmed) {
        // Procéder à la suppression
    }
}
```

#### Paramètres
- **title** (string) : Titre du dialog
- **message** (string) : Message d'explication
- **iconType** (string, optionnel) : `'warning'` ou `'error'` (défaut: 'warning')

#### Valeur de retour
Promise qui resolve avec :
- `true` si l'utilisateur confirme
- `false` si l'utilisateur annule ou ferme le dialog

### Navigation clavier
- **Tab/Shift+Tab** : Navigation entre les boutons
- **Escape** : Ferme le dialog (équivalent à "Annuler")
- **Enter** : Active le bouton ayant le focus

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Durées d'animation */
.dialog-overlay { transition: opacity 0.2s ease; }
```

### Classes CSS modifiables
- `.dialog-overlay` : Style de l'overlay modal
- `.btn` : Style des boutons

## ⌨️ Raccourcis Clavier

### Dialogs
- **Tab/Shift+Tab** : Navigation entre les boutons
- **Escape** : Fermer le dialog (annuler)
- **Enter** : Activer le bouton focalisé

## 🔧 Configuration Avancée

### Gestion des événements
```javascript
// Écouter la fermeture d'un dialog
$refs.confirmDialog.open('Titre', 'Message').then(result => {
    console.log('Dialog fermé avec résultat:', result);
});
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

#### Dialog ne bloque pas le focus
```html
<!-- Vérifier que x-trap est présent -->
<div x-trap="isOpen">
  <!-- Contenu du dialog -->
</div>
```

#### Animations saccadées
```css
/* Ajouter will-change pour optimiser les performances */
.dialog {
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
- [Alpine.js x-trap Plugin](https://alpinejs.dev/plugins/trap)

### Standards d'accessibilité
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)

### Patterns ARIA
- [Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/)

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