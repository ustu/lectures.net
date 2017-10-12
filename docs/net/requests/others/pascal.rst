.. meta::
    :title: HTTP Запросы/Ответы на Pascal
    :description: HTTP клиент на Pascal
    :tags: Pascal, socket, HTTP

Pascal
======

Простой ``GET`` запрос:

.. code-block:: pascal

    program sockets;

    uses
       sockets, inetaux;

    const
       RemoteAddress = 'habrahabr.ru';
       RemotePort : 80;

    var
       Sock : LongInt;
       sAddr : TInetSockAddr;
       sin, sout : Text;
       Line : String;

    begin

       Sock := Socket(af_inet, sock_stream, sol_tcp); // Создание конечной точки соединения
       if Sock = -1 then Writeln('Error');

       with sAddr do
       begin
          Family := af_inet;
          Port := htons(RemotePort);
          Addr := StrToAddr(RemoteAddress);
       end;

       if not Connect(Sock, sAddr, sizeof(sAddr)) then Writeln('Connect: habrahabr.ru '); // Установка соединения с сервером
       Sock2Text(Sock, sin, sout);
       Reset(sin);
       Rewrite(sout);

       // Отправка запроса
       Writeln('Connected.');
       Readln(sin, Line);
       Writeln(Line);
       repeat
          Write('> ');
          Readln(Line);
          // Вывод ответа
          Writeln(sout, Line);
          if Line <> 'close' then
          begin
             Readln(sin, Line);
             Writeln(Line);
          end;
       until Line = 'close';
       Close(sin);
       Close(sout);
       Shutdown(Sock, 2);
    end
