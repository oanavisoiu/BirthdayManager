
export class Account {
    id!: string;
    oldPassword!: string;
    startDate = new Date().toISOString().slice(0, 10);
    idUser!: string;
    idWebsite!: string;
    emailAccount!: string;
}
