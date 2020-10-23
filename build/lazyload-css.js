/* eslint-disable */
/* lazyload-css@1.0.5 */
/**
MIT License

Copyright (c) 2017 JP DeVries

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
function lazyLoadCSS(src, opts = {}) {
    return new Promise(((resolve, reject) => {
      if(!src) {
        throw new Error('src parameter must be specified');
        return;
      }

      const defaults = {
        media: 'all',
        rel: 'stylesheet',
        type: 'text/css',
        force: false
      };

      const {id, media, rel, type, force} = Object.assign({}, defaults, (typeof opts === 'string') ? {
        id: opts
      } : opts);

      const link = document.createElement('link');
      link.setAttribute('rel', rel);
      link.setAttribute('type', type);
      link.setAttribute('href', src);
      link.setAttribute('media', media);
      if(id) {
        if(!force && document.getElementById(id)) {
          resolve(document.getElementById(id));
          return;
        }
        link.setAttribute('id', id);
      } else {
        const li = document.head.querySelector(`link[rel="${rel}"][href="${src}"]`);
        if(li) {
          resolve(li);
          return;
        }
      }
      link.onload = function(event) {
        resolve(link);
      }
      document.head.appendChild(link);
    }));
};

module.exports = lazyLoadCSS;
