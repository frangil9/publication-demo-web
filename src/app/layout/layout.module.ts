import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { environment } from '../../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
  MatTableModule, MatMenuModule, MatToolbarModule, MatSelectModule, MatSlideToggleModule, MatDividerModule, MAT_DATE_LOCALE,
  MatDatepickerModule, MatNativeDateModule, MatCheckboxModule, DateAdapter, MAT_DATE_FORMATS, MatFormFieldModule, MatCardModule
} from '@angular/material';
import { PublicationComponent } from './publication/publication.component';
import { CreatePublicationComponent } from './create-publication/create-publication.component';
import { AllPublicationsComponent } from './all-publications/all-publications.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
   url: environment.apiUrl + '/upload',
   maxFilesize: 2,
   acceptedFiles: 'image/*'
 };

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, PublicationComponent, CreatePublicationComponent, AllPublicationsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatCardModule,
    MatMenuModule,
    DropzoneModule,
    LayoutRoutingModule
  ],
  entryComponents: [
    CreatePublicationComponent
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})
export class LayoutModule { }
