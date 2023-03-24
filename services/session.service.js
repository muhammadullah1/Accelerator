const Session = require('./models/session.model');

async function createSession(sessionData) {
  try {
    const newUser = await Session.create(sessionData);
    return newUser;
  } catch (error) {
    console.error(error);
    throw new Error('Server error');
  }
}

module.exports = {
  createSession
};
