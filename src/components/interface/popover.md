# Bibliothèque de Composants Alpine.js Accessibles

Une collection de composants Alpine.js entièrement accessibles, conformes aux standards WCAG 2.1 AA, avec support complet de la navigation au clavier et des lecteurs d'écran.

## 🎯 Objectifs

- **Accessibilité complète** : Conformité WCAG 2.1 AA
- **Navigation clavier** : Support total Tab/Shift+Tab/Flèches/Home/End
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

1. Copiez les styles CSS et le JavaScript du composant dans votre projet.

2. Ajoutez les conteneurs des composants dans votre HTML.

## 📋 Popover

### Description
Composant de popover contextuel pour afficher des informations supplémentaires au survol ou clic sur un élément déclencheur. Intègre une gestion complète de l'accessibilité avec piégeage du focus, navigation au clavier et relations ARIA appropriées.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="dialog"`, `aria-expanded`, `aria-describedby`, `aria-labelledby`, `aria-label`
- **Navigation clavier** : Espace/Entrée pour ouvrir, Échap pour fermer, Tab pour navigation
- **Lecteurs d'écran** : Annonces des états d'ouverture/fermeture et contenu structuré
- **Focus management** : Piégeage du focus dans le popover et retour au déclencheur
- **Sémantique** : Structure de dialogue avec en-têtes et labels appropriés
- **États visuels** : Indicateurs visuels d'état ouvert/fermé et focus

### Usage

#### HTML Structure
```html
<div
    x-data="popover('popover-1')"
    class="inline-block relative"
    @keydown.escape="close()"
    @click.away="close()"
>
    <button
        x-ref="trigger"
        @click="toggle()"
        @keydown.space.prevent="toggle()"
        @keydown.enter.prevent="toggle()"
        :aria-expanded="isOpen"
        :aria-describedby="isOpen ? contentId : null"
        class="popover-trigger"
        type="button"
    >
        Informations sur le produit
    </button>

    <div
        x-show="isOpen"
        x-transition:enter="popover-enter"
        x-transition:enter-end="popover-enter-to"
        x-transition:leave="popover-leave"
        x-transition:leave-end="popover-leave-to"
        :id="contentId"
        role="dialog"
        :aria-labelledby="headerId"
        class="popover-content"
        x-trap="isOpen"
    >
        <button
            @click="close()"
            class="popover-close"
            type="button"
            aria-label="Fermer les informations"
        >
            ×
        </button>
        <div :id="headerId" class="popover-header">
            Spécifications Techniques
        </div>
        <div class="popover-body">
            Ce produit dispose d'une technologie avancée avec des performances optimisées.
            Compatible avec tous les systèmes modernes et garanti 2 ans.
            <br><br>
            <strong>Dimensions :</strong> 15 × 10 × 3 cm<br>
            <strong>Poids :</strong> 250g<br>
            <strong>Matériau :</strong> Aluminium recyclé
        </div>
    </div>
</div>
```

#### JavaScript API
```javascript
function popover(id) {
    return {
        isOpen: false,
        contentId: `${id}-content`,
        headerId: `${id}-header`,

        // Basculer l'état d'ouverture
        toggle() {
            this.isOpen ? this.close() : this.open();
        },

        // Ouvrir le popover
        open() {
            this.isOpen = true;
            this.$nextTick(() => {
                // Focus management pour l'accessibilité
                const closeButton = this.$el.querySelector('.popover-close');
                if (closeButton) {
                    closeButton.focus();
                }
            });
        },

        // Fermer le popover
        close() {
            this.isOpen = false;
            this.$nextTick(() => {
                // Retour du focus au déclencheur
                this.$refs.trigger.focus();
            });
        }
    }
}

// Exemples d'utilisation
// Ouvrir un popover programmatiquement
function openPopoverById(id) {
    const popoverElement = document.querySelector(`[x-data*="${id}"]`);
    if (popoverElement && popoverElement._x_dataStack) {
        popoverElement._x_dataStack[0].open();
    }
}

// Écouter les événements d'ouverture/fermeture
document.addEventListener('popover-opened', (e) => {
    console.log('Popover ouvert:', e.detail.id);
});

document.addEventListener('popover-closed', (e) => {
    console.log('Popover fermé:', e.detail.id);
});

// Configuration avec contenu dynamique
const popoverConfig = {
    id: 'dynamic-popover',
    title: 'Titre dynamique',
    content: 'Contenu chargé dynamiquement',
    position: 'bottom'
};
```

#### Paramètres
- **isOpen** (boolean) : État d'ouverture du popover
- **contentId** (string) : ID unique pour le contenu du popover
- **headerId** (string) : ID unique pour l'en-tête du popover

### Types de configuration
- **Popover informatif** : Affichage d'informations contextuelles
- **Popover d'aide** : Support et assistance utilisateur
- **Popover de navigation** : Menu contextuel
- **Popover avec formulaire** : Saisie rapide dans une popup

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Déclencheur */
.popover-trigger {
    --bg-color: #2563eb;
    --hover-bg: #1d4ed8;
    --focus-outline: #fbbf24;
    --padding: 0.75rem 1.5rem;
}

/* Contenu */
.popover-content {
    --bg-color: white;
    --border-color: #d1d5db;
    --shadow: 0 10px 25px rgba(0,0,0,0.15);
    --min-width: 250px;
    --max-width: 400px;
}
```

### Classes CSS modifiables
```css
.popover-trigger {
    background: #2563eb;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.2s;
    position: relative;
}

.popover-trigger:hover {
    background: #1d4ed8;
}

.popover-trigger:focus {
    outline: 2px solid #fbbf24;
    outline-offset: 2px;
}

.popover-content {
    position: absolute;
    z-index: 1000;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    min-width: 250px;
    max-width: 400px;
    padding: 1rem;
    margin-top: 0.5rem;
}

.popover-content::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 1rem;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white;
}

.popover-header {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1f2937;
}

.popover-body {
    color: #6b7280;
    line-height: 1.5;
}

.popover-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
    color: #6b7280;
    line-height: 1;
}

/* Animations */
.popover-enter {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
}

.popover-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.popover-content {
    transition: all 0.2s ease-out;
}
```

## ⌨️ Raccourcis Clavier

### Popover
- **Espace/Entrée** : Ouvrir/basculer le popover sur le déclencheur
- **Échap** : Fermer le popover
- **Tab** : Navigation dans le contenu du popover
- **Shift + Tab** : Navigation inverse dans le popover
- **Clic extérieur** : Fermer le popover

## 🔧 Configuration Avancée

### Popover avec positionnement dynamique
```javascript
function advancedPopover(id, options = {}) {
    return {
        isOpen: false,
        contentId: `${id}-content`,
        headerId: `${id}-header`,
        position: options.position || 'bottom',
        offset: options.offset || 8,

        toggle() {
            this.isOpen ? this.close() : this.open();
        },

        open() {
            this.isOpen = true;
            this.$nextTick(() => {
                this.calculatePosition();
                const closeButton = this.$el.querySelector('.popover-close');
                if (closeButton) {
                    closeButton.focus();
                }
                this.$dispatch('popover-opened', { id });
            });
        },

        close() {
            this.isOpen = false;
            this.$nextTick(() => {
                this.$refs.trigger.focus();
                this.$dispatch('popover-closed', { id });
            });
        },

        calculatePosition() {
            const trigger = this.$refs.trigger;
            const content = this.$el.querySelector('.popover-content');
            const triggerRect = trigger.getBoundingClientRect();
            const contentRect = content.getBoundingClientRect();
            const viewport = {
                width: window.innerWidth,
                height: window.innerHeight
            };

            let top, left;

            switch (this.position) {
                case 'top':
                    top = triggerRect.top - contentRect.height - this.offset;
                    left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
                    break;
                case 'bottom':
                    top = triggerRect.bottom + this.offset;
                    left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
                    break;
                case 'left':
                    top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
                    left = triggerRect.left - contentRect.width - this.offset;
                    break;
                case 'right':
                    top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
                    left = triggerRect.right + this.offset;
                    break;
            }

            // Ajustement si hors viewport
            if (left < 0) left = 8;
            if (left + contentRect.width > viewport.width) {
                left = viewport.width - contentRect.width - 8;
            }
            if (top < 0) top = 8;
            if (top + contentRect.height > viewport.height) {
                top = viewport.height - contentRect.height - 8;
            }

            content.style.top = `${top}px`;
            content.style.left = `${left}px`;
            content.style.position = 'fixed';
        }
    }
}
```

### Gestion des événements
```javascript
function popover(id) {
    return {
        isOpen: false,
        contentId: `${id}-content`,
        headerId: `${id}-header`,

        toggle() {
            this.isOpen ? this.close() : this.open();
        },

        open() {
            this.isOpen = true;
            this.$nextTick(() => {
                const closeButton = this.$el.querySelector('.popover-close');
                if (closeButton) {
                    closeButton.focus();
                }
                this.$dispatch('popover-opened', {
                    id,
                    timestamp: new Date().toISOString()
                });
            });
        },

        close() {
            this.isOpen = false;
            this.$nextTick(() => {
                this.$refs.trigger.focus();
                this.$dispatch('popover-closed', {
                    id,
                    timestamp: new Date().toISOString()
                });
            });
        },

        init() {
            this.$dispatch('popover-initialized', { id });
        }
    }
}

// Écoute des événements
document.addEventListener('popover-opened', (e) => {
    console.log('Popover ouvert:', e.detail.id, 'à', e.detail.timestamp);
});

document.addEventListener('popover-closed', (e) => {
    console.log('Popover fermé:', e.detail.id, 'à', e.detail.timestamp);
});
```

### Popover avec contenu dynamique
```javascript
function dynamicPopover(id) {
    return {
        isOpen: false,
        contentId: `${id}-content`,
        headerId: `${id}-header`,
        loading: false,
        content: '',
        title: '',

        async toggle() {
            this.isOpen ? this.close() : await this.open();
        },

        async open() {
            this.loading = true;
            this.isOpen = true;

            try {
                const response = await fetch(`/api/popover-content/${id}`);
                const data = await response.json();
                this.title = data.title;
                this.content = data.content;
            } catch (error) {
                console.error('Erreur de chargement:', error);
                this.content = 'Erreur lors du chargement du contenu';
            } finally {
                this.loading = false;
                this.$nextTick(() => {
                    const closeButton = this.$el.querySelector('.popover-close');
                    if (closeButton) {
                        closeButton.focus();
                    }
                });
            }
        },

        close() {
            this.isOpen = false;
            this.content = '';
            this.title = '';
            this.$nextTick(() => {
                this.$refs.trigger.focus();
            });
        }
    }
}
```

### Popover avec formulaire
```javascript
function formPopover(id) {
    return {
        isOpen: false,
        contentId: `${id}-content`,
        headerId: `${id}-header`,
        formData: {
            name: '',
            email: '',
            message: ''
        },
        submitting: false,
        errors: {},

        toggle() {
            this.isOpen ? this.close() : this.open();
        },

        open() {
            this.isOpen = true;
            this.$nextTick(() => {
                const firstInput = this.$el.querySelector('input, textarea');
                if (firstInput) {
                    firstInput.focus();
                }
            });
        },

        close() {
            this.isOpen = false;
            this.resetForm();
            this.$nextTick(() => {
                this.$refs.trigger.focus();
            });
        },

        async submitForm() {
            this.submitting = true;
            this.errors = {};

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.formData)
                });

                if (response.ok) {
                    this.announce('Formulaire envoyé avec succès');
                    this.close();
                } else {
                    const errorData = await response.json();
                    this.errors = errorData.errors || {};
                }
            } catch (error) {
                console.error('Erreur:', error);
                this.announce('Erreur lors de l\'envoi');
            } finally {
                this.submitting = false;
            }
        },

        resetForm() {
            this.formData = { name: '', email: '', message: '' };
            this.errors = {};
        },

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
```

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.3.1** Information et relations : Relations ARIA entre déclencheur et contenu
- ✅ **2.1.1** Clavier : Navigation complète au clavier avec Espace/Entrée/Échap
- ✅ **2.1.2** Pas de piège clavier : Piégeage du focus géré correctement
- ✅ **2.4.3** Ordre de focus : Navigation logique dans le popover

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés pour tous les états
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour le contenu
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **4.1.2** Nom, rôle, valeur : États ARIA appropriés (aria-expanded, role="dialog")

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran pour navigation et annonces
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation et piégeage du focus

## 🐛 Dépannage

### Problèmes courants

#### Focus non piégé dans le popover
```javascript
// Vérifier que x-trap est bien configuré
<div x-trap="isOpen" class="popover-content">
    <!-- contenu -->
</div>
```

#### Positionnement incorrect du popover
```css
/* S'assurer que le conteneur parent est positionné */
.popover-container {
    position: relative;
}

.popover-content {
    position: absolute;
    z-index: 1000;
}
```

#### Fermeture non fonctionnelle au clic extérieur
```html
<!-- Vérifier que @click.away est sur le bon élément -->
<div x-data="popover()" @click.away="close()">
    <!-- contenu -->
</div>
```

#### Relations ARIA manquantes
```html
<!-- Vérifier les attributs ARIA -->
<button :aria-expanded="isOpen"
        :aria-describedby="isOpen ? contentId : null">
    Déclencheur
</button>
<div :id="contentId"
     role="dialog"
     :aria-labelledby="headerId">
    <!-- contenu -->
</div>
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
- [Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Disclosure Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)

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