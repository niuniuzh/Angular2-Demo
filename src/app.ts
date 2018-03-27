import {
  Component,
  EventEmitter,
  Input
} from '@angular/core';

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

class Product {
  constructor(
    public sku: string,
    public name: string,
    public imageUrl: string,
    public department: string[],
    public price: number) {
  }
}

@Component({
  selector:'club',
  template:`
    <div>
      <single-componet
        (putRingOnIt)="ringWasPlaced($event)"
        ></single-componet>
    </div>
  `
})

export class ClubComponent{
  ringWasPlaced(message:string){
    console.log(`Put your hands up:${message}`);
  }
}

@Component({
  selector:'single-componet',
  outputs:['putRingOnIt'],
  template:`
    <button (click)="liked()">Like it?</button>
  `
})

export class SingleComponent{
  putRingOnIt:EventEmitter<string>;

  constructor(){
    this.putRingOnIt = new EventEmitter();
  }
  liked():void{
    this.putRingOnIt.emit("oh oh oh");
  }
}

@Component({
  selector: 'product-image',
  host: {class: 'ui small image'},
  inputs: ['product'],
  template: `
  <img class="product-image" [src]="product.imageUrl">
  `
})
export class ProductImage {
  product: Product;
}

@Component({
  selector: 'product-department',
  inputs: ['product'],
  template: `
  <div class="product-department">
    <span *ngFor="let name of product.department; let i=index">
      <a href="#">{{ name }}</a>
      <span>{{i < (product.department.length-1) ? '>' : ''}}</span>
    </span>
  </div>
  `
})
export class ProductDepartment {
  product: Product;
}

@Component({
  selector: 'price-display',
  inputs: ['price'],
  template: `
  <div class="price-display">\${{ price }}</div>
  `
})
export class PriceDisplay {
  price: number;
}

@Component({
  selector: 'product-row',
  inputs: ['product'],
  host: {'class': 'item'},
  template: `
  <product-image [product]="product"></product-image>
  <div class="content">
    <div class="header">{{ product.name }}</div>
    <div class="meta">
      <div class="product-sku">SKU #{{ product.sku }}</div>
    </div>
    <div class="description">
      <product-department [product]="product"></product-department>
    </div>
  </div>
  <price-display [price]="product.price"></price-display>
  `
})
export class ProductRow {
  product: Product;
}

@Component({
  selector: 'products-list',
  inputs: ['productList'],
  outputs: ['onProductSelected'],
  template: `
  <div class="ui items">
    <product-row 
      *ngFor="let myProduct of productList" 
      [product]="myProduct" 
      (click)='clicked(myProduct)'
      [class.selected]="isSelected(myProduct)">
    </product-row>
  </div>
  `
})
export class ProductsList {

  productList: Product[];

  onProductSelected: EventEmitter<Product>;

  private currentProduct: Product;

  constructor() {
    this.onProductSelected = new EventEmitter();
  }

  clicked(product: Product): void {
    this.currentProduct = product;
    this.onProductSelected.emit(product);
  }

  isSelected(product: Product): boolean {
    if (!product || !this.currentProduct) {
      return false;
    }
    return product.sku === this.currentProduct.sku;
  }

}

@Component({
  selector:'instruction-component',
  inputs:['show'],
  template:`
    <div *ngIf='show'>haha,i an show</div>
    <div *ngIf='myFunc()'>haha,i an show function</div>
  `
})

export class test{
  show:boolean;
  constructor(){
    this.show = true;
  }
  myFunc():boolean{
    return true;
  }
}

@Component({
  selector:'switch-component',
  template:`
    <h4 class="ui horizontal divider header">
      Current choice is {{choice}}
    </h4>
    <div class="ui raised segment">
      <ul [ngSwitch]="choice">
        <li *ngSwitchCase="1">First choice</li>
        <li *ngSwitchCase="2">Second choice</li>
        <li *ngSwitchCase="3">Third choice</li>
        <li *ngSwitchCase="4">Four choice</li>
      </ul>
    </div>
    <div style="margin-top:20px;">
      <button class="ui primary button" (click)="nextChoice()">
        next choice
      </button>
    </div>


    <div class="ui input">
      <input type="text" name="color" placeholer="输入颜色" value="{{color}}" #colorinput>
    </div>
    <div class="ui input">
      <input type="text" name="fontsize" placeholer="字体大小" value="{{fontsize}}" #fontinput>
    </div>
    <button class="ui primary button" (click)="apply(colorinput.value,fontinput.value)">
      Apply settings
    </button>
    <div>
      <span [ngStyle]="{color:'red'}" [style.font-size.px]='fontsize'>
        red text
      </span>
    </div>

    <div>
      <span [ngStyle]="{color:color}">
        {{color}} text
      </span>
    </div>

    <div>
      <span [style.background-color]="color"
        style="color:white;">
        {{color}} bakground
      </span>
    </div>
    <div [ngClass]="{bordered:false}">This is never bordered</div>
    <div [ngClass]="{bordered:true}">This is always bordered</div>

    <div class='base' [ngClass]="['blue','round']">
      This will always have a blue background and round corners
    </div>

    <h4 class="ui horizontal divider header">
      List of objects
    </h4>
    <table class="ui celled table">
      <thead>
        <tr>
          <th>Index</th>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
        </tr>
      </thead>
      <tr *ngFor="let p of people;let num = index">
        <td>{{num}}</td>
        <td>{{p.name}}</td>
        <td>{{p.age}}</td>
        <td>{{p.city}}</td>
      </tr>
    </table>
  `
})

export class haha{
  choice:number;
  ngSwitch:number[];
  color:string;
  fontsize:number;
  people:any[];
  constructor(){
    this.ngSwitch=[1,2,3,4]
    this.choice = this.ngSwitch[0];
    this.people = [
      {name:'Anderson',age:35,city:'Sao Paulo'},
      {name:'John',age:12,city:'Miami'},
      {name:'Peter',age:22,city:'New York'}
    ]
  }
  apply(color:string,fontsize:number){
    this.color = color;
    this.fontsize = fontsize;
  }
  nextChoice():void{
    this.choice += 1;
    if(this.choice==5){
      this.choice=1;
    }
  }
}

@Component({
  selector: 'inventory-app',
  outputs:['putRingOnIt'],
  template: `
  <div class="inventory-app">
    <products-list 
      [productList]="products" 
      (onProductSelected)="productWasSelected($event)">
    </products-list>
    <club></club>
    <instruction-component></instruction-component>
    <switch-component></switch-component>
    <div class="item" [style.background-color]="'yellow'">
      Uses fixed yellow background
    </div>
    <div class="item" [ngStyle]="{color:'white','background-color':'blue'}">
      Uses fixed white text on blue background
    </div>
  </div>
  `
})
export class InventoryApp {
  products: Product[];

  constructor() {
    this.products = [
      new Product(
        'MYSHOES',
        'Black Running Shoes',
        'assets/resources/images/products/black-shoes.jpg',
        ['Men', 'Shoes', 'Running Shoes'],
        109.99),
      new Product(
        'NEATOJACKET',
        'Blue Jacket',
        'assets/resources/images/products/blue-jacket.jpg',
        ['Women', 'Apparel', 'Jackets & Vests'],
        238.99),
      new Product(
        'NICEHAT',
        'A Nice Black Hat',
        'assets/resources/images/products/black-hat.jpg',
        ['Men', 'Accessories', 'Hats'],
        29.99)
      ];
  }

  productWasSelected(product: Product): void {
    console.log('Product clicked: ', product);
  }
}


@NgModule({
  declarations: [ 
    InventoryApp,
    ProductImage, 
    ProductDepartment, 
    PriceDisplay,
    ProductRow,
    ProductsList,
    SingleComponent,
    ClubComponent,
    test,
    haha
  ],
  imports: [ BrowserModule ],
  bootstrap: [ InventoryApp ]
})
export class InventoryAppModule {}