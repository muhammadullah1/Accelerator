const Joi = require('joi');
const sessionService = require('./service/session.service');

const sessionSchema = Joi.object({
  roomName: Joi.string().required(),
  creater: Joi.string().required(),
  users: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required()
      })
    )
    .required()
});

async function createSession(req, res) {
  const { error, value } = sessionSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  try {
    const newUser = await sessionService.createSession({
      roomName: value.roomName,
      creater: value.creater,
      users: value.users
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createSession
};
