import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController ,LoadingController} from '@ionic/angular';
import * as moment from 'moment'
import { StorageService } from './storage.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ApiDjangoServiceService {

  networkConnected : boolean = true;
  apiUrl = "http://127.0.0.1:8000/api/";  //por el momento localmente

  constructor(private http: HttpClient, private alertCtrl:AlertController, public storage: StorageService) {}


  uploadPhoto(formData,id) {
    return new Promise((resolve,reject) => {
      this.http.post(this.apiUrl+'photo/',formData).subscribe(data => {
        resolve(data);
        console.log(data);
        this.storage.setPhotos(this.getPhotos(id));
        this.storage.showAlert("Exito!","La foto ha sido enviada correctamente")
      }, err => {
        reject(err);
        if(Object.keys(err.error)[0]=="non_field_errors"){
          this.storage.showAlert("Error","Ya existe una imagen enviada para este periodo de alimentación.")
        }
        else{
        this.storage.showAlert("Error","Ha ocurrido un error en el envio. Intente nuevamente.")
        }
      });
    });

  }

  registro(cliente) {
    return new Promise((resolve,reject) => {
    this.http.post(this.apiUrl+'representante/',cliente).subscribe(data => {
      resolve(data);
      console.log(data);
      this.storage.setUser(data);
      
      this.storage.showAlert("Sistema","Se ha registrado nuevo usuario")
    }, err => {
      reject(err);
      console.log(err);
    });
  });
}

  async showNoNetwork() {
    let alert = await this.alertCtrl.create({
      header: 'Sorry',
      message: 'No network detected. Please check your internet connexion',
      buttons: ['OK']
    });
   
    return await alert.present();
    
  }

  getPhotos(rep) {
    console.log(rep)
    var fecha= moment().format("MMM Do YY");
    var fotos: any = [];
    this.http.get(this.apiUrl+'photo/').subscribe(data=>{
      for(var i in data){
        var f= moment(data[i]["createdAt"]).format("MMM Do YY")
        if(data[i]["representado"]==rep && fecha==f){
          fotos.push(data[i])
        }
      }
    })
    console.log(fotos)
    return fotos;    
  }

  agregarRepresentado(representado){
    return new Promise((resolve,reject) => {
      this.http.post(this.apiUrl+'representado/',representado).subscribe(data => {
        var relacion= {representante: this.storage.getUser()["id"], representadoid: representado["codigo_qr"]}
        this.addRelacion(relacion)
        resolve(data);
      }, err => {
        var relacion= {representante: this.storage.getUser()["id"], representadoid: representado["codigo_qr"]}
        this.addRelacion(relacion)
        reject(err)
      });
    });    
  }

  addRelacion(relacion){
    return new Promise((resolve,reject) => {
      this.http.post(this.apiUrl+'relacion/',relacion).subscribe(data => {
        resolve(data);
        console.log(data);
        this.storage.showAlert("Exito!","Se ha agregado el nuevo representado a su lista")
      }, err => {
        reject(err)
         console.log(err);
         this.storage.showAlert("Error!","Este representado ya se encuentra en su lista")
      });
    });
    
  }

  getObservacion(id){
    
    return this.http.get(this.apiUrl+"photo/"+id+"/")    

  }


}


