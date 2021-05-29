import datetime
from .db import db
from .subscription import subscriptions
# import Message


class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(25), unique=True, nullable=False)
    channel_type = db.Column(db.String(10), nullable=False, default='public')
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.now())
    messages = db.relationship("Message", back_populates="channel")

    users = db.relationship(
        'User',
        secondary=subscriptions,
        back_populates='channels'
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "channel_type": self.channel_type,
            "messages": {message.id: message.to_dict() for message in self.messages},
            "users": {user.id: { "name": f"{user.firstname} {user.lastname}", "avatar": user.avatar } for user in self.users}
        }
