from random import randint
from faker import Faker
from app.models import db, User, Channel
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_subs():

    users = User.query.all()

    us_demo = users[0]
    us_ren = users[1]
    us_earl = users[2]
    us_viv = users[3]
    us_nate = users[4]
    us_fake6 = users[5]
    us_fake7 = users[6]
    us_fake8 = users[7]
    us_fake9 = users[8]
    us_fake10 = users[9]
    us_fake11 = users[10]
    us_fake12 = users[11]
    us_fake13 = users[12]
    us_fake14 = users[13]
    us_fake15 = users[14]
    us_fake16 = users[15]
    us_fake17 = users[16]
    us_fake18 = users[17]
    us_fake19 = users[18]
    us_fake20 = users[19]



    channels = Channel.query.all()

    pu_ch1 = channels[0]
    pu_ch2 = channels[1]
    pu_ch3 = channels[2]
    pr_ch4 = channels[3]
    pr_ch5 = channels[4]
    dm_ch6 = channels[5]
    dm_ch7 = channels[6]
    dm_ch8 = channels[7]
    dm_ch9 = channels[8]
    dm_ch10 = channels[9]

    subs = [
        {
            'channel': pu_ch1,
            'users': users
        },
        {
            'channel': pu_ch2,
            'users': [us_demo, us_earl, us_ren, us_nate, us_viv]
        },
        {
            'channel': pu_ch3,
            'users': [us_demo, us_fake12, us_fake15, us_fake6, us_fake8, us_fake14, us_fake11, us_fake10, us_fake7, us_fake17, us_fake9, us_fake19]
        },
        {
            'channel': pr_ch4,
            'users': [us_demo, us_earl, us_fake13, us_fake20, us_nate]
        },
        {
            'channel': pr_ch5,
            'users': [us_demo, us_fake16, us_fake20, us_ren, us_viv]
        },
        {
            'channel': dm_ch6,
            'users': [us_demo, us_ren]
        },
        {
            'channel': dm_ch7,
            'users': [us_demo, us_nate, us_fake20, us_fake13, us_fake18, us_fake12]
        },
        {
            'channel': dm_ch8,
            'users': [us_demo, us_viv, us_fake16]
        },
        {
            'channel': dm_ch9,
            'users': [us_demo, us_earl]
        },
        {
            'channel': dm_ch10,
            'users': [us_fake16, us_fake20, us_ren, us_viv]
        },
    ]

    for sub in subs:
        for user in sub['users']:
            user.channels.append(sub['channel'])
            db.session.commit()




def undo_subs():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()