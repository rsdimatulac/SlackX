# from random import randint
# from app.models import channel, db, subscription, subscriptions

# def seed_subscriptions():
#         sub = subscriptions.insert().values(
#             channel_id=1,
#             user_id=1
#         )
#         db.session.add(sub)
#         db.session.commit()


# def undo_subscriptions():
#     db.session.execute('TRUNCATE subscriptions RESTART IDENTITY CASCADE;')
#     db.session.commit()