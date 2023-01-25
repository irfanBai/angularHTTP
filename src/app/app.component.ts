import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from './model/products'
import { ProductService } from './model/service/product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularHttpRequest';
  allProducts : Product[] = [];
  isFetching: boolean = false;
  currentProductId: string;
  @ViewChild('productsForm') form: NgForm;
  editMode: boolean = false;

  constructor(private productService: ProductService) {}

  onProductCreate(prodcuts: {pName: string, desc: string, price: string}) {
    if(!this.editMode)
    this.productService.createProduct(prodcuts);
    else 
    this.productService.updateProduct(this.currentProductId, prodcuts);
  }

  ngOnInit(): void {
    this.fetchProducts();
  }
  onProductsFetch(){
    this.fetchProducts();
  }
  private fetchProducts() {
    this.isFetching = true;
    this.productService.fetchProducr().subscribe((products) => {
      this.allProducts = products;
      this.isFetching = false;
    })
  }

  onDeleteProduct(id: string) {
    this.productService.deleteProducts(id);
  }

  onDeleteAllProduct() {
    this.productService.deleteAllProducts();
  }

  onEditClicked(id: string) {
    this.currentProductId = id;
    let currentProduct = this.allProducts.find((p) => {return p.id === id})
    // console.log(currentProduct);

    this.form.setValue({
      pName: currentProduct.pName ,
      desc: currentProduct.desc,
      price: currentProduct.price 
    });

    this.editMode = true;
  }
}


