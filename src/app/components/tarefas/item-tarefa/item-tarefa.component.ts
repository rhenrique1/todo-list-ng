import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

  public confirmar: boolean = false;
  public idAlteracao: string = '';
  public mensagem: string = '';
  @Input() public tarefas: Tarefa[];
  @Input() public statusTarefa: number;
  @Input() public atualizar: false;
  @Output() atualizarProx = new EventEmitter<boolean>();

  constructor (
    private tarefasService: TarefasService,
    public navigationService: NavigationService
  ) {}

  ngOnInit(): void {
  }

  apagarTarefa(id: string) {
    this.tarefasService.deleteTarefa(id)
      .subscribe(
        res => {
          console.log('Deletado com sucesso');
        }, err => {
          console.log(err);
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

    if (tarefa.status === 3) {
      tarefa.status = 1;
      this.atualizarTarefa(tarefa, id);
    } else {
      tarefa.status += 1;
      this.atualizarTarefa(tarefa, id);
    }
  }

  onCloseConfirmacao(bool: boolean) {
    this.confirmar = false;
    if(bool && this.mensagem === 'Alterar status da tarefa?') {
      this.alterarStatus(this.idAlteracao);
    } else if(bool && this.mensagem === 'Apagar tarefa?') {
      this.apagarTarefa(this.idAlteracao);
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
        this.atualizarProx.emit(true);
      }, err => {
        console.log(err);
      })
  }
}
