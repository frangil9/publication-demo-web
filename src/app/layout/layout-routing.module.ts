import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { PublicationComponent } from './publication/publication.component';
import { AllPublicationsComponent } from './all-publications/all-publications.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'publication', component: PublicationComponent },
      { path: 'all', component: AllPublicationsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
