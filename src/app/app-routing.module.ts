import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlansComponent } from './home/components/plans/plans.component';

const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:"full"},
  {path: 'home',component: HomeComponent},
  {path: 'plans',component: PlansComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
