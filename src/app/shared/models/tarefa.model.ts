export interface Tarefa {
  id: number;
  nome: string;
  descricao: string;
  dataCriacao: Date;
  dataLimite: Date;
  status: boolean;
}
