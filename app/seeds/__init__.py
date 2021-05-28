from flask.cli import AppGroup
from .users import seed_users, undo_users
from .messages import seed_messages, undo_messages
from .channels import seed_channels, undo_channels


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_channels()
    seed_users()
    seed_messages()
    # seed_subscriptions()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_channels()
    undo_users()
    undo_messages()
    # undo_subscriptions()
    # Add other undo functions here
