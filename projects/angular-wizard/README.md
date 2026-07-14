# 🚀 ngx-stepper-wizard

A modern, lightweight and highly customizable **Angular Stepper Wizard** built with Standalone Components.

Create beautiful multi-step workflows with dynamic navigation, shared state management, conditional step rendering and a fully customizable UI.

---

## ✨ Features

- ✅ Standalone Angular Component
- ✅ Dynamic Multi-Step Wizard
- ✅ Single-Step Wizard Support
- ✅ Dynamic Step Rendering
- ✅ Shared Wizard State
- ✅ Previous / Next Navigation
- ✅ Skip Optional Steps
- ✅ Jump to Any Step
- ✅ Review & Submit Flow
- ✅ Full Screen Mode
- ✅ Dynamic Modal Width & Height
- ✅ Minimum Modal Size Protection
- ✅ Bootstrap Compatible
- ✅ Responsive Design
- ✅ Angular 20+

---

# 📦 Installation

Install the library.

```bash
npm install ngx-stepper-wizard
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
    "node_modules/ngx-stepper-wizard/styles/wizard-theme.scss"
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
import { NgxStepperWizardComponent, WizardInterface } from 'ngx-stepper-wizard';
```

---

# Basic Example

```html
<ng-template #wizardModal>
  <ngx-stepper-wizard
    wizardTitle="Student Registration"
    [dynamicSteps]="steps"
    [width]="1200"
    [maxWidth]="'90vw'"
    [height]="'80vh'"
    (onComplete)="submit()"
    (closeWizardEmitter)="closeWizard()"
    [isExpandable]="false"
  >
  </ngx-stepper-wizard>
</ng-template>
```

---

---

# 📐 Modal Size

The wizard allows you to customize the modal dimensions.

```html
<ngx-stepper-wizard [width]="1200" [maxWidth]="'90vw'" [height]="'80vh'"> </ngx-stepper-wizard>
```

### Supported Values

```html
[width]="1200" [width]="'70%'" [width]="'80vw'" [maxWidth]="'1100px'" [height]="700"
[height]="'75vh'"
```

> **Note**
>
> The wizard enforces a minimum supported modal size of:
>
> - **Width:** `500px`
> - **Height:** `350px`
>
> Values smaller than these limits are automatically adjusted to ensure the wizard layout remains fully functional.

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

| Input        | Type              | Description                       |
| ------------ | ----------------- | --------------------------------- |
| wizardTitle  | string            | Wizard Title                      |
| wizardId     | string            | Unique Wizard Identifier          |
| dynamicSteps | WizardInterface[] | Wizard Steps Configuration        |
| isExpandable | boolean           | To Hide/Show expand functionality |

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
