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

## 📢 Banner d'Information

### Description
Messages d'information persistants affichés en haut de page. Contrairement aux toasts, ils restent visibles jusqu'à fermeture manuelle ou peuvent être configurés comme persistants.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="banner"`, `aria-labelledby`, `aria-describedby`
- **Navigation clavier** : Bouton de fermeture focusable
- **Lecteurs d'écran** : Structure sémantique claire avec titre et description
- **Visibilité** : Positionnement en début de contenu pour être remarqué

### Usage

#### HTML Structure
```html
<div x-data="bannerManager()" x-ref="bannerManager">
    <template x-for="banner in banners" :key="banner.id">
        <div
            :class="['banner', banner.type, 'slide-in']"
            role="banner"
            :aria-labelledby="'banner-title-' + banner.id"
            :aria-describedby="'banner-message-' + banner.id"
            x-show="banner.visible"
            x-transition:enter="transition ease-out duration-300"
            x-transition:enter-start="transform -translate-y-2 opacity-0"
            x-transition:enter-end="transform translate-y-0 opacity-100"
            x-transition:leave="transition ease-in duration-200"
            x-transition:leave-start="transform translate-y-0 opacity-100"
            x-transition:leave-end="transform -translate-y-2 opacity-0"
        >
            <div class="banner-icon" aria-hidden="true">
                <span x-show="banner.type === 'info'">ℹ️</span>
                <span x-show="banner.type === 'success'">✅</span>
                <span x-show="banner.type === 'warning'">⚠️</span>
                <span x-show="banner.type === 'error'">❌</span>
            </div>
            <div class="banner-content">
                <h3 :id="'banner-title-' + banner.id" class="banner-title" x-text="banner.title"></h3>
                <p :id="'banner-message-' + banner.id" class="banner-message" x-text="banner.message"></p>
            </div>
            <button
                class="banner-close"
                @click="hideBanner(banner.id)"
                :aria-label="'Fermer le banner ' + banner.title"
                type="button"
            >
                ×
            </button>
        </div>
    </template>
</div>
```

#### JavaScript API
```javascript
// Afficher un banner
$refs.bannerManager.showBanner(type, title, message, persistent)

// Exemples
$refs.bannerManager.showBanner('info', 'Nouvelle fonctionnalité', 'Interface mise à jour.')
$refs.bannerManager.showBanner('success', 'Sauvegarde réussie', 'Vos données ont été sauvegardées.')
$refs.bannerManager.showBanner('warning', 'Maintenance', 'Maintenance prévue demain.', true) // Persistant
$refs.bannerManager.showBanner('error', 'Service indisponible', 'Réessayez plus tard.')

// Fermer manuellement un banner
$refs.bannerManager.hideBanner(bannerId)
```

#### Paramètres
- **type** (string) : `'info'`, `'success'`, `'warning'`, `'error'`
- **title** (string) : Titre du banner
- **message** (string) : Message descriptif
- **persistent** (boolean, optionnel) : Si `true`, ne disparaît pas automatiquement (défaut: false)

### Types disponibles
- **info** : Bleu, pour les informations générales
- **success** : Vert, pour les confirmations d'actions
- **warning** : Orange, pour les avertissements
- **error** : Rouge, pour les erreurs importantes

### Comportement temporel
- **Non-persistant** : Disparaît automatiquement après 10 secondes
- **Persistant** : Reste visible jusqu'à fermeture manuelle

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Couleurs par type */
.banner.success { --color: #10b981; }
.banner.error { --color: #ef4444; }
.banner.warning { --color: #f59e0b; }
.banner.info { --color: #3b82f6; }

/* Durées d'animation */
.banner { transition: all 0.3s ease; }
```

### Classes CSS modifiables
- `.banner` : Style des banners
- `.btn` : Style des boutons

## ⌨️ Raccourcis Clavier

### Banners
- **Tab** : Navigation vers le bouton de fermeture
- **Enter/Espace** : Fermer le banner

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

#### Animations saccadées
```css
/* Ajouter will-change pour optimiser les performances */
.banner {
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
- [Banner Landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html)

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