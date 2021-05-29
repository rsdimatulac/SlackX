from random import randint
from app.models import db, Channel
# from faker import Faker
# fake = Faker()

channels = [
    {
        'name': 'public',
        'channel_type': 'public'
    },
    {
        'name': 'managers',
        'channel_type': 'public'
    },
    {
        'name': 'code-lovers',
        'channel_type': 'public'
    },
    {
        'name': 'trash-talking-space',
        'channel_type': 'private'
    },
    {
        'name': 'Taylor-Swift-Fans',
        'channel_type': 'private'
    },
    {
        'name': 'seed_dm_1',
        'channel_type': 'dm'
    },
    {
        'name': 'seed_dm_2',
        'channel_type': 'dm'
    },
    {
        'name': 'seed_dm_3',
        'channel_type': 'dm'
    },
    {
        'name': 'seed_dm_4',
        'channel_type': 'dm'
    },
    {
        'name': 'seed_dm_5',
        'channel_type': 'dm'
    },
]

def seed_channels():
    for channel in channels:
        new_channel = Channel(
            name=channel['name'],
            channel_type=channel['channel_type']
        )
        db.session.add(new_channel)
        db.session.commit()

# def seed_channels():
#     for i in range(3):
#         channel = Channel(
#             name=f'demo-channel-{i}',
#             channel_type=channels_types[i]
#         )
#         db.session.add(channel)
#         db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()