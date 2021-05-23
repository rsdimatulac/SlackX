from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    users = [
        {
            "firstname": "Ren", 
            "lastname": "Dracula", 
            "email": 'ren@minion.com',
            "password": 'password',
            "bio": "I'm secretly the smartest person in class, and I'm the unofficial group leader"
        },
        {
            "firstname": "Earl", 
            "lastname": "Grubhub", 
            "email": 'wheremy@mfood.com',
            "password": 'password',
            "bio": "I'm 75% here, and I'm hungary"
        },
        {
            "firstname": "Vivian", 
            "lastname": "Cutedog", 
            "email": 'cutedog@kimi.com',
            "password": 'password',
            'bio': 'I have a cute dog, and CSS-MASTER!!!!'
        },
        {
            "firstname": "Nathaniel", 
            "lastname": "HotPocket", 
            "email": 'hotdogs@7up.com',
            "password": 'password',
            'bio': 'I love white shirts, and building games.'
        },
    ]

    for user in users:
        new_user = User(
            firstname=user['firstname'],
            lastname=user['lastname'],
            email=user['email'],
            password=user['password'],
            bio=user['bio']
        )
        db.session.add(new_user)
        db.session.commit()

    demo = User(
        firstname="Demo", 
        lastname="User", 
        email='demouser@slackx.com',
        password='password',
        bio='I am Iron Man',
    )

    db.session.add(demo)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
