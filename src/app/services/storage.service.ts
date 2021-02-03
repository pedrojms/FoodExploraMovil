import { Injectable } from '@angular/core';
import { AlertController} from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  fotos: any= [];
  user= {};

  constructor(private alertCtrl: AlertController) { }

  public getPhotos(){
    return this.fotos;
  }

  public setPhotos(photos){
    this.fotos=photos;
  }

  public getUser(){
    return this.user;
  }

  public setUser(user){
    this.user= user;
  }

  async showAlert(title,mensaje) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: mensaje,
      buttons: ["OK"]
    });
    await alert.present();
  }
}
