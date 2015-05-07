'''import socket
import sys

HOST = ''
PORT = 8001

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print 'Socket created'

try:
  s.bind((HOST, PORT))
except socket.error as msg:
  print 'Bind failed: ' + str(msg[0]) + ' Message ' + msg[1]
  sys.exit()
  print 'Socket bind completed'
  s.listen(10)
  print 'Socket now listening'

#Function for handling connections. This will be used to create threads
def clientthread(conn):
    #Sending message to connected client
    conn.send('Welcome to the server. Type something and hit enter\n') #send only takes string
     
    #infinite loop so that function do not terminate and thread do not end.
    while True:
         
        #Receiving from client
        data = conn.recv(1024)
        reply = 'OK...' + data
        if not data: 
            break
     
        conn.sendall(reply)
     
    #came out of loop
    conn.close()
 
#now keep talking with the client
while 1:
    #wait to accept a connection - blocking call
    (conn, addr) = s.accept()
    print 'Connected with ' + addr[0] + ':' + str(addr[1])
     
    #start new thread takes 1st argument as a function name to be run, second is the tuple of arguments to the function.
    start_new_thread(clientthread ,(conn,))
 
s.close()'''

import socket 


log_file = open("log.txt", "w+")
port = 8001
backlog = 5 
size = 1024 
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
s.bind(('localhost',port)) 
print 'Socket has been bound'
s.listen(backlog) 
print 'Socket is listening'
while 1: 
    client, address = s.accept() 
    while 1:
        data = client.recv(size) 
        log_file.write(data)
        if data: 
            print 'Recieved ' + data
            color = str(raw_input("What Color? "))
            client.send(color.lower()) 
            client.close()
            break