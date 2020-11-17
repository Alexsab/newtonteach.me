/**
 * HTMLElement.pseudoStyle: Setting/Modifying :before and :after in javascript
 * @author Andrew McGivery
 * @url http://mcgivery.com/htmlelement-pseudostyle-settingmodifying-before-and-after-in-javascript/
 */
(function(){
    let UID = {
        _current: 0,
        getNew: function(){
            this._current++;
            return this._current;
        }
    };

    HTMLElement.prototype.pseudoStyle = function(element,prop,value){
        let _this = this;
        let _sheetId = "pseudoStyles";
        let _head = document.head || document.getElementsByTagName('head')[0];
        let _sheet = document.getElementById(_sheetId) || document.createElement('style');
        _sheet.id = _sheetId;
        let className = "pseudoStyle" + UID.getNew();
        
        _this.className +=  " "+className; 
        
        _sheet.innerHTML += " ."+className+":"+element+"{"+prop+":"+value+"}";
        _head.appendChild(_sheet);
        return this;
    };
})();


/*!
 * Lazy Load - JavaScript plugin for lazy loading images
 *
 * Copyright (c) 2007-2019 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   https://appelsiini.net/projects/lazyload
 *
 * Version: 2.0.0-rc.2
 *
 */

(function (root, factory) {
    if (typeof exports === "object") {
        module.exports = factory(root);
    } else if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        root.LazyLoad = factory(root);
    }
}) (typeof global !== "undefined" ? global : this.window || this.global, function (root) {

    "use strict";

    if (typeof define === "function" && define.amd){
        root = window;
    }

    const defaults = {
        src: "data-src",
        srcset: "data-srcset",
        srcbefore: "data-src-before",
        srcafter: "data-src-after",
        srcclass: "data-src-class",
        srcbackground: "data-src-background",
        srcbackgroundimageset: "data-src-background-image-set",
        selector: ".lazyload",
        selectorparent: ".lazyparent",
        root: null,
        rootMargin: "0px",
        threshold: 0
    };

    /**
    * Merge two or more objects. Returns a new object.
    * @private
    * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
    * @param {Object}   objects  The objects to merge together
    * @returns {Object}          Merged values of defaults and options
    */
    const extend = function ()  {

        let extended = {};
        let deep = false;
        let i = 0;
        let length = arguments.length;

        /* Check if a deep merge */
        if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
            deep = arguments[0];
            i++;
        }

        /* Merge the object into the extended object */
        let merge = function (obj) {
            for (let prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    /* If deep merge and property is an object, merge properties */
                    if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                        extended[prop] = extend(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop];
                    }
                }
            }
        };

        /* Loop through each object and conduct a merge */
        for (; i < length; i++) {
            let obj = arguments[i];
            merge(obj);
        }

        return extended;
    };

    function markAsLoaded(element) {
        element.setAttribute('data-loaded', true);
    }

    function isLoaded(element) {
        return element.getAttribute('data-loaded') === 'true';
    };

    function LazyLoad(images, options) {
        this.settings = extend(defaults, options || {});
        this.images = images || document.querySelectorAll(this.settings.selector);
        this.observer = null;
        this.init();
    }

    LazyLoad.prototype = {
        init: function() {

            /* Without observers load everything and bail out early. */
            if (!root.IntersectionObserver) {
                this.loadImages();
                return;
            }

            let self = this;
            let observerConfig = {
                root: this.settings.root,
                rootMargin: this.settings.rootMargin,
                threshold: [this.settings.threshold]
            };

            this.observer = new IntersectionObserver(function(entries) {
                Array.prototype.forEach.call(entries, function (entry) {
                    if (entry.isIntersecting) {
                        self.observer.unobserve(entry.target);
                        self.oneFunc(entry.target);
                    }
                });
            }, observerConfig);

            Array.prototype.forEach.call(this.images, function (image) {
                self.observer.observe(image);
            });
        },

        loadAndDestroy: function () {
            if (!this.settings) { return; }
            this.loadImages();
            this.destroy();
        },

        loadImages: function () {
            if (!this.settings) { return; }

            let self = this;
            Array.prototype.forEach.call(this.images, function (image) {
                self.oneFunc(image);
            });
        },

        oneFunc: function (smth) {
            let src = smth.getAttribute(this.settings.src);
            let srcset = smth.getAttribute(this.settings.srcset);
            let srcbefore = smth.getAttribute(this.settings.srcbefore);
            let srcafter = smth.getAttribute(this.settings.srcbefore);
            let srcclass = smth.getAttribute(this.settings.srcclass);
            let srcbackground = smth.getAttribute(this.settings.srcbackground);
            let srcbackgroundimageset = smth.getAttribute(this.settings.srcbackgroundimageset);
            let removeSelector = false; 
            let notRemoveLazyclassNow = false;
            if ('img' === smth.tagName.toLowerCase()) {
                notRemoveLazyclassNow = true;
                let self = this;
                if (src) {
                    this.loadImg(src, function(){
                        smth.src = src;
                        self.removeSelector(smth);
                    })
                }
                if (srcset) {
                    smth.srcset = srcset;
                }
            } else if ('picture' === smth.tagName.toLowerCase()) {
                let img = smth.querySelector('img');
                let append = false;

                if (img === null) {
                    img = document.createElement('img');
                    append = true;
                }
                if (isIE && smth.getAttribute('data-iesrc')) {
                  img.src = smth.getAttribute('data-iesrc');
                }

                if (smth.getAttribute('data-alt')) {
                  img.alt = smth.getAttribute('data-alt');
                }
                if (append) {
                    smth.append(img);
                }
            } else if ('iframe' === smth.tagName.toLowerCase()) {
                if (src) {
                    smth.src = src;
                }
            } else if ('video' === smth.nodeName.toLowerCase() && !smth.getAttribute('data-src')) {
                if (smth.getAttribute('data-poster')) {
                    smth.poster = smth.getAttribute('data-poster')
                }
                if (smth.children) {
                    let childs = smth.children;
                    let childSrc = void 0;
                    for (let i = 0; i <= childs.length - 1; i++) {
                        childSrc = childs[i].getAttribute('data-src');
                        if (childSrc) {
                            childs[i].src = childSrc;
                        }
                    }
                    smth.load();
                }
            } else if (srcbefore !== null) {
                smth.pseudoStyle('before', 'background-image', 'url("' + srcbefore + '")');
            } else if (srcafter !== null) {
                smth.pseudoStyle('after', 'background-image', 'url("' + srcafter + '")');
            } else if (srcclass !== null) {
                smth.classList.add(srcclass);
            } else if (srcbackground !== null) {
                smth.style.backgroundImage = 'url("' + srcbackground + '")';
            } else if (srcbackgroundimageset !== null) {
                let imageSetLinks = srcbackgroundimageset.split(',');
                let firstUrlLink = imageSetLinks[0].substr(0, imageSetLinks[0].indexOf(' ')) || imageSetLinks[0]; // Substring before ... 1x
                firstUrlLink = firstUrlLink.indexOf('url(') === -1 ? 'url(' + firstUrlLink + ')' : firstUrlLink;
                if (imageSetLinks.length === 1) {
                    smth.style.backgroundImage = firstUrlLink;
                } else {
                    smth.setAttribute('style', (smth.getAttribute('style') || '') + ('background-image: ' + firstUrlLink + '; background-image: -webkit-image-set(' + imageSetLinks + '); background-image: image-set(' + imageSetLinks + ')'));
                }
            } else {
                smth.style.backgroundImage = 'url("' + src + '")';
            }
            if(!notRemoveLazyclassNow) {
                this.removeSelector(smth);
            }
        },

        removeSelector: function (smth) {
            smth.classList.remove(this.settings.selector.split('.').join(""));
            smth.parentNode.classList.remove(this.settings.selectorparent.split('.').join(""));
        },

        loadImg: function (url, callback) {

            if (typeof url !== 'undefined') {
                
                let src = '';
                
                if(typeof url !== 'string') {
                    let windowWidth = document.body.clientWidth;

                    url.sort((a, b) => {
                        return b.maxWidth - a.maxWidth;
                    })

                    url.forEach((item)=>{
                        if (windowWidth <= item.maxWidth) {
                            src = item.url;
                        }
                    })

                } else {
                    src = url;
                }

                var img = new Image();
                img.src = src;
                img.onload = callback;
            }
        },

        destroy: function () {
            if (!this.settings) { return; }
            this.observer.disconnect();
            this.settings = null;
        }
    };

    root.lazyload = function(images, options) {
        return new LazyLoad(images, options);
    };

    if (root.jQuery) {
        const $ = root.jQuery;
        $.fn.lazyload = function (options) {
            options = options || {};
            options.attribute = options.attribute || "data-src";
            new LazyLoad($.makeArray(this), options);
            return this;
        };
    }

    return LazyLoad;
});
