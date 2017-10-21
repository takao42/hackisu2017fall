import mraa
import time
from websocket import create_connection
ws = create_connection("ws://10.27.175.147:3005")

touch = mraa.Gpio(29)
touch.dir(mraa.DIR_IN)

while True:
	touchButton = int(touch.read())
	print(touch.read())
	if(touchButton == 1):
		print('on')
		ws.send('touched!!!')
	else:
		print('off')
	time.sleep(0.2)
