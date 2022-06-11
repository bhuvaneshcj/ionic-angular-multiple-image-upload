import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedFiles?: any = [];
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  product_id: number;

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  @ViewChild('image') input: ElementRef;

  constructor() {}

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles.push(...event.target.files);
    this.previews = [];
    const numberOfFiles = this.selectedFiles.length;

    for (let i = 0; i < numberOfFiles; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previews.push(e.target.result);
      };
      console.log(this.selectedFiles[i]);
      reader.readAsDataURL(this.selectedFiles[i]);
    }
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.previews = ev.detail.complete(this.previews);
    var newArr = this.selectedFiles;
    [newArr[ev.detail.from], newArr[ev.detail.to]] = [
      newArr[ev.detail.to],
      newArr[ev.detail.from],
    ];
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  removeImage(a) {
    this.previews.splice(a, 1);
    this.selectedFiles.splice(a, 1);
  }
}
