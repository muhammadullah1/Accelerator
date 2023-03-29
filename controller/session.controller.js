const Joi = require('joi');
const moment = require('moment');
const sessionService = require('../services/session.service');

async function createSession(req, res) {
  Joi.string().role = () => {
    return Joi.string().valid('teacher', 'student');
  };

  function convertISOToReadable(isoString) {
    const dateObj = moment(isoString).utc();
    const formated = dateObj.format('YYYY-MM-DD HH:mm:ss');
    console.log("---------------------", formated);
    return formated;
  }

  const sessionSchema = Joi.object({
    roomName: Joi.string().required(),
    creater: Joi.string().required(),
    users: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          role: Joi.string().role().required(),
        })
      )
      .required(),
    // from: Joi.string().isoDate().required().custom((value, helpers) => {
    //   const readableDate = convertISOToReadable(value);
    //   return helpers.error('any.invalid') ? helpers.message('Invalid from date format') : readableDate;
    // }),
    // to: Joi.string().isoDate().required().custom((value, helpers) => {
    //   const readableDate = convertISOToReadable(value);
    //   return helpers.error('any.invalid') ? helpers.message('Invalid to date format') : readableDate;
    // }),
    from: Joi.string().required(),
    to: Joi.string().required(),
  });

  const { error, value } = sessionSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  try {
    const newSession = await sessionService.createSession({
      roomName: value.roomName,
      creater: value.creater,
      users: value.users,
      from: convertISOToReadable(value.from),
      to: convertISOToReadable(value.to),
    });
    res.status(201).json(newSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getAllSessions(req, res, next) {
  try {
    const sessions = await sessionService.getSessions();
    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
}



module.exports = {
  createSession,
  getAllSessions
};
