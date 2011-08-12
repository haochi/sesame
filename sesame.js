(function(){
  function sesame(){
    this.detections = {};
  }

  sesame.prototype = {
    before: function(fn){
      this.before = fn;
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
    after: function(fn){
      this.after = fn;
      return this;
    },
    "new": function(){
      return new sesame();
    },
    run: function(detection){
      var noop = function(){};
      (this.before || noop)();
      if(detection != null && detection in this.detections){
        var detections = this.detections[detection];
        for(var i=0, l=detections.length; i<l; i++){
          detections[i]();
        }
      }
      (this.after || noop)();
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
