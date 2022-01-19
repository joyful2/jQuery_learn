(function (root){
  var version = "1.0.1";


  var jQuery = function(selector, context) {
		return new jQuery.prototype.init(selector, context);
	}



	jQuery.fn = jQuery.prototype = {
    length: 0, // todo: 为什么要共享length，不应该每个实例单独维护吗？
    jquery: version,
    selector: "",
		init: function(selector, context) {
        selector = selector || this
        context = context || document
      if(selector.nodeType){
        // 传入dom对象
        this.context = this[0] = selector
        this.length = 1
        return this
      } else if(typeof selector === 'string'){
        // 传入字符串
        if(selector.charAt(0) === '<' && selector.charAt(selector.length-1) === '>' && selector.length>2){
          // eg : '<a>' 创建
          jQuery.merge(this,jQuery.parseHtml(selector,context))

        }else {
          // 查询 
          const elems = context.querySelectorAll(selector)
          // const elems = [].slice.call(elems)
          let i;
          for( i=0,len=elems.length;i<len;i++){
            this[i] = elems[i]
          }
          this.length = i;
          this.context = context
          this.selector = selector
          return this
        }
      }

		},
		css: function() {

		}
	}

  


  jQuery.fn.extend = jQuery.extend = function(){
    var target = arguments[0] || {}
    var length = arguments.length
    var i=1;
    var deep = false;
    var option,name,copy,src,copyIsArray,clone;

    if(typeof target === 'boolean'){
      deep = target;
      target = arguments[1]
      i = 2
    }
    if(typeof target !== 'object'){
      target = {}
    }
    if(length === i){
      target = this;
      i-- 
    }

    for(;i<length;i++){
      if((option = arguments[i]) != null){ 
        for( name in option){
           copy = option[name]
           src = target[name]
          // todo  第一次执行时 isPlainObject 是undefined， 调用却没报错是为什么？？ 
          if(deep && (jQuery.isPlainObject(option[name]) || (copyisArray = jQuery.isArray(option[name])))){
            if(copyisArray){
              copyisArray = false
              clone = jQuery.isArray(src) ? src : []
            } else {
              clone = jQuery.isPlainObject(src) ? src : {}
            }
            target[name] = jQuery.extend(deep,clone,copy)
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
		isPlainObject: function(obj){
      console.log('define isPlainObject');
			return toString.call(obj) === "[object Object]";
		},
		isArray: function(obj){
			return toString.call(obj) === "[object Array]";
		}

	});

  jQuery.merge = function(first,second){
        //  合并数组或类数组
    let l = second.length,
        i = first.length,
        j = 0
    if(typeof l === 'number'){
      for(;j<l;j++) {
        first[i++] = second[j]
      }
    } else {
      while (second[j]){
        first[i++] = second[j++]
      }
    }
    first.length = i
    console.log('first:',first);
    
    return first
  }
  jQuery.parseHtml = function(data,context){
    if (!data || typeof data !== "string") {
        return null;
    }
    var rejectExp = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;


    //过滤掉<a>   <a>   => a 
    var parse = rejectExp.exec(data);
    console.log(parse)
    return [context.createElement(parse[1])];

    // todo 解析字符串，并创建dom : eg: '<a>' => 拿到a对象
    // const eleName = data.slice(data.indexOf('<')+1,data.indexOf('>'))
    // return [context.createElement(eleName)]
  }


  root.jQuery = root.$ = jQuery


})(this)
