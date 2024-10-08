/* globals define */
define(['knockout', 'jquery', 'css!./styles/design.css'], function (ko, $, css) {
  'use strict';
  // ----------------------------------------------
  // Define a Knockout Template for your component
  // ----------------------------------------------
  var sampleComponentTemplate =
    '<!-- ko if: initialized -->' +
    '<div class="container-breakout about-therapy pt-5 pb-3 pb-lg-5" id="step-1">' +
    '  <div class="container my-4">' +
    '    <div class="row">' +
    '      <div class="col-12">' +
    '        <scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId1\', \'data\': titleData1 } }"></scs-title>' +
    '        <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId1\', \'data\': paragraphData1 } }"></scs-paragraph>' +
    '      </div>' +
    '    </div>' +
    '    <div class="row">' +
    '      <div class="col-lg mt-5 d-flex">' +
    '        <div class="card p-4 p-lg-5">' +
    '          <div class="mw-xs">' +
    '            <scs-image params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'imageId2\', \'data\': imageData2 } }"></scs-image>' +
    '          </div>' +
    '          <scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId2\', \'data\': titleData2 } }"></scs-title>' +
    '          <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId2\', \'data\': paragraphData2 } }"></scs-paragraph>' +
    '        </div>' +
    '      </div>' +
    '      <div class="col-lg mt-5 d-flex">' +
    '        <div class="card p-4 p-lg-5">' +
    '          <div class="mw-xs">' +
    '            <scs-image params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'imageId3\', \'data\': imageData3 } }"></scs-image>' +
    '          </div>' +
    '          <scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId3\', \'data\': titleData3 } }"></scs-title>' +
    '          <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId3\', \'data\': paragraphData3 } }"></scs-paragraph>' +
    '        </div>' +
    '      </div>' +
    '    </div>' +
    '    <div class="row">' +
    '      <div class="col-12 mt-5 pt-3 mb-lg-5 text-center">' +
    '        <scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId4\', \'data\': titleData4 } }"></scs-title>' +
    '        <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId4\', \'data\': paragraphData4 } }"></scs-paragraph>' +
    '        <!-- ko if: linkText1 -->' +
    '          <a target="_blank" data-bind="attr: { href: linkURL1}" class="btn btn-lead btn-primary mt-4"><span data-bind="text: linkText1"></span></a>'  +
    '        <!-- /ko -->' +
    '      </div>' +
    '      <div class="col-lg-7 mt-5">' +
    '        <scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId5\', \'data\': titleData5 } }"></scs-title>' +
    '        <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId5\', \'data\': paragraphData5 } }"></scs-paragraph>' +
    '        <!-- ko if: linkText2 -->' +
    '          <a target="_blank" data-bind="attr: { href: linkURL2}" class="btn btn-lead btn-primary mt-4"><span data-bind="text: linkText2"></span></a>'  +
    '        <!-- /ko -->' +
    '      </div>' +
    '      <div class="col mt-5">' +
    '        <div class="mw-sm mx-auto d-none d-lg-block">' +
    '          <scs-image params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'imageId1\', \'data\': imageData1 } }"></scs-image>' +
    '        </div>' +
    '      </div>' +
    '    </div>' +
    '  </div>' +
    '</div>' +
    '<!-- /ko -->';

  // ----------------------------------------------
  // Define a Knockout ViewModel for your template
  // ----------------------------------------------
  var SampleComponentViewModel = function (args) {
    var self = this,
      SitesSDK = args.SitesSDK;

    // store the args
    self.mode = args.viewMode;
    self.id = args.id;

    // create the observables
    self.imageWidth = ko.observable('200px');
    self.linkURL1 = ko.observable();
    self.linkText1 = ko.observable();
    self.linkURL2 = ko.observable();
    self.linkText2 = ko.observable();
    self.alignImage = ko.observable();
    self.layout = ko.observable();
    self.showTopLayout = ko.observable();
    self.showStoryLayout = ko.observable();


    // handle initialization 
    self.componentLayoutInitialized = ko.observable(false);
    self.customSettingsDataInitialized = ko.observable(false);
    self.initialized = ko.computed(function () {
      return self.componentLayoutInitialized() && self.customSettingsDataInitialized();
    }, self);

    // Style on left- or right-aligned image
    self.imageStyle = ko.pureComputed(function () {
      var style;
      if (self.showTopLayout()) {
        style = '';
      } else {
        style = 'flex-shrink:0;width:' + self.imageWidth() + ';';
      }
      return style;
    });

    // Style around paragraph component
    self.paragraphStyle = ko.pureComputed(function () {
      var style;
      if (self.showTopLayout()) {
        style = '';
      } else {
        style = 'flex-grow:1;';
      }
      return style;
    });

    //
    // Raise the given trigger.
    //
    self.raiseTrigger = function (triggerName) {
      SitesSDK.publish(SitesSDK.MESSAGE_TYPES.TRIGGER_ACTIONS, {
        'triggerName': triggerName,
        'triggerPayload': {
          'payloadData': 'some data here'
        }
      });
    };

    // click binding
    self.imageClicked = function (data, event) {
      self.raiseTrigger("imageClicked"); // matches appinfo.json
    };


    // execute action handler
    self.executeActionsListener = function (args) {
      // get action and payload
      var payload = args.payload,
        action = args.action;

      // handle 'setImageWidth' actions
      if (action && action.actionName === 'setImageWidth') {
        $.each(payload, function(index, data) {
          if (data.name === 'imageWidth') {
            self.imageWidth(data.value);
          }
        });
      }
    };

    //
    // Seed nested component data
    //
    self.imageData1 = {
    };
    self.imageData2 = {
    };
    self.imageData3 = {
    };
    self.titleData1 = {
    };
    self.titleData2 = {
    };
    self.titleData3 = {
    };
    self.titleData4 = {
    };
    self.titleData5 = {
    };
    self.paragraphData1 = {
    };
    self.paragraphData2 = {
    };
    self.paragraphData3 = {
    };
    self.paragraphData4 = {
    };
    self.paragraphData5 = {
    };

    // 
    // Handle property changes
    //
    self.updateComponentLayout = $.proxy(function (componentLayout) {
      var layout = componentLayout ? componentLayout : 'default';
      self.layout(layout);
      self.alignImage(layout === 'right' ? 'right' : 'left');
      self.showTopLayout(layout === 'top');
      self.showStoryLayout(layout === 'default' || layout === 'right');

      self.componentLayoutInitialized(true);
    }, self);
    self.updateCustomSettingsData = $.proxy(function (customData) {
      if (customData) {
        self.imageWidth(customData.width);
        self.linkURL1(customData.linkURL1);
        self.linkText1(customData.nls1 && customData.nls1.linkText);
        self.linkURL2(customData.linkURL2);
        self.linkText2(customData.nls2 && customData.nls2.linkText);
      }
      self.customSettingsDataInitialized(true);
    }, self);
    self.updateSettings = function (settings) {
      if (settings.property === 'componentLayout') {
        self.updateComponentLayout(settings.value);
      } else if (settings.property === 'customSettingsData') {
        self.updateCustomSettingsData(settings.value);
      }
    };

    // listen for the EXECUTE ACTION request to handle custom actions
    SitesSDK.subscribe(SitesSDK.MESSAGE_TYPES.EXECUTE_ACTION, $.proxy(self.executeActionsListener, self));
    // listen for settings update
    SitesSDK.subscribe(SitesSDK.MESSAGE_TYPES.SETTINGS_UPDATED, $.proxy(self.updateSettings, self));


    // Handle Copy Style (save customSettingsData to the clipboard)
    self.copyComponentCustomData = function() {
      return {
        width: this.imageWidth()
      };
    };

    // Handle Paste Style (apply customSettingsData from the clipboard)
    self.pasteComponentCustomData = function(data) {
      this.imageWidth(data.width);

      // save data in page
      SitesSDK.setProperty('customSettingsData', {
        width: this.imageWidth()
      });
    };

    // listen for COPY_CUSTOM_DATA request
    SitesSDK.subscribe(SitesSDK.MESSAGE_TYPES.COPY_CUSTOM_DATA, $.proxy(self.copyComponentCustomData, self));

    // listen for PASTE_CUSTOM_DATA request
    SitesSDK.subscribe(SitesSDK.MESSAGE_TYPES.PASTE_CUSTOM_DATA, $.proxy(self.pasteComponentCustomData, self));

    //
    // Initialize the componentLayout & customSettingsData values
    //
    SitesSDK.getProperty('componentLayout', self.updateComponentLayout);
    SitesSDK.getProperty('customSettingsData', self.updateCustomSettingsData);
  };


  // ----------------------------------------------
  // Create a knockout based component implemention
  // ----------------------------------------------
  var SampleComponentImpl = function (args) {
    // Initialze the custom component
    this.init(args);
  };
  // initialize all the values within the component from the given argument values
  SampleComponentImpl.prototype.init = function (args) {
    this.createViewModel(args);
    this.createTemplate(args);
    this.setupCallbacks();
  };
  // create the viewModel from the initial values
  SampleComponentImpl.prototype.createViewModel = function (args) {
    // create the viewModel
    this.viewModel = new SampleComponentViewModel(args);
  };
  // create the template based on the initial values
  SampleComponentImpl.prototype.createTemplate = function (args) {
    // create a unique ID for the div to add, this will be passed to the callback
    this.contentId = args.id + '_content_' + args.viewMode;
    // create a hidden custom component template that can be added to the DOM
    this.template = '<div id="' + this.contentId + '">' +
      sampleComponentTemplate +
      '</div>';
  };
  //
  // SDK Callbacks
  // setup the callbacks expected by the SDK API
  //
  SampleComponentImpl.prototype.setupCallbacks = function () {
    //
    // callback - render: add the component into the page
    //
    this.render = $.proxy(function (container) {
      var $container = $(container);
      // add the custom component template to the DOM
      $container.append(this.template);
      // apply the bindings
      ko.applyBindings(this.viewModel, $('#' + this.contentId)[0]);
    }, this);
    //
    // callback - update: handle property change event
    //
    this.update = $.proxy(function (args) {
      var self = this;
      // deal with each property changed
      $.each(args.properties, function (index, property) {
        if (property) {
          if (property.name === 'customSettingsData') {
            self.viewModel.updateComponentData(property.value);
          } else if (property.name === 'componentLayout') {
            self.viewModel.updateLayout(property.value);
          }
        }
      });
    }, this);
    //
    // callback - dispose: cleanup after component when it is removed from the page
    //
    this.dispose = $.proxy(function () {
      // nothing required for this sample since knockout disposal will automatically clean up the node
    }, this);
  };
  // ----------------------------------------------
  // Create the factory object for your component
  // ----------------------------------------------
  var sampleComponentFactory = {
    createComponent: function (args, callback) {
      // return a new instance of the component
      return callback(new SampleComponentImpl(args));
    }
  };
  return sampleComponentFactory;
});
