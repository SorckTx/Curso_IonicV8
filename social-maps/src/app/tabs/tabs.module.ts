import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TabsRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, RouterModule, TabsRoutingModule],
    declarations: [TabsPage]
})
export class TabsPageModule { }


