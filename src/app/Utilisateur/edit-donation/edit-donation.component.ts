import {Component, inject} from '@angular/core';
import {ListDonationsService} from "../../service/list-donations.service";
import {ActivatedRoute, Router} from "@angular/router";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CategoryService} from "../../service/category.service";

class EditProductDialog {
}

@Component({
  selector: 'app-edit-donation',
  templateUrl: './edit-donation.component.html',
  styleUrls: ['./edit-donation.component.css']
})
export class EditDonationComponent {
  private url: string ="";
   id: any;
  product:any;

  products:any
  form: any;
  up: any;
   categ: any;
   selected=false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private categoryService:CategoryService,public dialogRef: MatDialogRef<EditProductDialog>,private  donationService:ListDonationsService,private router:Router, private activeRoute:ActivatedRoute,private fb:FormBuilder,public dialog: MatDialogRef<EditDonationComponent>,private http:HttpClient) {

    this.tasksFilter = this.data.product;
  }
  ngOnInit() {

    this.activeRoute.paramMap.subscribe(params => {
       this.id = params.get('id');
      //console.log(this.id);
      //this.donationService.getProduct(this.id).subscribe((product:any) => this.product = product);
      //this.donationService.getProduct(this.id).subscribe((product:any) => this.product = product);
     // console.log(this.product.id);
    });
    //console.log("this.data.description "+this.data.description)

    this.createform(this.data);

    //console.log("this.tasksFilter "+this.tasksFilter);

    this.categoryService.getCategory().subscribe((res:any)=>{

        this.category=res;
        this.category.forEach((p:any)=>{console.log(p.designation)})
      },
      error =>{
        alert(error.message)
      });
    //console.log()
  }
  tasksFilter!:FormGroup
  category: any;

  createform(data:any) {
    this.tasksFilter = this.fb.group({
      title:[data.nom,Validators.required],
      description:[data.description,Validators.required],
      category:[data.category.designation,Validators.required],
      //image:[data.photo,Validators.required]

    })

  }

  valider(value: any) {
    console.log(value.title)
    // @ts-ignore
    /*this.router.navigate(["/donations"]);*/
    this.donationService.getAllDonations().
    subscribe((res:any)=>{

        this.products=res.products
      },
      error =>{


        alert(error.message);

      });
    for (let p of this.products){
      if(p.description==value.description){
        p.title=this.product.title;
        p.description=this.product.description;
      }
    }


    this.products=this.products.slice(1);

    for (let i=0;i<this.products.length;i++){
      console.log(this.products[i].title)
    }

    //this.donationService.editValue();

    /*this.editProduct(value).subscribe(data=>{
      return this.router.navigateByUrl("/products");
    },error =>{
      console.log(error)
    });*/

  }

  update() {
    /*let model = this.data;
    console.log('model'+model.id)
    this.http.put(`https://dummyjson.com/products/${model.id}`, model)
      .subscribe(res => {
        alert("Product updated successfully");
        this.dialogRef.close(true);
        //console.log(res)
      }, error => {
        alert(error.message);
      });
    //this.donationService.setProduct(res)
    return this.http.put(`https://dummyjson.com/products/${model.id}`, model)*/

    //console.log("product "+this.prepereFromData());
    //let model = this.prepereFromData();
    let model=this.data;
    //console.log("Model avant "+model.nom)
    model.nom=this.tasksFilter.controls['title'].value;
    model.description=this.tasksFilter.controls['description'].value
    if(this.selected){
    model.category=this.categ
    }
    
    
    //model.photo=this.tasksFilter.controls['image'].value;

   /* model.donneur={
      "id": 1,
      "nom": "rania",
      "prenom": "marouni",
      "password": "1234",
      "gmail": "marouni.rania1@gmail.com",
      "ville": "Eljadida",
      "naissance": "2001-09-06T00:00:00.000+00:00",
      "telephone": "0654345654"
    }*/
    //console.log("imaaaaaaaaaage "+model.photo);
    this.donationService.editProduct(this.data.id, model).subscribe(data=>{
      return this.router.navigateByUrl("/donations");
    },error =>{
      console.log(error)
    });

  }

  prepereFromData(){
    let formData=new FormData();
    Object.entries(this.tasksFilter.value).forEach(([key,value]:any)=>{
      formData.append(key,value);
    })
  }

  filterCategory(event: any) {
    this.categoryService.getCategorieById(event.target.value).subscribe(res=>{
      this.categ=res;

    })
    console.log(event.target.value)

  }

  filterCategorie(int:number) {
    this.categoryService.getCategorieById(int).subscribe(res=>{
      this.categ=res;

    })
    

  }
}
