import os
import requests

from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def index():
	return render_template("index.html")

@socketio.on("message sent")
def chat(data):
	displayname = data["displayname"]
	message = data["message"]
	emit("message received", {"displayname": displayname, "message": message}, broadcast=True)