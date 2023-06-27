import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Paginas/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilidadesModule } from './Utilidades/utilidades.module';

@NgModule({
    declarations: [AppComponent, LoginComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule, UtilidadesModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
