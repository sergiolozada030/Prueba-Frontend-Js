// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: 'AIzaSyC1NInlJtx2GH8gfOLzxecEqyRaRQwG8IM',
    authDomain: 'crud-react-b1642.firebaseapp.com',
    projectId: 'crud-react-b1642'
});

var db = firebase.firestore();

//Agregar usuarios
function agregar() {

    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('correo').value;
    var edad = document.getElementById('edad').value;
    var direccion = document.getElementById('direccion').value;

    db.collection("users").add({
        nombre: nombre,
        email: email,
        edad: edad,
        direccion: direccion
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);

            nombre = document.getElementById('nombre').value = '';
            email = document.getElementById('correo').value = '';
            edad = document.getElementById('edad').value = '';
            document.getElementById('direccion').value = '';

        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

//leer Data
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().email}</td>
        <td>${doc.data().edad}</td>
        <td>${doc.data().direccion}</td>
        <td><button class="btn btn-warning" onclick="update('${doc.id}',
        '${doc.data().nombre}',
        '${doc.data().email}',
        '${doc.data().edad}',
        '${doc.data().direccion}')"><i class="fas fa-user-edit"></i></button></td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')"><i class="fas fa-trash-alt"></i></button></td>
       </tr>
        `
    });
});

//Eliminar User
function eliminar(id) {
    db.collection("users").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//Actulizar User
function update(id, nombre, email, edad, direccion) {

    document.getElementById('nombre').value = nombre;
    document.getElementById('correo').value = email;
    document.getElementById('edad').value = edad;
    document.getElementById('direccion').value = direccion;
    var boton = document.getElementById('button');
    boton.innerHTML = 'Actualizar';

    boton.onclick = function () {
        var dataRef = db.collection("users").doc(id);

        var nombre = document.getElementById('nombre').value;
        var email = document.getElementById('correo').value;
        var edad = document.getElementById('edad').value;
        var direccion = document.getElementById('direccion').value;

        return dataRef.update({
            nombre: nombre,
            email: email,
            edad: edad,
            direccion: direccion
        })
            .then(function () {
                console.log("Document successfully updated!");
                location.reload();
                nombre = document.getElementById('nombre').value = '';
                email = document.getElementById('correo').value = '';
                edad = document.getElementById('edad').value = '';
                document.getElementById('direccion').value = '';
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}
