// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};
 
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
     
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
       
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
       
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
   
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();

/*
var thevisual = document.getElementById("thevisual");
var blockHeaderTemplate = document.getElementById("block-header-template").innerHTML;
var workExperienceTemplate = document.getElementById("work-experience-template").innerHTML;
var educationTemplate = document.getElementById("education-template").innerHTML;
var socialTemplate = document.getElementById("social-template").innerHTML;

// Work Experience
thevisual.innerHTML += tmpl(blockHeaderTemplate, {"header": "Work Experience"});
for (var i = 0; i < sankethkatta.workExperience.length; i++) {
  if (sankethkatta.workExperience[i].endDate === undefined) {
    sankethkatta.workExperience[i].endDate = "Present";
  }
  thevisual.innerHTML += tmpl(workExperienceTemplate, sankethkatta.workExperience[i]);
}

// Education
thevisual.innerHTML += tmpl(blockHeaderTemplate, {"header": "Education"});
for (var i = 0; i < sankethkatta.education.length; i++) {
  if ("degree" in sankethkatta.education[i]) {
    thevisual.innerHTML += tmpl(educationTemplate, sankethkatta.education[i]);
  } else {
    sankethkatta.education[i].degree = sankethkatta.education[i].summerProgram;
    thevisual.innerHTML += tmpl(educationTemplate, sankethkatta.education[i]);
  }
}

// Social
thevisual.innerHTML += tmpl(blockHeaderTemplate, {"header": "Social"});
for (var i = 0; i < sankethkatta.socialNetworks.length; i++) {
  thevisual.innerHTML += tmpl(socialTemplate, sankethkatta.socialNetworks[i]);
}
*/
$(document).on("click", ".flip-button", function() {
    var blockWrapper = $(this).parents(".block-wrapper");
    if (blockWrapper.hasClass("flip")) {
        $(this).parents(".block-wrapper").removeClass("flip");
    } else {
        $(this).parents(".block-wrapper").addClass("flip");
    }
})
