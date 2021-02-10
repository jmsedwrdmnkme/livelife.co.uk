/* globals define,console */
define([
  "jquery",
  "mustache",
  "marked",
  "text!./layout.html",
  "css!./design.css"
], function ($, Mustache, Marked, templateHtml, css) {
  "use strict";

  // Content Layout constructor function.
  function ContentLayout(params) {
    this.contentItemData = params.contentItemData || {};
    this.scsData = params.scsData;
    this.contentClient = params.contentClient;
  }

  // Helper function to format a date field by locale.
  function dateToMDY(date) {
    if (!date) {
      return "";
    }

    var dateObj = new Date(date);

    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };
    var formattedDate = dateObj.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  // Helper function to parse markdown text.
  function parseMarkdown(mdText) {
    if (mdText && /^<!---mde-->\n\r/i.test(mdText)) {
      mdText = mdText.replace("<!---mde-->\n\r", "");

      mdText = Marked(mdText);
    }

    return mdText;
  }

  // Content Layout definition.
  ContentLayout.prototype = {
    // Specify the versions of the Content REST API that are supported by the this Content Layout.
    // The value for contentVersion follows Semantic Versioning syntax.
    // This allows applications that use the content layout to pass the data through in the expected format.
    contentVersion: ">=1.0.0 <2.0.0",

    // Main rendering function:
    // - Updates the data to handle any required additional requests and support both v1.0 and v1.1 Content REST APIs
    // - Expand the Mustache template with the updated data 
    // - Appends the expanded template HTML to the parentObj DOM element
    render: function (parentObj) {
      var template,
        content = $.extend({}, this.contentItemData),
        contentClient = this.contentClient,
        contentType,
        customSettings,
        secureContent = false;

      // If used with CECS Sites, Sites will pass in context information via the scsData property.
      if (this.scsData) {
        content = $.extend(content, {
          "scsData": this.scsData
        });
        contentType = content.scsData.showPublishedContent === true ? "published" : "draft";
        secureContent = content.scsData.secureContent;
        customSettings = content.scsData.customSettingsData || {};
      }

      // Support both v1.0 and v1.1 Content REST API response formats.
      // User-defined fields are passed through the 'data' property in v1.0 and 'fields' property in v1.1.
      var data = !contentClient.getInfo().contentVersion || contentClient.getInfo().contentVersion === "v1" ? content.data : content.fields;

      // Massage the data so that the 'fields' property is always there.
      // The corresponding layout.html template only checks for the ‘fields’ property. 
      if (!contentClient.getInfo().contentVersion || contentClient.getInfo().contentVersion === "v1") {
        content["fields"] = content.data;
      }

      //
      // Handle fields specific to this content type.
      //

      try {
        // Use Mustache to expand the HTML template with the data.
        template = Mustache.render(templateHtml, content);

        // Insert the expanded template into the passed in container.
        if (template) {
          $(parentObj).append(template);
        }
      } catch (e) {
        console.error(e.stack);
      }
    }
  };

  return ContentLayout;
});
