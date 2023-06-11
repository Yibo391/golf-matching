<template>
  <AppHeader/>
  <br><br><br>
<div id = "chats" style = "margin-top: 50px;">

</div>
</template>

<script>

import AppHeader from "@/components/AppHeader.vue";

export default {
  mounted() {
    const chats = document.getElementById("chats")
    fetch('http://localhost:8080/api/populateChat', {
      credentials: "include"
    })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.length >= 1) {
            chats.innerHTML = ""
            for (let i = 0; i < data.length; i++) {
              const chatSelect = document.createElement("div")
              chatSelect.className = "chatLink"
              const picture = document.createElement("img")
              picture.src = data[i][1]
              chatSelect.appendChild(picture)
              const nameContainer = document.createElement("div")
              const name = document.createElement("h3")
              name.textContent = data[i][0]
              nameContainer.appendChild(name)
              chatSelect.appendChild(nameContainer)
              chats.appendChild(chatSelect)
              chats.appendChild(document.createElement("br"))
            }
          }
        })
  },
  name: "Chat",
  components: {AppHeader}
}
</script>

<style scoped>

</style>
