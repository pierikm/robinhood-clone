from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    # username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    buying_power = db.Column(db.Numeric(10,2), default=0)
    hashed_password = db.Column(db.String(255), nullable=False)

    assets = db.relationship("Asset", back_populates="user")
    watchlists = db.relationship("Watchlist", back_populates="user")
    linked_accounts = db.relationship("LinkedAccount", back_populates="user")

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
            'id': self.id,
            'first_name': self.first_name,
            'last_name' : self.last_name,
            'email': self.email,
            # 'buying_power': int(self.buying_power)
        }
