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
<!-- Alpine Core -->
<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

2. Copiez les styles CSS et le JavaScript du composant dans votre projet.

3. Ajoutez les conteneurs des composants dans votre HTML.

## 🔄 Loader/Spinner

### Description
Composant de chargement avec spinner animé pour indiquer un processus en cours. Intègre les bonnes pratiques d'accessibilité avec annonces appropriées pour les lecteurs d'écran et gestion des états de chargement.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="status"`, `aria-live="polite"`, `aria-hidden` pour l'animation
- **Navigation clavier** : Interaction complète au clavier
- **Lecteurs d'écran** : Annonces des états de chargement avec texte descriptif
- **Focus management** : Conservation du focus pendant le chargement
- **Sémantique** : Structure claire avec rôles appropriés
- **États visuels** : Animation non intrusive et contraste suffisant

### Usage

#### HTML Structure
```html
<div x-data="loadingSpinner()">
    <button class="btn" @click="toggleLoading()">
        <span x-text="isLoading ? 'Arrêter' : 'Démarrer'"></span> le chargement
    </button>

    <div x-show="isLoading"
         class="loading-container"
         role="status"
         aria-live="polite">
        <div class="spinner" aria-hidden="true"></div>
        <span>Chargement en cours...</span>
    </div>
</div>
```

#### JavaScript API
```javascript
function loadingSpinner() {
    return {
        isLoading: false,

        // Basculer l'état de chargement
        toggleLoading() {
            this.isLoading = !this.isLoading;
        },

        // Démarrer le chargement
        startLoading() {
            this.isLoading = true;
        },

        // Arrêter le chargement
        stopLoading() {
            this.isLoading = false;
        }
    }
}

// Exemples d'utilisation
// Simulation d'une requête async
async function simulateApiCall() {
    const loader = Alpine.store('loader');
    loader.startLoading();

    try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('Requête terminée');
    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        loader.stopLoading();
    }
}

// Écouter les changements d'état
document.addEventListener('loading-started', () => {
    console.log('Chargement démarré');
});

document.addEventListener('loading-stopped', () => {
    console.log('Chargement terminé');
});
```

#### Paramètres
- **isLoading** (boolean) : État de chargement actuel

### Types de configuration
- **Spinner simple** : Animation circulaire basique
- **Loader avec texte** : Message de chargement personnalisé
- **Loader avec progression** : Barre de progression avec pourcentage
- **Loader inline** : Intégré dans des boutons ou formulaires

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Spinner */
.spinner {
    --size: 40px;
    --border-width: 4px;
    --color-background: #f3f3f3;
    --color-primary: #007acc;
    --animation-duration: 2s;
}

/* Conteneur de chargement */
.loading-container {
    --gap: 1rem;
    --padding: 2rem;
    --align: center;
}
```

### Classes CSS modifiables
```css
.spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007acc;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
    margin: 0 auto;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
}
```

## ⌨️ Raccourcis Clavier

### Loader
- **Tab** : Navigation vers les éléments interactifs
- **Enter/Espace** : Activer/désactiver le chargement
- **Échap** : Arrêter le chargement (si configuré)

## 🔧 Configuration Avancée

### Loader avec progression
```javascript
function progressLoader() {
    return {
        isLoading: false,
        progress: 0,
        maxProgress: 100,

        async startProgressLoading() {
            this.isLoading = true;
            this.progress = 0;

            const interval = setInterval(() => {
                this.progress += 10;
                this.announce(`Progression: ${this.progress}%`);

                if (this.progress >= this.maxProgress) {
                    clearInterval(interval);
                    this.isLoading = false;
                    this.announce('Chargement terminé');
                }
            }, 500);
        },

        get progressPercentage() {
            return Math.min((this.progress / this.maxProgress) * 100, 100);
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

### Gestion des événements
```javascript
function loadingSpinner() {
    return {
        isLoading: false,

        startLoading() {
            this.isLoading = true;
            this.$dispatch('loading-started', {
                timestamp: new Date().toISOString()
            });
        },

        stopLoading() {
            this.isLoading = false;
            this.$dispatch('loading-stopped', {
                timestamp: new Date().toISOString()
            });
        },

        toggleLoading() {
            if (this.isLoading) {
                this.stopLoading();
            } else {
                this.startLoading();
            }
        }
    }
}

// Écoute des événements
document.addEventListener('loading-started', (e) => {
    console.log('Chargement démarré à:', e.detail.timestamp);
});

document.addEventListener('loading-stopped', (e) => {
    console.log('Chargement terminé à:', e.detail.timestamp);
});
```

### Loader avec timeout automatique
```javascript
function timedLoader() {
    return {
        isLoading: false,
        timeout: 5000, // 5 secondes
        timeoutId: null,

        startLoading(duration = this.timeout) {
            this.isLoading = true;

            this.timeoutId = setTimeout(() => {
                this.stopLoading();
                this.announce('Délai d\'attente dépassé');
            }, duration);
        },

        stopLoading() {
            this.isLoading = false;
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }
        },

        announce(message) {
            const announcer = document.createElement('div');
            announcer.setAttribute('role', 'status');
            announcer.setAttribute('aria-live', 'assertive');
            announcer.className = 'sr-only';
            announcer.textContent = message;
            document.body.appendChild(announcer);
            setTimeout(() => document.body.removeChild(announcer), 1000);
        }
    }
}
```

### Loader pour formulaires
```javascript
function formLoader() {
    return {
        isSubmitting: false,
        submitText: 'Envoyer',
        loadingText: 'Envoi en cours...',

        async handleSubmit(formData) {
            this.isSubmitting = true;

            try {
                const response = await fetch('/api/submit', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    this.announce('Formulaire envoyé avec succès');
                } else {
                    throw new Error('Erreur d\'envoi');
                }
            } catch (error) {
                this.announce('Erreur lors de l\'envoi du formulaire');
                console.error('Erreur:', error);
            } finally {
                this.isSubmitting = false;
            }
        },

        get buttonText() {
            return this.isSubmitting ? this.loadingText : this.submitText;
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
- ✅ **1.3.1** Information et relations : Rôle status approprié pour les annonces
- ✅ **2.1.1** Clavier : Navigation complète au clavier
- ✅ **2.1.2** Pas de piège clavier : Navigation fluide
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés pour le spinner
- ✅ **2.4.6** En-têtes et étiquettes : Messages descriptifs de chargement
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **4.1.2** Nom, rôle, valeur : États ARIA appropriés (role="status", aria-live)

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran pour annonces de chargement
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation et activation

## 🐛 Dépannage

### Problèmes courants

#### Animation du spinner ne fonctionne pas
```css
/* Vérifier que l'animation CSS est bien définie */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.spinner {
    animation: spin 2s linear infinite;
}
```

#### Annonces lecteur d'écran non fonctionnelles
```html
<!-- Vérifier les attributs ARIA -->
<div role="status" aria-live="polite">
    <span>Chargement en cours...</span>
</div>
```

#### Focus perdu pendant le chargement
```javascript
// Maintenir le focus sur l'élément déclencheur
startLoading() {
    this.isLoading = true;
    // Le focus reste sur le bouton qui a déclenché le chargement
}
```

#### Spinner non centré
```css
/* S'assurer que le conteneur est bien configuré */
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
- [Status Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [Live Regions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)

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