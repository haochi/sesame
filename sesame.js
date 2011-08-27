(function(){
  function s(){
    this.d = {};
    this.a = [];
    this.b = [];
  }
  function l(a){
    for(var i=0, l=a.length; i<l;){
      a[i++]();
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
      if(d instanceof Array){
        for(var i=0, l=d.length; i<l;){
          this.c(d[i++], fn);
        }
      }else{
        this.c(d, fn);
      }
      return this;
    },
    create: function(){
      return new s;
    },
    run: function(d){
      var e = this.d;
      l(this.b);
      if(d != null && d in e){
        l(e[d]);
      }
      l(this.a);
      return this;
    },
    c: function(d, fn){
      if(!(d in this.d)){
        this.d[d] = [];
      }
      this.d[d].push(fn);
    }
  };

  window.sesame = new s;
})();
