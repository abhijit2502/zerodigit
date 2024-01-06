import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @ViewChild('btn')btn!:ElementRef
  ngAfterViewInit(){
    this.btn.nativeElement.click();
  }


  modalRef?: BsModalRef;
  modalNames: any;
  varientNames: any;
  showbrands: boolean = true;
  showmodel: boolean = false;
  showVarient: boolean = false;
  showYear: boolean = false;
  showMonth: boolean = false;
  showCity: boolean = false;
  showDate: boolean = false;
  varientType: string = "petrol";
  selectedDate:any;

  DieselArr: any = [];
  PetrolArr: any = [];
  ElectricArr: any = [];
  variantArr: any = []
  yearArr: number[] = [];
  monthArr: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  cityArr: string[] = ['New Delhi', 'Gurgaon', 'Bengaluru', 'Hyderabad','Mumbai','Pune','Kolkata','Ahmedabad'];

  
  constructor(private modalService: BsModalService, private http: HttpService,private rout:Router) { }


  ngOnInit() {
    for (let i = 2004; i < 2024; i++) {
      this.yearArr.push(i);
    }
    //this.modalService.show()
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template);
    console.log(template)
  }

  obj: any = {
    brandName: "",
    modalName: "",
    varientName: "",
    year: 0,
    month: "",
    city: "",
    policyExpiryDate:undefined
  }



  brandList: any = [
    {
      "imgPath": "https://th.bing.com/th/id/R.a8b7d5f7e3eba94c038270e23f725656?rik=bEcZS%2bWHPnRYWw&riu=http%3a%2f%2fwww.carlogos.org%2flogo%2fTata-Group-logo-3840x2160.png&ehk=hgeXoJOSk5BseLq4TpyGVq%2fvJqUT3SQInDY3pMwEIAk%3d&risl=&pid=ImgRaw&r=0",
      "brandName": "TATA"
    },
    {
      "imgPath": "https://th.bing.com/th/id/R.d6a390ffa9f98995799b7561605b427c?rik=erjt7oUVEEDnfg&riu=http%3a%2f%2fwww.carlogos.org%2flogo%2fKia-logo-2560x1440.png&ehk=h2UmfUiGb%2fYfI1wYG%2fHrqdL9J6sD6i9I%2fb217wm%2bjZg%3d&risl=&pid=ImgRaw&r=0",
      "brandName": "KIA"
    },

    {
      "imgPath": "https://th.bing.com/th/id/OIP.pCHNMOCEIbHFpB-IdmAPQQHaHa?pid=ImgDet&rs=1",
      "brandName": "Maruti"
    },

    {
      "imgPath": "https://th.bing.com/th/id/OIP.WjUdnMRzelbbnNCNVzA74gHaEK?pid=ImgDet&rs=1",
      "brandName": "AUDI"
    }

  ]

  getBrandName(data: any) {
    this.obj.brandName = data;
    this.showbrands = false;
    this.showmodel = true
    let params: HttpParams = new HttpParams()
      .set('brandName', data)
    this.http.getDataFromServer("brands", params).subscribe((resp: any) => {
      this.modalNames = resp[0]?.models;
      // console.log(resp);
      //console.log(this.modalNames)
    })
  }

  getModelName(data: any) {
    //let carName=this.obj.brandName+" "+data;
    this.obj.modelName = data;
    this.showbrands = false;
    this.showmodel = false;
    this.showVarient = true;
    let params: HttpParams = new HttpParams()
      .set('Fuel Type', "Diesel")
    this.http.getDataFromServer("get-variant", params).subscribe((resp: any) => {
      this.varientNames = resp[0]?.modelList;

      this.varientNames?.forEach((el: any) => {
        if (el["Fuel Type"] == "Diesel") {
          this.DieselArr.push(el);
        }
        else if (el["Fuel Type"] == "Petrol") {
          this.PetrolArr.push(el)
        } else {
          this.ElectricArr.push(el)
        }
      });
    })
  }

  getvname(data: string) {
    this.varientType = data;
  }

  getvarientName(data: any) {
    this.showVarient = false;
    this.showYear = true;
    this.obj.varientName = data;
    this.showbrands = false;
    this.showmodel = false;

  }

  getyear(data: number) {
    this.obj.year = data;
    this.showMonth = true;
    this.showYear = false;
    
  }

  getmonth(data: string) {
    this.obj.month = data;
    this.showMonth = false;
    this.showCity = true;
  }
  getcity(data: string) {
    this.obj.city = data;
    this.showCity=false;
    this.showDate=true;
  }
  datechange(){
  this.rout.navigate(['/plans']);
  this.modalRef?.hide()
  
  }
  
}
