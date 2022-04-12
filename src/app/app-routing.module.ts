import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfferComponent } from './Layout/offer/offer.component';

const routes: Routes = [
  { path: "offers/:userId", component: OfferComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
