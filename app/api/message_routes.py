from flask import Blueprint, jsonify, request
from app.models import Message
from flask_login import current_user

message_routes = Blueprint('messages', __name__)


@message_routes.route('/<int:channel_id>')
def get_messages(channel_id):
    print("helllo inside messages route")
    # print(request.args.get("channel_id"))
    # id = request.args.get("channel_id")
    messages = Message.query.filter(Message.channel_id == channel_id).all()

    return {message.id: message.to_dict() for message in messages}
