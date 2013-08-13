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

// From StackOverflow: http://stackoverflow.com/questions/4810841/json-pretty-print-using-javascript
function syntaxHighlight(json) {
    if (typeof json != 'string') {
         json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

var container = $("#container");
var workExperienceTemplate = $("#work-experience-template").html();
var educationTemplate = $("#education-template").html();
var socialTemplate = $("#social-template").html();

// Work Experience
$.each(sankethkatta.workExperience, function(i) {
  var item = sankethkatta.workExperience[i];
  if (item.endDate === undefined) {
    item.endDate = "Present";
  }
  item.theJSON = syntaxHighlight(item);
  container.append( tmpl(workExperienceTemplate, item) );
})

// Education
$.each(sankethkatta.education, function(i) {
    var item = sankethkatta.education[i];
    if (!("degree" in item)) {
      item.degree = item.summerProgram;
    } 
    item.theJSON = syntaxHighlight(item);
    container.append( tmpl(educationTemplate, item) );
})

// Social
$.each(sankethkatta.socialNetworks, function(i) {
    var item = sankethkatta.socialNetworks[i];
    console.log(item);
    item.theJSON = syntaxHighlight(item);
    container.append( tmpl(socialTemplate, item) );
})

$(document).on("click", ".flip-button", function() {
    var blockWrapper = $(this).parents(".block-wrapper");
    if (blockWrapper.hasClass("flip")) {
        $(this).parents(".block-wrapper").removeClass("flip");
    } else {
        $(this).parents(".block-wrapper").addClass("flip");
    }
})
