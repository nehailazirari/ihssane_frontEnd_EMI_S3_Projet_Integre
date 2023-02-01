import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ListDonationsService} from "../../service/list-donations.service";
import {Donation} from "../../model/donation";
import {DonationsComponent} from "../donations/donations.component";
import {CategoryService} from "../../service/category.service";
import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-new-donation',
  templateUrl: './new-donation.component.html',
  styleUrls: ['./new-donation.component.css']
})
export class NewDonationComponent {
  image: any;

  constructor(private auth:AuthService,private categoryService:CategoryService,private service:ListDonationsService,public dialogRef: MatDialogRef<NewDonationComponent>,private router:Router, private activeRoute:ActivatedRoute,private fb:FormBuilder,public dialog: MatDialogRef<NewDonationComponent>,private http:HttpClient) {
  }

  category: any;

  categ:any
  ngOnInit(){
    this.createform();
    //this.service.createDonation()
    //this.service.deleteProduct(1)
    this.categoryService.getCategory().subscribe((res:any)=>{

        this.category=res;
        this.category.forEach((p:any)=>{console.log(p.designation)})
      },
      error =>{
        alert(error.message)
      });

     /* this.donations.getCategories();*/

  }
  tasksFilter!:FormGroup

  fileName:string=''

  /*myGroup = new FormGroup({
    image: new FormControl(),
    title: new FormControl(),
    description: new FormControl(),
    //category: new FormControl()
  });*/

  createform() {
    this.tasksFilter = this.fb.group({
      image:['',Validators.required],
      title:['',Validators.required],
      description:['',Validators.required],
      category :['',Validators.required],

    })

  }

  model:Donation={

    "nom": "",
    "dateCreation":"" ,
    "description": "",
    "photo": "",
    "category": {

    },
    "donneur": {

    }
  };



  // @ts-ignore
  selectedValue: any;
  create() {

    /*let formData=new FormData();
    formData.append('nom',this.tasksFilter.value['title'])
    formData.append('description',this.tasksFilter.value['description'])
    formData.append('image',this.tasksFilter.value['image'])*/

    // @ts-ignore
    //this.model=this.tasksFilter;

    //console.log("e "+this.model.controls['title'].value);

    this.model.description=this.tasksFilter.controls['description'].value;
    this.model.nom=this.tasksFilter.controls['title'].value;
    this.model.category=this.categ
    this.model.photo=this.tasksFilter.controls['image'].value;
    //this.model.category=this.tasksFilter.controls['category'].value;
    this.model.donneur=this.auth.ConnectedUser();
      /*{
      "id": 1,
        "nom": "rania",
        "prenom": "marouni",
        "password": "1234",
        "gmail": "marouni.rania1@gmail.com",
        "ville": "Eljadida",
        "naissance": "2001-09-06T00:00:00.000+00:00",
        "telephone": "0654345654"
    }*/
    //this.model.nom="ddddd"
    console.log("MODEL "+this.model.photo);
    this.service.createDonation(this.model).subscribe(response => {
      console.log('Donation added successfully');
    }, error => {
      console.log('Error adding donation: ' + error);
    });;


  }

  selectImage(event:any) {
    //console.log("hhhhhhh "+this.tasksFilter.controls['image'])
    this.fileName=event.target.value;
    this.tasksFilter.get('image')?.setValue(event.target.files[0])
    //this.tasksFilter.controls['image']=event.target.files[0]

  }

  filterCategory(event: any) {
    this.categoryService.getCategorieById(event.target.value).subscribe(res=>{
      this.categ=res;

    })
    console.log(event.target.value)

  }
}
