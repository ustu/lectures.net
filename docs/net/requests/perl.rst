.. meta::
    :title: HTTP Запросы/Ответы на Perl
    :description: HTTP клиент на Perl
    :tags: Perl, socket, HTTP

Perl
====

.. hint::

   Для запуска достаточно выполнить:

   .. code-block:: bash

       $ perl http_get.pl

Простой ``GET`` запрос с использованием стандартного модуля `Socket
<https://perldoc.perl.org/Socket.html>`_:

.. code-block:: perl
    :caption: http_get.pl

    #!/usr/bin/perl

    use strict;
    use warnings;

    use IO::Socket;

    # Get value from command line argument if it exists; otherwise "info.cern.ch"
    my $host = shift || "info.cern.ch";

    # Connect to the remote host on 80 port using tcp protocol
    my $sock = new IO::Socket::INET(
            PeerAddr => $host,
            PeerPort => '80',
            Proto    => 'tcp')
        or die $!;

    # Get the root page using http version 1.1
    print $sock "GET / HTTP/1.1\r\n"
              . "Host: $host\r\n"
              . "\r\n";

    # Recieve and print the answer
    print while <$sock>;

    # Close socket
    close $sock;

Ответ на наш запрос:

.. code-block:: bash

    $ perl http_get.pl
    HTTP/1.1 200 OK
    Date: Fri, 29 Sep 2017 14:57:02 GMT
    Server: Apache
    Last-Modified: Wed, 05 Feb 2014 16:00:31 GMT
    ETag: "40521bd2-286-4f1aadb3105c0"
    Accept-Ranges: bytes
    Content-Length: 646
    Connection: close
    Content-Type: text/html

    <html><head></head><body><header>
    <title>http://info.cern.ch</title>
    </header>

    <h1>http://info.cern.ch - home of the first website</h1>
    <p>From here you can:</p>
    <ul>
    <li><a href="http://info.cern.ch/hypertext/WWW/TheProject.html">Browse the first website</a></li>
    <li><a href="http://line-mode.cern.ch/www/hypertext/WWW/TheProject.html">Browse the first website using the line-mode browser simulator</a></li>
    <li><a href="http://home.web.cern.ch/topics/birth-web">Learn about the birth of the web</a></li>
    <li><a href="http://home.web.cern.ch/about">Learn about CERN, the physics laboratory where the web was born</a></li>
    </ul>
    </body></html>

Perl6
-----

.. seealso::

    https://perl6.org/

.. code-block:: perl6
    :caption: http_get.pl

    #Программа для http запросов на Perl6

    use v6;
    use experimental :pack;
    use MONKEY-SEE-NO-EVAL;

    my $host = "worldofwarcraft.com";

    #Делаем по фану некоторые перегрузки
    sub infix:< ⟶ >($req, $sock) { $sock.write(buf8.new($req.ords)) }
    sub prefix:< ← >($sock) { say $sock.recv(:bin).unpack("A*") }
    sub prefix:< 💀 >($sock) { $sock.close }
    sub prefix:< 🍕(🍗,🧀) >($put_in_the_oven) { IO::Socket::INET.new(:host($host), :port(80)) }

    my $put_in_the_oven;

    #Создаём сокет
    my $sock = 🍕(🍗,🧀) $put_in_the_oven;

    #Делаем запрос
    "GET / HTTP/1.1\r\nHost: $host\r\n\r\n" ⟶ $sock;

    #Распаковываем ответ
    ← $sock;

    #Закрываем сокет
    💀 $sock;

Ответ на наш запрос:

.. code-block:: bash

    $ perl http_get.pl
    HTTP/1.1 307 Temporary Redirect
    Content-Type: text/html
    Date: Thu, 05 Oct 2017 19:06:54 GMT
    Location: https://worldofwarcraft.com/
    Server: nginx
    Content-Length: 196
    Connection: keep-alive

    <html>
    <head><title>307 Temporary Redirect</title></head>
    <body bgcolor="white">
    <center><h1>307 Temporary Redirect</h1></center>
    <hr><center>nginx/1.10.3 (Ubuntu)</center>
    </body>
    </html>

Эквивалентный код без перегрузок:

.. code-block:: perl6
    :caption: http_get.pl

    use v6;
    use experimental :pack;
    my $host = "worldofwarcraft.com";
    my $sock = IO::Socket::INET.new(:host($host), :port(80));
    my $req = buf8.new("GET / HTTP/1.1\r\nHost: $host\r\n\r\n".ords);
    $sock.write($req);
    say $sock.recv(:bin).unpack("A*");
    $sock.close();
