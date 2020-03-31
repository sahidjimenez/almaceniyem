
export class Usuario {
    public email: string;
    
    public nombre: string;
    public apellidos: string;
    public uid?: string;


static fromFirebase({email, nombre, apellidos , uid}) {

    return new Usuario(email, nombre, apellidos, uid);
}

    constructor(email: string, nombre: string, apellidos: string, uid: string ) {


        this.uid = uid;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;

    }

}