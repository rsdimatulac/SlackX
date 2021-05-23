import datetime
from .db import db
from .subscription import subscriptions

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(25), unique=True, nullable=False)
    channel_type = db.Column(db.String(10), nullable=False, default='public')
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())

    users = db.relationship(
        'User',
        secondary=subscriptions,
        back_populates='channels'
    )