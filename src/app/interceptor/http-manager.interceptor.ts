import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {LoadingStatusService} from '../services/loading-status.service';
import {inject} from '@angular/core';
import {catchError, finalize, throwError} from 'rxjs';

export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {

  let statusService:LoadingStatusService = inject(LoadingStatusService);


  statusService.status.next(true);

  return next(req).pipe(
    catchError((error:HttpErrorResponse)=>{
      // catch errors
      return throwError(()=>error)
    }),
    finalize(()=>{
      statusService.status.next(false);
    })
  )
};
