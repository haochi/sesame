# Sesame

A small helper that helps you organize your JavaScript code by detecting some sort of ID (e.g. the value of a variable or id of an element).

# Example
  ```
  <body id="stuff"></body>
  <script src="sesame.js"></script>
  <script>
  sesame.add("stuff", function(){
    document.title = "lol";
  });
  sesame.add(["stuff"], function(){
    location.hash = (new Date).getTime();
  });

  // chaing
  sesame.after(function(){
    alert(0);
  }).run(document.body.id);
  </script>
  ```

# Methods

* `add(detections, function)`: `detections` can be a string or an array of strings, which will be detected by the `run` method
* `before(function)`: this gets executed every time before all other functions that sesame handles get executed
* `after(function)`: similar to `before`, but after everything else is executed
* `run(detection)`: `detection` is expected to be a string of whatever you want to detect. this will trigger all the matching functions sesame handles to execute.
