import SocketServer
from http.server import BaseHTTPRequestHandler, HTTPServer

from mpu6050 import mpu6050
import time
import RPi.GPIO as GPIO
from threading import Timer

host_name = 'ping1.local'  # Change this to your Raspberry Pi IP address
host_port = 49000

def dataHandler(s): 
	s.send_response(200)
	s.send_header("Content-type", "application/json")
	s.end_headers()
    s.wfile.write('{"time": 1649089213986,"imu1": {"ax": "0","ay": "-1","az": "-1","rx": "46","ry": "105","rz": "58","temp": "38"},"imu2": {"ax": "-1","ay": "0","az": "0","rx": "95","ry": "-105","rz": "138","temp": "42"}}') 

class MyServer(BaseHTTPRequestHandler):
    def do_HEAD(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
	
	def do_GET(self):
        if self.path == '/imuData':
      		dataHandler(self)
		self.send_response(200)

if __name__ == '__main__':
    http_server = HTTPServer((host_name, host_port), MyServer)
    print("Server Starts - %s:%s" % (host_name, host_port))

    try:
		http_server.serve_forever()

    except KeyboardInterrupt:
        http_server.server_close()