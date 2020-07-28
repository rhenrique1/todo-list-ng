import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/utils/navigation.service';
import { TarefasService } from 'src/app/shared/services/tarefas.service';
import { map } from 'rxjs/operators';
import { Tarefa } from 'src/app/shared/models/tarefa.model';

@Component({
  selector: 'app-item-tarefa',
  templateUrl: './item-tarefa.component.html',
  styleUrls: ['./item-tarefa.component.css']
})
export class ItemTarefaComponent implements OnInit {

  public tarefas: Tarefa[] = [];
  public isLoading: boolean = true;
  @Input() public verIncompletas: boolean;

  constructor(private tarefasService: TarefasService,
    public navigationService: NavigationService) { }

  ngOnInit(): void {
    this.initTarefas();
  }

  initTarefas() {
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

  onDeleteTarefa(id: string) {
    if(confirm('Deletar tarefa?')) {
      this.tarefasService.deleteTarefa(id)
        .subscribe(
          res => {
            console.log('Deletado com sucesso');
            this.initTarefas();
          }, err => {
            console.log(err);
            this.initTarefas();
          })
    }
  }

  onAlterarStatus(id: string) {
    if(confirm('Alterar status da tarefa?')) {
      let tarefa = this.tarefas.find(tarefa => tarefa.id = id);
      tarefa.status = !!tarefa.status;
      this.tarefasService.putTarefa(tarefa, id)
        .subscribe(
          res => {
            console.log(res);
            this.isLoading = true;
            this.initTarefas();
          }, err => {
            console.log(err);
            this.isLoading = true;
            this.initTarefas();
          })
    } else {
      this.isLoading = true;
      this.initTarefas();
    }
  }
}
