# Bibliothèque de Composants Alpine.js Accessibles

Une collection de composants Alpine.js entièrement accessibles, conformes aux standards WCAG 2.1 AA, avec support complet de la navigation au clavier et des lecteurs d'écran.

## 🎯 Objectifs

- **Accessibilité complète** : Conformité WCAG 2.1 AA
- **Navigation clavier** : Support total Tab/Shift+Tab/Enter/Space
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

## ✅ Form Validation

### Description
Composant de validation de formulaire avec messages d'erreur dynamiques et accessibles. Gestion complète de l'accessibilité avec annonces en temps réel, résumé des erreurs, et validation contextuelle. Supporte la validation côté client avec feedback immédiat et états visuels clairs.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="alert"`, `aria-invalid`, `aria-describedby`, `aria-live`, `aria-labelledby`
- **Navigation clavier** : Navigation fluide entre champs, liens vers erreurs dans le résumé
- **Lecteurs d'écran** : Annonces d'erreurs en temps réel, résumé des erreurs pour navigation rapide
- **Focus management** : Focus automatique sur résumé d'erreurs, navigation vers champs en erreur
- **Sémantique** : Association claire messages/champs, états d'erreur appropriés
- **États visuels** : Indicateurs visuels de validation, erreurs et succès

### Usage

#### HTML Structure
```html
<div x-data="formValidation()">
    <!-- Form Error Summary -->
    <div x-show="hasErrors && showSummary"
         class="form-summary error"
         role="alert"
         aria-labelledby="error-summary-title"
         x-transition>
        <h3 id="error-summary-title">Erreurs dans le formulaire :</h3>
        <ul>
            <template x-for="error in errorList" :key="error.field">
                <li>
                    <a :href="'#' + error.field"
                       @click.prevent="focusField(error.field)"
                       x-text="error.label + ': ' + error.message"></a>
                </li>
            </template>
        </ul>
    </div>

    <!-- Success Message -->
    <div x-show="isSubmitted && !hasErrors"
         class="form-summary success"
         role="alert"
         x-transition>
        <span aria-hidden="true">✓</span> Formulaire soumis avec succès !
    </div>

    <form @submit.prevent="submitForm" novalidate>
        <!-- Email Field -->
        <div class="form-group">
            <label for="email" class="required">Adresse e-mail</label>
            <input type="email"
                   id="email"
                   x-model="fields.email.value"
                   @blur="validateField('email')"
                   @input="clearFieldError('email')"
                   :class="getFieldClasses('email')"
                   :aria-invalid="fields.email.error ? 'true' : 'false'"
                   :aria-describedby="getAriaDescribedBy('email')"
                   autocomplete="email">

            <span id="email-help" class="help-text">
                Nous utiliserons cette adresse pour vous contacter
            </span>

            <span id="email-error"
                  class="error-message"
                  x-show="fields.email.error"
                  aria-live="polite"
                  x-text="fields.email.error"
                  x-transition></span>

            <span id="email-success"
                  class="success-message"
                  x-show="fields.email.valid && !fields.email.error"
                  aria-live="polite"
                  x-transition>
                ✓ Adresse e-mail valide
            </span>
        </div>

        <!-- Password Field -->
        <div class="form-group">
            <label for="password" class="required">Mot de passe</label>
            <input type="password"
                   id="password"
                   x-model="fields.password.value"
                   @blur="validateField('password')"
                   @input="clearFieldError('password')"
                   :class="getFieldClasses('password')"
                   :aria-invalid="fields.password.error ? 'true' : 'false'"
                   :aria-describedby="getAriaDescribedBy('password')"
                   autocomplete="new-password">

            <span id="password-help" class="help-text">
                Minimum 8 caractères avec au moins une majuscule et un chiffre
            </span>

            <span id="password-error"
                  class="error-message"
                  x-show="fields.password.error"
                  aria-live="polite"
                  x-text="fields.password.error"
                  x-transition></span>

            <span id="password-success"
                  class="success-message"
                  x-show="fields.password.valid && !fields.password.error"
                  aria-live="polite"
                  x-transition>
                ✓ Mot de passe sécurisé
            </span>
        </div>

        <!-- Confirm Password Field -->
        <div class="form-group">
            <label for="confirmPassword" class="required">Confirmer le mot de passe</label>
            <input type="password"
                   id="confirmPassword"
                   x-model="fields.confirmPassword.value"
                   @blur="validateField('confirmPassword')"
                   @input="clearFieldError('confirmPassword')"
                   :class="getFieldClasses('confirmPassword')"
                   :aria-invalid="fields.confirmPassword.error ? 'true' : 'false'"
                   :aria-describedby="getAriaDescribedBy('confirmPassword')"
                   autocomplete="new-password">

            <span id="confirmPassword-error"
                  class="error-message"
                  x-show="fields.confirmPassword.error"
                  aria-live="polite"
                  x-text="fields.confirmPassword.error"
                  x-transition></span>

            <span id="confirmPassword-success"
                  class="success-message"
                  x-show="fields.confirmPassword.valid && !fields.confirmPassword.error"
                  aria-live="polite"
                  x-transition>
                ✓ Les mots de passe correspondent
            </span>
        </div>

        <!-- Age Field -->
        <div class="form-group">
            <label for="age" class="required">Âge</label>
            <input type="number"
                   id="age"
                   x-model="fields.age.value"
                   @blur="validateField('age')"
                   @input="clearFieldError('age')"
                   :class="getFieldClasses('age')"
                   :aria-invalid="fields.age.error ? 'true' : 'false'"
                   :aria-describedby="getAriaDescribedBy('age')"
                   min="13"
                   max="120">

            <span id="age-help" class="help-text">
                Vous devez avoir au moins 13 ans
            </span>

            <span id="age-error"
                  class="error-message"
                  x-show="fields.age.error"
                  aria-live="polite"
                  x-text="fields.age.error"
                  x-transition></span>

            <span id="age-success"
                  class="success-message"
                  x-show="fields.age.valid && !fields.age.error"
                  aria-live="polite"
                  x-transition>
                ✓ Âge valide
            </span>
        </div>

        <button type="submit"
                class="btn"
                :disabled="isSubmitting"
                :aria-describeddby="hasErrors ? 'error-summary-title' : null">
            <span x-show="!isSubmitting">Valider le formulaire</span>
            <span x-show="isSubmitting">Validation en cours...</span>
            <span class="sr-only" x-show="hasErrors"> - Veuillez corriger les erreurs ci-dessus</span>
        </button>
    </form>
</div>
```

#### JavaScript API
```javascript
function formValidation() {
    return {
        fields: {
            email: { value: '', error: '', valid: false },
            password: { value: '', error: '', valid: false },
            confirmPassword: { value: '', error: '', valid: false },
            age: { value: '', error: '', valid: false }
        },
        isSubmitting: false,
        isSubmitted: false,
        showSummary: false,

        get hasErrors() {
            return Object.values(this.fields).some(field => field.error);
        },

        get errorList() {
            const errors = [];
            const labels = {
                email: 'E-mail',
                password: 'Mot de passe',
                confirmPassword: 'Confirmation du mot de passe',
                age: 'Âge'
            };

            Object.entries(this.fields).forEach(([key, field]) => {
                if (field.error) {
                    errors.push({
                        field: key,
                        label: labels[key],
                        message: field.error
                    });
                }
            });

            return errors;
        },

        // Valider un champ spécifique
        validateField(fieldName) {
            const field = this.fields[fieldName];
            const value = field.value.trim();

            field.error = '';
            field.valid = false;

            switch (fieldName) {
                case 'email':
                    if (!value) {
                        field.error = 'L\'adresse e-mail est requise';
                    } else if (!this.isValidEmail(value)) {
                        field.error = 'Veuillez saisir une adresse e-mail valide';
                    } else {
                        field.valid = true;
                    }
                    break;

                case 'password':
                    if (!value) {
                        field.error = 'Le mot de passe est requis';
                    } else if (value.length < 8) {
                        field.error = 'Le mot de passe doit contenir au moins 8 caractères';
                    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(value)) {
                        field.error = 'Le mot de passe doit contenir au moins une majuscule et un chiffre';
                    } else {
                        field.valid = true;
                    }

                    // Re-validate confirm password if it has a value
                    if (this.fields.confirmPassword.value) {
                        this.validateField('confirmPassword');
                    }
                    break;

                case 'confirmPassword':
                    if (!value) {
                        field.error = 'La confirmation du mot de passe est requise';
                    } else if (value !== this.fields.password.value) {
                        field.error = 'Les mots de passe ne correspondent pas';
                    } else {
                        field.valid = true;
                    }
                    break;

                case 'age':
                    const age = parseInt(value);
                    if (!value) {
                        field.error = 'L\'âge est requis';
                    } else if (isNaN(age)) {
                        field.error = 'Veuillez saisir un âge valide';
                    } else if (age < 13) {
                        field.error = 'Vous devez avoir au moins 13 ans';
                    } else if (age > 120) {
                        field.error = 'Veuillez saisir un âge réaliste';
                    } else {
                        field.valid = true;
                    }
                    break;
            }
        },

        // Valider tous les champs
        validateAllFields() {
            Object.keys(this.fields).forEach(fieldName => {
                this.validateField(fieldName);
            });
        },

        // Effacer l'erreur d'un champ lors de la saisie
        clearFieldError(fieldName) {
            if (this.fields[fieldName].error) {
                this.fields[fieldName].error = '';
            }
        },

        // Soumettre le formulaire
        async submitForm() {
            this.isSubmitting = true;
            this.isSubmitted = false;
            this.showSummary = false;

            this.validateAllFields();

            if (this.hasErrors) {
                this.showSummary = true;
                this.isSubmitting = false;

                this.$nextTick(() => {
                    const errorSummary = document.querySelector('[role="alert"]');
                    if (errorSummary) {
                        errorSummary.focus();
                    }
                });
                return;
            }

            await new Promise(resolve => setTimeout(resolve, 1000));

            this.isSubmitting = false;
            this.isSubmitted = true;

            setTimeout(() => {
                this.resetForm();
            }, 3000);
        },

        // Réinitialiser le formulaire
        resetForm() {
            Object.keys(this.fields).forEach(key => {
                this.fields[key] = { value: '', error: '', valid: false };
            });
            this.isSubmitted = false;
            this.showSummary = false;
        },

        // Validation e-mail
        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        // Obtenir les classes CSS pour un champ
        getFieldClasses(fieldName) {
            const field = this.fields[fieldName];
            if (field.error) return 'input-error';
            if (field.valid) return 'input-success';
            return '';
        },

        // Obtenir les IDs pour aria-describedby
        getAriaDescribedBy(fieldName) {
            const helpers = [`${fieldName}-help`];
            const field = this.fields[fieldName];

            if (field.error) {
                helpers.push(`${fieldName}-error`);
            } else if (field.valid) {
                helpers.push(`${fieldName}-success`);
            }

            return helpers.join(' ');
        },

        // Focus sur un champ spécifique
        focusField(fieldName) {
            const field = document.getElementById(fieldName);
            if (field) {
                field.focus();
            }
        }
    }
}

// Exemples d'utilisation
// Ajouter des validations personnalisées
function customValidation() {
    return {
        ...formValidation(),

        // Validation personnalisée pour un champ
        validateCustomField(value, rules) {
            const errors = [];

            if (rules.required && !value.trim()) {
                errors.push('Ce champ est requis');
            }

            if (rules.minLength && value.length < rules.minLength) {
                errors.push(`Minimum ${rules.minLength} caractères requis`);
            }

            if (rules.pattern && !rules.pattern.test(value)) {
                errors.push(rules.patternMessage || 'Format invalide');
            }

            return errors;
        }
    }
}

// Configuration des règles de validation
document.addEventListener('alpine:init', () => {
    Alpine.data('formValidation', formValidation);
});

// Validation en temps réel avancée
const validationConfig = {
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        patternMessage: 'Format d\'e-mail invalide'
    },
    password: {
        required: true,
        minLength: 8,
        pattern: /(?=.*[A-Z])(?=.*\d)/,
        patternMessage: 'Au moins une majuscule et un chiffre requis'
    }
};
```

#### Paramètres
- **fields** (object) : État des champs avec valeur, erreur et validité
- **isSubmitting** (boolean) : État de soumission du formulaire
- **showSummary** (boolean) : Affichage du résumé des erreurs
- **hasErrors** (computed) : Indique si le formulaire a des erreurs

### Types de configuration
- **Validation simple** : Validation de base avec messages d'erreur
- **Validation temps réel** : Validation lors de la saisie et perte de focus
- **Validation avec résumé** : Liste des erreurs avec navigation rapide
- **Validation personnalisée** : Règles de validation spécifiques

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Champs de formulaire */
.form-group { --margin-bottom: 1.5rem; }
label { --font-weight: 600; --color: #374151; --margin-bottom: 0.5rem; }
input, textarea, select { --padding: 0.75rem; --border: 2px solid #d1d5db; --border-radius: 4px; }

/* États de validation */
.input-error { --border-color: #dc2626; --shadow-color: rgba(220, 38, 38, 0.1); }
.input-success { --border-color: #10b981; --shadow-color: rgba(16, 185, 129, 0.1); }

/* Messages */
.error-message { --color: #dc2626; --font-size: 0.875rem; --font-weight: 500; }
.success-message { --color: #10b981; --font-size: 0.875rem; --font-weight: 500; }
.help-text { --color: #6b7280; --font-size: 0.875rem; }

/* Résumé des erreurs */
.form-summary.error { --bg-color: #fef2f2; --border-color: #fecaca; --text-color: #dc2626; }
.form-summary.success { --bg-color: #f0fdf4; --border-color: #bbf7d0; --text-color: #166534; }
```

### Classes CSS modifiables
- `.form-group` : Container pour chaque groupe de champ
- `.input-error` : État d'erreur pour les champs
- `.input-success` : État de succès pour les champs
- `.error-message` : Messages d'erreur
- `.form-summary` : Résumé des erreurs du formulaire

## ⌨️ Raccourcis Clavier

### Form Validation
- **Tab** : Navigation entre les champs du formulaire
- **Shift+Tab** : Navigation en arrière entre les champs
- **Enter** : Soumission du formulaire (sur le bouton submit)
- **Clic sur liens d'erreurs** : Navigation directe vers le champ en erreur
- **Échap** : Annulation de validation en cours (si supporté)

## 🔧 Configuration Avancée

### Validation avec règles personnalisées
```javascript
function advancedFormValidation() {
    return {
        ...formValidation(),

        // Configuration des règles
        validationRules: {
            email: {
                required: true,
                email: true,
                custom: (value) => {
                    // Validation domaine entreprise
                    if (!value.endsWith('@company.com')) {
                        return 'Seules les adresses @company.com sont acceptées';
                    }
                    return null;
                }
            },
            phone: {
                required: true,
                pattern: /^(\+33|0)[1-9](\d{8})$/,
                patternMessage: 'Format: +33123456789 ou 0123456789'
            }
        },

        // Validation avec règles personnalisées
        validateWithRules(fieldName, value) {
            const rules = this.validationRules[fieldName];
            if (!rules) return;

            const field = this.fields[fieldName];
            field.error = '';
            field.valid = false;

            // Validation requise
            if (rules.required && !value.trim()) {
                field.error = `Le champ ${fieldName} est requis`;
                return;
            }

            // Validation pattern
            if (rules.pattern && !rules.pattern.test(value)) {
                field.error = rules.patternMessage || 'Format invalide';
                return;
            }

            // Validation personnalisée
            if (rules.custom) {
                const customError = rules.custom(value);
                if (customError) {
                    field.error = customError;
                    return;
                }
            }

            field.valid = true;
        }
    }
}
```

### Validation asynchrone
```javascript
function asyncFormValidation() {
    return {
        ...formValidation(),

        validatingFields: new Set(),

        async validateEmailAvailability(email) {
            if (!this.isValidEmail(email)) return;

            this.validatingFields.add('email');

            try {
                const response = await fetch('/api/check-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                const result = await response.json();

                if (!result.available) {
                    this.fields.email.error = 'Cette adresse e-mail est déjà utilisée';
                    this.fields.email.valid = false;
                } else {
                    this.fields.email.valid = true;
                }
            } catch (error) {
                this.fields.email.error = 'Erreur lors de la vérification';
            } finally {
                this.validatingFields.delete('email');
            }
        },

        // Override de validateField pour inclure validation asynchrone
        async validateField(fieldName) {
            // Validation synchrone d'abord
            const originalValidate = formValidation().validateField;
            originalValidate.call(this, fieldName);

            // Puis validation asynchrone si nécessaire
            if (fieldName === 'email' && this.fields.email.valid) {
                await this.validateEmailAvailability(this.fields.email.value);
            }
        }
    }
}
```

### Gestion des événements
```javascript
function formValidationWithEvents() {
    return {
        ...formValidation(),

        submitForm() {
            // Déclencher événement avant validation
            this.$dispatch('form-validating', { fields: this.fields });

            this.validateAllFields();

            if (this.hasErrors) {
                // Déclencher événement d'erreur de validation
                this.$dispatch('form-validation-error', {
                    errors: this.errorList,
                    fields: this.fields
                });
                return;
            }

            // Déclencher événement de soumission
            this.$dispatch('form-submitting', {
                data: this.getFormData(),
                fields: this.fields
            });

            // Simulated submission
            setTimeout(() => {
                this.$dispatch('form-submitted', {
                    success: true,
                    data: this.getFormData()
                });
            }, 1000);
        },

        getFormData() {
            const data = {};
            Object.entries(this.fields).forEach(([key, field]) => {
                data[key] = field.value;
            });
            return data;
        }
    }
}

// Écoute des événements
document.addEventListener('form-validation-error', (e) => {
    console.warn('Form validation errors:', e.detail.errors);
});

document.addEventListener('form-submitted', (e) => {
    console.log('Form submitted successfully:', e.detail.data);
});
```

### Multi-step form validation
```javascript
function multiStepFormValidation() {
    return {
        ...formValidation(),

        currentStep: 1,
        totalSteps: 3,

        stepFields: {
            1: ['email', 'password'],
            2: ['firstName', 'lastName', 'age'],
            3: ['address', 'phone']
        },

        validateCurrentStep() {
            const fieldsToValidate = this.stepFields[this.currentStep] || [];
            let hasStepErrors = false;

            fieldsToValidate.forEach(fieldName => {
                this.validateField(fieldName);
                if (this.fields[fieldName].error) {
                    hasStepErrors = true;
                }
            });

            return !hasStepErrors;
        },

        nextStep() {
            if (this.validateCurrentStep() && this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.$dispatch('step-changed', {
                    step: this.currentStep,
                    totalSteps: this.totalSteps
                });
            }
        },

        previousStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
                this.$dispatch('step-changed', {
                    step: this.currentStep,
                    totalSteps: this.totalSteps
                });
            }
        }
    }
}
```

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.3.1** Information et relations : Association messages/champs avec aria-describedby
- ✅ **2.1.1** Clavier : Navigation complète au clavier
- ✅ **2.1.2** Pas de piège clavier : Navigation fluide entre champs
- ✅ **4.1.2** Nom, rôle, valeur : États aria-invalid appropriés

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés pour tous les états
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs et instructions claires
- ✅ **3.3.1** Identification des erreurs : Erreurs identifiées et décrites
- ✅ **3.3.2** Étiquettes ou instructions : Instructions et aide contextuelle
- ✅ **3.3.3** Suggestion après erreur : Messages d'erreur descriptifs
- ✅ **3.3.4** Prévention des erreurs : Validation et confirmation

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran pour annonces et navigation
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier

## 🐛 Dépannage

### Problèmes courants

#### Messages d'erreur non annoncés
```javascript
// Vérifier que aria-live est présent
<span aria-live="polite" x-text="fields.email.error"></span>

// S'assurer que le message change vraiment
validateField(fieldName) {
    const field = this.fields[fieldName];
    field.error = ''; // Reset d'abord
    this.$nextTick(() => {
        field.error = 'Message d\'erreur'; // Puis assignment
    });
}
```

#### Association champ/message manquante
```html
<!-- Vérifier aria-describedby -->
<input :aria-describedby="getAriaDescribedBy('email')" />

<script>
getAriaDescribedBy(fieldName) {
    const ids = [`${fieldName}-help`];
    if (this.fields[fieldName].error) {
        ids.push(`${fieldName}-error`);
    }
    return ids.join(' ');
}
</script>
```

#### Validation ne se déclenche pas
```javascript
// Vérifier les événements
@blur="validateField('email')" // Sur perte de focus
@input="clearFieldError('email')" // Sur saisie

// Debug de la validation
validateField(fieldName) {
    console.log('Validating:', fieldName, this.fields[fieldName].value);
    // ... logique de validation
}
```

#### Focus non géré sur les erreurs
```javascript
// S'assurer que le focus est bien géré
submitForm() {
    if (this.hasErrors) {
        this.$nextTick(() => {
            const errorSummary = document.querySelector('[role="alert"]');
            if (errorSummary) {
                errorSummary.focus();
                errorSummary.scrollIntoView({ behavior: 'smooth' });
            }
        });
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
- [Form Validation Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [Error Identification](https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html)

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