export interface Tarefa {
  id: string;
  nome: string;
  descricao: string;
  dataCriacao: Date;
  limite: Date;
  status: boolean;
}
