const message = document.querySelector('.message')
document.querySelector('.sesion').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
      	new FormData(e.target)
    )
	llamandoAPI(data)
})

const llamandoAPI = async (data) => {
	const options = {
		method: 'POST',
		headers: {
			'Content-Type':'application/json'
		},
        body:JSON.stringify(data),
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/login`,options)
	const data2 = await respuesta.json()
	data2.status ? window.location.href='/alumno' : message.innerHTML=data2.message
}