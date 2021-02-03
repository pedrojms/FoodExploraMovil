import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiDjangoServiceService } from '../services/api-django-service.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-agregar-representado',
  templateUrl: './agregar-representado.page.html',
  styleUrls: ['./agregar-representado.page.scss'],
})
export class AgregarRepresentadoPage implements OnInit {
  representado: any = {nombre:"", apellido:"", edad: "", codigo_qr:"" };
  

  constructor(private apiService: ApiDjangoServiceService, public modalCtlr: ModalController, public storage: StorageService) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtlr.dismiss({
      'dismissed': true
    });
  }

  agregarRepresentado() {
    this.apiService.agregarRepresentado(this.representado).then(res =>{
      this.cerrarModal();
    }).catch(()=>{
      this.cerrarModal();
    })
  }




}
