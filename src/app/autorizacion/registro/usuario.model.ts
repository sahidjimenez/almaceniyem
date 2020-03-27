
export class Usuario {
    public nombre: string;
    public email: string;
    public uid?: string;


static fromFirebase({email, nombre, uid}) {

    return new Usuario(email, nombre, uid);
}

    constructor(email: string, nombre: string, uid: string ) {


        this.uid = uid;
        this.nombre = nombre;
        this.email = email;

    }

}