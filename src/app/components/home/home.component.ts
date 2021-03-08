import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Tarefa } from 'src/app/shared/models/tarefa.model';
import { TarefasService } from 'src/app/shared/services/tarefas.service';
import { NavigationService } from '../../shared/services/utils/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public isEnabled: boolean = false;
  public tarefas: Tarefa[] = []; 

  constructor (
    public navigationService: NavigationService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  recarregar() {
    this.isEnabled = true;
    this.changeDetector.detectChanges();
    this.isEnabled = false;
  }
}
