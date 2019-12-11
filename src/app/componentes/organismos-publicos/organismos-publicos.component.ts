import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-organismos-publicos',
  templateUrl: './organismos-publicos.component.html',
  styleUrls: ['./organismos-publicos.component.css']
})
export class OrganismosPublicosComponent implements OnInit {

  displayedColumns_comprador: string[] = ['codigo-empresa', 'nombre-empresa'];
  displayedColumns_proveedor: string[] = ['codigo-empresa', 'nombre-empresa'];
  dataSource_comprador:any = [];
  dataSource_proveedor:any = [];
  ticket = 'E5B28A2A-C632-4C84-88CE-EDAB85A5C530';
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  data_empresas_compradores:any;
  data_empresas_proveedores:any;
  cantidad_empresas:any;
  rut_empresa:any;

  constructor(public http: HttpClient) {
    this.obtenerEmpresas();
   }

  ngOnInit() {

  }

  buscarProveedor(){
    console.log(this.rut_empresa)
    this.http.get(`https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarProveedor?rutempresaproveedor=${this.rut_empresa}&ticket=${this.ticket}`).subscribe((data:any)=>{
      this.dataSource_proveedor = data.listaEmpresas;
      this.data_empresas_proveedores = new MatTableDataSource(this.dataSource_proveedor);
      this.dataSource_proveedor.sort = this.sort;
      this.dataSource_proveedor.paginator = this.paginator;
      console.log(data)
    }, (error)=>{
      var error_:any= error.error;
      
    })
  }

  obtenerEmpresas(){
    this.http.get(`https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarComprador?ticket=${this.ticket}`).subscribe((data:any)=>{
      this.cantidad_empresas = data.Cantidad;
      this.dataSource_comprador = data.listaEmpresas;
      console.log(this.dataSource_comprador);
      this.data_empresas_compradores = new MatTableDataSource(this.dataSource_comprador);
      this.data_empresas_compradores.sort = this.sort;
      this.data_empresas_compradores.paginator = this.paginator;
      localStorage.setItem('empresas_compradores', JSON.stringify(this.dataSource_comprador));
    });
  }

  applyFilter(filterValue: string) {
    this.data_empresas_compradores.filter = filterValue.trim().toLowerCase();
  }

}
