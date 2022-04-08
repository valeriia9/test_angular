import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
    declarations: [
        LoaderComponent,
        PageNotFoundComponent,
        DatePickerComponent,
    ],
    imports: [
        HttpClientModule
    ],
    exports: [
        DatePickerComponent
    ],
    providers: [],
    bootstrap: []
})
export class UtilityAppModule { }
