# TODO: Implementar CRUD para Estudiantes

## Pasos completados:

1. **Actualizar EstudianteService.js** ✅
   - Agregado método `crearEstudiante(datos)` para insertar un nuevo estudiante en la base de datos.
   - Agregado método `actualizarEstudiante(id, datos)` para actualizar un estudiante existente.
   - Agregado método `eliminarEstudiante(id)` para eliminar un estudiante por ID.
   - Agregado método `obtenerCursos()` para obtener lista de cursos disponibles ordenados (1A, 1B, 1C, 2A, 2B, 2C...).
   - Agregado método `obtenerCursoPorId(id)` para obtener información de un curso específico.
   - Agregado método `reasignarIdsEstudiantes()` para mantener IDs secuenciales después de eliminaciones.

2. **Actualizar EstudianteController.js** ✅
   - Agregada función `crear` para manejar la creación de estudiantes con asignación correcta de cursos.
   - Agregada función `actualizar` para manejar la edición de estudiantes.
   - Agregada función `eliminar` para manejar la eliminación de estudiantes con reasignación de IDs.
   - Exportadas las nuevas funciones.
   - Modificada función `index` para incluir lista de cursos.

3. **Actualizar EstudianteRouter.js** ✅
   - Agregada ruta POST '/' para crear estudiante.
   - Agregada ruta PUT '/:id' para actualizar estudiante.
   - Agregada ruta DELETE '/:id' para eliminar estudiante.

4. **Actualizar src/views/alumno/listarEstudiantes.handlebars** ✅
   - Agregado formulario para crear nuevo estudiante con validación de RUT.
   - Agregados botones de editar y eliminar en cada fila de la tabla.
   - Incluidos campos para RUT, Nombre, Apellido, Curso.
   - Cambiados inputs de texto por selectores para cursos.
   - Agregado modal de edición con selectores de curso.
   - Agregado atributo `data-curso-id` para mejor manejo de cursos en edición.

5. **Agregar JavaScript para operaciones en tiempo real** ✅
   - Creado archivo JS (src/public/js/alumno/crudEstudiantes.js) para manejar AJAX requests.
   - Implementadas funciones para enviar datos de creación/edición/eliminación sin recargar la página.
   - Actualizada la tabla dinámicamente después de cada operación.
   - Agregada validación de RUT chileno en frontend.
   - Mejorada lógica para manejar selectores de curso en edición.

6. **Mejoras adicionales implementadas** ✅
   - Validación de RUT chileno (formato correcto y dígito verificador).
   - Selectores de curso ordenados de menor a mayor (1A, 1B, 1C, 2A, 2B, 2C...).
   - Asignación correcta de cursos al crear estudiantes.
   - Reasignación automática de IDs secuenciales después de eliminar estudiantes.
   - Asignación automática de IDs secuenciales al crear nuevos estudiantes.
   - Validación de unicidad de RUT (no se pueden repetir RUTs en el sistema).
   - Deshabilitación del autocompletado en todos los campos de formulario.
   - Validación en frontend y backend.
   - Mensajes de error mejorados.
   - Limpieza automática del formulario después de crear estudiante.
