from flask import Blueprint, jsonify, request
from app.models import db, Message
from flask_login import current_user

message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:channel_id>')
def get_messages(channel_id):
    messages = Message.query.filter(Message.channel_id == channel_id).all()

    return {message.id: message.to_dict() for message in messages}


@message_routes.route('/<int:message_id>', methods=["PATCH"])
def edit_message(message_id):

    message_id = request.get_json()['message_id']
    body = request.get_json()['body']

    edit_message = Message.query.get(message_id)
    edit_message.body = body

    # db.session.add(edit_message)
    db.session.commit()
    return edit_message.to_dict()
