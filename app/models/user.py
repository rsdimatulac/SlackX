import datetime
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .subscription import subscriptions


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  firstname = db.Column(db.String(50), nullable=False)
  lastname = db.Column(db.String(50), nullable=False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  avatar = db.Column(db.String(360), default='https://slackx.s3.amazonaws.com/user-1.jpg')
  bio = db.Column(db.Text)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
  messages = db.relationship("Message", back_populates="user")

  channels = db.relationship(
    'Channel',
    secondary=subscriptions,
    back_populates='users'
  ) 

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "firstname": self.firstname,
      "lastname": self.lastname,
      "bio": self.bio,
      "avatar": self.avatar,
      "email": self.email,
      "created_at": self.created_at
    }
