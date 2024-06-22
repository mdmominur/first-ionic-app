import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import {register} from 'swiper/element/bundle';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { Style } from '@capacitor/status-bar/dist/esm/definitions';
import { GeneralService } from './services/general.service';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  toastDetails = this.generalService.getGlobalToast;
  constructor(
    private platform: Platform,
    public generalService: GeneralService
  ) {
    this.initializeApp();
  }
  ngOnInit(){
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setStyle({ style: Style.Dark });
      SplashScreen.hide();      
    });
  }
}
