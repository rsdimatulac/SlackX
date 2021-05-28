from random import randint
from faker import Faker
from app.models import Channel, db, Message, User
fake = Faker()

def seed_messages():

    channels = Channel.query.all()

    for channel in channels:
        channel_users = channel.users
        for _i in range(randint(2, 4)):
            for user in channel_users:
                print('CHANNEL !!!!!!!!!!!!!!!!!!!!!!!!!!',channel.id)
                message = Message(
                    body=fake.paragraph(nb_sentences=randint(1,3)),
                    channel_id=channel.id,
                    user_id=user.id,
                )
                db.session.add(message)
                db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()