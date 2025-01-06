document.addEventListener('DOMContentLoaded',function() {

     const getInitialEmail = () => ({
            email: '',
            asunto: '', 
            mensaje: '',
        })

    const email = getInitialEmail();
    
    
    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')
    
    // Asignar eventos 
    inputEmail.addEventListener('blur', validar)
    inputAsunto.addEventListener('blur', validar)
    inputMensaje.addEventListener('blur', validar)

    formulario.addEventListener('submit', enviarEmail)

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();
        resetForm();
    });

    const resetForm = () => {
                //reiniciar el object email
                Object.assign(email, getInitialEmail());
                formulario.reset()
                comprobarEmail();
    }

    function enviarEmail(e) {
        e.preventDefault()
        spinner.classList.add('flex') 
        spinner.classList.remove('hidden')
        resetForm();
        
        setTimeout(() => {

            spinner.classList.add('hidden') 
            spinner.classList.remove('flex')


            //Crear una alerta
            const succesAlert = document.createElement('P');
            succesAlert.classList.add('bg-green-500', 'text-white',  'p-2', 'text-center', 'rounded-lg', 'mt-10',  'font-bold', 'text-sm', 'uppercase');
            succesAlert.textContent = 'Mensaje enviado correctamente'

            formulario.appendChild( succesAlert );

            setTimeout( () => {
                succesAlert.remove()
            }, 3000)

        }, 3000)
    }
    function validar(e) {
        const parentEl = e.target.parentElement;
        const value = e.target.value.trim();
        const fieldName = e.target.id;


        if( value === '' ) {
            showAlert(
                `El campo ${ fieldName } es obligatorio`,
                parentEl
            );
            email[ fieldName ] = '';
            comprobarEmail();
            return;
        }
        
        if( fieldName ==='email' && !validarEmail( value ) ) {
            showAlert('El email no es valido', parentEl)
            email[ fieldName ] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta( parentEl );

        //Asignar los valores
        email[ fieldName ] = e.target.value.trim().toLowerCase();


        //Comprobar el object email
        comprobarEmail();
    }

    function showAlert( message, referencia ) {

        //Comprueba si ya existe un alerta
        limpiarAlerta(referencia);
        
        const error = document.createElement('P');
        error.textContent = message;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        // Inyectar el error al formulario
        referencia.appendChild( error );

    }

    function limpiarAlerta( referencia ) {
        const alerta = referencia.querySelector('.bg-red-600')

        if( alerta ) {
            alerta.remove()
        }
    }

    function validarEmail( email ) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test( email );

        return resultado;
    }
    
    function comprobarEmail() {
        if( Object.values( email ).includes('') ) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true;
            return
        }
        btnSubmit.classList. remove('opacity-50');
        btnSubmit.disabled = false;

    }
    
});