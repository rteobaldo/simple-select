(function () {

  "use strict";

  /**
   * Elements configuration
   */

  var oldDropdown = document.querySelector('.dropdown');
  var dropdownOptions = oldDropdown.querySelectorAll('option');

  var newDropdown = document.createElement('div');
  newDropdown.className = 'SimpleDropdownList' + ' ' + oldDropdown.className;

  var options = document.createElement('ul');
  options.className = 'SimpleDropdownList-options';

  // Copy <option>'s from oldDropdown to new dropdown element
  for (var i = 0; i < dropdownOptions.length; i++) {
    var li = document.createElement('li');
    li.innerHTML = dropdownOptions[i].innerHTML;
    options.appendChild(li);
  }

  var button = document.createElement('button');
  button.className = 'SimpleDropdownList-button';
  button.type = 'button';

  var span = document.createElement('span');
  span.className = 'SimpleDropdownList-itemSelected';
  span.innerHTML = options.getElementsByTagName('li')[0].innerHTML;

  var caret = document.createElement('span');
  caret.className = 'SimpleDropdownList-caret';


  /**
   * Join all elements (Megazord?!)
   * (Don't change order of appendChild's!)
   */
  button.appendChild(span);
  button.appendChild(caret);
  newDropdown.appendChild(button);
  newDropdown.appendChild(options);

  // Replace de oldDropdown with newDropdown
  oldDropdown.parentNode.replaceChild(newDropdown, oldDropdown);

})();
