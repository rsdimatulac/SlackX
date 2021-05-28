from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Provided email is already registered.")

class SignUpForm(FlaskForm):
    firstname = StringField('firstname', validators=[DataRequired(), Length(min=2, max=50, message="Firstname must between 2-50 characters.")])
    lastname = StringField('lastname', validators=[DataRequired(), Length(min=2, max=50, message="Lastname must between 2-50 characters.")])
    email = StringField('email', validators=[DataRequired(), user_exists, Email(), Length(min=5, max=50, message="Email must between 5-50 characters.")])
    password = StringField('password', validators=[DataRequired(), Length(min=8, max=20, message="Password must between 8-20 characters.")])
