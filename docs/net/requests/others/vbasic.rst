.. meta::
    :title: HTTP Запросы/Ответы на Visual Basic
    :description: HTTP клиент на Visual Basic
    :tags: Visual Basic, socket, HTTP

Visual Basic
============


Простой ``GET`` запрос:

.. code-block:: vbnet

    Imports System.Text
    Imports System.Net
    Imports System.Net.Sockets

    Public Class Request

        Private Shared Function Connect(server As String, port As Integer) As Socket

            Dim host As IPHostEntry = Dns.GetHostEntry(server)

            Dim ipAddress As IPAddress

            Dim sock As Socket = Nothing

            For Each ipAddress In host.AddressList

                Dim endPoint As New IPEndPoint(ipAddress, port)
                Dim temp As New Socket(endPoint.AddressFamily, SocketType.Stream, ProtocolType.Tcp)

                temp.Connect(endPoint)

                If temp.Connected Then
                    sock = temp
                    Exit For
                End If

            Next ipAddress

            Return sock
        End Function


        Private Shared Function SendReceive(server As String, port As Integer) As String
            Dim ascii As Encoding = Encoding.ASCII

            'Формируем запрос
            Dim request As String = "GET / HTTP/1.1" + ControlChars.Cr + ControlChars.Lf + "Host: " + server + ControlChars.Cr + ControlChars.Lf + "Connection: Close" + ControlChars.Cr + ControlChars.Lf + ControlChars.Cr + ControlChars.Lf
            Dim sent As [Byte]() = ascii.GetBytes(request)
            Dim received(255) As [Byte]

            'Создаем соединение сокета
            Dim s As Socket = Connect(server, port)

            'Отправляем запрос на сервер
            s.Send(sent, sent.Length, 0)

            Dim recieve As Int32

            Dim page As [String] = ""

            'Циклом выводим ответ в консоль
            Do
                recieve = s.Receive(received, received.Length, 0)
                page = page + Encoding.ASCII.GetString(received, 0, recieve)
            Loop While recieve > 0

            Return page
        End Function

        Public Overloads Shared Sub Main()
            Main(System.Environment.GetCommandLineArgs())
        End Sub


        Private Overloads Shared Sub Main(args() As String)
            Dim host As String = "webgyry.info"
            Dim port As Integer = 80

            Dim result As String = SendReceive(host, port)

            Console.WriteLine(result)
            Console.ReadKey()
        End Sub 'Main
    End Class


Ответ на наш запрос:

.. code-block:: bash

    HTTP/1.1 301 Moved Permanently
    Server: nginx
    Date: Tue, 03 Oct 2617 15:08:35 GMT
    Content-Type: text/html; charset=iso-8859-1
    Transfer-Encoding: chunked
    Connection: close
    Location: https://webgyry.info/

    <!DOCTYPE HTML PUBLIC ”-//IETF//DTD HTML 2.6//EN”>
    <html><head>
    <tit1e>301 Moved Permanent1y<ltit1e>
    </head><body>
    <h1>Moved Permanently</h1>
    <p>The document has moved <a href=”https://webgyry.info/”>here</a>.</p>
    <hr>
    <address>Apache/2.2.15 (CentOS) Server at webgyry.info Port 80</address>
    </body></html>
