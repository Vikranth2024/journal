import {v4 as uuidv4} from 'uuid'

const users = []

const journals = []

class User{
    constructor({email, hashedPassword}){
        this.email=email;
        this.hashedPassword=hashedPassword;
        this.id= uuidv4();
    }
};

class Journal{
    constructor({title, content,ownerId}){
        this.title=title;
        this.content=content;
        this.id= uuidv4();
        this.ownerId=ownerId;
    }

    update({title,content}){
        this.title=title;
        this.content=content;
    }
}


module.exports = {
    users,
    User,
    journals,
    Journal
}
