import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';

//MAT COMPONENTES
import {MatCardModule,MatInputModule, MatFormFieldModule , MatSortModule, MatSelectModule  ,MatPaginatorModule ,MatTabsModule, MatTableModule, MatSidenavModule,MatListModule, MatToolbarModule, MatIconModule, MatButtonModule} from '@angular/material';

//COMPONENTES
import { OrganismosPublicosComponent } from './componentes/organismos-publicos/organismos-publicos.component';
import { PlanAnualComponent } from './componentes/plan-anual/plan-anual.component';
import { LicitacionesComponent } from './componentes/licitaciones/licitaciones.component';

//DATE TIME ESPAÑOL
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs);
import { LOCALE_ID } from '@angular/core';
import { OrdenesCompraComponent } from './componentes/ordenes-compra/ordenes-compra.component';
import { OcdsComponent } from './componentes/ocds/ocds.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganismosPublicosComponent,
    PlanAnualComponent,
    LicitacionesComponent,
    OrdenesCompraComponent,
    OcdsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSortModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [{provide: LOCALE_ID, useValue: 'es-Es'},],
  bootstrap: [AppComponent]
})
export class AppModule { }
