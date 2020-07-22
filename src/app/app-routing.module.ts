import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NovaTarefaComponent } from './components/tarefas/nova-tarefa/nova-tarefa.component';
import { EditarTarefaComponent } from './components/tarefas/editar-tarefa/editar-tarefa.component';


const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
  },

  {
    path: 'nova-tarefa',
    component: NovaTarefaComponent,
  },
  { 
    path: 'editar-tarefa/:id', 
    component: EditarTarefaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
