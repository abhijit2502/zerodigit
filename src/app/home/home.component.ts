import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  modal1:Boolean=false;


  modal(){
   this.modal1=true;
  }
}
