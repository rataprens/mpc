import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-ordenes-compra',
  templateUrl: './ordenes-compra.component.html',
  styleUrls: ['./ordenes-compra.component.css']
})
export class OrdenesCompraComponent implements OnInit {

  ticket:string = 'E5B28A2A-C632-4C84-88CE-EDAB85A5C530'
  displayedColumns_orden_compra_agno: string[] = ['Codigo', 'CodigoEstado', 'Nombre'];
  displayedColumns_orden_compra_codigo: string[] = ['CodigoEstado', 'CodigoLicitacion', 'NombreOrganismo', 'RutUnidad', 'Estado', 'RutSucursal', 'NombreSucursal', 'TotalNeto', 'Categoria', 'Producto', 'Codigo'];
  displayedColumns_orden_compra_estado: string[] = ['Codigo', 'CodigoEstado', 'Nombre'];
  displayedColumns_orden_compra_organismo: string[] = ['Codigo', 'CodigoEstado', 'Nombre'];
  displayedColumns_orden_compra_proveedor: string[] = ['Codigo', 'CodigoEstado', 'Nombre'];
  dataSource_orden_compra_agno:any = [];
  dataSource_orden_compra_codigo:any = [];
  dataSource_orden_compra_estado:any = [];
  dataSource_orden_compra_organismo:any = [];
  dataSource_orden_compra_proveedor:any = [];
  data_orden_compra_agno:any;
  data_orden_compra_codigo:any;
  data_orden_compra_estado:any;
  data_orden_compra_organismo:any;
  data_orden_compra_proveedor:any;
  codigo_orden_compra:any;
  codigo_orden_organismo: any;
  codigo_orden_proveedor: any;
  agnoActual:any;
  cantidad_ordenes:any;
  fecha_orden_compra:any;
  estado_seleccionado:any;
  fecha_organismo:any;
  fecha_proveedor:any;
  opciones:any = [
    {valor: 'todos', nombre: 'Todos'},
    {valor: 'enviadaproveedor', nombre: 'Enviada a Proveedor'},
    {valor: 'aceptada', nombre: 'Aceptada '},
    {valor: 'cancelada', nombre: 'Cancelada '},
    {valor: 'recepcionconforme', nombre: 'Recepción Conforme'},
    {valor: 'pendienterecepcion', nombre: 'Pendiente de Recepcionar'},
    {valor: 'recepcionaceptadacialmente', nombre: 'Recepcionada Parcialmente'},
    {valor: 'recepecionconformeincompleta', nombre: 'Recepcion Conforme Incompleta'},
  ]

  @ViewChild('paginator_agno', {static: true}) paginator_agno:MatPaginator;
  @ViewChild('paginator_codigo', {static: true}) paginator_codigo:MatPaginator;
  @ViewChild('paginator_estado', {static: true}) paginator_estado: MatPaginator;
  @ViewChild('paginator_organismo', {static: true}) paginator_organismo: MatPaginator;
  @ViewChild('paginator_proveedor', {static: true}) paginator_proveedor: MatPaginator;

  constructor(public http:HttpClient) {
    this.agnoActual = new Date();
    this.buscarOrdenCompra();
   }

  ngOnInit() {
  }

  buscarOrdenCompraProveedor(){
    console.log(this.codigo_orden_proveedor);
    console.log(this.fecha_proveedor);
    if(typeof this.fecha_proveedor === 'undefined'){
      var fecha_modificada = `${("0" + this.agnoActual.getDate()).slice(-2)}${this.agnoActual.getMonth() + 1}${this.agnoActual.getFullYear()}`;
      console.log(fecha_modificada)
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?fecha=${fecha_modificada}&CodigoProveedor=${this.codigo_orden_proveedor}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data)
        this.dataSource_orden_compra_proveedor = data.Listado;
        this.data_orden_compra_proveedor = new MatTableDataSource(this.dataSource_orden_compra_proveedor);
        this.data_orden_compra_proveedor.paginator = this.paginator_proveedor;
      })
    }else{
      this.agnoActual = this.fecha_proveedor;
      var fecha_modificada = `${this.fecha_proveedor.slice(8,10)}${this.fecha_proveedor.slice(5,7)}${this.fecha_proveedor.slice(0,4)}`;
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?fecha=${fecha_modificada}&CodigoProveedor=${this.codigo_orden_proveedor}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data)
        this.dataSource_orden_compra_proveedor = data.Listado;
        this.data_orden_compra_proveedor = new MatTableDataSource(this.dataSource_orden_compra_proveedor);
        this.data_orden_compra_proveedor.paginator = this.paginator_proveedor;
      })
    }
    
  }

  buscarOrdenCompraOrganismo(){
    console.log(this.codigo_orden_organismo)
    console.log(this.fecha_organismo);
    if(typeof this.fecha_organismo === 'undefined'){
      var fecha_modificada = `${("0" + this.agnoActual.getDate()).slice(-2)}${this.agnoActual.getMonth() + 1}${this.agnoActual.getFullYear()}`;
      console.log(fecha_modificada)
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?fecha=${fecha_modificada}&CodigoOrganismo=${this.codigo_orden_organismo}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data)
        this.dataSource_orden_compra_organismo = data.Listado;
        this.data_orden_compra_organismo = new MatTableDataSource(this.dataSource_orden_compra_organismo);
        this.data_orden_compra_organismo.paginator = this.paginator_organismo;
      })
    }else{
      this.agnoActual = this.fecha_organismo;
      var fecha_modificada = `${this.fecha_organismo.slice(8,10)}${this.fecha_organismo.slice(5,7)}${this.fecha_organismo.slice(0,4)}`;
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?fecha=${fecha_modificada}&CodigoOrganismo=${this.codigo_orden_organismo}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data)
        this.dataSource_orden_compra_organismo = data.Listado;
        this.data_orden_compra_organismo = new MatTableDataSource(this.dataSource_orden_compra_organismo);
        this.data_orden_compra_organismo.paginator = this.paginator_organismo;
      })
    }
  }

  cambiarEstado(event:any){
    console.log(event.value);
    this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?estado=${event.value}&ticket=${this.ticket}`).subscribe((data:any)=>{
      console.log(data);
      this.dataSource_orden_compra_estado = [];
      this.data_orden_compra_estado = [];
      this.dataSource_orden_compra_estado = data.Listado;
      this.data_orden_compra_estado = new MatTableDataSource(this.dataSource_orden_compra_estado);
      this.data_orden_compra_estado.paginator = this.paginator_estado;
    })
  }

  filtroOrdenComprEstado(valorInput: string){
    this.data_orden_compra_estado.filter = valorInput.trim().toLocaleLowerCase();
  }

  filtroOrdenCompra(valorInput: string){
    this.data_orden_compra_agno.filter = valorInput.trim().toLocaleLowerCase();
  }
  filtroOrdenCompraOrganismo(valorInput: string){
    this.data_orden_compra_organismo.filter = valorInput.trim().toLocaleLowerCase();
  }

  buscarCodigoOrden(){
    console.log(this.codigo_orden_compra)
    this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?codigo=${this.codigo_orden_compra}&ticket=${this.ticket}`).subscribe((data:any)=>{
      console.log(data)
      this.dataSource_orden_compra_codigo = data.Listado;
      this.data_orden_compra_codigo = new MatTableDataSource(this.dataSource_orden_compra_codigo);
      this.data_orden_compra_codigo.paginator = this.paginator_codigo;
    })
  }

  buscarOrdenCompra(){
    if(typeof this.fecha_orden_compra === 'undefined'){
      var fecha_modificada = `${("0" + this.agnoActual.getDate()).slice(-2)}${this.agnoActual.getMonth() + 1}${this.agnoActual.getFullYear()}`;
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?fecha=${fecha_modificada}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data.Listado)
        this.cantidad_ordenes = data.Cantidad;
        this.dataSource_orden_compra_agno = data.Listado;
        this.data_orden_compra_agno = new MatTableDataSource(this.dataSource_orden_compra_agno);
        this.data_orden_compra_agno.paginator = this.paginator_agno;
      })
    }else{
      this.agnoActual = this.fecha_orden_compra;
      var fecha_modificada = `${this.fecha_orden_compra.slice(8,10)}${this.fecha_orden_compra.slice(5,7)}${this.fecha_orden_compra.slice(0,4)}`
      this.http.get(`https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?fecha=${fecha_modificada}&ticket=${this.ticket}`).subscribe((data:any)=>{
        console.log(data.Listado)
        this.cantidad_ordenes = data.Cantidad;
        this.dataSource_orden_compra_agno = data.Listado;
        this.data_orden_compra_agno = new MatTableDataSource(this.dataSource_orden_compra_agno);
        this.data_orden_compra_agno.paginator = this.paginator_agno;
      })
    }
  }

}
