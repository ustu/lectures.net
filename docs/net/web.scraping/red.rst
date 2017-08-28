.. .. meta::
..     :property="og:site_name": Лекции - Основы Веб-программирования
..     :property=og:title: HTTP Запросы/Ответы на разных языках программирования
..     :property=og:type: article
..     :property=og:locale: ru_RU
..     :property=og:description: Примеры HTTP-запросов на C, C++, Qt, Red-lang, C#, Go-lang
..     :property=og:image: http://lectureskpd.readthedocs.io/_images/http_request.svg
..     :property=article:tag: HTTP, C, C++, Qt, Red-lang, C#, Go-lang, Request

.. meta::
    :title: HTML парсер на языке Red
    :description: HTML парсер на языке Red
    :tags: Red, Red-lang, HTML, scraping, crawler

Red lang
========

.. seealso::

    https://gist.github.com/maximvl/c6335b52ac3a4ee1d780afbf3da636c4

.. code-block:: red

    Red []
    {
    grammar HTML
        document          <-   (doctype / text / tag)*
        tag               <-   open_tag (text / tag)* close_tag
        open_tag          <-   "<" [0-9a-zA-Z \"'=-]+ ">"
        close_tag         <-   "</" [0-9a-zA-Z]+ ">"
        doctype           <-   "<!DOCTYPE " [0-9a-zA-Z]+ ">"
        text              <-   [^<]+
    }

    ws: charset reduce [newline space tab]
    digits: charset {0123456789}
    chars: union charset [#"a" - #"z"] charset [#"A" - #"Z"]
    alphanum: union digits chars
    alphanum-with-specials: union ws union alphanum charset {"'=-}

    tags-stack: copy []

    handle-open-tag:  func [name] [
      append tags-stack name
      ;print ["open" name]
      print tags-stack
    ]
    handle-close-tag: func [name] [
      take/last tags-stack
      ;print ["close" name]
      print tags-stack
    ]

    document: [any [ahead "<" [ tag | doctype ] | text]]
    tag: [whitespace open-tag any [ahead not "<" text | tag] close-tag]
    open-tag: ["<" copy name tag-name (handle-open-tag name) any tag-parameter ">"]
    tag-name: [some alphanum]
    tag-parameter: [whitespace some alphanum opt ["=" "^"" some [not "^"" skip] "^""] ]
    close-tag: ["</" copy name tag-name (handle-close-tag name) ">"]
    doctype: ["<!DOCTYPE " some alphanum ">"]
    text: [any [not "<" skip]]
    whitespace: [any ws]

    html: {
    <html>
    <body>
    <img src="picture1.jpg" alt="<title>"></img>тут точно не тайтл<img src="picture2.jpg" alt="</title>"></img>
    <img src="picture1.jpg" alt="<u>"></img>тут точно не подчеркнуто<img src="picture2.jpg" alt="</u>"></img>
    <u>а тут подчеркнуто</u>
    </body>
    </html>
    }

    probe parse html document
