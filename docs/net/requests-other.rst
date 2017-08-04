HTTP Запросы/Ответы на других языках
====================================

C curl
------

.. seealso::

    https://curl.haxx.se/docs/manual.html

Установка
^^^^^^^^^

Для :l:`nix`:

.. code-block:: bash

   $ nix-env -i curl

Компиляция исходного кода:

.. code-block:: bash

   $ gcc foo.c -I$HOME/.nix-profile/include/ \
       -L$HOME/.nix-profile/lib/ -lcurl -o foo

Для Ubuntu/Debian:

.. code-block:: bash

   $ sudo apt-get install libcurl4-openssl-dev

Компиляция исходного кода:

.. code-block:: bash

   $ gcc foo.c -lcurl -o foo

Get запрос
^^^^^^^^^^

example.com
"""""""""""

.. seealso::

    * `<https://ru.wikipedia.org/wiki/Домены_для_примеров>`_
    * https://curl.haxx.se/libcurl/c/simple.html

Пример ``GET`` запроса с сайта http://example.com, ответ приходит в
формате HTML.

.. code-block:: cpp
    :caption: simple.c

    #include <stdio.h>
    #include <curl/curl.h>

    int main(void)
    {
      CURL *curl;
      CURLcode res;

      curl = curl_easy_init();
      if(curl) {
        curl_easy_setopt(curl, CURLOPT_URL, "http://example.com");
        /* example.com is redirected, so we tell libcurl to follow redirection */
        curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);

        /* Perform the request, res will get the return code */
        res = curl_easy_perform(curl);
        /* Check for errors */
        if(res != CURLE_OK)
          fprintf(stderr, "curl_easy_perform() failed: %s\n",
                  curl_easy_strerror(res));

        /* always cleanup */
        curl_easy_cleanup(curl);
      }
      return 0;
    }

.. code-block:: html
    :caption: Результат выполнения программы

    <!doctype html>
    <html>
    <head>
        <title>Example Domain</title>

        <meta charset="utf-8" />
        <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style type="text/css">
        body {
            background-color: #f0f0f2;
            margin: 0;
            padding: 0;
            font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

        }
        div {
            width: 600px;
            margin: 5em auto;
            padding: 50px;
            background-color: #fff;
            border-radius: 1em;
        }
        a:link, a:visited {
            color: #38488f;
            text-decoration: none;
        }
        @media (max-width: 700px) {
            body {
                background-color: #fff;
            }
            div {
                width: auto;
                margin: 0 auto;
                border-radius: 0;
                padding: 1em;
            }
        }
        </style>
    </head>

    <body>
    <div>
        <h1>Example Domain</h1>
        <p>This domain is established to be used for illustrative examples in documents. You may use this
        domain in examples without prior coordination or asking for permission.</p>
        <p><a href="http://www.iana.org/domains/example">More information...</a></p>
    </div>
    </body>
    </html>

wttr.in
"""""""

.. note::

    http://wttr.in - веб сервис для получения информации о погоде,
    ориентированный на отображение в консоле

Пример ``GET`` запроса с сайта http://wttr.in, ответ приходит сплошным
текстом, если в заголовках запроса ``User-Agent`` указан ``curl``.

.. hint::

   Тот же результат можно получить выполнив в консоле:

   .. code-block:: bash

       $ curl http://wttr.in/Pyshma

.. code-block:: cpp
    :caption: weather.c

    #include <stdio.h>
    #include <curl/curl.h>


    int main(void)
    {
      CURL *curl;
      CURLcode res;

      curl = curl_easy_init();
      if(curl) {
        curl_easy_setopt(curl, CURLOPT_URL, "http://wttr.in/Pyshma");
        curl_easy_setopt(curl, CURLOPT_USERAGENT, "curl/7.47.1");
        /* example.com is redirected, so we tell libcurl to follow redirection */
        curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);

        /* Perform the request, res will get the return code */
        res = curl_easy_perform(curl);

        /* Check for errors */
        if(res != CURLE_OK)
          fprintf(stderr, "curl_easy_perform() failed: %s\n",
                  curl_easy_strerror(res));

        /* always cleanup */
        curl_easy_cleanup(curl);

      }
      return 0;
    }

.. code-block:: console
   :caption: Вывод погоды с сайта http://wttr.in/

   $ ./weather

   Weather for City: Pyshma, Russia

                  Freezing fog
     _ - _ - _ -  -4 °C
      _ - _ - _   ← 2 km/h
     _ - _ - _ -  0 km
                  0.0 mm
                                                          ┌─────────────┐
   ┌──────────────────────────────┬───────────────────────┤ Thu 10. Mar ├───────────────────────┬──────────────────────────────┐
   │           Morning            │             Noon      └──────┬──────┘    Evening            │            Night             │
   ├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
   │               Mist           │               Mist           │               Freezing fog   │               Freezing fog   │
   │  _ - _ - _ -  -6 °C          │  _ - _ - _ -  -8 – -7 °C     │  _ - _ - _ -  -6 – -4 °C     │  _ - _ - _ -  -9 °C          │
   │   _ - _ - _   ← 3 km/h       │   _ - _ - _   ← 2 km/h       │   _ - _ - _   ↖ 4 – 5 km/h   │   _ - _ - _   ↑ 7 – 11 km/h  │
   │  _ - _ - _ -  2 km           │  _ - _ - _ -  2 km           │  _ - _ - _ -  0 km           │  _ - _ - _ -  0 km           │
   │               0.0 mm | 0%    │               0.0 mm | 0%    │               0.0 mm | 0%    │               0.1 mm | 72%   │
   └──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
                                                          ┌─────────────┐
   ┌──────────────────────────────┬───────────────────────┤ Fri 11. Mar ├───────────────────────┬──────────────────────────────┐
   │           Morning            │             Noon      └──────┬──────┘    Evening            │            Night             │
   ├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
   │               Freezing fog   │               Freezing fog   │  _`/"".-.     Light snow     │               Freezing fog   │
   │  _ - _ - _ -  -17 – -13 °C   │  _ - _ - _ -  -7 – -3 °C     │   ,\_(   ).   -7 – -4 °C     │  _ - _ - _ -  -14 – -10 °C   │
   │   _ - _ - _   ↑ 8 – 9 km/h   │   _ - _ - _   ↑ 8 – 9 km/h   │    /(___(__)  ↑ 8 – 12 km/h  │   _ - _ - _   ↗ 9 – 14 km/h  │
   │  _ - _ - _ -  0 km           │  _ - _ - _ -  0 km           │      *  *  *  10 km          │  _ - _ - _ -  0 km           │
   │               0.0 mm | 0%    │               0.0 mm | 0%    │     *  *  *   0.0 mm | 0%    │               0.0 mm | 0%    │
   └──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
                                                          ┌─────────────┐
   ┌──────────────────────────────┬───────────────────────┤ Sat 12. Mar ├───────────────────────┬──────────────────────────────┐
   │           Morning            │             Noon      └──────┬──────┘    Evening            │            Night             │
   ├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
   │  _`/"".-.     Light snow     │      .-.      Moderate snow  │      .-.      Moderate snow  │      .-.      Moderate snow  │
   │   ,\_(   ).   -16 – -12 °C   │     (   ).    -8 – -4 °C     │     (   ).    -6 – -4 °C     │     (   ).    -10 °C         │
   │    /(___(__)  → 9 – 10 km/h  │    (___(__)   → 9 – 12 km/h  │    (___(__)   ↗ 6 – 9 km/h   │    (___(__)   ↘ 6 – 11 km/h  │
   │      *  *  *  10 km          │    * * * *    5 km           │    * * * *    5 km           │    * * * *    5 km           │
   │     *  *  *   0.1 mm | 4%    │   * * * *     0.2 mm | 14%   │   * * * *     0.1 mm | 52%   │   * * * *     0.2 mm | 52%   │
   └──────────────────────────────┴──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘

   Check new Feature: wttr.in/Moon or wttr.in/Moon@2016-Mar-23 to see the phase of the Moon
   Follow @igor_chubin for wttr.in updates

qrenco.de
"""""""""

.. note::

    http://qrenco.de - веб сервис для получения QR-кодов в текстовом виде

В качестве самостоятельной работы предлагаю вам написать программу которая
принимает на вход текст, а на выходе показывает QR-код в текстовом виде.

.. code-block:: console
   :caption: Генерация QR-кода

   $ ./qrcode "Купи хлеба!"
    █████████████████████████████████
    █████████████████████████████████
    ████ ▄▄▄▄▄ █▀█ █▄█▄▄ █ ▄▄▄▄▄ ████
    ████ █   █ █▀▀▀█  █ ▀█ █   █ ████
    ████ █▄▄▄█ █▀ █▀▀█▄███ █▄▄▄█ ████
    ████▄▄▄▄▄▄▄█▄▀ ▀▄█▄▀▄█▄▄▄▄▄▄▄████
    ████▄▄▄▄ ▀▄▄ ▄▀▄▀▄█   ▀ ▀ █ ▀████
    ████ ▄▀   ▄▀██▄█▀█▀▀ ▀ ██▀▀▄█████
    ████ ▀▀█▄▀▄▀▄ ▄█▄▀█▄▄█▀█▄ █▀▀████
    ████ █▄ ██▄ █ ▄ ▄▄█▀█  █▀█ █▀████
    ████▄██▄▄█▄█ ▄▄▄▀▀█▄ ▄▄▄ ▀█▀ ████
    ████ ▄▄▄▄▄ █▄▄▀█▀ ▄▄ █▄█  ▀ ▀████
    ████ █   █ █ ▀██▄█▄█  ▄  █   ████
    ████ █▄▄▄█ █ ▀▀ ▄█▀▄ ▄ █▄█ █ ████
    ████▄▄▄▄▄▄▄█▄█▄▄███▄▄█▄████▄▄████
    █████████████████████████████████
    █████████████████████████████████


.. code-block:: console
   :caption: Получение QR-кода с сайта http://qrenco.de

   $ curl "qrenco.de/Купи хлеба!"
    █████████████████████████████████
    █████████████████████████████████
    ████ ▄▄▄▄▄ █▀█ █▄█▄▄ █ ▄▄▄▄▄ ████
    ████ █   █ █▀▀▀█  █ ▀█ █   █ ████
    ████ █▄▄▄█ █▀ █▀▀█▄███ █▄▄▄█ ████
    ████▄▄▄▄▄▄▄█▄▀ ▀▄█▄▀▄█▄▄▄▄▄▄▄████
    ████▄▄▄▄ ▀▄▄ ▄▀▄▀▄█   ▀ ▀ █ ▀████
    ████ ▄▀   ▄▀██▄█▀█▀▀ ▀ ██▀▀▄█████
    ████ ▀▀█▄▀▄▀▄ ▄█▄▀█▄▄█▀█▄ █▀▀████
    ████ █▄ ██▄ █ ▄ ▄▄█▀█  █▀█ █▀████
    ████▄██▄▄█▄█ ▄▄▄▀▀█▄ ▄▄▄ ▀█▀ ████
    ████ ▄▄▄▄▄ █▄▄▀█▀ ▄▄ █▄█  ▀ ▀████
    ████ █   █ █ ▀██▄█▄█  ▄  █   ████
    ████ █▄▄▄█ █ ▀▀ ▄█▀▄ ▄ █▄█ █ ████
    ████▄▄▄▄▄▄▄█▄█▄▄███▄▄█▄████▄▄████
    █████████████████████████████████
    █████████████████████████████████


POST запрос
^^^^^^^^^^^

.. note::

    `httpbin <https://httpbin.org/>`_ - сервис для отладки HTTP запросов и
    ответов

Пример POST запроса к сервису `httpbin <https://httpbin.org/>`_.

.. code-block:: cpp
    :caption: POST запрос на сайт https://httpbin.org/post

    #include <stdio.h>
    #include <curl/curl.h>

    int main(void)
    {
      CURL *curl;
      CURLcode res;

      /* In windows, this will init the winsock stuff */
      curl_global_init(CURL_GLOBAL_ALL);

      /* get a curl handle */
      curl = curl_easy_init();
      if(curl) {
        /* First set the URL that is about to receive our POST. This URL can
           just as well be a https:// URL if that is what should receive the
           data. */
        curl_easy_setopt(curl, CURLOPT_URL, "https://httpbin.org/post");
        /* Now specify the POST data */
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, "name=UrFU&project=lectures.www");

        /* Perform the request, res will get the return code */
        res = curl_easy_perform(curl);
        /* Check for errors */
        if(res != CURLE_OK)
          fprintf(stderr, "curl_easy_perform() failed: %s\n",
                  curl_easy_strerror(res));

        /* always cleanup */
        curl_easy_cleanup(curl);
      }
      curl_global_cleanup();
      return 0;
    }

.. code-block:: json
    :caption: Ответ в формате JSON

    {
      "args": {},
      "data": "",
      "files": {},
      "form": {
        "name": "UrFU",
        "project": "lectures.www"
      },
      "headers": {
        "Accept": "*/*",
        "Content-Length": "30",
        "Content-Type": "application/x-www-form-urlencoded",
        "Host": "httpbin.org"
      },
      "json": null,
      "url": "https://httpbin.org/post"
    }


Go lang
-------

.. hint::

   Для запуска достаточно выполнить:

   .. code-block:: bash

       $ go run http_get.go

Простой ``GET`` запрос с использованием стандартного модуля
`net/http <https://golang.org/pkg/net/http/>`_:

.. code-block:: go
    :caption: http_get.go

    package main

    import (
        "fmt"
        "io/ioutil"
        "net/http"
        "os"
    )

    func main() {
        response, err := http.Get("http://golang.org/")
        if err != nil {
            fmt.Printf("%s", err)
            os.Exit(1)
        } else {
            defer response.Body.Close()
            contents, err := ioutil.ReadAll(response.Body)
            if err != nil {
                fmt.Printf("%s", err)
                os.Exit(1)
            }
            fmt.Printf("%s\n", string(contents))
        }
    }

Red lang
--------

.. seealso::

    * http://www.red-lang.org/
    * https://github.com/red/red
    * `<https://ru.wikipedia.org/wiki/Red_(язык_программирования)>`_

``Red`` удивительный язык программирования, помимо своей функциональной
природы, он способен охватить полный стек разработки от высокоуровневых
программ с GUI-интерфейсом до низкоуровневого программирования операционных
систем и драйверов.

read
^^^^

Создать GET запрос на ``Red`` очень просто, достаточно вызвать встроенную
функцию ``read``.

.. code-block:: bash

    $ ./red-063
    --== Red 0.6.3 ==--
    Type HELP for starting information.

    >> help read
    USAGE:
         READ source

    DESCRIPTION:
         Reads from a file, URL, or other port.
         READ is an action! value.

    ARGUMENTS:
         source       [file! url!]

    REFINEMENTS:
         /part        => Partial read a given number of units (source relative).
            length       [number!]
         /seek        => Read from a specific position (source relative).
            index        [number!]
         /binary      => Preserves contents exactly.
         /lines       => Convert to block of strings.
         /info        =>
         /as          => Read with the specified encoding, default is 'UTF-8.
            encoding     [word!]

    >>

Примеры запросов к сервису http://httpbin.org

.. code-block:: bash

    $ ./red-063
    --== Red 0.6.3 ==--
    Type HELP for starting information.

    >> print read http://httpbin.org/ip
    {
      "origin": "82.168.221.111"
    }

    >> print read http://httpbin.org/user-agent
    {
      "user-agent": null
    }

    >>

http-tool
^^^^^^^^^

.. note::

    `http-tools
    <https://github.com/rebolek/red-tools/blob/master/http-tools.red>`_ -
    модуль для отправки HTTP запросов

Для более сложных запросов можно воспользоваться модулем `http-tools
<https://github.com/rebolek/red-tools/blob/master/http-tools.red>`_.

.. code-block:: red
    :caption: requests.red

    Red []

    #include %red-tools/http-tools.red
    print send-request/raw/with
      http://httpbin.org/user-agent
      'GET [User-Agent: "Mozilla/Gecko/IE 1.2.3"]

В результате получим заголовок ``User-Agent`` который мы указали в запросе.

.. code-block:: bash
    :caption: ./red-063 requests.red

    $ ./red-063 requests.red

    200 Connection: "keep-alive"
    Server: "meinheld/0.6.1"
    Date: "Tue, 01 Aug 2017 07:27:47 GMT"
    Content-Type: "application/json"
    Access-Control-Allow-Origin: "*"
    Access-Control-Allow-Credentials: "true"
    X-Powered-By: "Flask"
    X-Processed-Time: "0.000529050827026"
    Content-Length: "45"
    Via: "1.1 vegur" {
      "user-agent": "Mozilla/Gecko/IE 1.2.3"
    }

Haskell
-------

.. seealso::

    * `Network-HTTP-Simple
      <https://hackage.haskell.org/package/http-conduit-2.2.3.2/docs/Network-HTTP-Simple.html>`_
    * https://haskell-lang.org/library/http-client
    * https://haskell-lang.org/tutorial/stack-script

Программа на ``Haskell`` которая обращается к сервису http://httpbin.org
методом GET.

.. code-block:: haskell
    :caption: http.hs

    {-# LANGUAGE OverloadedStrings #-}
    import qualified Data.ByteString.Lazy.Char8 as L8
    import           Network.HTTP.Simple

    main :: IO ()
    main = do
        response <- httpLBS "http://httpbin.org/get"

        putStrLn $ "The status code was: " ++
                   show (getResponseStatusCode response)
        print $ getResponseHeader "Content-Type" response
        L8.putStrLn $ getResponseBody response

Выполняем при помощи `stack <https://haskellstack.org/>`_.

.. code-block:: bash

    $  stack runghc --package http-conduit -- http.hs
    The status code was: 200
    ["application/json"]
    {
      "args": {},
      "headers": {
        "Accept-Encoding": "gzip",
        "Connection": "close",
        "Host": "httpbin.org"
      },
      "origin": "82.168.129.111",
      "url": "http://httpbin.org/get"
    }

C#
--

.. seealso::

    * https://www.microsoft.com/net/download/linux
    * `HttpClient Class <https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient>`_

`HttpClient Class
<https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient>`_
содержится в поставке ``.NET Core`` для ``Linux``. Создадим проект на C#
отправляющий HTTP запрос.

Первой командой создается проект из шаблона, затем устанавливаются зависимости
и запускается программа.

.. code-block:: bash

    $ dotnet new Console
    $ dotnet restore
    $ dotnet run

HTTP запрос выполняется асинхронно.

.. code-block:: csharp
    :caption: Program.cs

    using System;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading.Tasks;

    namespace ConsoleApplication
    {
        public class Program
        {
            public static void Main(string[] args)
            {
                MainAsync().Wait();
            }

            static async Task MainAsync()
            {
              var client = new HttpClient();
              client.DefaultRequestHeaders.Accept.Clear();
              client.DefaultRequestHeaders.Accept.Add(
                  new MediaTypeWithQualityHeaderValue(
                    "application/vnd.github.v3+json"
                  )
              );
              client.DefaultRequestHeaders.Add(
                "User-Agent",
                ".NET Foundation Repository Reporter"
              );

              var stringTask = client.GetStringAsync(
                "https://api.github.com/orgs/ustu/repos"
              );

              var msg = await stringTask;
              Console.Write(msg);
            }
        }
    }

Результат выполнения программы.

.. code-block:: bash

    $ dotnet run
    Project net (.NETCoreApp,Version=v1.1) will be compiled because inputs were modified
    Compiling net for .NETCoreApp,Version=v1.1

    Compilation succeeded.
        0 Warning(s)
        0 Error(s)

    Time elapsed 00:00:01.0363043

    [{"id":25028386,"name":"urfu_sphinx_theme","full_name":"ustu/urfu_sphinx_theme","owner":{"log
    in":"ustu","id":9111291,"avatar_url":"https://avatars0.githubusercontent.com/u/9111291?v=4","
    gravatar_id":"","url":"https://api.github.com/users/ustu","html_url":"https://github.com/ustu
    ","followers_url":"https://api.github.com/users/ustu/followers","following_url":"https://api.
    github.com/users/ustu/following{/other_user}","gists_url":"https://api.github.com/users/ustu/
    gists{/gist_id}","starred_url":"https://api.github.com/users/ustu/starred{/owner}{/repo}","su
    bscriptions_url":"https://api.github.com/users/ustu/subscriptions","organizations_url":"https
    ://api.github.com/users/ustu/orgs","repos_url":"https://api.github.com/users/ustu/repos","eve
    nts_url":"https://api.github.com/users/ustu/events{/privacy}","received_events_url":"https://
    api.github.com/users/ustu/received_events","type":"Organization","site_admin":false},"private
    ":false,"html_url":"https://github.com/ustu/urfu_sphinx_theme","description":null,"fork":fals
    e,"url":"https://api.github.com/repos/ustu/urfu_sphinx_theme","forks_url":"https://api.github
    .com/repos/ustu/urfu_sphinx_theme/forks","keys_url":"https://api.github.com/repos/ustu/urfu_s
    phinx_theme/keys{/key_id}","collaborators_url":"https://api.github.com/repos/ustu/urfu_sphinx
    _theme/collaborators{/collaborator}","teams_url":"https://api.github.com/repos/ustu/urfu_sphi

C++/Qt
------

.. seealso::

   http://doc.qt.io/qt-5/qtnetwork-index.html

`Qt <https:/qt.io/>`_ невероятно мощный фреймворк, который делает разработку на
C++ простой и удобной. Модуль `QtNetwork
<http://doc.qt.io/qt-5/qtnetwork-index.html>`_ позволяет выполнять различные
сетевые операции, в том числе и HTTP запросы.

.. code-block:: cpp
    :caption: main.cpp

    // Qt loop app
    #include <QtCore/QDebug>
    #include <QtCore/QJsonDocument>
    #include <QtCore/QCoreApplication>

    // Network
    #include <QtNetwork/QNetworkReply>
    #include <QtNetwork/QNetworkRequest>
    #include <QtNetwork/QNetworkAccessManager>

    int main(int argc, char *argv[])
    {
        QCoreApplication a(argc, argv);

        auto manager = new QNetworkAccessManager();
        QObject::connect(
                    manager,
                    &QNetworkAccessManager::finished,
                    // Лямбда функция - обработчик HTTP ответа
                    [=](QNetworkReply *reply) {

            // Обработка ошибок
            if (reply->error()) {
                qDebug() << QString("Error %1").arg(reply->errorString());
                exit(1);
            }

            // Вывод заголовков
            for (auto &i:reply->rawHeaderPairs()) {
                QString str;
                qDebug() << str.sprintf(
                                "%40s: %s",
                                i.first.data(),
                                i.second.data());
            }

            // Вывод стандартного заголовка
            qDebug() << reply->header(QNetworkRequest::ContentTypeHeader).toString();

            // Тело ответа в формате JSON
            QByteArray responseData = reply->readAll();
            qDebug() << QJsonDocument::fromJson(responseData);

            // Delete garbage && Exit
            reply->deleteLater();
            manager->deleteLater();
            exit(0);
        });

        manager->get(QNetworkRequest(QUrl("http://httpbin.org/get")));

        return a.exec();
    }

Программа в цикле обработки событий дожидается HTTP ответ и передает управление
в лямда функцию.

Результат выполнения.

.. code-block:: text

    "                              Connection: keep-alive"
    "                                  Server: meinheld/0.6.1"
    "                                    Date: Fri, 04 Aug 2017 09:33:08 GMT"
    "                            Content-Type: application/json"
    "             Access-Control-Allow-Origin: *"
    "        Access-Control-Allow-Credentials: true"
    "                            X-Powered-By: Flask"
    "                        X-Processed-Time: 0.000859022140503"
    "                          Content-Length: 269"
    "                                     Via: 1.1 vegur"
    QVariant(QString, "application/json")
    QJsonDocument({"args":{},"headers":{"Accept-Encoding":"gzip, deflate","Accept-Language":"en-US,*","Connection":"close","Host":"httpbin.org","User-Agent":"Mozilla/5.0"},"origin":"89.111.232.62","url":"http://httpbin.org/get"})

.. seealso::

    http://doc.qt.io/qbs/

Для сборки проекта можно использовать систему сборки `Qbs
<http://doc.qt.io/qbs/>`_.

.. code-block:: qbs
    :caption: qt-request.qbs

    import qbs

    Project {
        minimumQbsVersion: "1.7.1"

        CppApplication {
            Depends { name: "Qt.core" }
            Depends { name: "Qt.network" }

            cpp.cxxLanguageVersion: "c++11"

            files: "main.cpp"

            Group {     // Properties for the produced executable
                fileTagsFilter: product.type
                qbs.install: true
            }
        }
    }
