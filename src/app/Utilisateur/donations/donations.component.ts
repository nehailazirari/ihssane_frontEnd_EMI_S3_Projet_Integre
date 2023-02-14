import {Component, Inject} from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {ListDonationsService} from "../../service/list-donations.service";
import {Router} from "@angular/router";
import {EditDonationComponent} from "../edit-donation/edit-donation.component";
// import { MatDialog } from '@angular/material/dialog';
// import { Component } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NewDonationComponent} from "../new-donation/new-donation.component";
//import { DialogComponent } from './dialog.component';


@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent {
  category: any[]=[];
  products: any;
  pages: any;
  currentPage: Boolean=false;
  categories: any;
  private productCommands: any;
   word: any;

  constructor(private categoryService:CategoryService,private donationService:ListDonationsService,private router:Router,public dialog: MatDialog) {
    /*this.editProductDialog.update().subscribe(res => {
      this.getProducts();})*/
  }

  ngOnInit(){
    this.getProducts();
    this.getCategories();
    //this.getProductsCategories("b");
    //this.donationService.deleteProduct();
    //this.onDeleteProduct(1)
    /*this.donationService.createDonation().subscribe(response => {
      console.log('Donation added successfully');
    }, error => {
      console.log('Error adding donation: ' + error);
    });*/


  }
  getCategories(){

    this.categoryService.getCategory().subscribe((res:any)=>{

        this.category=res;
        console.log(this.category);
        
        },
      error =>{
        alert(error.message)
      });


  }

  getProducts(){

    this.donationService.getAllDonations().
    subscribe((res:any)=>{

        this.products=res
      console.log("imaaaaaaage "+this.products[1].photo);
        },
      error =>{


        alert(error.message);

      });
    //console.log(this.products);

  }

  filterCategory(event:any) {
    let value=event.target.value;

    if(value=="all"){
      //console.log("designation  "+value)
      this.getProducts();
    }else{
      //console.log("designation  "+value)
      this.getProductsCategories(value);
    }

  }

  getProductsCategories(keyword:string){

    this.categoryService.getProductByCategory(keyword).subscribe((res:any)=>{

        this.products=res;
        },
      error =>{

        alert(error.message)
      });

  }

  onDeleteProduct(id:number) {


    this.donationService.deleteProduct(id).subscribe(res=>console.log("success"));
    console.log("hhhhhhhhh")
    return this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/donations']));
    console.log("tttttt")
    /*this.donationService.getAllDonations().subscribe((res:any)=>{
      this.products=res;
      console.log("updated product  "+this.products)
    })*/
    //this.getProducts();
    /*let conf=confirm("Etes-vous de supprimer cet element?")
    if (conf){
      for (let produc of this.products){
        produc.id--;
        console.log(produc)
      }
      this.products.splice(product.id,1)


    }*/


  }
  /*onDeleteProduct(p:any) {
    let conf=confirm("Etes-vous de supprimer cet element?")
    console.log(p._links.self.href)
    if (conf){
      this.donationService.deleteResource(p._links.self.href).subscribe( success=>{
        this.onGetProducts();
      },erro=>{
        console.log(erro)
      });

    }
  }*/

  getCommandsFromCart(){
    this.productCommands = this.donationService.getAllDonations();

  }
  onGetProducts() {

  }



  onEditProduct(p: any) {
    //return this.router.navigateByUrl("/edit-donation/" + p.id);
    const dialogRef = this.dialog.open(EditDonationComponent, {
      width: '750px',
      data:p
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
      this.getProducts();
    });
  }


  editValue2(){
    return this.donationService.editValue();
  }


  onProductPage(i: number) {

  }


  chercher() {
    this.donationService.getbyKey(this.word).subscribe((val:any)=>{
        console.log(this.word);
          this.products = val


      })
      if(this.word==''){
        this.getProducts()
      }
  }

  addDonation() {

    const dialogRef2 = this.dialog.open(NewDonationComponent, {
      //height: '600px',
      width: '750px',
      //data:p
    });

    dialogRef2.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
      this.getProducts();
    });
  }

  showDonation() {
    this.getProducts()
  }
}
