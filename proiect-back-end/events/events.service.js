const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports={
    create,
    get,
    getEventById,
    update,
    _delete
}

async function create(params,user){
    let finalParam = {
        userId:user.id,
        title:params.title,
        text:params.text,
        type:params.type,
        time:params.time,
        start:params.start,
        completion:params.completion
    }
    await db.Event.create(finalParam); 
}

async function get(user){
    return await db.Event.findAll({where:{userId:user.id}});
}
async function getEventById(id,user) {    
    const event = await getEvent(id);
    if(event.userId===user.id){
        return event;
    }else{
        return false;
    }
}
async function getEvent(id){
    const event = await db.Event.findByPk(id);
    if (!event) throw 'Event not found';
    return event;
}

async function _delete(id) {
    const event = await getEvent(id);
    await event.destroy();
}

async function update(id, params) {
    const event = await getEvent(id);

    // validate
    const titleChanged = params.title && event.title !== params.title;
    const textChanged = params.text && event.text !== params.text;
    const typeChanged = params.type && event.type !== params.type;
    const timeChanged = params.time && event.time !== params.time;
    const startChanged = params.start && event.start !== params.start;
    const completionChanged = params.completion && event.completion !== params.completion
    // if (titleChanged && await db.Eve.findOne({ where: { username: params.username } })) {
    //     throw 'Username "' + params.username + '" is already taken';
    // }

    // hash password if it was entered
    // if (params.password) {
    //     params.hash = await bcrypt.hash(params.password, 10);
    // }

    // copy params to event and save
    Object.assign(event, params);
    await event.save();

    return event
}