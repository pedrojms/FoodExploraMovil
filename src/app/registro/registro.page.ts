import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDjangoServiceService } from '../services/api-django-service.service';
import { QRScannerService } from '../services/qrscanner.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  cliente: any = {cedula:"", nombre:"", apellido: "" };

  constructor(private router:Router, private apiService: ApiDjangoServiceService, private qr: QRScannerService  ) { }

  ngOnInit() {
  }

  escanearQR(){
    this.qr.startScanning();

  }

  async registro() {
    var retorno: boolean = false;
    /*if (this.inputsVacios()) {
      this.showAlert("Debe rellenar todos los campos.");
      retorno = false; //Retorna este False cuando no ingresó al menos un campo.
    } else {*/
      await this.apiService.registro(this.cliente)
        .then(data => {
          this.router.navigate(['/home'], { replaceUrl: true });
          retorno = true; //Retorna True si inició sesión de forma correcta
        }, err => {
          retorno = false; //Retorna este False si las credenciales son incorrectas.
        })
    console.log(retorno);
    return retorno;
  }
  
  iraHome(){
    this.router.navigate(['home']);
  }

  irLogin(){
    this.router.navigate(['login']);
  }

}
