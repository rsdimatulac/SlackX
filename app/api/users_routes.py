from flask import Blueprint
from app.models import Channel, User, channel
from flask_login import current_user

users_routes = Blueprint('all_users', __name__)

@users_routes.route('/')
def get_users():
    return {channel.id: channel.to_dict() for channel in current_user.channels}