.. .. meta::
..     :property="og:site_name": Лекции - Основы Веб-программирования
..     :property=og:title: HTTP Запросы/Ответы на разных языках программирования
..     :property=og:type: article
..     :property=og:locale: ru_RU
..     :property=og:description: Примеры HTTP-запросов на C, C++, Qt, Red-lang, C#, Go-lang
..     :property=og:image: http://lectureskpd.readthedocs.io/_images/http_request.svg
..     :property=article:tag: HTTP, C, C++, Qt, Red-lang, C#, Go-lang, Request

.. meta::
    :title: HTTP Запросы/Ответы на Go
    :description: HTTP клиент на Go при помощи модуля net/http.
    :tags: Go, net/http, HTTP

Go lang
=======

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
