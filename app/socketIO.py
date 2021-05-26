from app.models import channel
from flask_socketio import SocketIO, emit
import os
from .models import db, Message

# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://actual-app-url.herokuapp.com',
        'https://actual-app-url.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins)


# handle chat messages
@socketio.on("potato")
def handle_chat(data):
    print(data["channel_id"])
    print('HIT THE ROUTE', data)
    new_message = Message(
        user_id=data['user_id'],
        channel_id=data['channel_id'],
        body=data['body']
    )
    print('New Message:', new_message)
    db.session.add(new_message)
    db.session.commit()

    emit("potato", data, broadcast=True)
    return None
