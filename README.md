# Access Components

Generic Alpine.js component library for Astro with a focus on accessibility.

## 🎯 Objective

This library provides reusable web components built with Alpine.js for Astro, all designed to be:
- ♿ **Screen reader accessible** with proper ARIA semantics
- ⌨️ **Keyboard navigable** according to WCAG 2.1 standards
- 🔧 **Easy to integrate** into your existing projects

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📦 Available Components

### 🧭 Navigation Components

- **Breadcrumb** - Breadcrumb trail with keyboard navigation
- **Menubar** - Accessible horizontal menu bar
- **Custom Dropdown/Select** - Accessible alternative to native `<select>` elements
- **Pagination** - Page navigation with status indicators
- **Stepper/Wizard** - Step-by-step navigation with progress tracking
- **Sidebar/Navigation drawer** - Sliding side menu

### 🎨 Interface Components

- **Tooltip** - Accessible tooltips on hover and keyboard focus
- **Popover** - Contextual content richer than tooltips
- **Toggle/Switch** - Accessible on/off switch with voice states
- **Progress Bar** - Progress bar with voice announcements
- **Loading Spinner** - Loading indicator with alternative text

### 📝 Form Components

- **Combobox/Autocomplete** - Input field with accessible suggestions
- **Date Picker** - Keyboard-navigable date selector
- **File Upload** - Drag-and-drop area with accessible feedback
- **Form Validation** - Dynamic and accessible error messages

### 📄 Content Components

- **Carousel/Slider** - Image carousel with accessible controls
- **Sortable Table** - Table with accessible sorting and filtering
- **Card** - Semantically structured content cards
- **Accordion** - Collapsible sections with focus management
- **Tabs** - Tabs with complete keyboard navigation

### 🔔 Alert Components

- **Notification Toast** - Temporary notifications with voice announcements
- **Confirmation Dialog** - Accessible modal dialog boxes
- **Banner** - Persistent information messages at the top of the page

## ♿ Accessibility Features

### Standards Compliance
- **WCAG 2.1 AA** - Compliance with accessibility guidelines
- **ARIA 1.1** - Appropriate use of ARIA attributes
- **Section 508** - Compatible with government requirements

### Key Features
- 🎯 **Focus management** - Logical and visible navigation
- 🔊 **Voice announcements** - Appropriate feedback for screen readers
- ⌨️ **Keyboard navigation** - Full support for standard shortcuts
- 🎨 **High contrast** - Respects WCAG contrast ratios
- 📱 **Responsive** - Adapted to different screen sizes

## 🧪 Accessibility Testing

Each component is tested with:
- **Screen readers**: NVDA, JAWS, VoiceOver
- **Keyboard navigation**: All major browsers
- **Automated tools**: axe-core, WAVE, Lighthouse

## 📋 Prerequisites

- **Astro 4.x** or higher
- **Alpine.js 3.x** or higher
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

## 📄 License

This project is licensed under the [MIT](LICENSE) license.

## 🙏 Acknowledgments

- [Astro](https://astro.build/) for the static site generation framework
- [Alpine.js](https://alpinejs.dev/) for the lightweight and powerful framework
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) for the guidelines
- The web accessibility community

## 🔗 Useful Links

- [Astro Documentation](https://docs.astro.build/)
- [Alpine.js Documentation](https://alpinejs.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [Accessibility Developer Guide](https://www.accessibility-developer-guide.com/)

---

**⭐ If this project helps you, don't hesitate to give it a star!**