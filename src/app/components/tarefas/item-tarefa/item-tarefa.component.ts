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
  public idAlteracao: number;
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
    .subscribe(
      res => {
        this.tarefas = res;
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.isLoading = false;
      })
  }

  apagarTarefa(id: number) {
    this.tarefasService.deleteTarefa(id)
      .subscribe(
        res => {
          this.recarregar.emit(true);
          this.initTarefas();
        }, err => {
          this.recarregar.emit(true);
          this.initTarefas();
        })
  }

  onAlterarStatus(id: number) {
    this.mensagem = 'Alterar status da tarefa?'; 
    this.confirmar = true;
    this.idAlteracao = id;
  }

  onApagarTarefa(id: number) {
    this.mensagem = 'Apagar tarefa?'; 
    this.confirmar = true;
    this.idAlteracao = id;
  }

  alterarStatus(id: number) {
    let tarefa = this.tarefas.find(tarefa => tarefa.id === id);
    if (tarefa.status === 2) {
      tarefa.status = 0;
      this.atualizarTarefa(tarefa);
    } else {
      tarefa.status++;
      this.atualizarTarefa(tarefa);
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

  atualizarTarefa(tarefa: Tarefa) {
    this.tarefasService.putTarefa(tarefa)
    .subscribe(
      res => {
        this.initTarefas();
      }, err => {
        this.initTarefas();
        console.log(err);
      })
  }
}
