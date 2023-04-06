const loginForm = document.querySelector(".log__form")
const usernameInput = document.querySelector(".username__input")
const passowrdInput = document.querySelector(".password__input")
const logout = document.querySelector(".logout__btn")

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    if(!usernameInput.value || !passowrdInput.value) return
    const username = usernameInput.value
    const password = passowrdInput.value
    const user = { username, password }
    try {
        const response =  await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (response.status === 200){
            usernameInput.value = ""
            passowrdInput.value = ""
        }
    } catch (err) {
        console.log(err)
    }
})

logout.addEventListener("click", async () => {
    try {
        const response = await fetch("/api/v1/auth/logout")
    } catch (err) {
        console.log(err)
    }
})