import socket

# TCP/IP socket
sock_obj = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sock_obj.connect(('httpbin.org', 80))
sock_obj.send(b"GET /ip HTTP/1.1\r\nHost: httpbin.org\r\n\r\n")

while True:
    resp = sock_obj.recv(1024)
    if not resp:
        break
    print(resp)

# Close the connection when completed
sock_obj.close()
