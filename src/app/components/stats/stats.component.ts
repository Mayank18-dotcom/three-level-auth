import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AppService} from '../../app.service'
import Chart from 'chart.js'
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  username : any;
  parseusername : any;
  constructor(private service : AppService,public router:ActivatedRoute,public rt:Router) {
    this.router.params.subscribe(params=>{
      this.parseusername = params.username;
    })
   }
  ngOnInit() {
  }

}
