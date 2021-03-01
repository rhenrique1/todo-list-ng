import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../shared/services/utils/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public verIncompletas: boolean = true;
  public categoriaTarefas: string = 'Iniciadas';
  
  constructor(public navigationService: NavigationService) { }

  ngOnInit(): void {
  }

  onClickIncompletas() {
    this.categoriaTarefas = 'Iniciadas';
    this.verIncompletas = true;
  }

  onClickCompletas() {
    this.categoriaTarefas = 'Finalizadas';
    this.verIncompletas = false;
  }
}
