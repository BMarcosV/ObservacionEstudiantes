document.addEventListener('DOMContentLoaded', function() {
    const formCrear = document.getElementById('formCrearEstudiante');
    const formEditar = document.getElementById('formEditarEstudiante');
    const editarModal = new bootstrap.Modal(document.getElementById('editarModal'));


    function validarRUT(rut) {
    
        rut = rut.replace(/\./g, '').replace(/-/g, '').trim();

        if (rut.length < 8 || rut.length > 9) return false;

        const cuerpo = rut.slice(0, -1);
        const dv = rut.slice(-1).toLowerCase();

      
        if (!/^\d+$/.test(cuerpo)) return false;

     
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


    formCrear.addEventListener('submit', async function(e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const apellido1 = document.getElementById('apellido1').value.trim();
        const apellido2 = document.getElementById('apellido2').value.trim();
        const rut = document.getElementById('rut').value.trim();
        const curso = document.getElementById('curso').value;

   
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
                    id_apoderado: 1 
                })
            });

            const result = await response.json();
            if (result.success) {
                alert('Estudiante creado exitosamente');
        
                formCrear.reset();
                location.reload(); 
            } else {
                alert('Error al crear estudiante: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear estudiante');
        }
    });

   
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-editar')) {
            const id = e.target.getAttribute('data-id');
            const row = e.target.closest('tr');
            const cells = row.querySelectorAll('td');

            document.getElementById('editId').value = id;
            document.getElementById('editNombre').value = cells[0].textContent.trim();
            document.getElementById('editApellido1').value = cells[1].textContent.trim();
            document.getElementById('editRut').value = cells[2].textContent.trim();

           
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

           
            if (!cursoEncontrado) {
                const cursoId = row.getAttribute('data-curso-id');
                if (cursoId) {
                    selectCurso.value = cursoId;
                } else {
                    
                    console.log('No se pudo encontrar el curso para edición:', cursoNombre);
                }
            }

            editarModal.show();
        }
    });

   
    formEditar.addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('editId').value;
        const nombre = document.getElementById('editNombre').value.trim();
        const apellido1 = document.getElementById('editApellido1').value.trim();
        const apellido2 = document.getElementById('editApellido2').value.trim();
        const rut = document.getElementById('editRut').value.trim();
        const curso = document.getElementById('editCurso').value;

      
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
                location.reload(); 
            } else {
                alert('Error al actualizar estudiante: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar estudiante');
        }
    });

 
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
                location.reload(); 
            } else {
                alert('Error al eliminar estudiante: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar estudiante');
        }
    }
});
