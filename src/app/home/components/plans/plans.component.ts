import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent {
  modalRef?: BsModalRef;
  getPlans:any;
  
  onlythirdPartyPlans:any;
  ComprehensiveCover:any;
  
  constructor(private http:HttpService,private modalService: BsModalService){
  
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
  }
  
  ngOnInit(){
    this.http.getDataFromServer('get-eligible-plan').subscribe((resp:any)=>{
      this.getPlans=resp.plans;
      this.ComprehensiveCover=this.getPlans[0];
      this.onlythirdPartyPlans=this.getPlans[1];
    })
  }

}
