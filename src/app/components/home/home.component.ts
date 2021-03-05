import { Component, OnInit } from '@angular/core';
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

  public isLoading: boolean = true;
  public tarefas: Tarefa[] = []; 

  constructor (
    private tarefasService: TarefasService,
    public navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.initTarefas();
  }

  initTarefas() {
    this.isLoading = true;
    this.tarefasService.getTarefas()
    .pipe(
      map(res => {
        const tarefasArray = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            tarefasArray.push({ ...res[key] , id: key})
          }
        }
        return tarefasArray;
      })
    )
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
