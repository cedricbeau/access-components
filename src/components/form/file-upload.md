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

## 📤 File Upload

### Description
Composant de téléchargement de fichiers avec support du glisser-déposer (drag & drop). Gestion complète de l'accessibilité avec validation de fichiers, annonces pour lecteurs d'écran et navigation clavier. Supporte la sélection multiple et la validation en temps réel.

### Fonctionnalités d'accessibilité
- **ARIA** : `role="button"`, `role="alert"`, `role="region"`, `aria-describedby`, `aria-label`, `aria-live`
- **Navigation clavier** : Enter/Space pour ouvrir le sélecteur, Tab pour navigation, Delete pour suppression
- **Lecteurs d'écran** : Annonces de statut, validation et erreurs en temps réel
- **Focus management** : Zone de drop focusable, boutons de suppression accessibles
- **Sémantique** : Structure claire avec régions et listes sémantiques
- **États visuels** : Indicateurs visuels de drag over, erreurs et succès

### Usage

#### HTML Structure
```html
<div x-data="fileUpload()">
    <!-- Zone de drop principale -->
    <div
        role="button"
        tabindex="0"
        aria-describedby="upload-instructions"
        :aria-label="`Zone de téléchargement. ${files.length} fichier(s) sélectionné(s)`"
        class="upload-zone"
        :class="dropzoneClasses"
        @click="$refs.fileInput.click()"
        @keydown.enter.prevent="$refs.fileInput.click()"
        @keydown.space.prevent="$refs.fileInput.click()"
        @dragover.prevent="isDragOver = true"
        @dragleave.prevent="isDragOver = false"
        @drop.prevent="handleDrop($event)">

        <!-- Contenu de la zone de drop -->
        <div class="upload-content">
            <svg class="upload-icon" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <h3 class="upload-title">Glissez vos fichiers ici</h3>
            <p class="upload-subtitle">ou cliquez pour sélectionner</p>
        </div>

        <!-- Input file caché -->
        <input
            type="file"
            x-ref="fileInput"
            multiple
            :accept="acceptedTypes"
            @change="handleFileSelect($event)"
            class="sr-only"
            aria-describedby="upload-instructions">
    </div>

    <!-- Instructions -->
    <div id="upload-instructions" class="upload-instructions">
        <p><strong>Formats acceptés :</strong> JPG, PNG, PDF • <strong>Taille maximale :</strong> 10 MB par fichier</p>
        <p>Vous pouvez sélectionner plusieurs fichiers à la fois</p>
    </div>

    <!-- Zone d'annonces pour les lecteurs d'écran -->
    <div aria-live="polite" aria-atomic="true" class="sr-only">
        <span x-text="announceText"></span>
    </div>

    <!-- Zone de statut -->
    <div x-show="files.length > 0 && errors.length === 0" class="status-zone">
        <span x-text="`✓ ${files.length} fichier(s) prêt(s) pour le téléchargement`"></span>
    </div>

    <!-- Liste des fichiers sélectionnés -->
    <div x-show="files.length > 0"
         x-transition
         class="files-list"
         role="region"
         aria-label="Fichiers sélectionnés">
        <h4>Fichiers sélectionnés (<span x-text="files.length"></span>)</h4>
        <ul role="list">
            <template x-for="(file, index) in files" :key="index">
                <li class="file-item" role="listitem">
                    <div class="file-info">
                        <span class="file-name" x-text="file.name"></span>
                        <span class="file-size" x-text="formatFileSize(file.size)"></span>
                        <span x-show="file.error" class="file-error" x-text="file.error"></span>
                    </div>
                    <button
                        type="button"
                        :aria-label="`Supprimer le fichier ${file.name}`"
                        @click="removeFile(index)"
                        @keydown.delete.prevent="removeFile(index)"
                        class="file-remove">
                        <span aria-hidden="true">×</span>
                    </button>
                </li>
            </template>
        </ul>
    </div>

    <!-- Messages d'erreur -->
    <div x-show="errors.length > 0"
         x-transition
         role="alert"
         aria-live="assertive"
         class="error-messages">
        <ul>
            <template x-for="error in errors" :key="error">
                <li x-text="error"></li>
            </template>
        </ul>
    </div>
</div>
```

#### JavaScript API
```javascript
function fileUpload() {
    return {
        files: [],
        errors: [],
        isDragOver: false,
        announceText: '',
        acceptedTypes: '.jpg,.jpeg,.png,.pdf',
        maxFileSize: 10 * 1024 * 1024, // 10MB

        get dropzoneClasses() {
            return {
                'dragover': this.isDragOver,
                'has-files': this.files.length > 0,
                'has-errors': this.errors.length > 0
            }
        },

        // Gérer le drop de fichiers
        handleDrop(event) {
            this.isDragOver = false;
            const droppedFiles = Array.from(event.dataTransfer.files);
            this.processFiles(droppedFiles);
        },

        // Gérer la sélection de fichiers
        handleFileSelect(event) {
            const selectedFiles = Array.from(event.target.files);
            this.processFiles(selectedFiles);
        },

        // Traiter les nouveaux fichiers
        processFiles(newFiles) {
            this.errors = [];

            newFiles.forEach(file => {
                const isDuplicate = this.files.some(existingFile =>
                    existingFile.name === file.name && existingFile.size === file.size
                );

                if (isDuplicate) {
                    this.errors.push(`${file.name}: Fichier déjà sélectionné`);
                    return;
                }

                if (this.validateFile(file)) {
                    this.files.push({
                        name: file.name,
                        size: file.size,
                        file: file,
                        error: null,
                        id: Date.now() + Math.random()
                    });
                }
            });

            this.announceFileSelection();
        },

        // Valider un fichier
        validateFile(file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

            if (!allowedTypes.includes(file.type)) {
                this.errors.push(`${file.name}: Type de fichier non autorisé`);
                return false;
            }

            if (file.size > this.maxFileSize) {
                this.errors.push(`${file.name}: Fichier trop volumineux (maximum 10 MB)`);
                return false;
            }

            if (file.size === 0) {
                this.errors.push(`${file.name}: Fichier vide`);
                return false;
            }

            return true;
        },

        // Supprimer un fichier
        removeFile(index) {
            const fileName = this.files[index].name;
            this.files.splice(index, 1);
            this.announceText = `Fichier ${fileName} supprimé. ${this.files.length} fichier(s) restant(s).`;

            if (this.files.length === 0) {
                this.errors = [];
            }
        },

        // Formater la taille du fichier
        formatFileSize(bytes) {
            if (bytes === 0) return '0 B';
            const k = 1024;
            const sizes = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },

        // Annoncer la sélection aux lecteurs d'écran
        announceFileSelection() {
            setTimeout(() => {
                if (this.files.length === 1) {
                    this.announceText = `1 fichier sélectionné : ${this.files[0].name}`;
                } else if (this.files.length > 1) {
                    this.announceText = `${this.files.length} fichiers sélectionnés`;
                }

                if (this.errors.length > 0) {
                    this.announceText += `. ${this.errors.length} erreur(s) détectée(s).`;
                }
            }, 100);
        },

        // Obtenir les fichiers valides
        getValidFiles() {
            return this.files.filter(file => !file.error).map(file => file.file);
        },

        // Réinitialiser le composant
        reset() {
            this.files = [];
            this.errors = [];
            this.announceText = 'Composant réinitialisé';
            this.$refs.fileInput.value = '';
        }
    }
}

// Exemples d'utilisation
// Obtenir les fichiers sélectionnés
function getSelectedFiles() {
    return this.getValidFiles();
}

// Écouter les changements de fichiers
document.addEventListener('alpine:init', () => {
    Alpine.data('fileUpload', fileUpload);
});

// Configuration personnalisée
const uploadConfig = {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: '.jpg,.png', // Seulement images
    maxFiles: 3 // Limite de fichiers
};
```

#### Paramètres
- **files** (array) : Liste des fichiers sélectionnés
- **errors** (array) : Liste des messages d'erreur
- **acceptedTypes** (string) : Types de fichiers acceptés
- **maxFileSize** (number) : Taille maximale par fichier en bytes

### Types de configuration
- **Upload simple** : Un seul fichier à la fois
- **Upload multiple** : Plusieurs fichiers simultanément
- **Upload avec validation** : Validation avancée des types et tailles
- **Upload avec preview** : Aperçu des images sélectionnées

## 🎨 Personnalisation CSS

### Variables CSS principales
```css
/* Zone de drop */
.upload-zone { --border-color: #cbd5e0; --bg-color: #f7fafc; --border-radius: 12px; }
.upload-zone:hover { --hover-border: #4299e1; --hover-bg: #ebf8ff; }
.upload-zone.dragover { --drag-border: #38a169; --drag-bg: #f0fff4; }

/* Contenu de la zone */
.upload-content { --gap: 1rem; --text-align: center; }
.upload-title { --font-size: 1.5rem; --font-weight: 600; --color: #2d3748; }
.upload-subtitle { --color: #718096; --font-size: 1.1rem; }

/* Liste des fichiers */
.files-list { --border: 1px solid #e2e8f0; --bg-color: white; }
.file-item { --padding: 1rem; --border-bottom: 1px solid #e2e8f0; }
.file-remove { --bg-hover: #fed7d7; --border-hover: #e53e3e; }

/* Messages d'erreur */
.error-messages { --bg-color: #fed7d7; --border-color: #feb2b2; --text-color: #c53030; }
```

### Classes CSS modifiables
- `.upload-zone` : Zone principale de drop avec états interactifs
- `.upload-content` : Contenu centré de la zone de drop
- `.files-list` : Container pour la liste des fichiers
- `.file-item` : Élément individuel de fichier
- `.file-remove` : Bouton de suppression de fichier
- `.error-messages` : Zone d'affichage des erreurs

## ⌨️ Raccourcis Clavier

### File Upload
- **Tab** : Navigation vers la zone de drop
- **Enter/Space** : Ouvrir le sélecteur de fichiers
- **Tab** : Navigation dans la liste des fichiers
- **Delete** : Supprimer un fichier (sur le bouton de suppression)
- **Escape** : Annuler une opération de drag & drop

## 🔧 Configuration Avancée

### Upload avec validation personnalisée
```javascript
function customFileUpload() {
    return {
        ...fileUpload(),

        // Configuration personnalisée
        acceptedTypes: '.jpg,.png,.gif,.webp',
        maxFileSize: 5 * 1024 * 1024, // 5MB
        maxFiles: 5,

        // Validation personnalisée
        validateFile(file) {
            // Validation du nombre de fichiers
            if (this.files.length >= this.maxFiles) {
                this.errors.push(`Maximum ${this.maxFiles} fichiers autorisés`);
                return false;
            }

            // Validation de la dimension pour les images
            if (file.type.startsWith('image/')) {
                return this.validateImageDimensions(file);
            }

            return this.defaultValidation(file);
        },

        async validateImageDimensions(file) {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    if (img.width > 2000 || img.height > 2000) {
                        this.errors.push(`${file.name}: Dimensions trop importantes (max 2000x2000px)`);
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                };
                img.src = URL.createObjectURL(file);
            });
        }
    }
}
```

### Upload avec preview d'images
```javascript
function imageUploadWithPreview() {
    return {
        ...fileUpload(),

        processFiles(newFiles) {
            this.errors = [];

            newFiles.forEach(async (file) => {
                if (this.validateFile(file)) {
                    const fileData = {
                        name: file.name,
                        size: file.size,
                        file: file,
                        error: null,
                        id: Date.now() + Math.random(),
                        preview: null
                    };

                    // Générer preview pour les images
                    if (file.type.startsWith('image/')) {
                        fileData.preview = await this.generatePreview(file);
                    }

                    this.files.push(fileData);
                }
            });

            this.announceFileSelection();
        },

        generatePreview(file) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });
        }
    }
}
```

### Gestion des événements
```javascript
function fileUploadWithEvents() {
    return {
        ...fileUpload(),

        processFiles(newFiles) {
            // Déclencher événement avant traitement
            this.$dispatch('files-processing', { files: newFiles });

            // Traitement normal
            this.errors = [];
            // ... logique de traitement

            // Déclencher événement après traitement
            this.$dispatch('files-processed', {
                validFiles: this.getValidFiles(),
                errors: this.errors
            });
        },

        removeFile(index) {
            const file = this.files[index];

            // Déclencher événement avant suppression
            this.$dispatch('file-removing', { file, index });

            this.files.splice(index, 1);

            // Déclencher événement après suppression
            this.$dispatch('file-removed', { fileName: file.name, remainingCount: this.files.length });
        }
    }
}

// Écoute des événements
document.addEventListener('files-processed', (e) => {
    console.log('Files processed:', e.detail.validFiles);
    if (e.detail.errors.length > 0) {
        console.warn('Errors:', e.detail.errors);
    }
});

document.addEventListener('file-removed', (e) => {
    console.log(`File ${e.detail.fileName} removed. ${e.detail.remainingCount} files remaining.`);
});
```

### Upload avec barre de progression
```javascript
function uploadWithProgress() {
    return {
        ...fileUpload(),
        uploadProgress: {},
        isUploading: false,

        async uploadFiles() {
            const validFiles = this.getValidFiles();
            if (validFiles.length === 0) return;

            this.isUploading = true;

            for (const fileData of this.files) {
                if (!fileData.error) {
                    await this.uploadSingleFile(fileData);
                }
            }

            this.isUploading = false;
        },

        async uploadSingleFile(fileData) {
            const formData = new FormData();
            formData.append('file', fileData.file);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        this.uploadProgress[fileData.id] = progress;
                    }
                });

                if (response.ok) {
                    fileData.uploaded = true;
                    this.announceText = `${fileData.name} uploadé avec succès`;
                } else {
                    fileData.error = 'Erreur lors de l\'upload';
                }
            } catch (error) {
                fileData.error = 'Erreur de connexion';
            }
        }
    }
}
```

## 🧪 Tests d'Accessibilité

### Liste de vérification WCAG 2.1 AA

#### Niveau A
- ✅ **1.3.1** Information et relations : Relations ARIA entre zone de drop et instructions
- ✅ **2.1.1** Clavier : Navigation complète au clavier avec Enter/Space
- ✅ **2.1.2** Pas de piège clavier : Navigation fluide entre éléments
- ✅ **2.4.3** Ordre de focus : Ordre logique de navigation

#### Niveau AA
- ✅ **1.4.3** Contraste : Ratios de contraste respectés pour tous les états
- ✅ **2.4.6** En-têtes et étiquettes : Labels descriptifs pour zone de drop et fichiers
- ✅ **2.4.7** Focus visible : Indicateurs de focus visibles
- ✅ **4.1.2** Nom, rôle, valeur : États ARIA appropriés et annonces live

### Outils de test recommandés
- **axe-core** : Extension navigateur pour audit automatique
- **NVDA/JAWS** : Test avec lecteurs d'écran pour annonces et navigation
- **Lighthouse** : Audit d'accessibilité intégré Chrome
- **Keyboard navigation** : Test manuel de navigation clavier et drag & drop

## 🐛 Dépannage

### Problèmes courants

#### Drag & drop ne fonctionne pas
```javascript
// Vérifier que preventDefault est appelé
@dragover.prevent="isDragOver = true"
@drop.prevent="handleDrop($event)"

// S'assurer que les événements sont bien gérés
handleDrop(event) {
    event.preventDefault();
    this.isDragOver = false;
    // ... traitement
}
```

#### Validation de fichiers échoue
```javascript
// Vérifier les types MIME acceptés
const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

// Debug de la validation
validateFile(file) {
    console.log('File type:', file.type);
    console.log('File size:', file.size);
    // ... logique de validation
}
```

#### Annonces lecteur d'écran manquantes
```html
<!-- S'assurer que aria-live est présent -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
    <span x-text="announceText"></span>
</div>

<!-- Vérifier que announceText est mis à jour -->
<script>
this.announceText = 'Message pour lecteur d\'écran';
</script>
```

#### Focus non visible sur la zone de drop
```css
/* S'assurer que le focus est bien stylé */
.upload-zone:focus {
    outline: 3px solid #4299e1;
    outline-offset: 2px;
}

/* Éviter outline: none sans alternative */
.upload-zone:focus:not(:focus-visible) {
    outline: none;
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
- [File Upload Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/upload/)
- [Drag and Drop](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)

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