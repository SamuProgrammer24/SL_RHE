import database from "./basededatos.js";

class UsuariosService {


    login(email, password) {
        console.log('PASO01:el usuario:' + email + ' con contraseña:' + password + '');

        const row = database.prepare('SELECT true FROM Usuarios WHERE email = ? AND password = ?').get(email, password);

        console.log('PASO02: respuesta:', {row});
    

        const accountFound = !!row;
        return accountFound;
    }
    



}

const usuariosService = new UsuariosService();

export default usuariosService;
