import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { ApiDjangoServiceService} from '../services/api-django-service.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
})
export class PhotosPage implements OnInit {

  photos: any= [];

  constructor(public photoService: PhotoService, private router: Router, private ApiService: ApiDjangoServiceService ){}

  
  ngOnInit() {
     
  }




  iraPagina(){
    this.router.navigate(['home']);
  }

  
  

}
