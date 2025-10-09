const message = document.querySelector('#dataa')
document.querySelector('.searchId').addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    const respuesta = await fetch(`/alumno`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        cache: 'no-cache'
    })
    const data2 = await respuesta.json()
    if (data2.status) {
        let studentData = `
       <table class="table table-hover">
            <tr>
                <th>ID Estudiante</th>
                <th>ID Curso</th>
                <th>ID Apoderado</th>
                <th>Nombre Estudiante</th>
                <th>Apellido 1</th>
                <th>Apellido 2</th>
                <th>RUT Estudiante</th>
                <th>Curso</th>
            </tr>
            <tr>
                <td>${data2.alumno.ID_ESTUDIANTE}</td>
                <td>${data2.alumno.ID_CURSO}</td>
                <td>${data2.alumno.ID_APODERADO}</td>
                <td>${data2.alumno.NOMBRE_ESTUDIANTE}</td>
                <td>${data2.alumno.APELLIDO1_ESTUDIANTE}</td>
                <td>${data2.alumno.APELLIDO2_ESTUDIANTE}</td>
                <td>${data2.alumno.RUT_ESTUDIANTE}</td>
                <td>${data2.alumno.CURSO}</td>
            </tr>
        </table>
        `
        message.innerHTML = studentData
    } else {
        message.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>ALERTA</strong> ${data2.err}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
    }
})