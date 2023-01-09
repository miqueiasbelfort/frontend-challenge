export interface ClientsT {
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    cpf: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
export interface AuthT {
    msg: string,
    token: string
}