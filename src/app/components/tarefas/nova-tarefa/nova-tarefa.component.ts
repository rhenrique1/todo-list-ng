import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tarefa } from 'src/app/shared/models/tarefa.model';
import { TarefasService } from 'src/app/shared/services/tarefas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nova-tarefa',
  templateUrl: './nova-tarefa.component.html',
  styleUrls: ['./nova-tarefa.component.css']
})
export class NovaTarefaComponent implements OnInit {

  public tarefa: Tarefa;
  public confirmar: boolean = false;
  public formTarefa: NgForm;

  constructor(private tarefasService: TarefasService,
    private router: Router) { }

  ngOnInit(): void {
  }

  salvarTarefa(formTarefa: NgForm) {
    this.tarefa = formTarefa.value;
    this.tarefa.dataCriacao = new Date();
    this.tarefa.status = 0;

    console.log(this.tarefa);
    this.tarefasService.postTarefa(this.tarefa).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
        this.router.navigate(['/']);
      }
    )
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
}
