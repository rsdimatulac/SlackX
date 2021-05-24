import datetime
from .db import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable=False)
    body = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
    user = db.relationship("User", back_populates="messages")
    channel = db.relationship("Channel", back_populates="messages")