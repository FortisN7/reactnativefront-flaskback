from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:password@localhost/flask'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
'''
$ python
>>> from app import app, db
>>> app.app_context().push()
>>> db.create_all()
'''
ma = Marshmallow(app)

class Users(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(32))
    password = db.Column(db.String(32))
    date = db.Column(db.DateTime, default = datetime.datetime.utcnow)

    def __init__(self, username, password, date=None):
        self.username = username
        self.password = password
        
class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'password', 'date')

user_schema = UserSchema()
users_schema = UserSchema(many=True)

@app.route('/')
def render():
    return "Hello world!"

@app.route('/get', methods = ['GET'])
def get_users():
    all_users = Users.query.all()
    results = users_schema.dump(all_users)
    return jsonify(results)   

@app.route('/get/<id>', methods = ['GET'])
def post_details(id):
    user = Users.query.get(id)
    return user_schema.jsonify(user)

@app.route('/add', methods = ['POST'])
def add_user():
    username = request.json['username']
    password = request.json['password']

    users = Users(username, password)
    db.session.add(users)
    db.session.commit()
    return user_schema.jsonify(users)

@app.route('/update/<id>', methods = ['PUT'])
def update_user():
    user = Users.query.get(id)

    username = request.json['username']
    password = request.json['password']

    user.username = username
    user.password = password

    db.session.commit()
    return user_schema.jsonify(user)

@app.route('/delete/<id>', methods = ['DELETE'])
def delete_user():
    user = Users.query.get(id)
    db.session.delete(user)
    db.session.commit()
    return user_schema.jsonify(user)

if __name__ == "__main__":
    app.run(host='192.168.56.1',port=3000,debug=True)
    #flask run --debug --host='192.168.56.1' --port=3000