HTTP Запросы/Ответы на других языках
====================================

C curl
------

.. seealso::

    https://curl.haxx.se/docs/manual.html

Установка
~~~~~~~~~

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
~~~~~~~~~~

.. seealso::

    * https://ru.wikipedia.org/wiki/Домены_для_примеров
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

.. note::

    http://wttr.in веб сервис для получения информации о погоде,
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

.. note::

    http://qrenco.de веб сервис для получения QR-кодов в текстовом виде

В качестве самостоятельной работы предлагаю вам написать программу которая
принимает на вход текст, а на выходе показывает QR-код в текстовом виде.

.. code-bloc:: console
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
~~~~~~~~~~~

Пример POST запроса:

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
