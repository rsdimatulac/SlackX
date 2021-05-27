from flask import Blueprint
from app.models import Channel, User, channel
from flask_login import current_user

users_routes = Blueprint('all_users', __name__)

@users_routes.route('/')
def get_users():
    channel_users = [channel.users for channel in current_user.channels]
    flat_channel_users = set([item for sublist in channel_users for item in sublist])
    channel_users_dict = {user.id: user.to_dict() for user in flat_channel_users }
    # print(set(flat_channel_users))
    # return flat_channel_users
    return channel_users_dict