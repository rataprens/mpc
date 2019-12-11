import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganismosPublicosComponent } from './componentes/organismos-publicos/organismos-publicos.component';
import { PlanAnualComponent } from './componentes/plan-anual/plan-anual.component';
import { LicitacionesComponent } from './componentes/licitaciones/licitaciones.component';
import { OrdenesCompraComponent } from './componentes/ordenes-compra/ordenes-compra.component';
import { OcdsComponent } from './componentes/ocds/ocds.component';


const routes: Routes = [
  { path: 'organismos-publicos', component: OrganismosPublicosComponent },
  { path: 'plan-anual', component: PlanAnualComponent },
  { path: 'licitaciones', component: LicitacionesComponent },
  { path: 'ordenes-compra', component: OrdenesCompraComponent },
  { path: 'ocds', component: OcdsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
