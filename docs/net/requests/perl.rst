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
    close($sock);

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
