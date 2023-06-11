<template>
  <div class="fade10" id = "overlay" style = "pointer-events: none; background-color: rgba(0,0,0,0.90); height: 100vh; width: 101vw; margin-left: -10px; display: grid; position:  absolute; opacity: 0;">
    <div style = "text-align: center; grid-column: 1/3; grid-row: 2/3; width: 100%;">
      <h1 style="font-size: 75px; color: white; grid-column: 2/3;">It's a match!</h1>
      <h1 style="color: white;">Visit the chat section to message your new match.</h1>
    </div>
  </div>
    <AppHeader/>
    <div style = "display: grid; height: 100%;">
    <div style = "margin-top: 100px; grid-column: 2/3; grid-row: 3/3; width: 95vw;">
        <div id = "userContainer" class = "userContainer" style = "max-height: 20px; ">
            <div class="container">
                <div style = "display: grid" class="column">
                    <img style = "width: 25%; grid-column: 3/3; grid-row: 2/3" id = "prevImage" src="src/assets/arrowleft.png" alt="PreviousImage">
                </div>
                <div id = "midColumn" class="column middle">
                    <div id = "focusImage" class = "fade10" style = "background-image: url('src/assets/noimg.png'); height: 60vh; width: 75vw; background-size: cover; background-position: center; background-repeat: no-repeat; border-radius: 40px;">
                        <div id = "imageOverlay" class = "fade5" style = "opacity: 0; height: 100%; width: 100%; background-size: contain; background-repeat: no-repeat; background-position: center;"></div>
                    </div>
                    <h2 style = "text-shadow: black 2px 2px 2px; font-size: 50px; position: absolute; top: 10vh; margin-left: 5vw;" id = "userName"></h2>
                    <h2 style = "text-shadow: black 2px 2px 2px; position: absolute; top: 25vh; margin-left: 5vw;" id = "description"></h2>
                    <h2 style = "text-shadow: black 2px 2px 2px; position: absolute; top: 30vh; margin-left: 5vw;" id = "skill"></h2>
                    <div>
                        <div>
                        <img class = "button" style = "width: 10vw;" id = "like" src="src/assets/like.png">
                        <img class = "button" style = "float: right; width: 10vw;" id = "dislike" src="src/assets/dislike.png">
                        </div>
                    </div>
                </div>
                <div style = "display: grid" class="column">
                    <img style = "float: right; width: 25%; grid-column: 3/3; grid-row: 2/3" id = "nextImage" src="src/assets/arrowright.png" alt="NextImage">
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
    mounted () {
        function update()   {
            if ((userIndex >= query.length)) {
                document.getElementById("focusImage").style.display = "none"
                document.getElementById("prevImage").style.display = "none"
                document.getElementById("nextImage").style.display = "none"
                document.getElementById("like").style.display = "none"
                document.getElementById("dislike").style.display = "none"
                document.getElementById("userName").style.display = "none"
                document.getElementById("description").style.display = "none"
                document.getElementById("skill").style.display = "none"
                const text = document.createElement("h2")
                const div = document.createElement("div")
                div.style.display = "grid"
                div.style.height = "100%"
                div.style.textAlign = "center"
                text.style.gridRow = "2/3";
                text.textContent = "Looks like there are no more potential matches around. Check again later!"
                div.appendChild(text)
                document.getElementById("midColumn").appendChild(div)
            } else {
                if (query[userIndex]["images"] !== undefined)  {
                    imageIndex = 0
                    document.getElementById("focusImage").style.backgroundImage = "url(" + query[userIndex]["images"][imageIndex]+")"
            }
                document.getElementById("userName").textContent = query[userIndex]["name"]
                document.getElementById("description").textContent = query[userIndex]["description"]
                document.getElementById("skill").textContent = query[userIndex]["claimedSkill"]
            }
        }
        let query = []
        let userIndex = 0
        let imageIndex = 0
        fetch('http://localhost:8080/api/queryMatches',{
        credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                query = data
                console.log(data)
            }).then (data => {
            update()
        })
        const container = document.getElementById("userContainer")
        document.getElementById("prevImage").addEventListener("click", function()   {
                if ((query[userIndex]["images"] !== undefined) && (imageIndex > 0)) {
                    imageIndex--;
                    document.getElementById("focusImage").style.backgroundImage = "url(" + query[userIndex]["images"][imageIndex]+")"
                }
        })
        document.getElementById("nextImage").addEventListener("click", function()   {
            if ((query[userIndex]["images"] !== undefined) && (imageIndex < query[userIndex]["images"].length - 1))  {
                imageIndex++;
                document.getElementById("focusImage").style.backgroundImage = "url(" + query[userIndex]["images"][imageIndex]+")"
            }
        })
        document.getElementById("like").addEventListener("click", function()   {
          fetch("http://localhost:8080/api/setLike?username="
              + document.getElementById('userName').textContent + "&like=true", {
            credentials: "include",
          })
              .then(response => response.json())
              .then(data => {
                if (data["match"] === true) {
                  setTimeout(function() {
                    const overlay = document.getElementById("overlay")
                    overlay.style.opacity = "100%"
                    setTimeout(function() {
                      overlay.style.opacity = "0"
                    }, 2000)
                  }, 1250)
                }
              })
            userIndex++;
            const overlay = document.getElementById("imageOverlay")
            overlay.style.backgroundImage = "url(like.png)"
            overlay.style.opacity = "100"
            setTimeout(function()   {
                overlay.style.opacity = "0"
                setTimeout(function()   {
                    overlay.style.backgroundImage = ""
                }, 505)
                update()
            }, 1000)
        })
        document.getElementById("dislike").addEventListener("click", function()   {
          window.location.href = "http://localhost:8080/api/setLike?username="
              + document.getElementById('userName').textContent + "&like=false"
            userIndex++;
            const overlay = document.getElementById("imageOverlay")
            overlay.style.backgroundImage = "url(dislike.png)"
            overlay.style.opacity = "100"
            setTimeout(function()   {
                overlay.style.opacity = "0"
                setTimeout(function()   {
                    overlay.style.backgroundImage = ""
                }, 505)
                update()
            }, 1000)
        })
    },
    name: "Home",
    components: {AppHeader}
}
</script>

<style scoped>

</style>
