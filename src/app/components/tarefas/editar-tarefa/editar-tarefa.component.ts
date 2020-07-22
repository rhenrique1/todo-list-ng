import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/shared/models/tarefa.model';
import { NgForm } from '@angular/forms';
import { TarefasService } from 'src/app/shared/services/tarefas.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent implements OnInit {

  public isLoading: boolean = true;
  public tarefa: Tarefa;
  public tarefaId: number;

  constructor(private tarefasService: TarefasService) { }

  ngOnInit(): void {
    
  }

  initTarefas() {
    this.tarefasService.getTarefa(this.tarefaId)
    .pipe(
      map(res => {
        var tarefa: Tarefa = null;
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            tarefa = ({ ...res[key] , id: key})
          }
        }
        return tarefa;
      })
    )
    .subscribe(
      res => {
        this.tarefa = res;
        console.log(res);
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
      }
    )
  }

  onSalvarTarefa(formTarefa: NgForm) {
    this.tarefa = formTarefa.value;
    console.log(this.tarefa);
  }
}
