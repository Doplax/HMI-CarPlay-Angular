import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallPageComponent } from './pages/call-page/call-page.component';

const routes: Routes = [
  { path: '', component: CallPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallRoutingModule { }
