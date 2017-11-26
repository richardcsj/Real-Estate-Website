import {Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router,ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {PropertyService} from "../../../services/property.service";
import {SharedService} from "../../../services/shared.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class OwnerPropertyComponent implements OnInit {
  @ViewChild('f') propertyForm: NgForm;
  //form properties
  propertyId:string;
  type:string;
  description:string;
  size:string;
  price:string;
  latitude:string;
  longitude:string;
  customer:any;
  valid:boolean;
  available:boolean;
  validatedBy:any;
  //other properties
  ownerId:string;
  properties:any;
  users:any;
  owner:any;
  errorFlag : boolean;
  errorMsg :string;
  messageFlag:boolean;
  message : string;
  constructor(private userService: UserService,private propertyService: PropertyService, private activatedRoute: ActivatedRoute,
  	private router: Router,private _location: Location,private sharedService:SharedService) { }

  ngOnInit() {
  	this.owner = this.sharedService.user;
    this.ownerId = this.owner._id;
		this.loadData();
  		
  }
  save(){
  	let property = {type:this.type,description:this.description,
  					valid:false,available:true,size:this.size,price:this.price,
  					owner:this.owner._id,latitude:this.latitude,longitude:this.longitude}
  	this.propertyService.createProperty(this.ownerId,property)
  		.subscribe(
  				(res:any) => {           
		            this.messageFlag = true;
		            this.message = 'Property created Successfully';

		          },
		          (error:any) => {
		            this.errorFlag = true;
		            this.errorMsg = 'cannot create property';

		          }
  			);
      this.loadData();
  }
  update(){
  	let property = {_id:this.propertyId,type:this.type,description:this.description,
  					valid:this.valid,available:this.available,size:this.size,price:this.price,
  					owner:this.ownerId,
            latitude:this.latitude,longitude:this.longitude,customer:null,validatedBy:null}
    if(this.customer){
      property.customer = this.customer._id;
    }
    if(this.validatedBy){
      property.validatedBy = this.validatedBy._id;
    }
  	this.propertyService.updateProperty(property._id,property)
  		.subscribe(
  				(res:any) => {           
		            this.messageFlag = true;
		            this.message = 'Property Updated Successfully';

		          },
		          (error:any) => {
		            this.errorFlag = true;
		            this.errorMsg = 'cannot update property';

		          }
  			);
      this.loadData();
  }
  edit(property:any){
  	this.propertyId = property._id ;
  	this.type = property.type;
    this.description = property.description;
  	this.size = property.size;
  	this.price = property.price;
  	this.latitude = property.latitude;
  	this.longitude = property.longitude;
  	this.customer = property.customer;
    this.valid = property.valid;
    this.available = property.available;
    this.validatedBy = property.validatedBy; 
  }
  delete(propertyId:string){
    this.propertyService.deleteProperty(propertyId)
      .subscribe(
          (deleted:any)=>{           
                this.messageFlag = true;
                this.message = 'Property deleted Successfully';
              },
              (error:any) => {
                this.errorFlag = true;
                this.errorMsg = 'cannot delete property';

              }
        );
      this.loadData();
  }
  back(){
  	this._location.back();
  }
  loadData(){
    this.propertyService.findPropertiesByOwner(this.ownerId)
      .subscribe(
        (properties:any)=>{
          this.properties = properties;
        },
        (error:any)=>{
          console.log(error);
        }
        );
  }


}
