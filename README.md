# 🚀 @sunmeet/ng-stepper-wizard

A modern, lightweight, fully customizable Angular Stepper Wizard built with Standalone Components.

Create beautiful multi-step workflows with support for:

- ✅ Dynamic Steps
- ✅ Conditional Navigation
- ✅ Skip Steps
- ✅ Shared Data Between Steps
- ✅ Full State Persistence
- ✅ Jump To Any Step
- ✅ Custom Themes
- ✅ Standalone Components
- ✅ Angular 20+

---

## Preview

<p align="center">
<img src="./docs/demo.gif" width="900">
</p>

---

# Features

| Feature | Supported |
|----------|-----------|
| Standalone Component | ✅ |
| Multi Step Wizard | ✅ |
| Single Step Wizard | ✅ |
| Dynamic Steps | ✅ |
| Skip Steps | ✅ |
| Jump To Any Step | ✅ |
| Previous / Next Navigation | ✅ |
| Shared Data Store | ✅ |
| Review & Submit | ✅ |
| Conditional Flow | ✅ |
| Custom Themes | ✅ |
| Full Screen Mode | ✅ |
| Responsive Layout | ✅ |

---

# Installation

Install the package.

```bash
npm install @sunmeet/ng-stepper-wizard
```

Install peer dependencies.

```bash
npm install bootstrap angular-feather feather-icons
```

Import Bootstrap.

```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
]
```

---

# Import

```ts
import {
  CommonWizardComponent,
  WizardInterface
} from '@sunmeet/ng-stepper-wizard';
```

---

# Basic Usage

```html
<ng-stepper-wizard
    [wizardTitle]="'Student Registration'"
    [dynamicSteps]="steps"
    (onComplete)="submit()">
</ng-stepper-wizard>
```

---

# Creating Steps

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

# Wizard API

Every step automatically receives a **wizard controller**.

```ts
@Input()
wizard!: any;
```

Available methods

```ts
wizard.next()

wizard.prev()

wizard.skip()

wizard.goToStep(3)

wizard.finish()

wizard.reset()

wizard.setData(key,value)

wizard.getData(key)

wizard.getAllData()

wizard.currentStep()

wizard.totalSteps()
```

---

# Store Data

```ts
this.wizard.setData('role','Student');
```

Retrieve later

```ts
const role=this.wizard.getData('role');
```

Retrieve everything

```ts
const data=this.wizard.getAllData();
```

---

# Conditional Navigation

Example:

```ts
if(role==='Student'){
    this.wizard.goToStep(3);
}
else{
    this.wizard.next();
}
```

---

# Skip Optional Step

```ts
this.wizard.skip();
```

---

# Jump To Any Step

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

| Input | Description |
|--------|-------------|
| wizardTitle | Wizard Title |
| wizardId | Unique Wizard Identifier |
| dynamicSteps | Array of Wizard Steps |

---

# Outputs

| Output | Description |
|--------|-------------|
| onComplete | Wizard Completed |
| onStepChange | Step Changed |
| closeWizardEmitter | Close Wizard |

---

# Advanced Examples

✔ Student Registration

✔ Product Configuration

✔ Employee Onboarding

✔ Course Enrollment

✔ Loan Application

✔ Checkout Wizard

✔ Insurance Forms

✔ Multi Page Forms

✔ Survey Wizard

✔ Dynamic Workflows

---

# Roadmap

- [ ] Lazy Loaded Steps
- [ ] Step Validation API
- [ ] Async Navigation Guards
- [ ] Theme Builder
- [ ] Animation Presets
- [ ] Mobile Stepper
- [ ] Dark Mode
- [ ] RTL Support
- [ ] i18n

---

# Compatibility

| Angular Version | Supported |
|-----------------|-----------|
| 20 | ✅ |
| 21 | Planned |

---

# Contributing

Contributions are welcome!

Please open an Issue before submitting a Pull Request.

---

# License

MIT

---

Made with ❤️ by Sunmeet Kaur
