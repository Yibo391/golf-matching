import database from 'mongoose'

const model = {}
export default model

database.connect('mongodb://0.0.0.0:27017/golfmatcher')
database.Promise = global.Promise

const UserModel = database.model('User', {
    email: {
        type: String
    },
    displayName: {
        type: String
    },
    id: {
        type: String
    },
    images: {
        type: [String]
    },
    description : {
        type: String
    },
    claimedSkill : {
        type: String
    },
    likes : {
        type: [String]
    },
    excludes : {
        type: [String]
    },
    matches : {
        type: [String]
    }
})

const ConversationModel = database.model('Conversation', {
    parties : {
        type : [String]
    },
    messages : {
        type : [String]
    }
})

model.userExists = async mail => {
  /*  await UserModel.updateMany({

    }, {
        matches: [],
        likes: [],
        excludes: []
    })*/
    const result = await UserModel.findOne({
        email: mail,
    })
    return ((result !== undefined) && (result !== null));
}

model.addExclude = async (current, mail) => {
    const curr = await UserModel.findOne({
        email: current
    })
    console.log('curr: ' + curr)
    curr.excludes.push(mail)
    await UserModel.findOneAndUpdate({
        email: current
    }, {
        excludes: curr.excludes
    })
}

model.getUserByEmail = async (email) => {
    return UserModel.findOne({
        email: email
    })
}

model.getDisplayName = async mail => {
    const result = await UserModel.findOne({
        email: mail,
    })
    if (result !== null && (result !== undefined))   {
        return result.displayName;
    }
    return undefined;
}

model.getEmail = async username => {
    const result = await UserModel.findOne({
        displayName: username,
    })
    if (result !== null && (result !== undefined))   {
        return result.email;
    }
    return undefined;
}

model.setDetails = async (mail, name, description, date, skill, images) => {
    console.log("img: " + images)
    if (!await model.userExists(mail)){
        const user = new UserModel({
            email: mail,
            displayName: name,
            description: description,
            claimedSkill: skill,
            images: images.split("|")
        })
        await user.save()
        console.log("saved")
    } else {
        console.log(name)
        const result = await UserModel.findOneAndUpdate({
            email: mail,
        }, {
            $set: {
                "displayName": name,
                "description": description,
                "claimedSkill": skill,
                "images": images.split("|")
            }
        })
    }
}

model.getAllUsers = () => {
    return UserModel.find({})
}

model.wipeAll = async () => {
    await UserModel.deleteMany({})
}

model.getMatches = async (user) => {
    const current = await UserModel.findOne({
        email: user
    })
    console.log("find: " + await UserModel.find({
        matches: {$in: [user]},
    }))
    return UserModel.find({
        matches: {$in: [user]},
    })
}

model.setMatch = async(user1, user2) => {
    const u1 = await UserModel.findOne({
        email: user1
    })
    const u2 = await UserModel.findOne({
        email: user2
    })
    const newMatches1 = u1.matches
    newMatches1.push(u2.email)
    const newLikes1 = u1.likes
    newLikes1.splice(newLikes1.indexOf(u2.email), 1)
    const newMatches2 = u2.matches
    newMatches2.push(u1.email)
    const newLikes2 = u2.likes
    newLikes2.splice(newLikes2.indexOf(u1.email), 1)

    await UserModel.findOneAndUpdate({
        email: user1
    }, {
        matches: newMatches1,
        likes: newLikes1
    })

    await UserModel.findOneAndUpdate({
        email: user2
    }, {
        matches: newMatches2,
        likes: newLikes2
    })
}

model.unmatch = async(user1, user2) => {
    const u1 = await UserModel.findOne({
        email: user1
    })
    const u2 = await UserModel.findOne({
        email: user2
    })
    const newMatches1 = u1.matches
    newMatches1.splice(newMatches1.indexOf(u2.email, 1))
    const newMatches2 = u2.matches
    newMatches2.splice(newMatches1.indexOf(u1.email, 1))

    await UserModel.findOneAndUpdate({
        email: user1
    }, {
        matches: newMatches1
    })

    await UserModel.findOneAndUpdate({
        email: user2
    }, {
        matches: newMatches2
    })
}

model.isMatch = async (user1, user2) => {
    const u1 = await UserModel.findOne({
        email: user1
    })
    const u2 = await UserModel.findOne({
        email: user2
    })
    console.log("________________________________________________________________________________________________")
    console.log(u1)
    console.log(u2)
    console.log("________________________________________________________________________________________________")
    return !!((u1.likes.includes(user2)) && (u2.likes.includes(user1)));
}

model.getConversations = async (user1, user2) => {
    return ConversationModel.findOne({
        parties: {$in: [user1, user2]},
    });
}

model.addLike = async (liked, liker) => {
    const uLiked = await UserModel.findOne({
        email: liked
    })
    uLiked.likes.push(liker)
    await UserModel.findOneAndUpdate({
        email: liked
    }, {
        likes: uLiked.likes
    })
}
