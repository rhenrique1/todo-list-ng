import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/shared/models/tarefa.model';
import { TarefasService } from 'src/app/shared/services/tarefas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tarefas: Tarefa[] = [];
  public carregando: boolean = true;
  
  constructor(private tarefasService: TarefasService) { }

  ngOnInit(): void {
    this.initTarefas();
  }

  initTarefas() {
    this.tarefasService.getTarefas().subscribe(
      res => {
        this.tarefas = res;
        this.carregando = false;
      }, err => {
        console.log(err);
        this.carregando = false;
      }
    )
  }

}
