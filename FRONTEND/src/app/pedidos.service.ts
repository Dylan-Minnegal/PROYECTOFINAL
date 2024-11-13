import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';


@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = environment.apiUrl+'/pedidos'; 

  constructor(private http: HttpClient) {}

  sendOrderDetails(orderDetails: any, authToken: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.post(this.apiUrl, orderDetails, {headers});
  }
}
