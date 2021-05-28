from random import randint
from faker import Faker
from app.models import channel, db, Message, User
fake = Faker()

def seed_messages():

    # DM's
    message1 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=3,
        user_id=1,
        created_at=None,
        updated_at=None
    )

    message2 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=3,
        user_id=2
    )

    message3 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=3,
        user_id=1
    )

    message4 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=3,
        user_id=2
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)

    db.session.commit()

    # Private
    message1 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=2,
        user_id=1,
        created_at=None,
        updated_at=None
    )

    message2 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=2,
        user_id=3
    )

    message3 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=2,
        user_id=3
    )

    message4 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=2,
        user_id=3
    )

    message5 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=2,
        user_id=1
    )

    message6 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=2,
        user_id=3
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)


    db.session.commit()


    # Public
    message1 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=1,
        user_id=3,
        created_at=None,
        updated_at=None
    )

    message2 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=1,
        user_id=2
    )

    message3 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=1,
        user_id=5
    )

    message4 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=1,
        user_id=1
    )

    message5 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=1,
        user_id=1
    )

    message6 = Message(
        body=fake.paragraph(nb_sentences=randint(1,3)),
        channel_id=1,
        user_id=4
    )

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)


    db.session.commit()
def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()