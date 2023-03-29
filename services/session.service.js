const Session = require('../models/session.model');

async function getSessions() {
  try {
    const sessions = await Session.findAll();
    return sessions;
  } catch (error) {
    console.error(error);
    throw new Error('Server error');
  }
}



module.exports = {
  getSessions
};
