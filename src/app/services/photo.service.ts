import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
  CameraPhoto, CameraSource } from '@capacitor/core';
const { Camera, Filesystem, Storage } = Plugins;
import { ApiDjangoServiceService } from './api-django-service.service';
import { StorageService } from './storage.service';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(public apiService:ApiDjangoServiceService, public storage: StorageService) { }

  public async addNewToGallery(periodo,id,nino) {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64, 
      source: CameraSource.Camera, 
      quality: 100 
    }).catch((error)=>{
      console.log(error)
    })
    // variable image should contain our base64 image
    if (capturedPhoto){
      // convert base64 image to blob
      let blob = this.b64toBlob(capturedPhoto.base64String)
      if (this.apiService.networkConnected){
        //Create a form to send the file
        const formData = new FormData();
        //Generate a fake filename
        let name = "Foto_"+nino+"_"+periodo;
        formData.append('file', blob, name+`.${capturedPhoto.format}`);
        formData.append('name', name);
        formData.append('periodo',periodo)
        formData.append('representante',this.storage.getUser()["id"]);
        formData.append('representado',id)
        this.apiService.uploadPhoto(formData,id);
                
      }
      else{
        this.apiService.showNoNetwork()
      }
    };
    /*this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    });*/

    
  }

  public b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
 
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
 
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
 
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
 
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}

export interface Photo {
  filepath: string;
  webviewPath: string;
}


