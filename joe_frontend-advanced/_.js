(function (root){
  var optCache = {} // toLearn optCache 
  var _ = {
    callbacks: function(option){
    option = typeof option === 'string' ? (optCache[option] || creatOpt(option)) : {}
     
    // memory : add时，立即调用，且用上次调用的入参 toLearn
    // once ： 只执行一次fire  toLearn
    // unique : 相同函数不会重复执行  ok
    // stopOnFalse  ok

    var list = [],index,fired=false,start,starts,memory; // toLearn : 1 starts 和 start 的使用

    var cb = {
      add:function(){
        var args = [].slice.call(arguments)
        args.forEach((arg)=>{
          if(toString.call(arg) === '[object Function]'){
            if(!option.unique || !args.includes(arg)){

            if(!option.unique || !args.includes(arg)){
              list.push(arg)
            }
          }
        }
        })
        start = list.length

        if(memory){
          starts = start
          cb.fire(memory)
        }

      },

      fireWith:function(ctx,args){
        index= starts || 0
        start = 0; 

        for(;index<list.length;index++){
          const retVal = list[index].apply(ctx,args)
          
          if( retVal === false && option['stopOnFalse']){
            break
          }
        }
        fired = true

      },
      fire:function(data){
        memory = option.memory && data
        if(!fired || !option['once'] ){
          cb.fireWith(this,arguments)
        }

      },
    }

    return cb
  }}



  function creatOpt(option){
    var obj = optCache[option] = {}
    var optLs = option.split(/\s+/)
    optLs.forEach((opt)=>{
      obj[opt] = true
    })
    return obj
  }


  root._ = _
})(this)