# Bibliothèque de Composants Alpine.js Accessibles

Une collection de composants Alpine.js entièrement accessibles, conformes aux standards WCAG 2.1 AA, avec support complet de la navigation au clavier et des lecteurs d'écran.

## 🎯 Objectifs

- **Accessibilité complète** : Conformité WCAG 2.1 AA
- **Navigation clavier** : Support total Tab/Shift+Tab/Escape
- **Lecteurs d'écran** : Annonces appropriées et sémantique ARIA
- **Simplicité d'usage** : API intuitive et documentation claire
- **Performance** : Composants légers et optimisés

## 📦 Installation

1. Incluez Alpine.js et ses plugins dans votre projet :
```html
<!-- Alpine Plugins -->
<script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/focus@3.x.x/dist/cdn.min.js"></script>
<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

2. Copiez les styles CSS et le JavaScript du composant dans votre projet.

3. Ajoutez les conteneurs des composants dans votre HTML.

## 🪟 Modal

### Description
Composant modal/dialogue pour afficher du contenu en superposition avec gestion complète du focus, piégeage du clavier et fermeture par Escape. Supporte les transitions et le verrouillage du scroll.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`
- **Navigation clavier** : Escape pour fermer, piégeage du focus avec `x-trap`
- **Lecteurs d'écran** : Annonces automatiques d'ouverture/fermeture
- **Focus management** : Focus piégé dans la modal, retour au déclencheur
- **Scroll lock** : Verrouillage du scroll de la page
- **Sémantique** : Structure de dialogue avec titre et description liés

### Usage

#### HTML Structure
```html
<!-- Bouton déclencheur -->
<div x-data="{ openModal: (id) => $dispatch('open-modal', { id }) }">
    <button class="btn" @click="openModal('example-modal')">
        Ouvrir la modal
    </button>
</div>

<!-- Modal -->
<div x-data="modal()"
     x-show="isOpen"
     x-on:open-modal.window="open($event.detail.id)"
     x-on:close-modal.window="close()"
     x-on:keydown.escape.window="close()"
     x-trap="isOpen"
     class="modal-overlay"
     x-transition.opacity.duration.300ms
     x-cloak
     role="dialog"
     aria-modal="true"
     aria-labelledby="modal-title"
     aria-describedby="modal-description">

    <div class="modal-content" @click.stop>
        <div class="modal-header">
            <h3 id="modal-title">Titre de la modal</h3>
            <button class="close-btn"
                    @click="close()"
                    aria-label="Fermer la modal">
                ×
            </button>
        </div>

        <div id="modal-description">
            <p>Contenu de la modal. Cette modal est accessible aux lecteurs d'écran et supporte la navigation au clavier.</p>
            <p>Appuyez sur Échap pour fermer.</p>

            <div class="modal-actions">
                <button class="btn btn-primary" @click="confirm()">
                    Confirmer
                </button>
                <button class="btn btn-secondary" @click="close()">
                    Annuler
                </button>
            </div>
        </div>
    </div>
</div>
```

#### JavaScript API
```javascript
function modal() {
    return {
        isOpen: false,
        modalId: null,
        previousFocus: null,

        // Ouvrir la modal
        open(id) {
            this.previousFocus = document.activeElement;
            this.isOpen = true;
            this.modalId = id;
            document.body.style.overflow = 'hidden';
            this.announce('Modal ouverte');
        },

        // Fermer la modal
        close() {
            this.isOpen = false;
            this.modalId = null;
            document.body.style.overflow = '';

            // Rétablir le focus
            if (this.previousFocus) {
                this.previousFocus.focus();
                this.previousFocus = null;
            }

            this.announce('Modal fermée');
        },

        // Action de confirmation
        confirm() {
            this.$dispatch('modal-confirmed', { modalId: this.modalId });
            this.close();
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
// Ouvrir une modal spécifique
$dispatch('open-modal', { id: 'confirmation-modal' });

// Fermer la modal courante
$dispatch('close-modal');

// Écouter les événements de confirmation
document.addEventListener('modal-confirmed', (e) => {
    console.log('Modal confirmée:', e.detail.modalId);
});
```

#### Paramètres
- **isOpen** (boolean) : État d'ouverture de la modal
- **modalId** (string|null) : Identifiant de la modal active
- **previousFocus** (Element|null) : Élément qui avait le focus avant ouverture

### Types de configuration
- **Modal simple** : Affichage d'information avec fermeture
- **Modal de confirmation** : Avec boutons d'action (Confirmer/Annuler)
- **Modal de formulaire** : Contenant des champs de saisie
- **Modal multi-étapes** : Navigation entre plusieurs vues

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Couleurs principales */
.modal-overlay { --bg-overlay: rgba(0, 0, 0, 0.5); --z-index: 1000; }
.modal-content { --bg-color: white; --shadow: 0 10px 25px rgba(0,0,0,0.2); }
.close-btn { --hover-bg: #f0f0f0; --focus-color: #007acc; }

/* Durées d'animation */
.modal-overlay { transition: opacity 0.3s ease-in-out; }
```

### Classes CSS modifiables
- `.modal-overlay` : Fond superposé de la modal
- `.modal-content` : Conteneur principal du contenu
- `.modal-header` : En-tête avec titre et bouton fermer
- `.modal-actions` : Zone des boutons d'action
- `.close-btn` : Bouton de fermeture

## ⌨️ Raccourcis Clavier

### Modal
- **Escape** : Fermer la modal
- **Tab** : Naviguer entre les éléments (piégé dans la modal)
- **Shift + Tab** : Navigation inverse (piégé dans la modal)
- **Enter/Espace** : Activer le bouton focalisé

## 🔧 Configuration Avancée

### Modal avec contenu dynamique
```javascript
function modal() {
    return {
        isOpen: false,
        modalId: null,
        title: '',
        content: '',
        actions: [],

        open(id, config = {}) {
            this.modalId = id;
            this.title = config.title || 'Modal';
            this.content = config.content || '';
            this.actions = config.actions || [];
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
        },

        setContent(title, content, actions = []) {
            this.title = title;
            this.content = content;
            this.actions = actions;
        }
    }
}
```

### Gestion des événements
```javascript
// Événements personnalisés
function modal() {
    return {
        // ... autres propriétés

        open(id) {
            this.isOpen = true;
            this.modalId = id;
            this.$dispatch('modal-opened', { id });
        },

        close() {
            this.$dispatch('modal-closing', { id: this.modalId });
            this.isOpen = false;
            this.$dispatch('modal-closed', { id: this.modalId });
        }
    }
}

// Écoute des événements
document.addEventListener('modal-opened', (e) => {
    console.log('Modal ouverte:', e.detail.id);
});

document.addEventListener('modal-confirmed', (e) => {
    console.log('Action confirmée pour:', e.detail.modalId);
});
```

### Modal de confirmation réutilisable
```javascript
function confirmModal() {
    return {
        ...modal(),

        confirmText: 'Confirmer',
        cancelText: 'Annuler',
        onConfirm: null,
        onCancel: null,

        openConfirm(config) {
            this.title = config.title;
            this.content = config.message;
            this.confirmText = config.confirmText || 'Confirmer';
            this.cancelText = config.cancelText || 'Annuler';
            this.onConfirm = config.onConfirm;
            this.onCancel = config.onCancel;
            this.open('confirm');
        },

        confirm() {
            if (this.onConfirm) this.onConfirm();
            this.close();
        },

        cancel() {
            if (this.onCancel) this.onCancel();
            this.close();
        }
    }
}
```

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.3.1** Information et relations : Structure de dialogue avec titre et description liés
- ✅ **2.1.1** Clavier : Toutes les fonctionnalités accessibles au clavier
- ✅ **2.1.2** Pas de piège clavier : Focus piégé correctement dans la modal
- ✅ **2.4.3** Ordre de focus : Navigation logique dans la modal

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés pour tous les éléments
- ✅ **2.4.6** En-têtes et étiquettes : Titre descriptif et labels appropriés
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **3.2.2** Saisie : Fermeture prévisible (Escape, clic overlay)

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier et piégeage du focus

## 🐛 Dépannage

### Problèmes courants

#### Modal ne s'ouvre pas
```javascript
// Vérifier que l'événement est bien dispatché
console.log('Dispatch open-modal event');
$dispatch('open-modal', { id: 'test-modal' });

// Vérifier que l'ID correspond
if (id === 'expected-modal-id') {
    this.isOpen = true;
}
```

#### Focus non piégé
```html
<!-- S'assurer que x-trap est présent et actif -->
<div x-trap="isOpen" ...>
```

#### Scroll non verrouillé
```javascript
// Vérifier que le style est bien appliqué
open(id) {
    this.isOpen = true;
    document.body.style.overflow = 'hidden'; // Important
}

close() {
    this.isOpen = false;
    document.body.style.overflow = ''; // Restaurer
}
```

#### Transitions saccadées
```css
/* Optimiser les performances */
.modal-overlay {
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
- [Alpine Focus Plugin](https://alpinejs.dev/plugins/focus)

### Standards d'accessibilité
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)

### Patterns ARIA
- [Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Focus Management](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)

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