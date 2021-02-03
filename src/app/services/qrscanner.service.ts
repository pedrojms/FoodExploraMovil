import { Injectable } from '@angular/core';
import { QRScanner,QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Injectable({
  providedIn: 'root'
})
export class QRScannerService {
  qrScan: any;
  constructor(private qr: QRScanner) { }

  startScanning(){
    this.qr.prepare().then((status:QRScannerStatus)=>{
      if(status.authorized){
        this.qr.show();
        this.qrScan= this.qr.scan().subscribe((textFound)=>{
          this.qrScan.unsuscribe();
          console.log(textFound);

        },(err)=>{
          console.log(err)
        }
        )

      }
      else if(status.denied){

      }
      else{

      } 
    })
  }
}
