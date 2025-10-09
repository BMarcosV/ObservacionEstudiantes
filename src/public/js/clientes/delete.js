const botones = document.querySelectorAll('.delete')
botones.forEach((btn) => {
	btn.addEventListener('click', function(){
		if (confirm('Está seguro de eliminar este cliente') == true) {
			const userId = btn.dataset.userId
			llamandoAPI(userId)
		} 
	})
})

const llamandoAPI = async (userId) => {
	const options = {
		method: 'DELETE',
		headers: {
			'Content-Type':'application/json'
		},
		cache: 'no-cache'
	}
	const respuesta = await fetch(`/api/observaciones/${userId}`,options)
	const data2 = await respuesta.json()
	window.location.replace('/api/observaciones')
}