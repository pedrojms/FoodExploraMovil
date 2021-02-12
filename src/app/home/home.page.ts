import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { iosTransitionAnimation, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment'
import { AgregarRepresentadoPage } from '../agregar-representado/agregar-representado.page';
import { PhotoService } from '../services/photo.service';
import { ApiDjangoServiceService } from '../services/api-django-service.service';
import { StorageService } from '../services/storage.service';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../components/popinfo/popinfo.component'

@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  periodo: any;
  myMealTime: any;
  fechaAct: any;
  horaAct:any;
  rep: any;
  representados: any = [];


  constructor(public popoverCtrl: PopoverController,private http: HttpClient,public storage: StorageService, public photoService: PhotoService, private router: Router, public modalCtlr: ModalController, public apiService:ApiDjangoServiceService) { }

  async mostrarPopover(evento,id){
    
    const popover = await this.popoverCtrl.create({
      component: PopinfoComponent,
      componentProps: {value: id},
      event: evento,
      mode: "ios",
    });
    return await popover.present();

  }  
 
 
  addPhotoToGallery() {
    if(this.inputsVacios()){
      this.storage.showAlert("Advertencia","No puede dejar los selectores vacios")
    }
    else{
    var cod=this.rep.representado.codigo_qr;
    console.log(cod)
    this.photoService.addNewToGallery(this.myMealTime,cod,this.rep.representado.nombre+this.rep.representado.apellido);
    this.storage.setPhotos(this.apiService.getPhotos(cod));
    }
  }

  ngOnInit(){
    this.fechaAct= moment().format('LL')
    this.horaAct= moment().format('h:mm a');
    this.showMealTime();
    this.getRepresentados();
  
       
  }



  showMealTime(){
    var now = moment();
    if(now.isAfter(moment('6:00', 'h:mm')) && now.isBefore(moment('12:00', 'h:mm')) )
      this.myMealTime="Desayuno"
    if(now.isAfter(moment('12:00', 'h:mm')) && now.isBefore(moment('18:00', 'h:mm')) )
      this.myMealTime="Almuerzo"
    if(now.isAfter(moment('18:00', 'h:mm')) && now.isBefore(moment('22:00', 'h:mm')) )
      this.myMealTime="Merienda"

  }

  irPagina(name){
    this.router.navigate([name]);
  }

  async addRepresentado(){
    const modal= await this.modalCtlr.create({
      component: AgregarRepresentadoPage
    });
    modal.onDidDismiss().then((data)=>{
      
      this.getRepresentados();
    });
    await modal.present();
  }

  getRepresentados(){
    this.representados.length = 0
    this.http.get('http://127.0.0.1:8000/api/relacion/').subscribe(data => {      
      for(var i in data){
        
        if(data[i]["representante"]==this.storage.getUser()["id"]){
        
        console.log(this.representados)
        this.representados.push(data[i])
        }
      }
      console.log(this.representados)     
    }, err => {     
      console.log(err);    
  });
  }

  getPhotos(){
    
    var id= this.rep.representado.codigo_qr;
    this.storage.setPhotos(this.apiService.getPhotos(id));
   
  }

  inputsVacios(){
    if (this.myMealTime==null || this.rep==null){
      return true;
    }
    else{
      return false;
    }
  }

  



}
