import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { ProductdataService } from './services/productdata.service';
import { ProductResolver } from './resolvers/product.resolver';

import { AppComponent } from './app.component';
import { ShoeListComponent } from './shoes/shoe-list/shoe-list.component';
import { ShoeNewComponent } from './shoes/./shoe-new/shoe-new.component';
import { ShoeDetailsComponent } from './shoes/./shoe-details/shoe-details.component';
import { HomeComponent } from './home/home.component';
import { SearchPipe } from './search.pipe';
import { FilterOptionsComponent } from './shoes/shoe-list/filter-options/filter-options.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoeListComponent,
    ShoeNewComponent,
    ShoeDetailsComponent,
    HomeComponent,
    FileSelectDirective,
    SearchPipe,
    FilterOptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ProductdataService, ProductResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
