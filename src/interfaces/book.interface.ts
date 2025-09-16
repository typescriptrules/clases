export interface IBook {
    id:string,
    author:string,
    name:string,
    ouwner:string
}

export type updateBookDTO = Partial<Omit<IBook, 'id'>>