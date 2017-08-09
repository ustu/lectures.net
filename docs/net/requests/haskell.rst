.. .. meta::
..     :property="og:site_name": Лекции - Основы Веб-программирования
..     :property=og:title: HTTP Запросы/Ответы на разных языках программирования
..     :property=og:type: article
..     :property=og:locale: ru_RU
..     :property=og:description: Примеры HTTP-запросов на C, C++, Qt, Red-lang, C#, Go-lang
..     :property=og:image: http://lectureskpd.readthedocs.io/_images/http_request.svg
..     :property=article:tag: HTTP, C, C++, Qt, Red-lang, C#, Go-lang, Request

.. meta::
    :title: HTTP Запросы/Ответы на Haskell
    :description: HTTP клиент на Haskell при помощи http-conduit.
    :tags: Haskell, HTTP

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
