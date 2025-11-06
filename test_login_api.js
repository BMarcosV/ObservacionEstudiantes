import fetch from 'node-fetch'

async function testLoginAPI() {
    try {
        console.log('=== TESTING LOGIN API ===')

        const response = await fetch('http://localhost:8085/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'rodrigo.vidal@andaliensur.cl',
                password: '12345'
            })
        })

        const data = await response.json()
        console.log('Response status:', response.status)
        console.log('Response data:', data)

        if (data.status) {
            console.log('✅ Login successful!')
        } else {
            console.log('❌ Login failed:', data.message)
        }

    } catch (error) {
        console.error('Error testing API:', error.message)
    }
}

testLoginAPI()
