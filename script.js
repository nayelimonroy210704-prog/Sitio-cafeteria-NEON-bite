/**
 * EVENTO GLOBAL PRINCIPAL:
 * Escucha cuando la estructura del árbol de objetos del documento (DOM) ha sido
 * completamente cargada y procesada por el navegador, permitiendo la manipulación segura de elementos.
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // Dispara e inicializa el sistema de control de filtrado de productos en la página del menú
    inicializarFiltrosMenu();
    
    // Activa los escuchadores de eventos y validaciones para el formulario de la página de contacto
    inicializarFormularioContacto();

});

/**
 * FUNCIÓN DE CONTROL: Filtrado dinámico para el catálogo de la cafetería
 * Lee las propiedades personalizadas de los botones para alterar los estilos en cascada CSS
 */
function inicializarFiltrosMenu() {
    // Busca e introduce en una lista todos los botones que contengan la clase '.filter-btn'
    const botonesFiltro = document.querySelectorAll('.filter-btn');
    // Colecciona todas las tarjetas del catálogo identificadas con '.menu-item'
    const itemsMenu = document.querySelectorAll('.menu-item');

    // Estructura de Control de Seguridad: Si la lista está vacía (ej. en index.html), finaliza la función
    if (botonesFiltro.length === 0) return;

    // Ciclo repetitivo para enlazar un detector de clics individual a cada botón encontrado
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (e) => {
            
            // ACCIÓN 1: Limpieza de la interfaz gráfica de botones
            // Remueve la clase visual resaltada '.active' de todos los botones de la lista
            botonesFiltro.forEach(b => b.classList.remove('active'));
            // Inyecta la clase activa exclusivamente al botón que acaba de recibir la pulsación
            e.target.classList.add('active');

            // ACCIÓN 2: Extracción del filtro solicitado
            // Extrae la cadena de texto guardada en el atributo personalizado 'data-filter' (ej. 'bebidas')
            const categoriaSeleccionada = e.target.getAttribute('data-filter');

            // ACCIÓN 3: Iteración y Comparación de Elementos
            // Recorre cada una de las tarjetas de los productos una por una
            itemsMenu.forEach(item => {
                // Obtiene la categoría particular asignada a la tarjeta actual desde 'data-category'
                const categoriaItem = item.getAttribute('data-category');

                // Condicional de despliegue lógico:
                // Si la selección es igual a 'todos' O la categoría del item empareja con la selección del botón...
                if (categoriaSeleccionada === 'todos' || categoriaItem === categoriaSeleccionada) {
                    // Remueve la clase '.hidden' de CSS para forzar la visualización en pantalla
                    item.classList.remove('hidden');
                } else {
                    // De lo contrario, inyecta la clase '.hidden' para ocultar la tarjeta con 'display: none'
                    item.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * FUNCIÓN DE CONTROL: Validación manual y simulación de envío del formulario de contacto
 * Captura la acción nativa de envío para evitar interrupciones de carga y dar una respuesta elegante
 */
function inicializarFormularioContacto() {
    // Intenta ubicar el elemento del formulario usando su identificador único
    const formulario = document.getElementById('contactForm');
    // Intenta capturar la caja destinada a imprimir el aviso de éxito
    const feedback = document.getElementById('formFeedback');

    // Estructura de Escape: Si el formulario no existe en la página de ejecución, sale de la función inmediatamente
    if (!formulario) return;

    // Vincula el escuchador de eventos al disparador de envío (submit) del formulario
    formulario.addEventListener('submit', (e) => {
        // Intercepta y cancela el comportamiento por defecto de HTML que fuerza la recarga de página
        e.preventDefault();

        // Captura los textos almacenados actualmente por el usuario dentro de las cajas de texto correspondientes
        const nombreInput = document.getElementById('nombre').value;
        const emailInput = document.getElementById('email').value;

        // Limpia cualquier rastro visual o textos previos de ejecuciones anteriores en el banner de feedback
        feedback.classList.add('hidden');
        feedback.classList.remove('success');

        // Construye un mensaje de éxito dinámico concatenando las variables recolectadas (Template Literals)
        feedback.textContent = `¡Gracias, ${nombreInput}! Hemos recibido tu mensaje con éxito. Nos comunicaremos contigo al correo: ${emailInput} a la brevedad para finalizar tu reserva.`;
        
        // Muestra el banner eliminando la propiedad de ocultación e inyectando los colores verdes de éxito
        feedback.classList.remove('hidden');
        feedback.classList.add('success');

        // Ejecuta un reseteo nativo sobre el formulario para borrar todas las entradas del usuario tras enviar
        formulario.reset();
    });
}