Here is the complete, cohesive, and ready-to-use `README.md` file based on your updated implementation details. It merges the structure, dependencies, inputs/outputs, and clean formatting so that you can copy and paste it directly.

````markdown
# 🚀 ngx-stepper-wizard

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

Install the library via npm:

```bash
npm install ngx-stepper-wizard
```
````

Install the required peer dependencies for icons and layouts:

```bash
npm install bootstrap angular-feather feather-icons

```

---

# 🎨 Configure Styles

Add Bootstrap and the Wizard theme inside your **angular.json** configuration file:

```json
{
  "styles": [
    "src/styles.scss",
    "node_modules/bootstrap/dist/css/bootstrap.min.css",
    "node_modules/ngx-stepper-wizard/styles/wizard-theme.scss"
  ]
}
```

> 💡 **Note:** `wizard-theme.scss` contains the default style structures required for the wizard framework. You can customize or override these classes inside your application's global styles if needed.

---

# 🚀 Import

Import the core component and structural interface inside your Standalone Angular Component:

```ts
import { NgxStepperWizardComponent } from 'ngx-stepper-wizard';
import { WizardInterface } from './interfaces/wizard-interface'; // Path to your interface
```

---

# Basic Example

Add the selector to your template and bind your dynamic step configuration:

```html
<ngx-stepper-wizard
  wizardId="student-registration-flow"
  wizardTitle="Student Registration"
  [dynamicSteps]="steps"
  (onComplete)="submit()"
  (onStepChange)="handleStepChange($event)"
  (closeWizardEmitter)="close($event)"
>
</ngx-stepper-wizard>
```

---

# Create Steps

Define your dynamic wizard array configuration in your parent component. Each component defined here will act as an independent step view.

```ts
import { Component } from '@angular/core';
import { WizardInterface } from './interfaces/wizard-interface';
import { BasicDetailsComponent } from './steps/basic-details.component';
import { DepartmentComponent } from './steps/department.component';
import { ReviewComponent } from './steps/review.component';

@Component({
  selector: 'app-registration-container',
  standalone: true,
  imports: [NgxStepperWizardComponent],
  templateUrl: './registration-container.component.html',
})
export class RegistrationContainerComponent {
  steps: WizardInterface[] = [
    {
      title: 'Basic Details',
      component: BasicDetailsComponent,
      data: { role: 'Student' }, // Optional static input properties passed automatically
    },
    {
      title: 'Department',
      component: DepartmentComponent,
    },
    {
      title: 'Review',
      component: ReviewComponent,
    },
  ];

  submit() {
    console.log('Wizard workflow completed and submitted!');
  }

  handleStepChange(event: { currentStep: number; action: string }) {
    console.log(`Mapsd to step ${event.currentStep} via action: ${event.action}`);
  }

  close(source: string) {
    console.log(`Wizard closed from action source: ${source}`);
  }
}
```

---

# Wizard Controller

Every child step subcomponent instantly receives a **Wizard Controller** API instance along with the assigned parent contextual bindings via automatic parameter property input.

To consume the wizard execution features inside a child step component, declare the `@Input()` decorators:

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basic-details',
  standalone: true,
  template: `
    <div>
      <h3>Step View (Context ID: {{ contextId }})</h3>
      <button (click)="goToNext()">Continue</button>
    </div>
  `,
})
export class BasicDetailsComponent {
  @Input() contextId!: string;
  @Input() wizard!: any; // Injected automatically by the parent wizard wrapper
}
```

### Available APIs

```ts
// Progress Navigation Actions
this.wizard.next(); // Navigates forward one step (triggers onComplete if on the last step)
this.wizard.prev(); // Regresses back one step
this.wizard.skip(); // Skips the current step, setting step state status to 'skipped'
this.wizard.goToStep(3); // Jumps directly to any target 1-indexed step number

// Termination Methods
this.wizard.finish(); // Immediately invokes programmatic completion and fires (onComplete)
this.wizard.reset(); // Re-initializes state properties, clearing cached step data stores

// Shared Context Store Registry Methods
this.wizard.setData(key, value); // Cache shared data key-value records
this.wizard.getData(key); // Fetch specific cached records by index key
this.wizard.getAllData(); // Export a complete clone copy dictionary object of all records

// State Track Metadata Information
this.wizard.currentStep(); // Returns the active index integer number
this.wizard.totalSteps(); // Returns the dynamic configurations array length size
```

---

# Store Shared Data

Save persistent records from any active view step component seamlessly:

```ts
this.wizard.setData('role', 'Student');
```

Retrieve data records on later step view interfaces:

```ts
const role = this.wizard.getData('role');
```

Retrieve everything inside the active data store instance:

```ts
const completePayload = this.wizard.getAllData();
```

---

# Conditional Navigation

Evaluate explicit routing pathways using stored context data on trigger events:

```ts
const role = this.wizard.getData('role');

if (role === 'Student') {
  this.wizard.goToStep(3); // Jump past sequential views directly to the step index
} else {
  this.wizard.next(); // Advance normally
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

| Input          | Type                | Default Value                | Description                                                              |
| -------------- | ------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| `wizardId`     | `string`            | `'ngx-stepper-wizard'`       | Unique identifier assigned to the wizard instance wrapper.               |
| `wizardTitle`  | `string`            | `'Create New Configuration'` | Title text header displayed on top of the workflow frame.                |
| `dynamicSteps` | `WizardInterface[]` | `[]`                         | Dynamic array configurations defining step properties and subcomponents. |

---

# Outputs

| Output               | Event Payload Type                     | Description                                                                         |
| -------------------- | -------------------------------------- | ----------------------------------------------------------------------------------- | ------ | --------- | ---------------------------------------------------------------------------------------- |
| `onComplete`         | `void`                                 | Fires when the last step completes or when `.finish()` is invoked programmatically. |
| `onStepChange`       | `{ currentStep: number; action: 'next' | 'prev'                                                                              | 'skip' | 'goto' }` | Fires instantly whenever a step forward, backward, or redirection change event resolves. |
| `closeWizardEmitter` | `string`                               | Fires when a dismiss click or internal close event triggers out the wizard view.    |

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

- [ ] Lazy Loaded Step Component Rendering
- [ ] Route-based Angular Router Wizard Integration
- [ ] Dynamic Structural Step Validation API Form Mixins
- [ ] Async Validation Route Guards
- [ ] Native Dynamic Theme Builder Configuration Hook
- [ ] Dark Theme Native Palette Options
- [ ] RTL Architecture Support Layouts
- [ ] Internationalization (i18n) Key Translation Hooks
- [ ] Custom State Change CSS View Animations

---

# Contributing

Contributions, issues, and feature requests are welcome!

If you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

# License

MIT License © 2026 Sunmeet Kaur

---

## ⭐ If you find this project useful, please consider giving it a star on GitHub!

Made with ❤️ by Sunmeet Kaur.

```

```
