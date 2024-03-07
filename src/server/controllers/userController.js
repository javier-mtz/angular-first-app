import { Router } from "express";
import User from "../models/User.js";

const router = Router();

const users = [
        {
            id: 1,
            username: 'Jhon Doe',
            email: 'dfe@gmail.com',
            role: 'Admin'
        },
        {
            id: 2,
            username: 'Jane Doe',
            email: 'doejane@gmail.com',
            role: 'User'
        }
    ];

router.get('/all', (req, res) => {
    
    res.json(users);
});

router.post('/create', (req, res) => {
    // Tu código aquí
    console.log(req.body);
    // agregar el usuario al arreglo
    const newUser = req.body;
    // agregarle un id
    newUser.id = users.length + 1;
    console.log(newUser);
    users.push(newUser);

    res.json({message: 'User created'});
});

router.delete('/delete/:id', (req, res) => {
    // este es solo para que funcione el crud, pero debes cambiarlo de status a 2
    // Tu código aquí
    console.log(req.params.id);
    // eliminar el usuario del arreglo
    const user = users.find(user => user.id === parseInt(req.params.id));
    const index = users.indexOf(user);
    users.splice(index, 1);

    res.json({message: 'User deleted'});
});

router.put('/update/:id', (req, res) => {
    // primero buscas por id y luego actualizas
    // Tu código aquí
    console.log(req.params.id);
    console.log(req.body);
    // actualizar el usuario en el arreglo
    const user = users.find(user => user.id === parseInt(req.params.id));
    user.username = req.body.username;
    user.email = req.body.email;
    user.role = req.body.role;
    


    res.json({message: 'User updated'});
});

router.get('/find/:id', (req, res) => {
    // Tu código aquí
    console.log(req.params.id);
    // buscar el usuario en el arreglo
    const user = users.find(user => user.id === parseInt(req.params.id));
    console.log(user);
    res.json(user);

});

export default router;