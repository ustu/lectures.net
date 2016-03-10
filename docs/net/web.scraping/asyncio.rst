aiohttp
=======

.. seealso::

    * http://aiohttp.readthedocs.org/
    * http://lxml.de/cssselect.html
    * https://pythonhosted.org/cssselect/

.. code-block:: python3

   import lxml.html as lhtml

   import aiohttp
   import asyncio


   URLS = {
       'imgurl': 'http://imgur.com/',
       'flickr': 'https://www.flickr.com/photos/tags/pretty'
   }

   HEADERS = {
       'User-Agent':
       "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/41.2"
   }


   def get_images(html):
       doc = lhtml.document_fromstring(html)
       return doc.cssselect('img')


   async def print_img_src(name, url):
       async with aiohttp.request('GET', url, headers=HEADERS) as response:
           if response.status == 200:
               images = get_images(await response.read())
               for img in images:
                   if 'src' in img.attrib:
                       print(img.attrib['src'])

   tasks = [print_img_src(name, url)
            for name, url in URLS.items()]

   loop = asyncio.get_event_loop()
   loop.run_until_complete(asyncio.wait(tasks))
   loop.close()
