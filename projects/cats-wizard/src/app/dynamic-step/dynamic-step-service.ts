import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DynamicStepService {
  public storedData: WritableSignal<any[]> = signal([]);

  storeProfileData(data: any) {
    const normalizedData = {
      name: data.formData.name,
      email: data.formData.email,
      mobileNo: data.formData.mobileNo,
      description: data.formData.description,

      role: data.selectedRole.title || data.selectedRole.jobTitle,
      roleDescription: data.selectedRole.desc || data.selectedRole.jobdesc,
      roleImage: data.selectedRole.img || data.selectedRole.jobImg,

      disabled: data.selectedRole.disabled,
      roleIndex: data.selectedRole.i ?? null,
      stream: data?.selectedDept?.title,
      streamDesc: data?.selectedDept?.desc,
      streamImg: data?.selectedDept?.img,
    };

    this.storedData.update((current) => {
      const index = current.findIndex((item) => item.email === normalizedData.email);

      if (index !== -1) {
        const updated = [...current];
        updated[index] = normalizedData;
        return updated;
      }

      return [...current, normalizedData];
    });
  }
}
