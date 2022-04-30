import { Endereco } from "./endereco";

export interface Parceiro {
    id: number;
    nomeFantasia: string;
    razaoSocial: string;
    cnpj: string;
    telefone: string;
    email: string;
    endereco: Endereco;

}
