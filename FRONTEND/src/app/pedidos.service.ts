import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private apiUrl = environment.apiUrl+'/pedidos'; 

  constructor(private http: HttpClient) {}

  sendOrderDetails(orderDetails: any): Observable<any> {
    return this.http.post(this.apiUrl, orderDetails);
  }
}
