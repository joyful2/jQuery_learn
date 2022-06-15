(function(root) {
  var version = "1.0.1";


  var jQuery = function(selector, context) {
    return new jQuery.prototype.init(selector, context);
  }

  var rootjQuery

  jQuery.event = {
    add: function(ele, type, fn) {
      const eleData = data_priv.get(ele)
      let events
      if (!(events = eleData['events'])) {
        eleData['events'] = {}

      }

      if (!(handlers = eleData['events'][type])) {
        eleData['events'] = []

      }

      let event, handlers
      if (!(event = eleData.event)) {
        event = eleData.event = {}
      }
      if (!(handlers = eleData.handlers)) {
        eleData.handlers = []
          // handler = eleData.handler = function(e) {
          //   jQuery.event.dispatch.call(ele, arguments)
          // }
      }

      handlers.push({
        type: type,
        handler: handler
          // guid
      })



      ele.addEventListener(type, event.handler)



      // const handler = ele.event.dispatch.call(ele,) 
      // todo 这里为什么不如下这么写，而非要写那么复杂？ 就是为了支持自定义事件！
      // if (ele.addEventListener) {
      //   const handler = (e) => {
      //     fn.call(ele, arguments)
      //   }
      //   ele.addEventListener(types, handler)
      // }

    }
  }

  jQuery.fn = jQuery.prototype = {
    length: 0, // todo: 为什么要共享length，不应该每个实例单独维护吗？
    jquery: version,
    selector: "",

    init: function(selector, context) {
      selector = selector || this
      context = context || document
      if (selector.nodeType) {
        // 传入dom对象
        this.context = this[0] = selector
        this.length = 1
        return this
      } else if (typeof selector === 'string') {
        // 传入字符串
        if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length > 2) {
          // eg : '<a>' 创建
          jQuery.merge(this, jQuery.parseHtml(selector, context))

        } else {
          // 查询 
          const elems = context.querySelectorAll(selector)
            // const elems = [].slice.call(elems)
          let i;
          for (i = 0, len = elems.length; i < len; i++) {
            this[i] = elems[i]
          }
          this.length = i;
          this.context = context
          this.selector = selector
          return this
        }
      } else if (toString.call(selector) === "[object Function]") {
        rootjQuery.ready(selector)

      }

    },
    css: function() {

    },
    ready: function(selector) {
      // 监听不应该在页面加载前就执行，  应该课程直播里是否漏了一次调用？
      document.addEventListener('domContentLoaded', jQuery.ready, false)
      if (this.isDomReady) {
        selector.call(document)
      } else {
        this.domReadyCbLs.push(selector)
      }
    },

    each: function(cb, arg) {
      return jQuery.each(this, cb, args)
    },


    on: function(types, fn) {
      //   this.each(() => {
      //     jQuery.event.add.call(this, types, fn)
      //   })
      return this.each(function() {
        //this  element对象
        jQuery.event.add(this, types, fn);
      });
    }


  }

  function Data() {
    this.expando = jQuery.expando + Math.random()
    this.cache = {}
  }

  Data.uid = 1

  Data.prototype = {
    getKey: function(ele) {
      let unlock = ele[this.expendo]
      if (!unlock) {
        ele[this.expendo] = unlock = Data.uid++
      }


      if (!this.cache[unlock]) {
        this.cache[unlock] = {}; //  数据   // cache: {events:{click:[type:'click',guid:n,handler:function]}}
      }
      return unlock
    },
    get: function(ele, property) {
      const eleData = this.cache[this.getKey(ele)]
      return property ? eleData[property] : eleData

    }
  }

  const data_priv = new Data()
  rootjQuery = jQuery(document)


  jQuery.fn.extend = jQuery.extend = function() {
    var target = arguments[0] || {}
    var length = arguments.length
    var i = 1;
    var deep = false;
    var option, name, copy, src, copyIsArray, clone;

    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[1]
      i = 2
    }
    if (typeof target !== 'object') {
      target = {}
    }
    if (length === i) {
      target = this;
      i--
    }

    for (; i < length; i++) {
      if ((option = arguments[i]) != null) {
        for (name in option) {
          copy = option[name]
          src = target[name]
            // todo  第一次执行时 isPlainObject 是undefined， 调用却没报错是为什么？？ 
          if (deep && (jQuery.isPlainObject(option[name]) || (copyisArray = jQuery.isArray(option[name])))) {
            if (copyisArray) {
              copyisArray = false
              clone = jQuery.isArray(src) ? src : []
            } else {
              clone = jQuery.isPlainObject(src) ? src : {}
            }
            target[name] = jQuery.extend(deep, clone, copy)
          } else {
            target[name] = copy
          }
        }
      }
    }
    return target
  }

  jQuery.prototype.init.prototype = jQuery.prototype


  jQuery.extend({
    //类型检测
    isPlainObject: function(obj) {
      console.log('define isPlainObject');
      return toString.call(obj) === "[object Object]";
    },
    isArray: function(obj) {
      return toString.call(obj) === "[object Array]";
    },
    slice: function(start, end) {
      let arr = []
      start = start || 0;
      end = end || this.length;
      for (let i = start; i < end; i++) {
        arr.push(this[i])
      }
      return arr
    },
    isDomReady: false,
    domReadyCbLs: [],
    ready: function() {
      this.isDomReady = true
      this.domReadyCbLs.forEach((cb) => {
        cb.call(document)
      })
      this.domReadyCbLs = null;
    },
    each: function(obj, cb, args) {
      const len = obj.length
      let i = 0;
      if (len) {
        for (; i < len; i++) {
          cb.call(obj[i], i, obj[i])
        }
      }
    }


  });

  jQuery.merge = function(first, second) {
    //  合并数组或类数组
    let l = second.length,
      i = first.length,
      j = 0
    if (typeof l === 'number') {
      for (; j < l; j++) {
        first[i++] = second[j]
      }
    } else {
      while (second[j]) {
        first[i++] = second[j++]
      }
    }
    first.length = i
    console.log('first:', first);

    return first
  }
  jQuery.parseHtml = function(data, context) {
    if (!data || typeof data !== "string") {
      return null;
    }
    var rejectExp = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;


    //过滤掉<a>   <a>   => a 
    var parse = rejectExp.exec(data);
    console.log(parse)
    return [context.createElement(parse[1])];

  }


  root.jQuery = root.$ = jQuery


})(this)