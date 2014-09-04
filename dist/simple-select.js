(function () {

  "use strict";

  window.SimpleSelect = function (el) {
    this._init(el);
    this._initEventHandlers();
  };

  window.SimpleSelect.prototype = {

    _button: {},
    _simpleSelect: {},
    _optContainer: {},
    _itemSelected: {},

    _init: function (el) {
      /**
       * Elements configuration
       */
       var docFrag = document.createDocumentFragment();

      var oldSelect = document.querySelector(el);
      var oldSelectOptions = oldSelect.querySelectorAll('option');

      this._simpleSelect = document.createElement('div');
      this._simpleSelect.className = 'SimpleSelect' + ' ' + oldSelect.className;

      this._optContainer = document.createElement('div');
      this._optContainer.className = 'SimpleSelect-optContainer';

      var options = document.createElement('ul');
      options.className = 'SimpleSelect-options';

      // Copy <option>'s from oldSelect to new dropdown element
      for (var i = 0; i < oldSelectOptions.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = oldSelectOptions[i].innerHTML;
        li.value = oldSelectOptions[i].innerHTML;
        options.appendChild(li);
      }

      this._button = document.createElement('button');
      this._button.className = 'SimpleSelect-button';
      this._button.type = 'button';

      this._itemSelected = document.createElement('span');
      this._itemSelected.className = 'SimpleSelect-itemSelected';
      this._itemSelected.innerHTML = options.getElementsByTagName('li')[0].innerHTML;

      var caret = document.createElement('span');
      caret.className = 'SimpleSelect-caret';


      /**
       * Join all elements (Megazord?!)
       * (Don't change order of appendChild's!)
       */
      this._button.appendChild(this._itemSelected);
      this._button.appendChild(caret);
      this._simpleSelect.appendChild(this._button);
      this._optContainer.appendChild(options);
      this._simpleSelect.appendChild(this._optContainer);

      // Replace oldSelect with simpleSelect
      oldSelect.parentNode.replaceChild(this._simpleSelect, oldSelect);
    },

    /**
     * Add Event Listners
     */
    _initEventHandlers: function () {

      var self = this;
      var showSelectOptionsHandler = function () {
        if ( self._hasClass(self._simpleSelect, 'is-open') )
        {
          self._removeClass(self._simpleSelect, 'is-open');
          self._optContainer.style.display = '';
        }
        else
        {
          self._addClass(self._simpleSelect, 'is-open');
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
          showSelectOptionsHandler();
        }
      };

      self._button.addEventListener('click', function () {
        showSelectOptionsHandler();
      });

      self._optContainer.querySelector('.SimpleSelect-options').addEventListener('click', function (event) {
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
