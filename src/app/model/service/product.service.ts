import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {map} from 'rxjs/operators';
import { Product } from './../../model/products';

@Injectable({providedIn: "root"})
export class ProductService {

    constructor(private http: HttpClient) {}

    createProduct(prodcuts: {pName: string, desc: string, price: string}) {
        const headers = new HttpHeaders({'myheader': 'procademy'});
    this.http.post<{name: string}>('https://angularbyprocadmey-default-rtdb.firebaseio.com/products.json', prodcuts, {headers: headers})
    .subscribe((res) => {
      console.log(res);
    });
    }

    fetchProducr() {
        // this.isFetching = true;
     return this.http.get<{[key: string]: Product}>('https://angularbyprocadmey-default-rtdb.firebaseio.com/products.json')
    .pipe(map((res) => {
      const products = [];
      for(const key in res) {
        if(res.hasOwnProperty(key)) {
          products.push({...res[key], id:key})
        }
      }
      return products;
    }))
    }

    deleteProducts(id: string) {
        this.http.delete('https://angularbyprocadmey-default-rtdb.firebaseio.com/products/'+id+'.json')
    .subscribe();
    }

    deleteAllProducts() {
        this.http.delete('https://angularbyprocadmey-default-rtdb.firebaseio.com/products.json')
    .subscribe();
    }

    updateProduct(id: string, value: Product) {
        this.http.put('https://angularbyprocadmey-default-rtdb.firebaseio.com/products/'+id+'.json', value)
        .subscribe();

    }
}