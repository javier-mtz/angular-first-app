import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { InfoCarComponent } from './Components/info-car/info-car.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { FormularioComponent } from './Components/formulario/formulario.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './Components/login/login.component';
import { AdminComponent } from './Components/admin/admin.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'brands', component: BrandsComponent},
    { path: 'login', component: LoginComponent},
    { path: 'admin', component: AdminComponent, canActivate: [authGuard]},
    { path: 'user', component: HomeComponent, canActivate: [authGuard]},
    { path: 'formulario', component: FormularioComponent },
    { path: 'info-car/:modelo', component: InfoCarComponent},
    { path: 'profile/:brand', component: ProfileComponent} // Ruta dinámica para el perfil con parámetro brand
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
    
})

export class AppRoutingModule { }


