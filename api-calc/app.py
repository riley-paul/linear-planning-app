from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO,emit

from route_conversion.conversion import conversion

app = Flask(__name__)
app.config["SECRET KEY"] = 'secret!'
socketio = SocketIO(app)
CORS(app)

app.register_blueprint(conversion)

connections = {}


@socketio.on("connect")
def socket_connection():
  emit("response",{"data":"connected"})

@socketio.on("disconnect")
def socket_connection():
  print("Client disconnected")

if __name__ == "__main__":
  socketio.run(app)