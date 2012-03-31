(function(){
  function s(){
    this.d = {};
    this.a = [];
    this.b = [];
    this.e = {};
  }
  function run(a){
    for(var i=0, l=a.length; i<l;){
      a[i++]();
    }
  }
  function push(dict, d, fn){
    if(!(d in dict)){
      dict[d] = [];
    }
    dict[d].push(fn);
  }
  function add(dict, d, fn){
    if(d instanceof Array){
      for(var i=0, l=d.length; i<l;){
        push(dict, d[i++], fn);
      }
    }else{
      push(dict, d, fn);
    }
  }

  s.prototype = {
    after: function(fn){
      this.a.push(fn);
      return this;
    },
    before: function(fn){
      this.b.push(fn);
      return this;
    },
    add: function(d, fn){
      add(this.d, d, fn);
      return this;
    },
    except: function(d, fn){
      add(this.e, d, fn);
      return this;
    },
    create: function(){
      return new s;
    },
    run: function(rule){
      var d = this.d
        , e = this.e;
      run(this.b);
      if(d != null){
        if(rule in d){
          run(d[rule]);
        }
        for(var i in e){
          if(i != rule){
            run(e[i]);
          }
        }
      }
      run(this.a);
      return this;
    }
  };

  window.sesame = new s;
})();
