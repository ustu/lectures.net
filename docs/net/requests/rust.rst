.. meta::
    :title: HTTP Запросы/Ответы на Rust
    :description: HTTP клиент на Rust
    :tags: Rust, socket, HTTP

Rust
====

.. hint::

   Для запуска достаточно выполнить:

   .. code-block:: bash

       $ rustc http_get.rs
       $ ./http_get

Простой ``GET`` запрос с использованием стандартного модуля
`std::net::TcpStream
<https://doc.rust-lang.org/std/net/struct.TcpStream.html>`_:

.. code-block:: rust
    :caption: http_get.rs

    use std::net::TcpStream;
    use std::io::Write;
    use std::io::Read;

    fn main() {
        let host = String::from("lecturesnet.readthedocs.io");
        let path = "/";
        let request = format!(
          "GET {} HTTP/1.1\nHost: {}\nAccept: text/html\nConnection: close\n\n",
          path,
          host
        );

        let addr = host + ":80";
        let mut socket = TcpStream::connect(addr).unwrap();

        let _ = socket.write(request.as_bytes());
        println!("{}", request);

        let mut cont = String::new();
        socket.read_to_string(&mut cont).unwrap();
        println!("{}", cont);
    }


Ответ на наш запрос:

.. code-block:: bash

    $ ./http_get
    GET / HTTP/1.1
    Host: lecturesnet.readthedocs.io
    Accept: text/html
    Connection: close


    HTTP/1.1 200 OK
    Server: nginx/1.10.3 (Ubuntu)
    X-Deity: web03
    Vary: Accept-Encoding
    X-Served: Nginx
    Content-Type: text/html
    Date: Mon, 02 Oct 2017 09:45:28 GMT
    Accept-Ranges: bytes
    ETag: "59d1dc90-45ac"
    Connection: close
    Set-Cookie: X-Mapping-fjhppofk=F369C23A072E7240473DC7A44CD7D010; path=/
    X-Subdomain-TryFiles: True
    Last-Modified: Mon, 02 Oct 2017 06:28:32 GMT
    Content-Length: 17836

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
      "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">



    <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta content="Лекции по курсу &quot;Сетевое программирование&quot;" name="description" />
    <meta content="курс, сети, программирование, TCP, UDP, socket, HTTP, scraping" name="keywords" />

            <title>
                
        
        Сетевое программирование
     &mdash;

