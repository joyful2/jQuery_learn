(function (root){
  var optCache = {} // todo optCache 待修改
  var _ = {
    callbacks: function(option){
    option = typeof option === 'string' ? (optCache[option] || creatOpt(option)) : {}
     
    // memory : add时，立即调用，且用上次调用的入参 todo 貌似有问题
    // once ： 只执行一次fire  todo 有问题
    // unique : 相同函数不会重复执行  ok
    // stopOnFalse  ok

    var list = [],index,fired=false,start,starts,memory; // todo : 1 start 逻辑有问题

    var cb = {
      add:function(){
        var args = [].slice.call(arguments)
        if(option.unique){
          //  去重
          args = Array.from(new Set(args))
        }
        args.forEach((arg)=>{
          if(toString.call(arg) === '[object Function]'){
            list.push(arg)
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