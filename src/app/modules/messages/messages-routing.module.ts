import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesPageComponent } from './pages/messages-page/messages-page.component';
import { MessagesLayoutComponent } from './layout/messages-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MessagesLayoutComponent,
    children: [
      {
        path: 'home',
        component: MessagesPageComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
