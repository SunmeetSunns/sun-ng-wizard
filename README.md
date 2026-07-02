# Angular Wizard

A reusable, standalone, highly customizable Angular Wizard Component for building modern multi-step workflows.

<p align="center">

![Angular](https://img.shields.io/badge/Angular-15+-red)

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

![License](https://img.shields.io/npm/l/angular-wizard)

![npm](https://img.shields.io/npm/v/angular-wizard)

</p>

---

## ✨ Features

- 🚀 Standalone Angular Component
- 📄 Single & Multi-Step Wizards
- ⚡ Dynamic Step Rendering
- ⏭ Skip Optional Steps
- 🔀 Jump to Any Step
- 💾 Shared Data Store
- 📦 Dynamic Component Loading
- 🎨 Fully Customizable UI
- 📱 Responsive Layout
- 🔄 Full Wizard Reset
- 🖥 Full Screen Mode
- 🎯 Event Driven API
- 🧩 Bootstrap Compatible

---

## Installation

```bash
npm install angular-wizard
```

---

## Import

```ts
import {
  CommonWizardComponent,
  WizardInterface
} from 'angular-wizard';
```

---

## Basic Usage

```html
<acl-create-wizard
  [wizardTitle]="'Student Registration'"
  [dynamicSteps]="steps"
  (onComplete)="submit()">
</acl-create-wizard>
```

---

## Configure Steps

```ts
steps: WizardInterface[] = [
  {
    title: 'Basic Details',
    component: BasicDetailsComponent
  },
  {
    title: 'Address',
    component: AddressComponent
  },
  {
    title: 'Review',
    component: ReviewComponent
  }
];
```

---

## Wizard Controller

Every step automatically receives a Wizard Controller.

```ts
@Input()
wizard!: WizardController;
```

Available Methods

| Method | Description |
|----------|-------------|
| next() | Move to next step |
| prev() | Move to previous step |
| skip() | Skip current step |
| goToStep(step) | Jump directly |
| finish() | Complete Wizard |
| reset() | Reset Wizard |
| setData() | Save Data |
| getData() | Read Data |
| getAllData() | Read Complete Data |

---

## Built With

- Angular
- TypeScript
- Dynamic Components
- Standalone Components

---

## Roadmap

- Validation API
- Lazy Loaded Steps
- Async Step Support
- Nested Wizards
- Theme Packs
- Drag & Drop Steps

---

## License

MIT License

---

Made with ❤️ by Sunmeet Kaur
