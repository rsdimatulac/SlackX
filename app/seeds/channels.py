from random import randint
from app.models import db, Channel
# from faker import Faker
# fake = Faker()

# public private and dm
channels_types = ['public', 'private', 'dm']

def seed_channels():
    for i in range(3):
        channel = Channel(
            name=f'demo-channel-{i}',
            channel_type=channels_types[i]
        )
        db.session.add(channel)
        db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()