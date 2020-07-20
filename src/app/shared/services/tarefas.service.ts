import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  constructor(private http: HttpClient) { }

  fetchTarefas() {
    return this.http.get<Tarefa[]>('');
  }

  fetchTarefa(id: number) {
    return this.http.get<Tarefa[]>('' + id);
  }

}
