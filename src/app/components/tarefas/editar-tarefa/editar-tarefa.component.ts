import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/shared/models/tarefa.model';
import { NgForm } from '@angular/forms';
import { TarefasService } from 'src/app/shared/services/tarefas.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent implements OnInit {

  public isLoading: boolean = true;
  public confirmar: boolean = false;
  public tarefa: Tarefa;
  public tarefaId: number;
  public formTarefa: NgForm;

  constructor(private tarefasService: TarefasService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.tarefaId = params['id'];
      this.initTarefas();
    });
  }

  initTarefas() {
    this.tarefasService.getTarefa(this.tarefaId)
      .subscribe(
        res => {
          this.tarefa = res;
          this.isLoading = false;
        }, err => {
          console.log(err);
          this.isLoading = false;
      })
  }

  onSalvar(formTarefa: NgForm) {
    this.formTarefa = formTarefa;
    this.confirmar = true;
  }

  onCloseConfirmacao(bool: any) {
    this.confirmar = false;
    if(bool) {
      this.salvarTarefa(this.formTarefa);
    }
  }

  salvarTarefa(formTarefa: NgForm) {
    this.tarefa.descricao = formTarefa.value.descricao;
    this.tarefa.limite = formTarefa.value.limite;
    this.tarefa.nome = formTarefa.value.nome;

    this.tarefasService.putTarefa(this.tarefa)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        }, err => {
          console.log(err);
          this.router.navigate(['/']);
      })
  }
}
