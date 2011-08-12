(function(){
  function sesame(){
    this.detections = {};
    this._after = [];
    this._before = [];
  }
  function looper(a){
    for(var i=0, l = a.length; i< l; i++){
      a[i]();
    }
  }

  sesame.prototype = {
    after: function(fn){
      this._after.push(fn);
      return this;
    },
    before: function(fn){
      this._before.push(fn);
      return this;
    },
    add: function(detections, fn){
      if(detections instanceof Array){
        for(var i=0, l=detections.length; i<l; i++){
          this._add(detections[i], fn);
        }
      }else{
        this._add(detections, fn);
      }
      return this;
    },
    "new": function(){
      return new sesame();
    },
    run: function(detection){
      looper(this._before);
      if(detection != null && detection in this.detections){
        looper(this.detections[detection]);
      }
      looper(this._after);
      return this;
    },
    _add: function(detection, fn){
      if(!(detection in this.detections)){
        this.detections[detection] = [];
      }
      this.detections[detection].push(fn);
    }
  };

  window.sesame = new sesame();
})();
