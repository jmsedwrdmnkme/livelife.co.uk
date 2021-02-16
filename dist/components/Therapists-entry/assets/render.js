/* globals define */
define(['knockout', 'jquery', 'css!./styles/design.css'], function (ko, $, css) {
  'use strict';
  // ----------------------------------------------
  // Define a Knockout Template for your component
  // ----------------------------------------------
  var sampleComponentTemplate =
    '<!-- ko if: initialized -->' +
    '<div class="container-breakout therapist-entry mt-5 pt-5">' +
    '  <div class="container mt-5">' +
    '    <scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId1\', \'data\': titleData1 } }"></scs-title>' +
    '    <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId1\', \'data\': paragraphData1 } }"></scs-paragraph>' +
    '    <div class="row mt-5">' +
    '      <div class="main col-lg-7 order-lg-1">' +
    '        <div class="d-lg-none mw-sm mx-auto pb-4">' +
    '          <scs-image params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'imageId\', \'data\': imageData } }"></scs-image>' +
    '        </div>' +
    '        <scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId2\', \'data\': titleData2 } }"></scs-title>' +
    '        <div class="mt-n2 mb-4">' +
    '          <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId2\', \'data\': paragraphData2 } }"></scs-paragraph>' +
    '        </div>' +
    '        <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId4\', \'data\': paragraphData4 } }"></scs-paragraph>' +
    '        <a href="#" class="mt-4 btn btn-lead btn-primary">Book a free initial consultation</a>'  +
    '      </div>' +
    '      <div class="aside col order-lg-0 mt-5 mt-lg-0">' +
    '        <div class="d-none d-lg-block mw-sm mx-5">' +
    '          <scs-image params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'imageId\', \'data\': imageData } }"></scs-image>' +
    '        </div>' +
    '        <div class="highlight-box mt-lg-5">' +
    '          <span class="subtitle"><scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId3\', \'data\': titleData3 } }"></scs-title></span>' +
    '          <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId3\', \'data\': paragraphData3 } }"></scs-paragraph>' +
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

    // handle initialization 
    self.customSettingsDataInitialized = ko.observable(false);
    self.initialized = ko.computed(function () {
      return  self.customSettingsDataInitialized();
    }, self);

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
    };

    //
    // Seed nested component data
    //
    self.imageData = {
    };
    self.titleData1 = {
    };
    self.titleData2 = {
    };
    self.titleData3 = {
    };
    self.paragraphData1 = {
    };
    self.paragraphData2 = {
    };
    self.paragraphData3 = {
    };
    self.paragraphData4 = {
    };

    // 
    // Handle property changes
    //
    self.updateCustomSettingsData = $.proxy(function (customData) {
      if (customData) {
      }
      self.customSettingsDataInitialized(true);
    }, self);
    self.updateSettings = function (settings) {
      if (settings.property === 'customSettingsData') {
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
      };
    };

    // Handle Paste Style (apply customSettingsData from the clipboard)
    self.pasteComponentCustomData = function(data) {
      // save data in page
    };

    // listen for COPY_CUSTOM_DATA request
    SitesSDK.subscribe(SitesSDK.MESSAGE_TYPES.COPY_CUSTOM_DATA, $.proxy(self.copyComponentCustomData, self));

    // listen for PASTE_CUSTOM_DATA request
    SitesSDK.subscribe(SitesSDK.MESSAGE_TYPES.PASTE_CUSTOM_DATA, $.proxy(self.pasteComponentCustomData, self));

    //
    // Initialize the componentLayout & customSettingsData values
    //
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
