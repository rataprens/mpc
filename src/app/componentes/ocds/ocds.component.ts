import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ocds',
  templateUrl: './ocds.component.html',
  styleUrls: ['./ocds.component.sass']
})
export class OcdsComponent implements OnInit {

  ocds_codigo_organismo:any;

  constructor(public http:HttpClient) {

   }

  ngOnInit() {
  }

  obtenerInformacionOrganismo(){
    console.log(this.ocds_codigo_organismo);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, content-type"
    })
    this.http.get(`https://apis.mercadopublico.cl/OCDS/data/comprador/unidad/${this.ocds_codigo_organismo}`, {headers:headers}).subscribe((data:any)=>{
      console.log(data)
    })
  }

}
