import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { InfoCarComponent } from './Components/info-car/info-car.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { FormularioComponent } from './Components/formulario/formulario.component';
import { authGuard } from './Guards/auth.guard';
import { LoginComponent } from './Components/login/login.component';
import { AdminComponent } from './Components/admin/admin.component';
import { UserComponent } from './Components/user/user.component';
import { AdminGuard } from './Guards/admin.guard';
import { MailTokenGuard } from './Guards/mailtoken.guard';
import { LoaderComponent } from './Components/loader/loader/loader.component';
import { RentalBrandsComponent } from './Components/rental-brands/rental-brands.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'brands', component: BrandsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'rental', component: RentalBrandsComponent, canActivate: [authGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
    { path: 'user', component: UserComponent, canActivate: [authGuard] },
    { path: 'mailtoken/:token', canActivate: [MailTokenGuard], component: LoaderComponent },
    { path: 'register', component: FormularioComponent },
    { path: 'info-car/:modelo', component: InfoCarComponent },
    { path: 'profile/:brand', component: ProfileComponent }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})

export class AppRoutingModule { }


