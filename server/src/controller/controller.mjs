import model from '../model/model.mjs'
import axios from 'axios';
import * as queryString from "querystring";
import { google } from 'googleapis';

const clientid = "224254128300-hjfgoip303hfqu5q2jqcekhb9ija4s55.apps.googleusercontent.com"
const clientsecret = "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"

const Axios= axios.create({
    baseURL: "http://localhost:8080/",
    withCredentials: true,
});

const controller = {}
export default controller

const oauth2Client = new google.auth.OAuth2(
    clientid,
    clientsecret,
    /*
     * This is where Google will redirect the user after they
     * give permission to your application
     */
    'http://localhost:8080/api/authFinalize',
);

controller.home = (req, res) => {
    let user;
    let hyper;
    if (req.session.username) {
        user = req.session.username
        hyper = req.session.userhyper
    } else {
        user = "Guest"
        hyper = "e"
    }
    const data = {"username": user, "userhyper": hyper}
    res.json(data)
}


controller.getGoogleAuthURL = () => {
    /*
     * Generate a url that asks permissions to the user's email and profile
     */
    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
    ];

    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes, // If you only need one scope you can pass it as string
    });
}

controller.googleAuthInit = (req, res) => {

    res.redirect(controller.getGoogleAuthURL())

}

controller.googleAuthFinalize = async (req, res) => {
    res.redirect('http://localhost:8080/api/authSuccessful?code=' + req.query.code)
}

controller.queryMatches = async (req, res) => {
        const returner = [{}]
        const users = await model.getAllUsers()
        const current = await model.getUserByEmail(req.session.email)
    if(current!== null)
        for (let i = 0; i < users.length; i++) {
            if ((current.excludes === undefined) || (!current.excludes.includes(users[i].email))) {
                returner.push({
                    "name": users[i].displayName,
                    "description": users[i].description,
                    "claimedSkill": users[i].claimedSkill,
                    "images": users[i].images
                })
            }
        }
    returner.splice(0, 1)
        res.json(returner)
}

controller.getUser = async code => {
    const { tokens } = await oauth2Client.getToken(code);

    // Fetch the user's profile with the access token and bearer
    const googleUser = await axios
        .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${tokens.id_token}`,
                },
            },
        )
        .then(res => res.data)
        .catch(error => {
            throw new Error(error.message);
        });

    return googleUser;
}

controller.googleAuthSuccessful = async (req, res) => {
    const code = req.query.code
    const googleData = await controller.getUser(req.query.code)
    req.session.email = googleData.email
    console.log(code)
    await req.session.save(async function (err) {
        if (err) {
            res.status(500)
        } else {
            if (await model.userExists(googleData.email)) {
                if (await model.getDisplayName(googleData.email) === undefined) {
                    req.session.username = req.session.email
                    res.redirect("http://localhost:5173/profile")
                } else {
                    req.session.username = await model.getDisplayName(googleData.email)
                    res.redirect("http://localhost:5173/")
                }
            } else {
                req.session.username = req.session.email
                res.redirect("http://localhost:5173/profile")
            }
        }
    })
}

controller.editProfile = async (req, res) => {
    const displayName = req.query.name;
    const description = req.query.description;
    const birthDate = req.query.birthdate;
    const skill = req.query.skill;
    const images = req.query.img
    console.log("first: " + images)
    const email = req.session.email;
    await model.setDetails(email, displayName, description, birthDate, skill, images)
    req.session.username = displayName
    res.redirect("http://localhost:5173/")
}

controller.setLike = async (req, res) => {
    const like = req.query.like
    const username = req.query.username
    await model.addExclude(req.session.email, await model.getEmail(username))
    const matchData = {"match": false}
    if (like === "true") {
        await model.addLike(await model.getEmail(username), req.session.email)
        if (await model.isMatch(await model.getEmail(username), req.session.email)){
            await model.setMatch(await model.getEmail(username), req.session.email)
            matchData.match = true
        }
    }
    res.json(matchData)
}

controller.populateChat = async (req, res) => {
    const username = req.session.username
    console.log("query:" + username)
    const matches = await model.getMatches(await model.getEmail(username))
    const data = [[]]
    console.log(matches)
    for (let i = 0; i < matches.length; i++)    {
        const conv = []
        conv[0] = matches[i].displayName
        conv[1] = matches[i].images[0]
        const convoDb = await model.getConversations(req.query.email, matches[i].email)
        if (convoDb !== null) {
            conv[2] = convoDb.messages
        }
        console.log(conv)
        data.push(conv)
    }
    res.json(data)
}


