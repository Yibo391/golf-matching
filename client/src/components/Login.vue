<template>
    <div class = "header"/>
    <div style = "text-align: center; background-image: url('src/assets/bgr.png'); background-size: cover;">
    <div style = "display: grid; height: 100vh; width: 90vw;">
        <div style = "grid-column: 2/3; grid-row: 5/10; height: 90%;">
            <a href = "http://localhost:8080/api/authInit"><img id = "google" class = "fade10" style = "margin-left: 5vw; width: 20vw;" src = "src/assets/google.png"/></a>
        </div>
        <div style = "grid-column: 3/3; grid-row: 5/10; height: 90%;">
            <div style = "width: 100%; text-align: right;">
                <div style = "left: 50vw; width: 100%; margin-right: 0;">
            <h1 style = "font-size: 45px; color: #1c5835">Log in or register via Google and start finding golf partners!</h1>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>

export default {
    mounted() {
        const google = document.getElementById("google")
            google.style.rotate = ""
    },
    name: "Login",
}
</script>

<style scoped>

</style>
