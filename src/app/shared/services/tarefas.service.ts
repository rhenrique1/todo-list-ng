import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {
  
  private readonly url = 'https://todo-list-ng-ed8aa.firebaseio.com/tarefas';
  
  constructor(private http: HttpClient) { }

  postTarefa(tarefa: Tarefa) {
    return this.http.post<Tarefa>(`${this.url}.json`, tarefa);
  }

  putTarefa(tarefa: Tarefa, id: string) {
    return this.http.put<Tarefa>(`${this.url}/${id}.json`, tarefa);
  }

  getTarefas() {
    return this.http.get<Tarefa[]>(`${this.url}.json`);
  }

  getTarefa(id: string) {
    return this.http.get<Tarefa>(`${this.url}/${id}.json`);
  }
  
  deleteTarefa(id: string) {
    return this.http.delete<Tarefa>(`${this.url}/${id}.json`); 
  }
}
