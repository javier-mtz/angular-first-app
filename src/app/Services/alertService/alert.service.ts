import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }


  showAlert(title: string, text: string, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon
    });
  }

  showLoading() {
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false
    });
  }

  closeLoading() {
    Swal.close();
  }

  // alerta con confirmacion y boton manda a hacer funcion
  showConfirmAlert(title: string, text: string, icon: any, confirmButtonText: string, cancelButtonText: string, functionToCall: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    }).then((result) => {
      if (result.value) {
        functionToCall();
      }
    });
  }

  // toast
  showToast(title: string, icon: any) {
    Swal.fire({
      title: title,
      icon: icon,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false
    });
  }

}
