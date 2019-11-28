import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.component.html',
  styleUrls: ['./create-publication.component.scss']
})
export class CreatePublicationComponent implements OnInit {

  myForm: FormGroup;
  isValidFormSubmitted: boolean = null;
  image: string = null;

  @ViewChild(DropzoneComponent, { static: true }) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  constructor(
    public dialogRef: MatDialogRef<CreatePublicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private publicationService: PublicationService,
    private authService: AuthService
  ) {
    this.createForm();
  }

  config: DropzoneConfigInterface = {
    maxFiles: 2,
    addRemoveLinks: true
  };

  ngOnInit() {
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(2)
      ]
      ],
      description: ['', [
        Validators.required,
        Validators.minLength(2)
      ]
      ],
      price: ['', [
        Validators.required
      ]
      ],
      ubication: ['', [
        Validators.required,
        Validators.minLength(2)
      ]
      ]
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.isValidFormSubmitted = false;
    if (!this.myForm.valid) {
      return;
    }
    this.isValidFormSubmitted = true;
    const publication: Publication = this.mappingValues();
    this.publicationService.savePublication(publication).subscribe(
      res => {
        this.dialogRef.close();
        this.toastr.success('Publicación creada con éxito');
      });
  }

  mappingValues(): Publication {
    const userLogged = this.authService.getUserLogged();
    const publication: Publication = {
      title: this.myForm.get('title').value,
      description: this.myForm.get('description').value,
      price: this.myForm.get('price').value,
      ubication: this.myForm.get('ubication').value,
      imageUrl: this.image,
      userId: userLogged.id
    }
    return publication;
  }

  onUploadError(args: any): void {
    console.log('onUploadError:', args);
  }

  onUploadSuccess(event: any): void {
    this.image = event[1].image_url;
    console.log(event);
  }

  onUploadCancel(event) {
    console.log(event);
  }

}
