# 🚀 sun-ng-stepper-wizard

A modern, lightweight and highly customizable **Angular Stepper Wizard** built with Standalone Components.

Create beautiful multi-step workflows with dynamic navigation, shared state management, conditional step rendering and a fully customizable UI.

---

## ✨ Features

- ✅ Standalone Angular Component
- ✅ Multi-Step Wizard
- ✅ Single-Step Wizard
- ✅ Dynamic Step Rendering
- ✅ Conditional Navigation
- ✅ Skip Optional Steps
- ✅ Jump to Any Step
- ✅ Previous / Next Navigation
- ✅ Shared Data Store
- ✅ Review & Submit Flow
- ✅ Full Screen Mode
- ✅ Customizable Theme
- ✅ Responsive Design
- ✅ Bootstrap Compatible
- ✅ Angular 20+

---

# 📦 Installation

Install the library.

```bash
npm install sun-ng-stepper-wizard
```

Install the required peer dependencies.

```bash
npm install bootstrap angular-feather feather-icons
```

---

# 🎨 Configure Styles

Add Bootstrap and the Wizard theme inside **angular.json**.

```json
{
  "styles": [
    "src/styles.scss",
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "node_modules/@sunmeet/ng-stepper-wizard/styles/wizard-theme.scss"
  ]
}
```

> **Note**
>
> `wizard-theme.scss` contains the default styles required for the wizard component.  
> You can customize or override these styles in your own application if needed.

---

# 🚀 Import

```ts
import { CommonWizardComponent, WizardInterface } from '@sunmeet/ng-stepper-wizard';
```

---

# Basic Example

```html
<ng-stepper-wizard
  wizardTitle="Student Registration"
  [dynamicSteps]="steps"
  (onComplete)="submit()"
>
</ng-stepper-wizard>
```

---

# Create Steps

```ts
steps: WizardInterface[] = [
  {
    title: 'Basic Details',
    component: BasicDetailsComponent
  },
  {
    title: 'Department',
    component: DepartmentComponent
  },
  {
    title: 'Review',
    component: ReviewComponent
  }
];
```

---

# Wizard Controller

Every step automatically receives a Wizard Controller.

```ts
@Input()
wizard!: any;
```

Available APIs

```ts
wizard.next();

wizard.prev();

wizard.skip();

wizard.goToStep(stepNumber);

wizard.finish();

wizard.reset();

wizard.setData(key, value);

wizard.getData(key);

wizard.getAllData();

wizard.currentStep();

wizard.totalSteps();
```

---

# Store Shared Data

```ts
this.wizard.setData('role', 'Student');
```

Retrieve data

```ts
const role = this.wizard.getData('role');
```

Retrieve everything

```ts
const data = this.wizard.getAllData();
```

---

# Conditional Navigation

```ts
if (role === 'Student') {
  this.wizard.goToStep(3);
} else {
  this.wizard.next();
}
```

---

# Skip Current Step

```ts
this.wizard.skip();
```

---

# Jump to Any Step

```ts
this.wizard.goToStep(5);
```

---

# Finish Wizard

```ts
this.wizard.finish();
```

---

# Reset Wizard

```ts
this.wizard.reset();
```

---

# Inputs

| Input        | Type              | Description                |
| ------------ | ----------------- | -------------------------- |
| wizardTitle  | string            | Wizard Title               |
| wizardId     | string            | Unique Wizard Identifier   |
| dynamicSteps | WizardInterface[] | Wizard Steps Configuration |

---

# Outputs

| Output             | Description                             |
| ------------------ | --------------------------------------- |
| onComplete         | Fires when the wizard is completed      |
| onStepChange       | Fires whenever the current step changes |
| closeWizardEmitter | Closes the wizard                       |

---

# Example Use Cases

- 🎓 Student Registration
- 👨‍🏫 Teacher Onboarding
- 👨‍💼 Employee Onboarding
- 🛒 Product Configuration
- 💳 Checkout Flow
- 📋 Survey Wizard
- 📝 Multi-page Forms
- 🏦 Loan Application
- 🩺 Healthcare Registration
- 📦 Order Configuration

---

# Compatibility

| Angular Version | Support      |
| --------------- | ------------ |
| Angular 20      | ✅ Supported |
| Angular 21      | Planned      |

---

# Roadmap

- [ ] Lazy Loaded Steps
- [ ] Route-based Wizard
- [ ] Step Validation API
- [ ] Async Validation
- [ ] Theme Builder
- [ ] Dark Theme
- [ ] RTL Support
- [ ] Internationalization (i18n)
- [ ] Custom Animations

---

# Contributing

Contributions, issues and feature requests are welcome.

If you'd like to contribute:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

# License

MIT License © 2026 Sunmeet Kaur

---

## ⭐ If you find this project useful, please consider giving it a star on GitHub!

Made with ❤️ by Sunmeet Kaur.
