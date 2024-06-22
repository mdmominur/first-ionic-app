import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  public isGlobalLoading:boolean = false;
  public defaultToastDetails = {open: false, duration: 3000, message: "", position: 'top', color: 'success'}
  public toastDetails = {...this.defaultToastDetails}

  constructor() {}
  setGlobalLoading(type:boolean){
    this.isGlobalLoading = type;
  }

  setGlobalToast(details:any){
    const {open = false, message = "", duration = 3000, position = 'top', color = 'success'} = details;
    this.toastDetails = {
      open: open,
      message,
      duration,
      position,
      color
    }

    setTimeout(() => {
      this.closeGlobalToast();
    }, this.toastDetails.duration);
  }

  closeGlobalToast(){
    this.toastDetails = {...this.defaultToastDetails};
  }

  

  get getGlobalToast(): any{
    return this.toastDetails;
  }

  get getIsGlobalLoading(): any{
    return this.isGlobalLoading;
  }
}
