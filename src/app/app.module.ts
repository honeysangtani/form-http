import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NameService } from 'shared/name.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNameComponent } from './components/add-name/add-name.component';
import { EditNameComponent } from './components/edit-name/edit-name.component';
import { NameListComponent } from './components/name-list/name-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNameComponent,
    EditNameComponent,
    NameListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [NameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
