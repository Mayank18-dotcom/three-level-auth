import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from "@angular/router";
import { AppService } from "../../app.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {
  parseusername : any;
  data:any;
  userid:any;
  
  loader = true;
  constructor(private rt:Router , private router : ActivatedRoute, private service : AppService,private _location: Location) { 
    this.router.params.subscribe(params=>{
      this.parseusername = params.username;
      if(JSON.parse(window.localStorage.getItem('un'))== this.parseusername){
        this.userid=JSON.parse(window.localStorage.getItem('id'));
      }
    })
  }
  
  ngOnInit() {
    this.service.mainlink(this.parseusername).subscribe(res=>{
      this.data = res[0];
      console.log(this.data);
      this.data["dob"] = this.data["dob"].substring(0, 10).split("").reverse().join("");
      this.loader = false;
    })
  }
}