.. meta::
    :title: HTTP Запросы/Ответы на Java
    :description: HTTP клиент на Java
    :tags: Java, socket, HTTP

Java
====

.. hint::

   Для запуска достаточно выполнить:

   .. code-block:: bash

       $ javac Main.java
       $ java Main

Простой ``POST`` запрос с использованием стандартного модуля
`java.net.Socket
<https://docs.oracle.com/javase/7/docs/api/java/net/Socket.html>`_:

.. code-block:: java
    :caption: Main.java

    import java.io.BufferedReader;
    import java.io.BufferedWriter;
    import java.io.InputStreamReader;
    import java.io.OutputStreamWriter;
    import java.net.InetAddress;
    import java.net.Socket;
    import java.net.URLEncoder;

    public class Main {
      public static void main(String[] argv) throws Exception {
        String data = URLEncoder.encode("key1", "UTF-8")
          + "=" + URLEncoder.encode("value1", "UTF-8");
        
        String host = "httpbin.org";
        Socket socket = new Socket(host, 80);

        String path = "/post";
        BufferedWriter wr = new BufferedWriter(
            new OutputStreamWriter(socket.getOutputStream(), "UTF8")
        );
        wr.write("POST " + path + " HTTP/1.1\r\n");
        wr.write("Host: " + host + "\r\n");
        wr.write("Content-Length: " + data.length() + "\r\n");
        wr.write("Content-Type: application/x-www-form-urlencoded\r\n");
        wr.write("\r\n");

        wr.write(data);
        wr.flush();

        BufferedReader rd = new BufferedReader(
            new InputStreamReader(socket.getInputStream())
        );
        String line;
        while ((line = rd.readLine()) != null) {
          System.out.println(line);
        }
        wr.close();
        rd.close();
      }
    }

Ответ на наш запрос:

.. code-block:: bash

    $ javac Main.java
    $ java Main 
    HTTP/1.1 200 OK
    Connection: keep-alive
    Server: meinheld/0.6.1
    Date: Mon, 02 Oct 2017 10:15:41 GMT
    Content-Type: application/json
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Credentials: true
    X-Powered-By: Flask
    X-Processed-Time: 0.00125885009766
    Content-Length: 334
    Via: 1.1 vegur

    {
      "args": {}, 
      "data": "", 
      "files": {}, 
      "form": {
        "key1": "value1"
      }, 
      "headers": {
        "Connection": "close", 
        "Content-Length": "11", 
        "Content-Type": "application/x-www-form-urlencoded", 
        "Host": "httpbin.org"
      }, 
      "json": null, 
      "origin": "193.77.221.18", 
      "url": "http://httpbin.org/post"
    }
