(function () {

  "use strict";

  window.SimpleDropdownList = function (el) {
    this._init(el);
    this._initEventHandlers();
  };

  window.SimpleDropdownList.prototype = {

    _button: {},
    _simpleDropdown: {},
    _optContainer: {},
    _itemSelected: {},

    _init: function (el) {
      /**
       * Elements configuration
       */
       var docFrag = document.createDocumentFragment();

      var oldDropdown = document.querySelector(el);
      var oldDropdownOptions = oldDropdown.querySelectorAll('option');

      this._simpleDropdown = document.createElement('div');
      this._simpleDropdown.className = 'SimpleDropdownList' + ' ' + oldDropdown.className;

      this._optContainer = document.createElement('div');
      this._optContainer.className = 'SimpleDropdownList-optContainer';

      var options = document.createElement('ul');
      options.className = 'SimpleDropdownList-options';

      // Copy <option>'s from oldDropdown to new dropdown element
      for (var i = 0; i < oldDropdownOptions.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = oldDropdownOptions[i].innerHTML;
        li.value = oldDropdownOptions[i].innerHTML;
        options.appendChild(li);
      }

      this._button = document.createElement('button');
      this._button.className = 'SimpleDropdownList-button';
      this._button.type = 'button';

      this._itemSelected = document.createElement('span');
      this._itemSelected.className = 'SimpleDropdownList-itemSelected';
      this._itemSelected.innerHTML = options.getElementsByTagName('li')[0].innerHTML;

      var caret = document.createElement('span');
      caret.className = 'SimpleDropdownList-caret';


      /**
       * Join all elements (Megazord?!)
       * (Don't change order of appendChild's!)
       */
      this._button.appendChild(this._itemSelected);
      this._button.appendChild(caret);
      this._simpleDropdown.appendChild(this._button);
      this._optContainer.appendChild(options);
      this._simpleDropdown.appendChild(this._optContainer);

      // Replace oldDropdown with simpleDropdown
      oldDropdown.parentNode.replaceChild(this._simpleDropdown, oldDropdown);
    },

    /**
     * Add Event Listners
     */
    _initEventHandlers: function () {

      var self = this;
      var showDropdownOptionsHandler = function () {
        if ( self._hasClass(self._simpleDropdown, 'is-open') )
        {
          self._removeClass(self._simpleDropdown, 'is-open');
          self._optContainer.style.display = '';
        }
        else
        {
          self._addClass(self._simpleDropdown, 'is-open');
          self._optContainer.style.display = 'block';
        }
      };

      var itemSelectHandler = function (event) {
        if (event.target.tagName === 'LI')
        {
          var itemSelectedExists = self._optContainer.querySelector('.is-selected');
          itemSelectedExists && self._removeClass(itemSelectedExists, 'is-selected');

          var target = event.target;
          target.className = 'is-selected';
          self._itemSelected.innerHTML = target.innerHTML;
          showDropdownOptionsHandler();
        }
      };

      self._button.addEventListener('click', function () {
        showDropdownOptionsHandler();
      });

      self._optContainer.querySelector('.SimpleDropdownList-options').addEventListener('click', function (event) {
        itemSelectHandler(event);
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
