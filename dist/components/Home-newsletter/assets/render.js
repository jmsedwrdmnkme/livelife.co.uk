/* globals define */
define(['knockout', 'jquery', 'css!./styles/design.css'], function (ko, $, css) {
  'use strict';
  // ----------------------------------------------
  // Define a Knockout Template for your component
  // ----------------------------------------------
  var sampleComponentTemplate = 
    '<!-- ko if: initialized -->' +
    '<div class="container-breakout home-newsletter py-5 text-center">' +
    '  <div class="container">' +
    '    <div class="row">' +
    '      <div class="col-12">' +
    '        <div class="h2"><scs-title params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'titleId\', \'data\': titleData } }"></scs-title></div>' +
    '        <scs-paragraph params="{ scsComponent: { \'renderMode\': mode, \'parentId\': id, \'id\': \'paragraphId\', \'data\': paragraphData } }"></scs-paragraph>' +
    '        <div id="newsletter" class="mt-5"></div>' +
    '      </div>' +
    '    </div>' +
    '  </div>' +
    '</div>' +
    '<script>' +
    '  !function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";n.r(t),n.d(t,"Loaders",function(){return o}),n.d(t,"dynload",function(){return r});var o=function(){return function(){}}();function r(e,t,n,o,r){function a(t){var n=o[e].notify;delete o[e].notify,o[e].success=t;for(var r=0,a=n;r<a.length;r++){var i=a[r];try{i(t)}catch(e){}}}if(void 0===o[e]){o[e]={notify:[r]};var i=document.createElement(t);for(var s in n)n.hasOwnProperty(s)&&(i[s]=n[s]);i.onload=function(){a(!0)},i.onerror=function(){a(!1)},document.head.appendChild(i)}else void 0!==o[e].success?r(o[e].success):o[e].notify.push(r)}},function(e,t,n){n(0),e.exports=n(2)},function(e,t,n){"use strict";function o(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];for(var n={},o=0;o<e.length;o++){var r=e[o];if(null!=r)for(var a in r)r.hasOwnProperty(a)&&(n[a]=r[a])}return n}n.r(t);function r(e,t){if(null==t)return t;if(t.indexOf("//")>0||null==e)return t;var n=e.indexOf("//");if(n<0)return t;var o=e.indexOf("/",n+2);return o>=0?e.substring(0,o)+t:t}var a=function(){function e(e,t){this.url=e,this.config=t}return e.prototype.isLatestVersionInterview=function(){return!0===this.config.isLatestVersion},e.prototype.getOPMVersion=function(){return this.config.opmVersion},e.prototype.getSupportedLocales=function(){var e=[];return this.config.locales.forEach(function(t){e.push(t)}),e},e.prototype.getStaticCSS=function(){var e=this,t=[];return this.config.staticCSS.forEach(function(n){t.push(r(e.url,n))}),t},e.prototype.getStaticJS=function(){var e=this,t=[];return this.config.staticJS.forEach(function(n){t.push(r(e.url,n))}),t},e.prototype.getCustomCSS=function(){var e=this,t=[];return this.config.customCSS.forEach(function(n){t.push(r(e.url,n))}),t},e.prototype.getCustomJS=function(){var e=this,t=[];return this.config.customJS.forEach(function(n){t.push(r(e.url,n))}),t},e}(),i=n(0);n.d(t,"resetLoaders",function(){return c}),n.d(t,"BatchStartOrResumeDeprecated_12_2_11",function(){return f}),n.d(t,"BatchStartOrResume",function(){return d});var s={};function c(){s={}}function u(e,t,n){var o=new XMLHttpRequest;o.onreadystatechange=function(){if(4===o.readyState){var e;try{(e=JSON.parse(o.responseText)).success=200==o.status,e.errorCode=o.status}catch(t){e={success:!1,errorCode:200==o.status?500:o.status}}n(e)}};var r=JSON.stringify(t);o.open("POST",e,!0),o.setRequestHeader("Content-type","text/plain"),o.send(r)}function l(e){var t=document.createElement("div"),n=e.errorStyle?e.errorStyle:{backgroundColor:"#C24839",color:"white",padding:"0.5em"};if(t.textContent=e.errorMessage?e.errorMessage:"Unable to load interview",null!=n&&"object"==typeof n)for(var o in n)n.hasOwnProperty(o)&&(t.style[o]=n[o]);e.el.appendChild(t)}function f(e,t,n){for(var o=0;o<t.length;++o){var r=t[o];r.disableEnforcedStyling=!0,r.useCookies=!0,r.warnIfUnsaved=!1,r.deprecatedAPIVersion="12.2.7"}d(e,t,n)}function d(e,t,n){var o=e;o.indexOf("?")>0&&(o=o.substring(0,o.indexOf("?")));var r=t.length,a=0,c=null,f=function(o){o?++a===r&&(c?window.OraclePolicyAutomationInterview._launchInterviews(e,c.serverURL,t,!0,c.launchPayload):window.OraclePolicyAutomationInterview===m?window.OraclePolicyAutomationEmbedded.BatchStartOrResume(e,t,n):window.OraclePolicyAutomationInterview.BatchStartOrResume(e,t,n)):console.log("Unable to load required OPA file")};0!=t.length&&function(e,t,n,o){u(e+"/redirectQuery",{deploymentName:t[0].deploymentName,proxyRequest:t.map(function(e){return{operation:e.operation,deploymentName:e.deploymentName,locale:e.locale,seedData:e.seedData,params:e.params,useCookies:e.useCookies}}),allowProxy:!0,opaUser:n,version:1},function(e){if(e.success)o(e.redirectURL,e.launch);else for(var n=0,r=t;n<r.length;n++)l(r[n])})}(e,t,n,function(e,n){if(o=e,n){var a=n.staticCSS,u=n.staticJS;r+=a.length+u.length,c=n;for(var l=0,d=u;l<d.length;l++){var v=d[l];Object(i.dynload)(v,"script",{src:v},s,f)}for(var m=0,h=a;m<h.length;m++){var y=h[m];Object(i.dynload)(y,"link",{rel:"stylesheet",type:"text/css",href:y},s,f)}for(var g=0,S=t;g<S.length;g++){S[g];f(!0)}}else for(var w=function(e){p(o,e.deploymentName,function(t,n){if(null==t){var o=document.createElement("div"),a=e.errorStyle?e.errorStyle:{backgroundColor:"#C24839",color:"white",padding:"0.5em"};if(o.textContent=e.errorMessage?e.errorMessage:"Unable to load interview",0===n.errorCode)console.log("Unable to communicate with Intelligent Advisor server. The most likely cause of this error is not configuring the server for CORS. Please consult the documentation http://documentation.custhelp.com/euf/assets/devdocs/unversioned/PolicyAutomation/en/Default.htm");else if(n.errors&&n.errors.length>0){for(var c=0,u=n.errors;c<u.length;c++){var l=u[c];console.log(l.rawMessage)}console.log("Please consult the documentation http://documentation.custhelp.com/euf/assets/devdocs/unversioned/PolicyAutomation/en/Default.htm")}else console.log("Unable to communicate with Intelligent Advisor server possibly due to misconfiguration. Please consult the documentation http://documentation.custhelp.com/euf/assets/devdocs/unversioned/PolicyAutomation/en/Default.htm");if(null!=a&&"object"==typeof a)for(var d in a)a.hasOwnProperty(d)&&(o.style[d]=a[d]);e.el.appendChild(o)}else{var p=t.getStaticCSS(),v=t.getStaticJS();r+=p.length+v.length;for(var m=0,h=v;m<h.length;m++){var y=h[m];Object(i.dynload)(y,"script",{src:y},s,f)}for(var g=0,S=p;g<S.length;g++){var w=S[g];Object(i.dynload)(w,"link",{rel:"stylesheet",type:"text/css",href:w},s,f)}f(!0)}})},O=0,b=t;O<b.length;O++){w(b[O])}})}function p(e,t,n){var o=e;"/"!=o.charAt(o.length-1)&&(o+="/"),u(o+="JSONDeploymentInfo?redirect=query",{deploymentName:t},function(t){if(!0===t.success){var o=new a(e,t.info);n(o,null)}else n(null,t)})}var v=[];var m={StartInterview:function(e,t,n,r,a,i,s,c,u){d(t,[{operation:"start",deploymentName:n,locale:r,params:o(i),el:e,onLoad:c,onNavigate:u,seedData:o(s)}],a)},ResumeInterview:function(e,t,n,r,a,i,s,c){d(t,[{operation:"resume",deploymentName:n,locale:r,params:o(i),el:e,onLoad:s,onNavigate:c}],a)},BatchStartOrResume:d,GetDeploymentInformation:p};window.OraclePolicyAutomationEmbedded={StartInterview:function(e,t,n,r,a,i,s,c,u){d(t,[{operation:"start",deploymentName:n,locale:r,params:o(i),el:e,onLoad:c,onNavigate:u,seedData:o(s),disableEnforcedStyling:!0,useCookies:!0,warnIfUnsaved:!1,deprecatedAPIVersion:"12.2.7"}],a)},ResumeInterview:function(e,t,n,r,a,i,s,c){d(t,[{operation:"resume",deploymentName:n,locale:r,params:o(i),el:e,onLoad:s,onNavigate:c,disableEnforcedStyling:!0,useCookies:!0,warnIfUnsaved:!1,deprecatedAPIVersion:"12.2.7"}],a)},BatchStartOrResume:f,GetDeploymentInformation:p},window.OraclePolicyAutomationInterview=m;var h={AddExtension:function(e){v.push(e)},GetExtensions:function(){return v}};window.OraclePolicyAutomation=window.OraclePolicyAutomationLoader=h}]);' +
    '  var el = document.getElementById("newsletter");' +
    '  var webDeterminationsUrl = "https://tp-opa--tst2.custhelp.com/web-determinations";' +
    '  var deploymentName = "Livelife Register Interest Incident";' +
    '  OraclePolicyAutomationInterview.StartInterview(el, webDeterminationsUrl, deploymentName);' +
    '</script>' +
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
    self.linkURL = ko.observable();
    self.linkText = ko.observable();
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
    self.imageData = {
    };
    self.titleData = {
    };
    self.paragraphData = {
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
        self.linkURL(customData.linkURL);
        self.linkText(customData.nls && customData.nls.linkText);
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
