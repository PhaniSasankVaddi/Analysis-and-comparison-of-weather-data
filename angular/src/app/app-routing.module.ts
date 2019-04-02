import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
{
  path:'', component: DashboardComponent
},
{
  path:'search', component: SearchComponent  
},
{
  path:'auth', loadChildren: './auth/auth.module#AuthModule'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
