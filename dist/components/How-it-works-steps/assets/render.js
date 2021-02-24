/* globals define */
define(['knockout', 'jquery', 'css!./design.css'], function (ko, $) {
  'use strict'; // ----------------------------------------------
  // Define a Knockout Template for your component
  // ----------------------------------------------
  var sampleComponentTemplate =
    '<!-- ko if: initialized -->' +
    '<div class="container-breakout py-4 position-relative how-it-works-steps text-center text-lg-start">' +
    '  <div class="container position-relative my-5">' +
    '    <div id="step-one">' +
    '      <div class="row align-items-center">' +
    '        <div class="col order-lg-1">' +
    '          <div class="mw-sm mx-auto">' +
    '            <scs-image params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'imageId1\', \'data\': imageData } }"></scs-image>' +
    '          </div>' +
    '        </div>' +
    '        <div class="col-lg-8 order-lg-0 pt-4 pt-lg-0">' +
    '          <scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId1\', \'data\': titleData } }"></scs-title>' +
    '          <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId1\', \'data\': paragraphData } }"></scs-paragraph>' +
    '          <a href="#step-two" class="btn btn-lead btn-primary mt-4">Go to step 2</a>'  +
    '        </div>' +
    '      </div>' +
    '    </div>' +
    '    <div id="step-two">' +
    '      <div class="row align-items-center pt-5 pt-lg-0 mt-lg-n5">' +
    '        <div class="col">' +
    '          <div class="mw-sm mx-auto">' +
    '            <scs-image params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'imageId2\', \'data\': imageData } }"></scs-image>' +
    '          </div>' +
    '        </div>' +
    '        <div class="col-lg-8 pt-4 pt-lg-0">' +
    '          <scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId2\', \'data\': titleData } }"></scs-title>' +
    '          <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId2\', \'data\': paragraphData } }"></scs-paragraph>' +
    '          <a href="#step-three" class="btn btn-lead btn-primary mt-4">Go to step 3</a>'  +
    '        </div>' +
    '      </div>' +
    '    </div>' +
    '    <div id="step-three">' +
    '      <div class="row align-items-center pt-5 pt-lg-0 mt-lg-n5">' +
    '        <div class="col order-lg-1">' +
    '          <div class="mw-sm mx-auto">' +
    '            <scs-image params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'imageId4\', \'data\': imageData } }"></scs-image>' +
    '          </div>' +
    '        </div>' +
    '        <div class="col-lg-8 order-lg-0 pt-4 pt-lg-0">' +
    '          <scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId3\', \'data\': titleData } }"></scs-title>' +
    '          <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId3\', \'data\': paragraphData } }"></scs-paragraph>' +
    '          <a href="#step-four" class="btn btn-lead btn-primary mt-4">Go to step 4</a>'  +
    '        </div>' +
    '      </div>' +
    '    </div>' +
    '    <div id="step-four">' +
    '      <div class="row align-items-center pt-5 pt-lg-0 mt-lg-n5">' +
    '        <div class="col">' +
    '          <div class="mw-sm mx-auto">' +
    '            <scs-image params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'imageId3\', \'data\': imageData } }"></scs-image>' +
    '          </div>' +
    '        </div>' +
    '        <div class="col-lg-7 pt-4 pt-lg-0">' +
    '          <scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId4\', \'data\': titleData } }"></scs-title>' +
    '          <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId4\', \'data\': paragraphData } }"></scs-paragraph>' +
    '          <a href="#step-five" class="btn btn-lead btn-primary mt-4">Next step</a>'  +
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
    self.linkURL = ko.observable();
    self.linkText = ko.observable();


    // handle initialization 
    self.customSettingsDataInitialized = ko.observable(false);
    self.initialized = ko.computed(function () {
      return self.customSettingsDataInitialized();
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
    self.titleData = {
    };
    self.paragraphData = {
    };

    // 
    // Handle property changes
    //
    self.updateCustomSettingsData = $.proxy(function (customData) {
      if (customData) {
        self.linkURL(customData.linkURL);
        self.linkText(customData.nls && customData.nls.linkText);
      }
      self.customSettingsDataInitialized(true);
    }, self);
    self.updateSettings = function (settings) {
      self.updateCustomSettingsData(settings.value);
    };

    // listen for the EXECUTE ACTION request to handle custom actions
    SitesSDK.subscribe(SitesSDK.MESSAGE_TYPES.EXECUTE_ACTION, $.proxy(self.executeActionsListener, self));
    // listen for settings update
    SitesSDK.subscribe(SitesSDK.MESSAGE_TYPES.SETTINGS_UPDATED, $.proxy(self.updateSettings, self));

    // listen for COPY_CUSTOM_DATA request
    SitesSDK.subscribe(SitesSDK.MESSAGE_TYPES.COPY_CUSTOM_DATA, $.proxy(self.copyComponentCustomData, self));

    // listen for PASTE_CUSTOM_DATA request
    SitesSDK.subscribe(SitesSDK.MESSAGE_TYPES.PASTE_CUSTOM_DATA, $.proxy(self.pasteComponentCustomData, self));

    //
    // Initialize the customSettingsData values
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
          self.viewModel.updateComponentData(property.value);
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
