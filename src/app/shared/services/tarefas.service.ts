import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor(private http: HttpClient) { }

  readonly url = 'https://todo-list-ng-ed8aa.firebaseio.com/tarefas.json';

  postTarefa(tarefa: Tarefa) {
    return this.http.post<Tarefa>(this.url, tarefa);
  }

  putTarefa(tarefa: Tarefa) {
    return this.http.put<Tarefa>(this.url + tarefa.id, tarefa);
  }

  getTarefas() {
    return this.http.get<Tarefa[]>(this.url);
  }

  getTarefa(id: number) {
    return this.http.get<Tarefa>(this.url + id);
  }
  
  deleteTarefa(id: number) {
    return this.http.delete<Tarefa>(this.url + id); 
  }
}
