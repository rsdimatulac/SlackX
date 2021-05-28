from random import randint
from faker import Faker
from werkzeug.security import generate_password_hash
from app.models import db, User, Channel
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstname="Demo", 
        lastname="User", 
        email='demouser@slackx.com',
        password='password',
        bio='I am Iron Man',
        avatar='https://slackx.s3.amazonaws.com/kimi.png'
    )
    db.session.add(demo)
    db.session.commit()

    
    users = [
        {
            "firstname": "Ren", 
            "lastname": "Dracula", 
            "email": 'ren@minion.com',
            "password": 'password',
            "bio": "I'm secretly the smartest person in class, and I'm the unofficial group leader",
            "channels": ['public', 'dm'],
            "avatar": "https://slackx.s3.amazonaws.com/renerose.jpg"
        },
        {
            "firstname": "Earl", 
            "lastname": "Grubhub", 
            "email": 'wheremy@mfood.com',
            "password": 'password',
            "bio": "I'm 75% here, and I'm hungary",
            "channels": ['public', 'private'],
            "avatar": "https://slackx.s3.amazonaws.com/earl.jpg"
        },
        {
            "firstname": "Vivian", 
            "lastname": "Cutedog", 
            "email": 'cutedog@kimi.com',
            "password": 'password',
            'bio': 'I have a cute dog, and CSS-MASTER!!!!',
            "channels": ['public'],
            "avatar": "https://slackx.s3.amazonaws.com/vivian.png"

        },
        {
            "firstname": "Nathaniel", 
            "lastname": "HotPocket", 
            "email": 'hotdogs@7up.com',
            "password": 'password',
            'bio': 'I love white shirts, and building games.',
            "channels": ['public'],
            "avatar": "https://slackx.s3.amazonaws.com/nathaniel.jpg"
        },
    ]

    for user in users:
        new_user = User(
            firstname=user['firstname'],
            lastname=user['lastname'],
            email=user['email'],
            password=user['password'],
            bio=user['bio'],
            avatar=user['avatar']
        )

        db.session.add(new_user)
        db.session.commit()

    for _i in range(15):
        new_user = User(
        firstname=fake.first_name(), 
        lastname=fake.last_name(), 
        email=fake.free_email(),
        password='password',
        bio=fake.paragraph(nb_sentences=randint(1,3)),
        avatar=fake.image_url()
        )
        db.session.add(new_user)
        db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
