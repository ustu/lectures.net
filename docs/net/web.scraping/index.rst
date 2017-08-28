Парсим HTML
===========

.. seealso::

   https://en.wikipedia.org/wiki/Web_scraping

   DOM:

     * https://ru.wikipedia.org/wiki/Document_Object_Model

   CSS Selector:

     + https://www.w3.org/TR/selectors/
     + http://www.w3schools.com/cssref/css_selectors.asp
     + `<https://ru.wikibooks.org/wiki/CSS/Селекторы>`_

   XPath:

     + https://ru.wikipedia.org/wiki/XPath
     + https://addons.mozilla.org/ru/firefox/addon/firepath/
     + http://ejohn.org/blog/xpath-css-selectors/

Для разбора Веб-страниц HTML/XML текст представляют в виде дерева
объектов (DOM), к элементам которого можно обращаться при помощи разных
механизмов:

    * CSS
    * XPath
    * JQuery
    * `FireFox <https://devtools-html.github.io/debugger.html/>`_

.. toctree::
    :maxdepth: 3

    browser.rst
    selenium.rst
    lxml.rst
    asyncio.rst
    red.rst
    qt.rst

.. todo::

   * Add Qt WebElement for example
   * more example with lxml.html and css3 selector
