import SocketServer
from http.server import BaseHTTPRequestHandler, HTTPServer

from mpu6050 import mpu6050
import time
import RPi.GPIO as GPIO
from threading import Timer

GPIO.setmode(GPIO.BOARD)

lowerBrakeSetPin = 0
lowerBrakeReleasePin = 1
lowerBrakeSwitch = 2
lowerBrakeOn = false

upperBrakeSetPin = 0
upperBrakeReleasePin = 1
upperBrakeSwitch = 2
upperBrakeOn = false

launchLEDPin = 4
launchButtonPin = 5

rigAddress = 0x68
armAddress = 0x69

host_name = 'ping1.local'  # Change this to your Raspberry Pi IP address
host_port = 49000

GPIO.setup([lowerBrakeSetPin,lowerBrakeReleasePin], GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(lowerBrakeSwitch, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup([upperBrakeSetPin,upperBrakeReleasePin], GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(upperBrakeSwitch, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.setup(launchLEDPin, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(launchButtonPin, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

GPIO.add_event_detect(lowerBrakeSwitch, GPIO.BOTH, callback=HardwareInterrupt, bouncetime=100)
GPIO.add_event_detect(upperBrakeSwitch, GPIO.BOTH, callback=HardwareInterrupt, bouncetime=100)
GPIO.add_event_detect(launchButtonPin, GPIO.RISING, callback=HardwareInterrupt, bouncetime=100)

rigIMU = mpu6050(rigAddress)
armIMU = mpu6050(armAddress)

class HardwareInterrupt(Exception):
    pass

def dataHandler():
	rig_accel_data = rigIMU.get_accel_data()
	arm_accel_data = armIMU.get_accel_data()
	rig_gyro_data = rigIMU.get_gyro_data()
	arm_gyro_data = armIMU.get_gyro_data()
    s.send_response(200)
	s.send_header("Content-type", "application/json")
	s.end_headers()
    s.wfile.write('{ "time" : " ' + str(time.time()*1000) + ' ", "rigIMU" : { "ax" : "' + str(rig_accel_data['x']) + ' ", "ay" : " '  + str(rig_accel_data['y']) + ' ", "az" : "'  + str(rig_accel_data['z']) + '", "rx" : "' + str(rig_gyro_data['x']) + ' ", "ry" : " '  + str(rig_gyro_data['y']) + ' ", "rz" : "'  + str(rig_gyro_data['z']) + '", "temp" : "' + str(rigIMU.get_temp()) '" }, "armIMU" : {"ax" : "' + str(arm_accel_data['x']) + ' ", "ay" : " '  + str(arm_accel_data['y']) + ' ", "az" : "'  + str(arm_accel_data['z']) + '","rx" : "' + str(arm_gyro_data['x']) + ' ", "ry" : " '  + str(arm_gyro_data['y']) + ' ", "rz" : "'  + str(arm_gyro_data['z']) + '", "temp" : "' + str(armIMU.get_temp()) '" }}'	)

def launch():
	if upperBrakeOn and lowerBrakeOn:
		upperBrake(false)
		GPIO.output(launchLEDPin, GPIO.LOW)
	
def lowerBrake(s):
	if s:
		GPIO.output(lowerBrakeSetPin, GPIO.HIGH)
		GPIO.output(lowerBrakeReleasePin, GPIO.LOW)
	else: 
		GPIO.output(lowerBrakeSetPin, GPIO.LOW)
		GPIO.output(lowerBrakeReleasePin, GPIO.HIGH)

	l = Timer(5,resetMotors)
	l.start()
	lowerBrakeOn = s
	
def upperBrake(s):
	if s:
		GPIO.output(upperBrakeSetPin, GPIO.HIGH)
		GPIO.output(upperBrakeReleasePin, GPIO.LOW)
	else:
		GPIO.output(upperBrakeSetPin, GPIO.LOW)
		GPIO.output(upperBrakeReleasePin, GPIO.HIGH)
	
	u = Timer(5,resetMotors)
	u.start()
	upperBrakeOn = s	
	
def resetMotors():
	GPIO.output(lowerBrakeSetPin, GPIO.LOW)
	GPIO.output(lowerBrakeReleasePin, GPIO.LOW)
	GPIO.output(upperBrakeSetPin, GPIO.LOW)
	GPIO.output(upperBrakeReleasePin, GPIO.LOW)
	
class MyServer(BaseHTTPRequestHandler):
    def do_HEAD(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
	
	def do_GET(self):
        if self.path == '/imuData':
      		dataHandler()
		if self.path == '/launch':
			launch()
		raise HardwareInterrupt	
		self.send_response(200)

if __name__ == '__main__':
    http_server = HTTPServer((host_name, host_port), MyServer)
    print("Server Starts - %s:%s" % (host_name, host_port))

    try:
	while(true) {
		try:
			http_server.serve_forever()
		except HardwareInterrupt:
			if upperBrakeOn != bool(GPIO.input(upperBrakeSwitch)):
				upperBrake(bool(GPIO.input(upperBrakeSwitch))
			else if lowerBrakeOn != bool(GPIO.input(lowerBrakeSwitch)):
				lowerBrake(bool(GPIO.input(lowerBrakeSwitch))
			else if upperBrakeOn and lowerBrakeOn
				GPIO.output(launchLEDPin, GPIO.HIGH)
			else:
				pass
		pass
    except KeyboardInterrupt:
        http_server.server_close()