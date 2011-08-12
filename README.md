# Sesame

A small helper that helps you organize your JavaScript code by detecting some sort of identification, be it the value of a variable or id of an element.

# Application

I wrote this so I can have some sane structure for my JavaScript code in a Rails project. I have another JavaScript library call [congee](https://github.com/haochi/congee) does a similar job but uses URL matching instead. Unfortunately it doesn't work well with Rails because the URL usually changes after a form request. While I wrote this to work with Rails in heart, but it should be pretty general that it will be applicable for other purposes. Here I will show you an example of how I would use it with my Rails projects.

## app/views/layouts/application.haml

  ``` haml
  %body{ :data => { :controller => params[:controller], :action => params[:action] } }
    %section
      Sesame oil goes great with just about any food!
  ```

## public/javascript/application.js

  ``` javascript
  sesame.before(function(){
    $(":text").each(function(){
      $(this).watermark($(this).attr("title"));
    });
  });

  sesame.add("home#index", function(){
    $(".bigassbutton").click(function(){
      alert("You just clicked on a big ass button."); // courtesy of wordpress.com
    });
  });

  sesame.add(["blog#index", "resume#index"], function(){
    $("#fork_me").mouseover(function(){
      $(this).slideDown();
    });
  });
  
  sesame.after(function(){
    $("#obnoxious_music").play();
  });

  sesame.run([$("body").data("controller"), $("body").data("action")].join("#"));

  // use this if you want to have common code for the whole controller
  var controller_detector = sesame.new();
  controller.add("home", function(){
    // stuff
  });
  controller_detector.run($("body").data("controller"));
  ```

# Methods

* `add(detections, function)`: `detections` can be a string or an array of strings, which will be detected by the `run` method
* `before(function)`: this gets executed every time before all other functions that sesame handles get executed
* `after(function)`: similar to `before`, but after everything else is executed
* `run(detection)`: `detection` is expected to be a string of whatever you want to detect. this will trigger all the matching functions sesame handles to execute.
* `new`: creates a new instance of the `sesame` object.

# Tips

* All methods except `run` is chainable. `sesame.add("test", function(){ /*no op*/ }).run("");`