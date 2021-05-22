from datetime import date
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

today = date.today()

# dd/mm/YY
# d1 = today.strftime("%d/%m/%Y")
# print("d1 =", d1)

# # Textual month, day and year
# d2 = today.strftime("%B %d, %Y")
# print("d2 =", d2)

# # mm/dd/y
# d3 = today.strftime("%m/%d/%y")
# print("d3 =", d3)

# # Month abbreviation, day and year
# d4 = today.strftime("%b-%d-%Y")
# print("d4 =", d4)



class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  firstname = db.Column(db.String(50), nullable=False)
  lastname = db.Column(db.String(50), nullable=False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  avatar = db.Column(db.String(360))
  bio = db.Column(db.Text)
  created_at = db.Column(db.DateTime, nullable=False, default=today)
  updated_at = db.Column(db.DateTime, nullable=False, default=today)

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
      "email": self.email
    }
