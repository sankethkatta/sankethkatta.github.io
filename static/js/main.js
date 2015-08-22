(function() {
  'use strict';

  // Cache elements
  var $container = document.getElementById('container');
  var $jsonButton = document.getElementById('json-button');
  var $visualButton = document.getElementById('visual-button');
  var $blockWrapper = document.getElementsByClassName('block-wrapper');

  /**
   * Render a section of data and append to the container.
   *
   * @param {Object[]} data array of data items to render
   * @param {String} templateId the id of the template
   * @param {Function} [process] optionally manipulates data before templating
   */
  function render(data, templateId, process) {
    process = process || _.noop;
    var template = _.template(document.getElementById(templateId).innerHTML);
    _.each(data, function(item) {
      process(item);
      item.json = syntaxHighlight(item);
      var el = document.createElement('div');
      el.innerHTML = template(item).trim();
      $container.appendChild(el.firstChild);
    });
  }

  /**
   * Toggle the cards display mode.
   *
   * @param {String} mode must be either `visual` or `json`
   */
  function flipToggle(mode) {
    var i = 0;
    var intervalId = setInterval(function() {
      if (i === $blockWrapper.length) {
        clearInterval(intervalId);
        if (mode === 'visual') {
          $jsonButton.classList.remove('disabled');
        } else {
          $visualButton.classList.remove('disabled');
        }
      } else {
        if (mode === 'visual') {
          $blockWrapper[i].classList.remove('flip');
        } else {
          $blockWrapper[i].classList.add('flip');
        }
        i++;
      }
    }, 250);
  }

  // Retrieve data and render blocks
  var request = new XMLHttpRequest();
  request.open('GET', '/static/data/sankethkatta.json', true);
  request.onload = function() {
    var data = JSON.parse(request.responseText);
    render(data.workExperience, 'work-experience-template', function(item) {
      if (!item.endDate) {
        item.endDate = 'Present';
      }
    });
    render(data.education, 'education-template', function(item) {
      if (!item.degree) {
        item.degree = item.summerProgram + ' (Summer Program)';
      }
    });
    render(data.education, 'social-template');
  };
  request.send();

  // Click listeners
  $jsonButton.addEventListener('click', function() {
    if (
        !(this.classList.contains('active')) &&
        !(this.classList.contains('disabled'))
      ) {
      $visualButton.classList.remove('active');
      $visualButton.classList.add('disabled');
      this.classList.add('active');
      flipToggle('json');
    }
  });

  $visualButton.addEventListener('click', function() {
    if (
        !(this.classList.contains('active')) &&
        !(this.classList.contains('disabled'))
      ) {
      $jsonButton.classList.remove('active');
      $jsonButton.classList.add('disabled');
      this.classList.add('active');
      flipToggle('visual');
    }
  });

  // From StackOverflow:
  // http://stackoverflow.com/questions/4810841/json-pretty-print-using-javascript
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

})();
