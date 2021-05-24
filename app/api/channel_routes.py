from flask import Blueprint, jsonify
from app.models import Channel
from flask_login import current_user

channel_routes = Blueprint('channels', __name__)


@channel_routes.route('/')
def get_channels():
    return {channel.id: channel.to_dict() for channel in current_user.channels}

# current_user.channels.messages
