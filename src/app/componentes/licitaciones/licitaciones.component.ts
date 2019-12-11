import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { filter } from 'minimatch';

@Component({
  selector: 'app-licitaciones',
  templateUrl: './licitaciones.component.html',
  styleUrls: ['./licitaciones.component.css']
})
export class LicitacionesComponent implements OnInit {

  valor_codigo_organismo:any;
  valor_codigo_proveedor:any;

  agnoActual:any;
  displayedColumns_licitaciones_agno: string[] = ['CodigoEstado', 'CodigoExterno', 'FechaCierre', 'Nombre'];
  displayedColumns_licitaciones_codigo: string[] = ['CantidadReclamos', 'Moneda', 'MontoEstimado', 'CodigoTipo', 'Categoria', 'CodigoCategoria', 'CodigoProducto', 'NombreProducto'];
  displayedColumns_licitaciones_estado: string[] = ['CodigoEstado', 'CodigoExterno', 'FechaCierre', 'Nombre'];
  displayedColumns_licitaciones_organismo: string[] = ['CodigoEstado', 'CodigoExterno', 'FechaCierre', 'Nombre'];
  displayedColumns_licitaciones_proveedor: string[] = ['CodigoEstado', 'CodigoExterno', 'FechaCierre', 'Nombre'];
  dataSource_licitaciones_agno:any = [];
  dataSource_licitaciones_codigo:any = [];
  dataSource_licitaciones_estado:any = [];
  dataSource_licitaciones_organismo:any = [];
  dataSource_licitaciones_proveedor:any = [];
  data_licitaciones_agno:any;
  data_licitaciones_codigo:any;
  data_licitaciones_estado:any;
  data_licitaciones_organismo:any;
  data_licitaciones_proveedor:any;
  ticket = 'E5B28A2A-C632-4C84-88CE-EDAB85A5C530';
  @ViewChild('paginator_agno', {static: true}) paginator_agno: MatPaginator;
  @ViewChild('paginator_estado', {static: true}) paginator_estado:MatPaginator;
  @ViewChild('paginator_organismo', {static: true}) paginator_organismo:MatPaginator;
  @ViewChild('paginator_proveedor', {static: true}) paginator_proveedor:MatPaginator;
  fecha_input:any;
  fecha_organismo:any;
  fecha_proveedor:any;
  estado_seleccionado:any;
  codigo_externo_licitacion:any;
  opciones:any = [
    {valor: 'todos', nombre: 'Todos'},
    {valor: 'activas', nombre: 'Activas'},
    {valor: 'publicada', nombre: 'Publicada'},
    {valor: 'cerrada', nombre: 'Cerrada'},
    {valor: 'desierta', nombre: 'Desierta'},
    {valor: 'adjudicada', nombre: 'Adjudicada'},
    {valor: 'revocada', nombre: 'Revocada'},
    {valor: 'suspendida', nombre: 'Suspendida'},
  ]
  constructor(public http: HttpClient) { 
    this.agnoActual = new Date();
    this.obtenerLicitacionesPorAgno();
    console.log(this.agnoActual.getDate())
    /* this.buscarPorCodigoOrganismo(); */
    /* this.buscarPorCodigoProveedor(); */
  }

  ngOnInit() {
  }

  buscarLicitacionFecha(){
    console.log(this.fecha_input);
    var fecha_modificada = `${this.fecha_input.slice(8,10)}${this.fecha_input.slice(5,7)}${this.fecha_input.slice(0,4)}`
    console.log(fecha_modificada)
    this.obtenerLicitacionesPorAgno(fecha_modificada)
  }

  buscarPorCodigoProveedor(){
    console.log(this.valor_codigo_proveedor)
    if(typeof this.fecha_proveedor === 'undefined'){
      var fecha_modificada = `${("0" + this.agnoActual.getDate()).slice(-2)}${this.agnoActual.getMonth() + 1}${this.agnoActual.getFullYear()}`;
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fecha_modificada}&CodigoProveedor=${this.valor_codigo_proveedor}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data);
        this.dataSource_licitaciones_proveedor = data.Listado;
        this.data_licitaciones_proveedor = new MatTableDataSource(this.dataSource_licitaciones_proveedor);
        this.data_licitaciones_proveedor.paginator = this.paginator_proveedor;
      })
    }else{
      var fecha_modificada = `${this.fecha_proveedor.slice(8,10)}${this.fecha_proveedor.slice(5,7)}${this.fecha_proveedor.slice(0,4)}`
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fecha_modificada}&CodigoProveedor=${this.valor_codigo_proveedor}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data);
        this.dataSource_licitaciones_proveedor = data.Listado;
        this.data_licitaciones_proveedor = new MatTableDataSource(this.dataSource_licitaciones_proveedor);
        this.data_licitaciones_proveedor.paginator = this.paginator_proveedor;
      })
    }
  }

  obtenerLicitacionesPorAgno(fecha?:any){
    console.log(this.agnoActual);
    console.log(typeof fecha === 'undefined')
    if(typeof fecha === 'undefined'){
      var fecha_modificada = `${("0" + this.agnoActual.getDate()).slice(-2)}${this.agnoActual.getMonth() + 1}${this.agnoActual.getFullYear()}`;
      console.log(fecha_modificada)
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fecha_modificada}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data);
        this.dataSource_licitaciones_agno = data.Listado;
        this.data_licitaciones_agno = new MatTableDataSource(this.dataSource_licitaciones_agno);
        this.data_licitaciones_agno.paginator = this.paginator_agno;
      });
    }else{
      this.agnoActual = this.fecha_input
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fecha}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data);
        this.dataSource_licitaciones_agno = data.Listado;
        this.data_licitaciones_agno = new MatTableDataSource(this.dataSource_licitaciones_agno);
        this.data_licitaciones_agno.paginator = this.paginator_agno;
      });
    }
  }

  cambiarEstado(event:any){
    console.log(event.value);
    this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?estado=${event.value}&ticket=${this.ticket}`).subscribe((data:any)=>{
      console.log(data);
      this.dataSource_licitaciones_estado = [];
      this.data_licitaciones_estado = [];
      this.dataSource_licitaciones_estado = data.Listado;
      this.data_licitaciones_estado = new MatTableDataSource(this.dataSource_licitaciones_estado);
      this.data_licitaciones_estado.paginator = this.paginator_estado;
    })
  }

  applyFilter(filterValue: string) {
    console.log(filterValue)
    this.data_licitaciones_agno.filter = filterValue.trim().toLowerCase();
  }

  aplicarFiltroEstado(valorInput: string){
    this.data_licitaciones_estado.filter = valorInput.trim().toLocaleLowerCase();
  }

  aplicarFiltroOrganismo(valorInput: string){
    this.data_licitaciones_organismo.filter = valorInput.trim().toLocaleLowerCase();
  }
  aplicarFiltroProveedor(valorInput: string){
    this.data_licitaciones_proveedor.filter = valorInput.trim().toLocaleLowerCase();
  }

  buscarPorCodigoOrganismo(){
    console.log(this.fecha_organismo)
    if(typeof this.fecha_organismo === 'undefined'){
      var fecha_modificada = `${("0" + this.agnoActual.getDate()).slice(-2)}${this.agnoActual.getMonth() + 1}${this.agnoActual.getFullYear()}`;
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fecha_modificada}&CodigoOrganismo=${this.valor_codigo_organismo}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data);
        console.log(this.valor_codigo_organismo)
        this.dataSource_licitaciones_organismo = data.Listado;
        this.data_licitaciones_organismo = new MatTableDataSource(this.dataSource_licitaciones_organismo);
        this.data_licitaciones_organismo.paginator = this.paginator_organismo;
      })
    }else{
      var fecha_modificada = `${this.fecha_organismo.slice(8,10)}${this.fecha_organismo.slice(5,7)}${this.fecha_organismo.slice(0,4)}`
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fecha_modificada}&CodigoOrganismo=${this.valor_codigo_organismo}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data);
        console.log(this.valor_codigo_organismo)
        this.dataSource_licitaciones_organismo = data.Listado;
        this.data_licitaciones_organismo = new MatTableDataSource(this.dataSource_licitaciones_organismo);
        this.data_licitaciones_organismo.paginator = this.paginator_organismo;
      })
    }
  }

  buscarPorCodigo(){
    console.log(this.codigo_externo_licitacion)
    if(this.codigo_externo_licitacion !== ''){
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?codigo=${this.codigo_externo_licitacion}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data);
        this.data_licitaciones_codigo = data.Listado;
      })
    }else{
      console.log('ingresa un valor')
    }
  }

}
