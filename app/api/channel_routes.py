from flask import Blueprint, jsonify, request
from app.models import Channel, db
from app.forms import ChannelForm
from flask_login import current_user, login_user

channel_routes = Blueprint('channels', __name__)


def channel_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:  # form.errors []
        for error in validation_errors[field]:
            errorMessages.append(f"{error}")
    return errorMessages

@channel_routes.route('/')  # GET /api/channels/
def get_channels():
    """
    Gets all the channels
    """
    return {channel.id: channel.to_dict() for channel in current_user.channels}

# current_user.channels.messages
# @channel_routes.route('')

# POST a new Channel
@channel_routes.route('/', methods=['POST'])  # POST /api/channels/
def post_channels():
    """ 
    Creates a new channel (public or private or dm)
    """
    form = ChannelForm()
    print("FORM ERRORS", form.errors)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit(): # if form is validated, store to DB
        channel = Channel(
            name = form.data['name'],
            channel_type = form.data['channel_type']
        )
        current_user.channels.append(channel)

        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()
    return {'errors': channel_errors_to_error_messages(form.errors)}, 400
