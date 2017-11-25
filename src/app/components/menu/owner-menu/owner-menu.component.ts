import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {SharedService} from "../../../services/shared.service";

@Component({
  selector: 'app-owner-menu',
  templateUrl: './owner-menu.component.html',
  styleUrls: ['./owner-menu.component.css']
})
export class OwnerMenuComponent implements OnInit {

   userId:string;
  user:any;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,
  	private router: Router,private sharedService:SharedService) { }


  ngOnInit() {
  	
    this.user = this.sharedService.user;
    this.userId = this.user._id;
  }

}
