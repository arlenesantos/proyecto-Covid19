
const login = (() => {

    //se implementa la lógica para obtener el JWT cuando se ingrese el correo y contraseña a través del formulario
    $('#formLogin').submit(async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const JWT = await postData(email, password);
        //se cierra el modal al clicar en submit
        $('#modalLogin').modal('hide');

    });

    //se llama a la API para obtener el token
    const postData = async (email, password) => {
        try {
            const response = await fetch("http://localhost:3000/api/login",
                {
                    method: 'POST',
                    body: JSON.stringify({ email: email, password: password }),
                });
            const { token } = await response.json();

            //se persiste el JWT  --> **ocupar el localStorage.clear() en los proximos pasos**
            localStorage.setItem('jwt-token', token);
            validarToken();
            return token;

        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };


    const validarToken = async () => {
        const token = localStorage.getItem('jwt-token');

        //se oculta la opción del menú 'Iniciar' y se agregan las opciones 'Situación Chile' y 'Cerrar sesión'
        if (token == "undefined"){
            alert("Email o contraseña incorrectos. Intente nuevamente!");
            localStorage.clear();
        } else if (token) {
            document.getElementById('iniciar').classList.add('d-none');
            document.getElementById('chile').classList.remove('d-none');
            document.getElementById('cerrar').classList.remove('d-none');            
        }
        
    };
    let cerrarSesion = document.getElementById("cerrar");
    $(cerrarSesion).click((e) => {
      e.preventDefault();
      localStorage.clear();
      location.reload();
    });
    validarToken();
})()


export default login;




