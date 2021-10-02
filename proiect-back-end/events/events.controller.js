const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const eventService = require('./events.service');

// routes
// router.get('/', authorize(), getAll);
// router.get('/current', authorize(), getCurrent);
// router.get('/:id', authorize(), getById);
// router.delete('/:id', authorize(), _delete);
router.post('/',authorize(),createEvent);
router.get('/',authorize(),getUserEvents);
router.get('/:id',authorize(),getEventById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id',authorize(),_delete);

module.exports = router;

function createEvent(req, res, next){
    eventService.create(req.body,req.user)
                .then(()=>res.json({message:"Event Created"}))
                .catch(next);
}
function getUserEvents(req,res,next){
    eventService.get(req.user)
                .then((list)=>res.json({message:"Success",events:list}))
                .catch(next);
}
function getEventById(req,res,next){
    eventService.getEventById(req.params.id,req.user)
        .then((event) => {
            if(event){
                res.json({message:"Event Found",events:event})
            }else{
                res.status(404).json({message:"Access Forbidden"})
            }
            
        })
        .catch(next);
}
function updateSchema(req, res, next) {
    const schema = Joi.object({
        title: Joi.string().empty(''),
        text: Joi.string().empty(''),
        type: Joi.string().empty(''),
        time: Joi.date().empty(''),
        start: Joi.date().empty(''),
        completion:Joi.string().empty('')
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    eventService.update(req.params.id, req.body)
        .then(event => res.json(event))
        .catch(next);
}

function _delete(req, res, next) {
    eventService._delete(req.params.id)
        .then(() => res.json({ message: 'Event deleted successfully' }))
        .catch(next);
}