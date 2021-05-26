from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Provided email is already registered.")

class SignUpForm(FlaskForm):
    firstname = StringField('firstname', validators=[DataRequired(), Length(min=2, max=50)])
    lastname = StringField('lastname', validators=[DataRequired(), Length(min=2, max=50)])
    email = StringField('email', validators=[DataRequired(), user_exists, Email(), Length(min=5, max=50)])
    password = StringField('password', validators=[DataRequired(), Length(min=8, max=20), EqualTo('confirm_password', message="Passwords must match.")])
    confirm_password = StringField('confirm_password')
