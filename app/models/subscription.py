import datetime
from .db import db

subscriptions = db.Table(
    "subscriptions",
    db.Column(
        "user_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
    ),
    db.Column(
        "channel_id", db.Integer, db.ForeignKey("channels.id"), primary_key=True
    ),
    db.Column(
        'is_starred', db.Boolean, nullable=False, default=False
    ),
    db.Column(
        'created_at', db.DateTime, nullable=False, default=datetime.datetime.now()
    ),
    db.Column(
        'updated_at', db.DateTime, nullable=False, default=datetime.datetime.now()
    )
)