import socket 
import sys, threading

port = 8001
backlog = 5 
size = 1024 
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM) 
s.bind(('localhost',port)) 
print 'Socket has been bound'
s.listen(backlog) 
print 'Socket is listening'

resp = []
resp_lock = threading.Lock()

def clientThread(s):
    while 1:
        client, address = s.accept() 
        while 1:
            data = client.recv(size)
            ind = data.find("Content-Type:")
            endind = data.find("Accept:") 
            if data: 
                if ind > -1:
                    print data[ind + len('Content-Type:'):endind]
                else:
                    print 'Recieved ' + data
                resp_lock.acquire()
                if (len(resp) > 0):
                    print 'Sending ' + resp[0]
                    client.send(resp.pop(0)) 
                client.close()
                resp_lock.release()
                break

def getOption():
    tempresp = ''
    while 1:
        if tempresp == '':
            option = str(raw_input('Enter Color/Website/1: '))
            tempresp = option.lower()
            if option.lower() == str(1):
                subopt = str(raw_input('Enter site to redirect: '))
                subopt2 = str(raw_input('Enter destination site: '))
                tempresp = option + ' ' + subopt + ' ' + subopt2
        else:
            resp_lock.acquire()
            resp.append(tempresp)
            tempresp = ''
            resp_lock.release()


t1 = threading.Thread(target=clientThread ,args=(s,))
t2 = threading.Thread(target=getOption, args=())
t1.start()
t2.start()
t1.join()
t2.join()