const message = document.querySelector('.message')
document.querySelector('#nuevaObservacion').addEventListener('submit',e=>{
    e.preventDefault()
    const data = Object.fromEntries(
      	new FormData(e.target)
    )
    console.log(data)
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
	const respuesta = await fetch(`/api/observaciones`,options)
	const data2 = await respuesta.json()
	data2.status ? message.innerHTML=data2.message : message.innerHTML=data2.message
}