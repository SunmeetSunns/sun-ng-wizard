import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dummy-comp-1',
  imports: [CommonModule],
  templateUrl: './dummy-comp-1.html',
  styleUrl: './dummy-comp-1.scss',
})
export class DummyComp1 {
  selectedMethod: any;
  constructor() {}
  @Input() contextId: string | undefined;
  wizardId: any = 'configure-product';

  @Input() wizard!: any;

  methods = [
    {
      title: 'Select From Template',
      desc: 'Proceed with the pre-built template to configure the product. ',
      img: 'assets/common/instructions_img.svg',
      disabled: false,
    },
    {
      title: 'Configure Manually',
      desc: 'Proceed manually to configure the product.  ',
      img: 'assets/common/manually_img.svg',
      disabled: false,
    },
  ];
  goToPrevStep() {
    this.wizard.prev();
  }
  selectMethod(index: number) {
    if (!this.methods[index].disabled) {
      this.selectedMethod = index;
    }
  }
  processAndGoToNextStep() {
    this.wizard.skip();
  }
  skipStep() {
    this.wizard.skip();
  }
}
