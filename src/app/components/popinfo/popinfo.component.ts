import { Component, OnInit, Input } from '@angular/core';
import { NavParams} from '@ionic/angular';
import { ApiDjangoServiceService } from '../../services/api-django-service.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {
  
  observacion = "No se ha realizado aun ninguna observacion"
  

  constructor(public apiService: ApiDjangoServiceService, public navParams : NavParams, private popoverCtrl: PopoverController) { }

  ngOnInit() {
    this.getObservacion();
    
  }

  getObservacion(){
    var id= this.navParams.get('value')
    this.apiService.getObservacion(id).subscribe(data=>{
      if(data["observacion"]==""){
        console.log("No se ha escrito observacion")
      }
      else{     
        this.observacion=data["observacion"]
      }
    },err =>{
      console.log(err)
    })
    
  }

  cerrarPopover(){
    this.popoverCtrl.dismiss({
      'dismissed': true
    });
  }

}
