import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {PropertyService} from "../../../services/property.service";
import {SharedService} from "../../../services/shared.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
ownerId:string;
  clients:any;
  client:any;
  owner:any;
  constructor(private userService: UserService, private propertyService: PropertyService, private activatedRoute: ActivatedRoute,
  	private router: Router,private _location: Location,private sharedService:SharedService) { }

  ngOnInit() {
  	this.owner = this.sharedService.user;
    this.ownerId = this.owner._id;
	this.userService.findAllUsers()
	  		.subscribe(
	  			(users:any)=>{
	  				this.propertyService.findPropertiesByOwner(this.ownerId)
	  					.subscribe(
	  						(properties:any)=>{
	  							this.clients = [];
	  							for(let i = 0 ; i< properties.length;i++){
	  								for(let j = 0 ; j < users.length;j++){
	  									if(properties[i].customer._id == users[j]._id){
	  										users[j].property = properties[i];
	  										this.clients.push(users[j]);
	  									}
	  								}
	  							}
	  						}
	  						)
	  			},
	  			(error:any)=>{
	  				console.log(error);
	  			}
	  			);
  	}
  contact(client:any){
  	this.client = client;
  }
  back(){
  	this._location.back();
  }

}
