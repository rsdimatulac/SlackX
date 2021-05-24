from flask import Blueprint, jsonify
from app.models import Message

channel_routes = Blueprint('messages', __name__)
