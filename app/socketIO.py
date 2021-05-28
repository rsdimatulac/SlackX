from app.models import channel
from flask_socketio import SocketIO, emit
import os
from .models import db, Message
import datetime

# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://theslackx.herokuapp.com/',
        'https://theslackx.herokuapp.com/'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    print(data["channel_id"])
    print('HIT THE ROUTE', data)
    new_message = Message(
        user_id=data['user_id'],
        channel_id=data['channel_id'],
        body=data['body'],
        created_at=data['created_at']
    )

    db.session.add(new_message)
    db.session.commit()
    messages = Message.query.filter(Message.user_id == data['user_id'], Message.body == data['body']).all()
    ourMsg = messages[len(messages) - 1]
    data['id'] = ourMsg.id
    emit(data["channel_id"], data, broadcast=True)
    # return None


# @socketio.sockets.in()
# // now, it's easy to send a message to just the clients in a given room
# room = "abc123";
# io.sockets.in(room).emit('message', 'what is going on, party people?');

# // this message will NOT go to the client defined above
# io.sockets.in('foobar').emit('message', 'anyone in this room yet?');
