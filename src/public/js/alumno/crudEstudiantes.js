document.addEventListener('DOMContentLoaded', function() {
    const formCrear = document.getElementById('formCrearEstudiante');
    const formEditar = document.getElementById('formEditarEstudiante');
    const editarModal = new bootstrap.Modal(document.getElementById('editarModal'));

    // Función para validar RUT chileno
    function validarRUT(rut) {
        // Remover puntos y espacios
        rut = rut.replace(/\./g, '').replace(/-/g, '').trim();

        if (rut.length < 8 || rut.length > 9) return false;

        const cuerpo = rut.slice(0, -1);
        const dv = rut.slice(-1).toLowerCase();

        // Verificar que el cuerpo sea numérico
        if (!/^\d+$/.test(cuerpo)) return false;

        // Calcular dígito verificador
        let suma = 0;
        let multiplicador = 2;

        for (let i = cuerpo.length - 1; i >= 0; i--) {
            suma += parseInt(cuerpo[i]) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }

        const resto = suma % 11;
        const dvCalculado = resto === 0 ? '0' : resto === 1 ? 'k' : (11 - resto).toString();

        return dv === dvCalculado;
    }

    // Crear estudiante
    formCrear.addEventListener('submit', async function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const apellido1 = document.getElementById('apellido1').value.trim();
        const apellido2 = document.getElementById('apellido2').value.trim();
        const rut = document.getElementById('rut').value.trim();
        const curso = document.getElementById('curso').value;

        // Validar RUT
        if (!validarRUT(rut)) {
            alert('RUT inválido. Por favor ingrese un RUT válido.');
            return;
        }

        try {
            const response = await fetch('/estudiantes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    apellido1,
                    apellido2,
                    rut,
                    curso,
                    id_apoderado: 1 // Asumiendo un apoderado por defecto
                })
            });

            const result = await response.json();
            if (result.success) {
                alert('Estudiante creado exitosamente');
                // Limpiar formulario
                formCrear.reset();
                location.reload(); // Recargar la página para mostrar el nuevo estudiante
            } else {
                alert('Error al crear estudiante: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear estudiante');
        }
    });

    // Editar estudiante - abrir modal
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-editar')) {
            const id = e.target.getAttribute('data-id');
            const row = e.target.closest('tr');
            const cells = row.querySelectorAll('td');

            document.getElementById('editId').value = id;
            document.getElementById('editNombre').value = cells[0].textContent.trim();
            document.getElementById('editApellido1').value = cells[1].textContent.trim();
            document.getElementById('editRut').value = cells[2].textContent.trim();

            // Para el curso, necesitamos encontrar el ID correspondiente al nombre
            const cursoNombre = cells[3].textContent.trim();
            const selectCurso = document.getElementById('editCurso');
            let cursoEncontrado = false;
            for (let option of selectCurso.options) {
                if (option.text.trim() === cursoNombre) {
                    selectCurso.value = option.value;
                    cursoEncontrado = true;
                    break;
                }
            }

            // Si no se encontró el curso exacto, intentar buscar por ID_CURSO desde el data attribute
            if (!cursoEncontrado) {
                const cursoId = row.getAttribute('data-curso-id');
                if (cursoId) {
                    selectCurso.value = cursoId;
                } else {
                    // Si no hay data-curso-id, buscar por el nombre del curso en la base de datos
                    // Esto es un fallback, pero debería funcionar con los cambios en el backend
                    console.log('No se pudo encontrar el curso para edición:', cursoNombre);
                }
            }

            editarModal.show();
        }
    });

    // Actualizar estudiante
    formEditar.addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('editId').value;
        const nombre = document.getElementById('editNombre').value.trim();
        const apellido1 = document.getElementById('editApellido1').value.trim();
        const apellido2 = document.getElementById('editApellido2').value.trim();
        const rut = document.getElementById('editRut').value.trim();
        const curso = document.getElementById('editCurso').value;

        // Validar RUT si fue modificado
        if (!validarRUT(rut)) {
            alert('RUT inválido. Por favor ingrese un RUT válido.');
            return;
        }

        try {
            const response = await fetch(`/estudiantes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    apellido1,
                    apellido2,
                    rut,
                    curso
                })
            });

            const result = await response.json();
            if (result.success) {
                alert('Estudiante actualizado exitosamente');
                editarModal.hide();
                location.reload(); // Recargar la página para mostrar los cambios
            } else {
                alert('Error al actualizar estudiante: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar estudiante');
        }
    });

    // Eliminar estudiante
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-eliminar')) {
            const id = e.target.getAttribute('data-id');
            if (confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
                eliminarEstudiante(id);
            }
        }
    });

    async function eliminarEstudiante(id) {
        try {
            const response = await fetch(`/estudiantes/${id}`, {
                method: 'DELETE'
            });

            const result = await response.json();
            if (result.success) {
                alert('Estudiante eliminado exitosamente');
                location.reload(); // Recargar la página para actualizar la lista
            } else {
                alert('Error al eliminar estudiante: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar estudiante');
        }
    }
});
