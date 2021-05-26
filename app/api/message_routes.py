from flask import Blueprint, jsonify, request
from app.models import Message
from flask_login import current_user

message_routes = Blueprint('messages', __name__)

@message_routes.route('/:channel_id')
def get_messages():
    # id = request.args.get("channel_id")
    messages = Message.query.filter(Message.channel_id == 1).all()
    return {message.id: message.to_dict() for message in messages}
