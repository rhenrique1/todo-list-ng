import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {}

    navigate(path: string, param?: number): void {
        if(param) {
            this.router.navigate([path + '/' + param]);
        }
        else {
            this.router.navigate([path]);
        }
    }

}
