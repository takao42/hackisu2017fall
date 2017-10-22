import websocket
from threading import Thread
import time
import json
import mraa

x = mraa.I2c(0)
x.address(0x62)
x.writeReg(0, 0)
x.writeReg(1, 0)

touch = mraa.Gpio(29)
touch.dir(mraa.DIR_IN)

def blink_lcd(ws):
	while True:
		touchButton = int(touch.read())
		if touchButton == 1:
			break
		x.writeReg(0x08, 0xAA)
		x.writeReg(0x04, 255)
		x.writeReg(0x02, 255)
		time.sleep(0.2)
		x.writeReg(0x08, 0xAA)
		x.writeReg(0x04, 50)
		x.writeReg(0x02, 255)
		time.sleep(0.2)
	ws.send(json.dumps({"action":"pill taken","token":"afafafafafa8"}))

def on_message(ws, message):
	print(message)
	data = json.loads(message)
	if data["action"] == "add task":
		thread = Thread(target = blink_lcd, args = (ws,))
		thread.start()
		thread.join()

def on_error(ws, error):
	print(error)

def on_close(ws):
	print("closed")

def on_open(ws):
	ws.send(json.dumps({"action":"register hardware","token":"afafafafafa8"}))

websocket.enableTrace(True)
ws = websocket.WebSocketApp("ws://10.27.175.147:3005")
ws.on_message = on_message
ws.on_open = on_open

ws.run_forever()
