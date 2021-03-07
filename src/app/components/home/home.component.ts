import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Tarefa } from 'src/app/shared/models/tarefa.model';
import { TarefasService } from 'src/app/shared/services/tarefas.service';
import { NavigationService } from '../../shared/services/utils/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public isLoading: boolean = false;
  public tarefas: Tarefa[] = []; 

  constructor (
    private tarefasService: TarefasService,
    public navigationService: NavigationService
  ) {}

  ngOnInit(): void {}

  initTarefas() {
    this.isLoading = true;
    this.tarefasService.getTarefas()
    .subscribe(
      res => {
        this.tarefas = res;
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
      })
  }

}
