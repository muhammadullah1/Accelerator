const Session = require('../models/session.model');
var io = require('socket.io');


// io.sockets.on('connection', async function (socket) {
//   app.post('/createRoom', (req, res) => {
//     var { roomName, roomPassword = '', creator, users } = req.body;
//     console.log("----------outside socket function----------", users);


//   });


async function createSession(sessionData) {
  const { roomName, creater, users, from, to } = sessionData;
  try {
    io.sockets.on('connection', async function (socket) {
      socket.emit("createRoom", {
        "roomName": roomName,
        "roomPassword": '',
        "creator": creater,
        "users": users,
        "permanent": true
      }, function (err) {
        if (err) {
          res.status(500).send({
            error: err
          });
        }
      });

      // Logic to create a room
      var roomName = req.body.roomName.trim();
      if (roomName == "") {
        res.status(400).send("Invalid Roomname!");
      } else if (allRoomAttr[roomName]) {
        res.status(409).send({
          error: "A room with this name already exists!"
        });
      } else {
        allRoomAttr[roomName] = {
          "moderator": null,
          "users": users,
          "roomName": roomName,
          "roomPassword": roomPassword,
          "creator": creator,
          "lastVisit": +new Date(),
          "permanent": true
        }
        var cleanRooms = getAllRoomsWithoutPasswords();
        socket.broadcast.emit('getAllRooms', cleanRooms);
        socket.emit('getAllRooms', cleanRooms);
        saveAllRoomAttr();
        res.status(201).send({
          message: "Room created successfully"
        });
      }
    });
    const newSession = await Session.create(sessionData);
    return newSession;
  } catch (error) {
    console.error(error);
    throw new Error('Server error');
  }
}

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
  createSession,
  getSessions
};
