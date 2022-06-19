import { Local } from "./local";
import { Parceiro } from "./parceiro";

export interface Evento {
    id: number;
    nome: string;
    descricao: string;
    data_hora: string;
    local: Local;
    parceiro: Parceiro;
    status: EventoStatus;
    classificacao: ClassificacaoIndicativa,
    imagem: string;
}

export enum EventoStatus {
    PENDENTE = 'PENDENTE',
    APROVADO = 'APROVADO',
    REPROVADO = 'REPROVADO',
    FINALIZADO = 'FINALIZADO'
}

export enum ClassificacaoIndicativa {
    LIVRE = 'Livre',
    DEZOITO = '18',
    DEZESSEIS = '16',
    QUATORZE = '14',
    DOZE = '12',
    DEZ = '10'
}