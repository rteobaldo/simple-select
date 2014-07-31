(function () {

  "use strict";

  window.SimpleDropdownList = function (el) {
    this._init(el);
    this._initEventHandlers();
  };

  window.SimpleDropdownList.prototype = {

    _button: {},
    _simpleDropdown: {},


    /**
     * Elements configuration
     */
    _init: function (el) {
      var oldDropdown = document.querySelector(el);
      var dropdownOptions = oldDropdown.querySelectorAll('option');

      var simpleDropdown = document.createElement('div');
      simpleDropdown.className = 'SimpleDropdownList' + ' ' + oldDropdown.className;

      var optContainer = document.createElement('div');
      optContainer.className = 'SimpleDropdownList-optContainer';

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

      var itemSelected = document.createElement('span');
      itemSelected.className = 'SimpleDropdownList-itemSelected';
      itemSelected.innerHTML = options.getElementsByTagName('li')[0].innerHTML;

      var caret = document.createElement('span');
      caret.className = 'SimpleDropdownList-caret';


      /**
       * Join all elements (Megazord?!)
       * (Don't change order of appendChild's!)
       */
      button.appendChild(itemSelected);
      button.appendChild(caret);
      this._button = simpleDropdown.appendChild(button);
      optContainer.appendChild(options);
      this._optContainer = simpleDropdown.appendChild(optContainer);

      // Replace de oldDropdown with simpleDropdown
      oldDropdown.parentNode.replaceChild(simpleDropdown, oldDropdown);
    },

    /**
     * Add Event Listners
     */
    _initEventHandlers: function () {
      var addEventListener =  window.attachEvent || window.addEventListener;
      var click = window.attachEvent ? 'onclick' : 'click';

      addEventListener(click, function () {
        if ( this._hasClass(this._simpleDropdown, 'is-open') ) {

        }
      });

    },

    /**
     * Class manipulation functions stolen from Arjan Haverkamp (av01d).
     * http://www.avoid.org/?p=78
     */
    _hasClass: function (el, name) {
      return new RegExp('(\\s|^)' + name + '(\\s|$)').test(el.className);
    },

    _addClass: function (el, name) {
      if (!this._hasClass(el, name)) {
        el.className += (el.className ? ' ' : '') + name;
      }
    },

    _removeClass: function (el, name) {
      if (this._hasClass(el, name)) {
        el.className = el.className.replace(new RegExp('(\\s|^)' + name + '(\\s|$)'), ' ').replace(/^\s+|\s+$/g, '');
      }
    }


  };


})();
