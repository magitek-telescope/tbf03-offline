import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CircleCardComponent } from './circle-card/circle-card';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [CircleCardComponent],
	imports: [
        CommonModule,
        IonicModule
    ],
	exports: [CircleCardComponent],
	schemas: [
        CUSTOM_ELEMENTS_SCHEMA
	]
})
export class ComponentsModule {}
