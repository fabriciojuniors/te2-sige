import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'register/eventos',
    loadChildren: () => import('./pages/register/eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'register/eventos/:id',
    loadChildren: () => import('./pages/register/eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'register/locais',
    loadChildren: () => import('./pages/register/locais/locais.module').then( m => m.LocaisPageModule)
  },
  {
    path: 'register/locais/:id',
    loadChildren: () => import('./pages/register/locais/locais.module').then( m => m.LocaisPageModule)
  },
  {
    path: 'list/locais',
    loadChildren: () => import('./pages/lists/locais/locais.module').then( m => m.LocaisPageModule)
  },
  {
    path: 'register/parceiro',
    loadChildren: () => import('./pages/register/parceiro/parceiro.module').then( m => m.ParceiroPageModule)
  },
  {
    path: 'register/parceiro/:id',
    loadChildren: () => import('./pages/register/parceiro/parceiro.module').then( m => m.ParceiroPageModule)
  },
  {
    path: 'list/parceiro',
    loadChildren: () => import('./pages/lists/parceiro/parceiro.module').then( m => m.ParceiroPageModule)
  },
  {
    path: 'eventos-favoritos',
    loadChildren: () => import('./pages/modals/eventos-favoritos/eventos-favoritos.module').then( m => m.EventosFavoritosPageModule)
  },
  {
    path: 'list/eventos',
    loadChildren: () => import('./pages/lists/eventos/eventos.module').then( m => m.EventosPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
