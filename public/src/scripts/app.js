const loginForm = document.querySelector(".form")
const usernameInput = document.querySelector(".username__input")
const passowrdInput = document.querySelector(".password__input")
const logoutBtn = document.querySelector(".logout__btn")

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const username = usernameInput.value
    const password = passowrdInput.value

    try {
        const response =  await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        if (response.status === 200){
            usernameInput.value = ""
            passowrdInput.value = ""
        }
    } catch (err) {
        console.log(err)
    }
})

logoutBtn.addEventListener("click", async (e) => {
    try {
        const response = await fetch("/api/v1/auth/logout")
    } catch (error) {
        console.log(error)
    }
})