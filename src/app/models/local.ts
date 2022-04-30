import { Endereco } from "./endereco";

export interface Local {
    id: number,
    nome: string,
    capacidade: number,
    telefone: string,
    email: string,
    foto: string,
    endereco: Endereco
}
