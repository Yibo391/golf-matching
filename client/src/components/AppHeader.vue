<template>
    <div class = "header">
        <img src = "../assets/logo.png"/>
        <router-link to="/"><h3 class = "headerLink">Home</h3></router-link>
        <router-link to="/chat"><h3 class = "headerLink">Chat</h3></router-link>
      <router-link to="/booking"><h3 class = "headerLink">Booking</h3></router-link>
        <router-link to="/profile"> <h3 class = "headerLink">Profile</h3></router-link>
        <div class = "accountsDiv">
            <div>
            <div>
            </div>
            <h3 id = "user">Hello, </h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        if (window.location.href.includes("localhost:5173/authSuccessful"))    {
            const splitter = window.location.href.split("api")
            window.location.href = "http://localhost:8080/authSuccessful" + splitter[1]
        }
        const userHeader = document.getElementById("user")
        fetch('http://localhost:8080/api/currentUser', {
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                userHeader.textContent = "Hello, " + data["username"]
                if (data["username"].includes("Guest")) {
                    window.location.href = "/login"
                }
            })
    },
    name: "AppHeader"
}
</script>

<style scoped>

</style>
