import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('goals',[
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),

        query(':enter', stagger('700ms', [
           animate('.6s ease-in', keyframes([
             style({opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
             style({opacity: .5, transform: 'translateY(5px)', offset: .5 }),
             style({opacity: 1, transform: 'translateY(0)', offset: 1 }),
           ]))
        ]), {optional: true}),

        query(':leave', stagger('700ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({opacity: .5, transform: 'translateY(5px)', offset: .5 }),
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1 }),
          ]))
       ]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add a item';
  goalText: string = '';
  goals = [];

  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  removeItem(i: number){
    this.goals.splice(i, 1);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

}
