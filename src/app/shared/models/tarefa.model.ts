export interface Tarefa {
  id: number;
  nome: string;
  descricao: string;
  dataCriacao: Date;
  limite: Date;
  status: number;
}
