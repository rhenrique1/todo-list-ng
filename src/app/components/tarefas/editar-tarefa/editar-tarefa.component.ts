import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/shared/models/tarefa.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent implements OnInit {
  
  public tarefa: Tarefa = {
    id: 0,
    nome: 'Testando',
    descricao: 'Tarefa de teste',
    dataCriacao: new Date(),
    dataLimite: new Date(),
    status: false
  };

  constructor() { }

  ngOnInit(): void {
    
  }

  onSalvarTarefa(formTarefa: NgForm) {
    this.tarefa = formTarefa.value;
    console.log(this.tarefa);
  }
}
