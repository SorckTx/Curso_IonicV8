import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MapPageRoutingModule } from './map-routing.module';
import { MapPage } from './map.page';
import { PostModalComponent } from 'src/app/components/post-modal/post-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule
  ],
  declarations: [MapPage, PostModalComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MapPageModule { }
