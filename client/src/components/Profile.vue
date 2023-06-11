<template>
    <AppHeader/>
    <br><br>
    <div style = "display: grid; height: 85vh; width: 90vw;">
        <div style = "grid-column: 1/5; grid-row: 4/10; height: 20vh;">
            <div style = "width: 35%; margin-left: 0; text-align: center;">
            <img id = "pic1" class = "fade10" style = "margin-left: 5vw; width: 10vw;" src = "src/assets/logo.png"/>
            <img id = "pic2" class = "fade10" style = "margin-left: 5vw; width: 10vw;" src = "src/assets/logo.png"/>
            <img id = "pic3" class = "fade10" style = "margin-left: 5vw; width: 10vw;" src = "src/assets/logo.png"/>
            <img id = "pic4" class = "fade10" style = "margin-left: 5vw; width: 10vw;" src = "src/assets/logo.png"/>
                <br><br>
                <input id = "picUrl" style = "margin-left: 25px; width: 75%;" type = "text"/>
                <div style = "float: right;"><button id = "uploadPic">Upload</button>
                </div>
            </div>
        </div>
        <div style = "grid-column: 2/5; grid-row: 4/10; height: 90%;">
            <div style = "width: 100%; text-align: left;">
                <h3 style = "display: inline-block; margin-right: 20px;">Display name </h3>
                <br>
                    <input id = "displayName" type = "text"/>
                <br>
                <hr>
                <h3 style = "display: inline-block; margin-right: 20px;">Birth date</h3>
                <br>
                    <select style = "margin-right: 25px; width: 50px" name = "birthDay" id = "birthDay">
                        <option>Day</option>
                    </select>
                <select style = "margin-right: 25px; width: 100px"  name = "birthMonth" id = "birthMonth">
                    <option>Month</option>
                </select>
                <select style = "width: 75px" name = "birthYear" id = "birthYear">
                    <option>Year</option>
                </select>
                <br>
                <hr>
                <h3 style = "display: inline-block; margin-right: 20px;">Description</h3>
                <br>
                    <input style = "height: 300px;" id = "desc" type = "text"/>
                <hr>
                <br>
                <h3 style = "display: inline-block; margin-right: 20px;">Skill level</h3>
                <br>
                <select name = "skill" id = "skill">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Experienced</option>
                    <option>Expert</option>
                </select>
                <hr>
            </div>
        </div>
    </div>
    <hr>
    <div style = "margin-top: -5vh; text-align: center;">
    <button id = "save">Save changes</button>
    </div>
</template>

<script>

import AppHeader from "@/components/AppHeader.vue";

export default {
    mounted() {
        let picIndex = 1
        const dayBox = document.getElementById("birthDay")
        const monthBox = document.getElementById("birthMonth")
        const yearBox = document.getElementById("birthYear")
        document.getElementById("save").addEventListener("click", function()    {
            let imgUrl = ""
            if (picIndex > 1)
            for (let i = 1; i <= picIndex; i++)  {
                imgUrl += document.getElementById("pic" + i).src + "|"
            }
            window.location.href ="http://localhost:8080/api/editProfile?name="
            + document.getElementById("displayName").value + "&description="
            + document.getElementById("desc").value + "&birthdate="
            + " " + "&skill="
            + document.getElementById("skill")[document.getElementById("skill").selectedIndex].textContent
            + "&img=" + imgUrl
        })
        document.getElementById("uploadPic").addEventListener("click", function()    {
            console.log("pic" + picIndex)
            document.getElementById("pic" + picIndex).src = document.getElementById("picUrl").value
            document.getElementById("picUrl").value = ""
            picIndex++
        })
        for (let i = 1; i <= 30; i++)  {
            const select = document.createElement("option")
            select.textContent = i
            select.value = i;
            dayBox.appendChild(select)
        }
        for (let i = 1; i <= 12; i++)  {
            const select = document.createElement("option")
            select.textContent = i
            select.value = i;
            monthBox.appendChild(select)
        }
        for (let i = 2023; i > 1960; i--)  {
            const select = document.createElement("option")
            select.textContent = i
            select.value = i;
            yearBox.appendChild(select)
        }
    },
    name: "Profile",
    components: {AppHeader}
}
</script>

<style scoped>

</style>
