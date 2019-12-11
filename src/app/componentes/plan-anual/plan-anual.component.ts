import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-plan-anual',
  templateUrl: './plan-anual.component.html',
  styleUrls: ['./plan-anual.component.sass']
})
export class PlanAnualComponent implements OnInit {
  ticket:string = "F8537A18-6766-4DEF-9E59-426B4FEE2844";
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  })

  constructor( public http:HttpClient) {

  }
  
  ngOnInit() {
    this.http.get(`https://apis.mercadopublico.cl/PlanDeCompra/Obtener/${'113812'}/${'2018'}/${this.ticket}`, {headers: this.header, responseType: 'json'}).subscribe((data:any)=>{
      console.log(data)
    })
  }

}
