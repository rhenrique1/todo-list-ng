import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavigationService } from 'src/app/shared/services/utils/navigation.service';
import { TarefasService } from 'src/app/shared/services/tarefas.service';
import { Tarefa } from 'src/app/shared/models/tarefa.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-item-tarefa',
  templateUrl: './item-tarefa.component.html',
  styleUrls: ['./item-tarefa.component.css']
})
export class ItemTarefaComponent implements OnInit {
  public isLoading: boolean = false;
  public confirmar: boolean = false;
  public idAlteracao: string = '';
  public mensagem: string = '';
  // @Input() 
  public tarefas: Tarefa[];
  @Input() public statusTarefa: number;
  @Output() recarregar = new EventEmitter<boolean>();

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

  apagarTarefa(id: string) {
    this.tarefasService.deleteTarefa(id)
      .subscribe(
        res => {
          this.initTarefas();
        }, err => {
          this.initTarefas();
        })
  }

  onAlterarStatus(id: string) {
    this.mensagem = 'Alterar status da tarefa?'; 
    this.confirmar = true;
    this.idAlteracao = id;
  }

  onApagarTarefa(id: string) {
    this.mensagem = 'Apagar tarefa?'; 
    this.confirmar = true;
    this.idAlteracao = id;
  }

  alterarStatus(id: string) {
    let tarefa = this.tarefas.find(tarefa => tarefa.id === id);
    if (tarefa.status === 2) {
      tarefa.status = 0;
      this.atualizarTarefa(tarefa, id);
    } else {
      tarefa.status++;
      this.atualizarTarefa(tarefa, id);
    }
  }

  onCloseConfirmacao(bool: boolean) {
    this.confirmar = false;
    if(bool && this.mensagem === 'Alterar status da tarefa?') {
      this.alterarStatus(this.idAlteracao);
      this.recarregar.emit(true);
    } else if(bool && this.mensagem === 'Apagar tarefa?') {
      this.apagarTarefa(this.idAlteracao);
      this.recarregar.emit(true);
    }
  }

  isExpirada(limite: Date) {
    let dataLimite = new Date(limite).toLocaleDateString();
    let dataAtual = new Date().toLocaleDateString();

    return (dataLimite < dataAtual); 
  }

  atualizarTarefa(tarefa: Tarefa, id: string) {
    this.tarefasService.putTarefa(tarefa, id)
    .subscribe(
      res => {
        console.log(res);
      }, err => {
        console.log(err);
      })
  }
}
