< !DOCTYPE html >
    <
    html >

    <
    head >
    <
    meta charset = "utf-8" >
    <
    title > < /title> <
    /head>

<
body >
    <
    script src = "Underscore.js" > < /script> <
    script >
    // callbacks 队列实现： add, fire, ---once,unique,memory,stoponfalse






    var cb = _.callbacks("once memory"); <
/script> <
/body>

<
/html>             start = list.length;
args.forEach(function(fn) {
    if (toString.call(fn) === "[object Function]") {
        list.push(fn);
    }
});
if (memory) {
    starts = start;
    fire(memory);
}
},
fireWith: function(context, arguments) {
        var args = [context, arguments];
        if (!options.once || !testting) {
            fire(args);
        }
    },
    fire: function() {
        self.fireWith(this, arguments);
    }
}
return self;
},
}

function createOptions(options) {
    var object = optionsCache[options] = {};
    options.split(/\s+/).forEach(function(value) {
        object[value] = true;
    });
    return object;
}
root._ = _;
})(this);