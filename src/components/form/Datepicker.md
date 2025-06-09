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

## 📅 Date Picker

### Description
Composant de sélection de dates avec calendrier complet pour choisir une date spécifique. Gestion complète de l'accessibilité avec support de la navigation au clavier dans le calendrier, gestion du focus et relations ARIA appropriées entre les éléments du calendrier.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="dialog"`, `role="grid"`, `role="gridcell"`, `role="columnheader"`, `aria-selected`, `aria-label`, `aria-live`
- **Navigation clavier** : Flèches directionnelles pour navigation dans le calendrier, Home/End pour début/fin de semaine
- **Lecteurs d'écran** : Annonces des changements de mois, descriptions des dates, état sélectionné
- **Focus management** : Gestion du focus dans le calendrier avec tabindex approprié
- **Sémantique** : Structure de grille avec en-têtes de colonnes et cellules
- **États visuels** : Indicateurs visuels pour date sélectionnée, aujourd'hui, et focus

### Usage

#### HTML Structure
```html
<div x-data="datePicker()" class="form-group">
    <label for="date-input" class="form-label">
        Sélectionnez une date
    </label>

    <div class="datepicker-container">
        <input
            id="date-input"
            type="text"
            class="datepicker-input"
            :value="formatDate(selectedDate)"
            @focus="openCalendar"
            @keydown="handleInputKeydown"
            placeholder="jj/mm/aaaa"
            aria-describedby="date-instructions"
            readonly
        />

        <div x-show="isOpen"
             x-transition
             class="datepicker-calendar"
             role="dialog"
             aria-label="Calendrier de sélection de date"
             aria-modal="false">

            <div class="calendar-header">
                <button
                    type="button"
                    class="calendar-nav-btn"
                    @click="previousMonth"
                    @keydown="handleNavKeydown($event, 'prev')"
                    aria-label="Mois précédent"
                >
                    ‹
                </button>

                <div class="calendar-month-year"
                     aria-live="polite"
                     x-text="formatMonthYear(currentDate)">
                </div>

                <button
                    type="button"
                    class="calendar-nav-btn"
                    @click="nextMonth"
                    @keydown="handleNavKeydown($event, 'next')"
                    aria-label="Mois suivant"
                >
                    ›
                </button>
            </div>

            <div class="calendar-grid" role="grid" aria-label="Calendrier">
                <div class="calendar-day-header" role="columnheader" aria-label="Dimanche">Dim</div>
                <div class="calendar-day-header" role="columnheader" aria-label="Lundi">Lun</div>
                <div class="calendar-day-header" role="columnheader" aria-label="Mardi">Mar</div>
                <div class="calendar-day-header" role="columnheader" aria-label="Mercredi">Mer</div>
                <div class="calendar-day-header" role="columnheader" aria-label="Jeudi">Jeu</div>
                <div class="calendar-day-header" role="columnheader" aria-label="Vendredi">Ven</div>
                <div class="calendar-day-header" role="columnheader" aria-label="Samedi">Sam</div>

                <template x-for="(day, index) in calendarDays" :key="day.date.getTime()">
                    <button
                        type="button"
                        class="calendar-day"
                        role="gridcell"
                        :class="{
                            'other-month': !day.isCurrentMonth,
                            'selected': isSelected(day.date),
                            'today': isToday(day.date)
                        }"
                        :aria-label="formatDateForAriaLabel(day.date)"
                        :aria-selected="isSelected(day.date)"
                        :tabindex="getFocusTabIndex(day.date, index)"
                        @click="selectDate(day.date)"
                        @keydown="handleDayKeydown($event, day.date, index)"
                        x-text="day.date.getDate()"
                    ></button>
                </template>
            </div>
        </div>
    </div>

    <div x-show="selectedDate" x-transition class="instructions">
        Date sélectionnée: <strong x-text="formatDate(selectedDate)"></strong>
    </div>
</div>
```

#### JavaScript API
```javascript
function datePicker() {
    return {
        isOpen: false,
        selectedDate: null,
        currentDate: new Date(),
        focusedDate: new Date(),

        get calendarDays() {
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - startDate.getDay());

            const endDate = new Date(lastDay);
            endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

            const days = [];
            const current = new Date(startDate);

            while (current <= endDate) {
                days.push({
                    date: new Date(current),
                    isCurrentMonth: current.getMonth() === month
                });
                current.setDate(current.getDate() + 1);
            }

            return days;
        },

        // Ouvrir le calendrier
        openCalendar() {
            this.isOpen = true;
            this.focusedDate = this.selectedDate || new Date();
            this.currentDate = new Date(this.focusedDate.getFullYear(), this.focusedDate.getMonth(), 1);
        },

        // Fermer le calendrier
        closeCalendar() {
            this.isOpen = false;
        },

        // Naviguer vers le mois précédent
        previousMonth() {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
        },

        // Naviguer vers le mois suivant
        nextMonth() {
            this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
        },

        // Sélectionner une date
        selectDate(date) {
            this.selectedDate = new Date(date);
            this.closeCalendar();
        },

        // Vérifier si une date est sélectionnée
        isSelected(date) {
            if (!this.selectedDate) return false;
            return this.formatDate(date) === this.formatDate(this.selectedDate);
        },

        // Vérifier si c'est aujourd'hui
        isToday(date) {
            const today = new Date();
            return this.formatDate(date) === this.formatDate(today);
        },

        // Formater une date
        formatDate(date) {
            if (!date) return '';
            return date.toLocaleDateString('fr-FR');
        },

        // Formater mois et année
        formatMonthYear(date) {
            return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
        },

        // Formater date pour aria-label
        formatDateForAriaLabel(date) {
            return date.toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    }
}

// Exemples d'utilisation
// Sélectionner une date programmatiquement
function selectDate(date) {
    this.selectDate(new Date(date));
}

// Écouter les changements de date
document.addEventListener('date-selected', (e) => {
    console.log('Date sélectionnée:', e.detail.date);
});

// Configuration avec date par défaut
const datePickerConfig = {
    defaultDate: new Date(),
    minDate: new Date('2023-01-01'),
    maxDate: new Date('2025-12-31'),
    locale: 'fr-FR'
};
```

#### Paramètres
- **selectedDate** (Date) : Date actuellement sélectionnée
- **currentDate** (Date) : Mois/année affiché dans le calendrier
- **isOpen** (boolean) : État d'ouverture du calendrier

### Types de configuration
- **Sélection simple** : Sélection d'une seule date
- **Plage de dates** : Sélection d'une date de début et fin
- **Dates limitées** : Restriction sur les dates sélectionnables
- **Formats personnalisés** : Formats d'affichage personnalisables

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Conteneur principal */
.datepicker-container { --max-width: 300px; position: relative; }

/* Champ de saisie */
.datepicker-input { --padding: 0.75rem; --border-color: #d1d5db; --focus-color: #2563eb; }

/* Calendrier */
.datepicker-calendar { --bg-color: white; --border-color: #d1d5db; --shadow: 0 4px 6px rgba(0,0,0,0.1); }

/* Boutons de navigation */
.calendar-nav-btn { --border-color: #d1d5db; --hover-bg: #f3f4f6; --focus-color: #2563eb; }

/* Jours du calendrier */
.calendar-day { --hover-bg: #f3f4f6; --selected-bg: #2563eb; --today-bg: #fef3c7; }
```

### Classes CSS modifiables
- `.datepicker-container` : Conteneur principal du date picker
- `.datepicker-input` : Champ de saisie de date
- `.datepicker-calendar` : Calendrier déroulant
- `.calendar-header` : En-tête avec navigation
- `.calendar-grid` : Grille des jours
- `.calendar-day` : Cellules individuelles des jours
- `.calendar-day.selected` : Jour sélectionné
- `.calendar-day.today` : Jour actuel

## ⌨️ Raccourcis Clavier

### Date Picker
- **Entrée/Espace** : Ouvrir le calendrier (sur le champ)
- **Échap** : Fermer le calendrier
- **Flèche droite** : Jour suivant
- **Flèche gauche** : Jour précédent
- **Flèche bas** : Semaine suivante
- **Flèche haut** : Semaine précédente
- **Home** : Premier jour de la semaine
- **End** : Dernier jour de la semaine
- **Entrée/Espace** : Sélectionner la date focalisée

## 🔧 Configuration Avancée

### Date Picker avec restrictions
```javascript
function datePicker() {
    return {
        ...datePicker(),
        minDate: new Date('2023-01-01'),
        maxDate: new Date('2025-12-31'),

        isDateDisabled(date) {
            return date < this.minDate || date > this.maxDate;
        },

        selectDate(date) {
            if (this.isDateDisabled(date)) {
                this.announce('Date non disponible');
                return;
            }
            this.selectedDate = new Date(date);
            this.closeCalendar();
            this.$dispatch('date-selected', { date: this.selectedDate });
        },

        get calendarDays() {
            // Logique existante avec ajout de isDisabled
            return days.map(day => ({
                ...day,
                isDisabled: this.isDateDisabled(day.date)
            }));
        }
    }
}
```

### Gestion des événements
```javascript
// Événements personnalisés
function datePicker() {
    return {
        // ... autres propriétés

        selectDate(date) {
            const previousDate = this.selectedDate;
            this.selectedDate = new Date(date);

            this.$dispatch('date-changing', {
                from: previousDate,
                to: this.selectedDate
            });

            this.$nextTick(() => {
                this.$dispatch('date-changed', {
                    date: this.selectedDate,
                    formatted: this.formatDate(this.selectedDate)
                });
            });

            this.closeCalendar();
        },

        init() {
            this.$dispatch('datepicker-initialized', {
                defaultDate: this.selectedDate
            });
        }
    }
}

// Écoute des événements
document.addEventListener('date-changing', (e) => {
    console.log('Changement de date:', e.detail.from, '->', e.detail.to);
});

document.addEventListener('date-changed', (e) => {
    console.log('Date changée:', e.detail.formatted);
    // Exemple: valider la date
    validateSelectedDate(e.detail.date);
});
```

### Sélection de plage de dates
```javascript
function dateRangePicker() {
    return {
        ...datePicker(),
        startDate: null,
        endDate: null,
        isSelectingEnd: false,

        selectDate(date) {
            if (!this.startDate || (this.startDate && this.endDate)) {
                // Nouvelle sélection
                this.startDate = new Date(date);
                this.endDate = null;
                this.isSelectingEnd = true;
            } else if (this.isSelectingEnd) {
                // Sélection de la date de fin
                if (date >= this.startDate) {
                    this.endDate = new Date(date);
                    this.isSelectingEnd = false;
                    this.closeCalendar();
                } else {
                    // Date de fin antérieure : nouvelle sélection
                    this.startDate = new Date(date);
                    this.endDate = null;
                }
            }

            this.$dispatch('range-updated', {
                start: this.startDate,
                end: this.endDate
            });
        },

        isInRange(date) {
            if (!this.startDate) return false;
            if (!this.endDate) return false;
            return date >= this.startDate && date <= this.endDate;
        },

        isRangeStart(date) {
            return this.startDate && this.formatDate(date) === this.formatDate(this.startDate);
        },

        isRangeEnd(date) {
            return this.endDate && this.formatDate(date) === this.formatDate(this.endDate);
        }
    }
}
```

### Localisation
```javascript
function datePicker(options = {}) {
    const defaultOptions = {
        locale: 'fr-FR',
        firstDayOfWeek: 1, // 0 = Dimanche, 1 = Lundi
        dateFormat: 'dd/MM/yyyy',
        monthNames: [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ],
        dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    };

    const config = { ...defaultOptions, ...options };

    return {
        ...datePicker(),
        config,

        formatDate(date) {
            if (!date) return '';
            return date.toLocaleDateString(this.config.locale);
        },

        formatMonthYear(date) {
            const monthIndex = date.getMonth();
            return `${this.config.monthNames[monthIndex]} ${date.getFullYear()}`;
        },

        get dayHeaders() {
            const days = [...this.config.dayNames];
            // Réorganiser selon le premier jour de la semaine
            if (this.config.firstDayOfWeek === 1) {
                days.push(days.shift()); // Déplacer dimanche à la fin
            }
            return days;
        }
    }
}
```

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.3.1** Information et relations : Relations ARIA entre champ et calendrier
- ✅ **2.1.1** Clavier : Navigation complète au clavier dans le calendrier
- ✅ **2.1.2** Pas de piège clavier : Navigation fluide entre éléments
- ✅ **2.4.3** Ordre de focus : Ordre logique dans le calendrier

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés pour tous les états
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour le calendrier
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles sur toutes les dates
- ✅ **4.1.2** Nom, rôle, valeur : États ARIA appropriés (aria-selected, aria-label)

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran pour navigation et annonces
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation dans le calendrier

## 🐛 Dépannage

### Problèmes courants

#### Navigation clavier ne fonctionne pas dans le calendrier
```javascript
// Vérifier que les événements sont bien attachés
@keydown="handleDayKeydown($event, day.date, index)"

// S'assurer que prevent est utilisé pour éviter le scroll
@keydown.arrow-right.prevent="focusNextDay(index)"
```

#### Focus non visible sur les dates
```css
/* S'assurer que le focus est bien stylé */
.calendar-day:focus {
    outline: none;
    border-color: #2563eb;
    background-color: #eff6ff;
}

/* Indicateur de focus visible */
.calendar-day:focus-visible {
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}
```

#### Tabindex non géré correctement
```javascript
// Vérifier la logique de tabindex
getFocusTabIndex(date, index) {
    if (this.selectedDate && this.isSelected(date)) return 0;
    if (!this.selectedDate && this.isToday(date)) return 0;
    if (!this.selectedDate && !this.calendarDays.some(day => this.isToday(day.date)) && index === 0) return 0;
    return -1;
}
```

#### Calendrier ne s'ouvre pas
```html
<!-- Vérifier la liaison du focus -->
<input @focus="openCalendar"
       @keydown="handleInputKeydown">

<!-- Vérifier l'affichage conditionnel -->
<div x-show="isOpen" class="datepicker-calendar">
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
- [Date Picker Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/calendar/)
- [Grid Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/grid/)
- [Keyboard Navigation](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)

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