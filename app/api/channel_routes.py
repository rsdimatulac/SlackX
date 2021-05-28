from flask import Blueprint, jsonify, request
from app.models import Channel, User, db
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

# POST Direct Messages
@channel_routes.route('/dm', methods=['POST'])  # POST /api/channels/dm
def post_dms():
    """ 
    Creates Direct messages
    """
    user_ids = request.get_json()['user_ids']
    user_ids.append(current_user.id)
    users = [User.query.get(id) for id in user_ids]

    user_ids = [str(id) for id in user_ids]

    # Array of User objects
    print("!!!!!!!!!!!!!!!", users)
    # create the channel first
    dm = Channel(
        name = "-".join(user_ids), # name = 1-2-3-4
        channel_type = "dm"
    )
    db.session.add(dm)
    db.session.commit()

    # query for the channel

    dm = Channel.query.filter(Channel.name == "-".join(user_ids)).first()

    for user in users:
        user.channels.append(dm)
        # db.session.add(user)
        db.session.commit()
    
    return dm.to_dict()
    # return {'errors': channel_errors_to_error_messages(form.errors)}, 400

# @message_routes.route('/<int:message_id>', methods=["PATCH"])
# def edit_message(message_id):

#     message_id = request.get_json()['message_id']
#     body = request.get_json()['body']

#     edit_message = Message.query.get(message_id)
#     edit_message.body = body

#     # db.session.add(edit_message)
#     db.session.commit()
#     return edit_message.to_dict()