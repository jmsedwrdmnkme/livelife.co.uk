/* globals define */

define([
	'jquery',
	'mustache',
	'text!./layout.html',
	'css!./design.css'
], function ($, Mustache, templateHtml, css) {
	'use strict';

	function ContentLayout(params) {
		this.contentItemData = params.contentItemData || {};
		this.scsData = params.scsData;
		this.contentClient = params.contentClient;
	}

	function dateToMDY(date) {
		var dateObj = new Date(date);

		var options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		var formattedDate = dateObj.toLocaleDateString('en-US', options);

		return formattedDate;
	}

	ContentLayout.prototype = {

		/*getAuthors: function () {
			var contentClient = this.contentClient;

			// query back the authors once per page
			if (!window.blogAuthorPromise) {
				window.blogAuthorPromise = new Promise(function (resolve, reject) {
					// get all the authors
					contentClient.getItems({
						'field:type:equals': 'TP-Blog',
						'fields': 'ALL'
					}).then(function (authors) {
						resolve(authors);
					}, function (error) {
						console.log(error);
						reject({});
					});
				});
			}
			return window.blogAuthorPromise;
		},*/
		
		contentVersion: ">=1.1.0 <2.0.0",
		render: function (parentObj) {
			
			var content = $.extend({}, this.contentItemData);

			// Get the Sites contect information via the scsData property
			content = $.extend(content, {
				'scsData': this.scsData
			});
			
			
			var template,
				contentClient = this.contentClient,
				data = this.contentItemData.fields,
				content = {
					blogImageRenditionURL: contentClient.getRenditionURL({
						'id': data['tp-blog_blog_main_image'].id
					}),
					blogSummary: data['tp-blog_blog_summary'],
					blogTitle: data['tp-blog_blog_title'],
					blogCategory: data['tp-blog_blog_category'],
					blogCategory2: data['tp-blog_blog_category_2'],
					blogCategory3: data['tp-blog_blog_category_3'],
					blogContent: contentClient.expandMacros(data["tp-blog_blog_content"]),
					blogImage: data['tp-blog_blog_main_image'],
					blogImageCaption: data['tp-blog_blog_image_caption'],
					blogHighlightTitle: data['tp-blog_blog_highlight_title'],
					blogHighlight: data['tp-blog_blog_highlight'],
					blogAuthor: data['tp-blog_author'],
					blogDate: data['tp-blog_blog_date'].value,
					blogWrittenDateFormatted: dateToMDY(data['tp-blog_blog_date'].value),
					blogFormattedDate: dateToMDY(this.contentItemData.updatedDate.value),
					blogLink: data['tp-blog_url']
					
				},

				contentType,
				secureContent = false;
				console.log(data['tp-blog_blog_date'].value);
				console.log(dateToMDY(data['tp-blog_blog_date'].value));
				

			if (this.scsData) {
				content = $.extend(content, {
					'scsData': this.scsData
				});
				contentType = content.scsData.showPublishedContent === true ? 'published' : 'draft';
				secureContent = content.scsData.secureContent;
			}

			/*this.getAuthors().then(function (authors) {
				//get the blog author
				var author = {
				data: {}
				};
				for (var i = 0; i < authors.items.length; i++) {
					if (authors.items[i].id === data['starter-blog-post_author'].id) {
						author = authors.items[i];
						break;
					}
				}
				content.blogAuthor = author.data['starter-blog-author_name'];*/

				// render the content
				try {
					// Mustache
					template = Mustache.render(templateHtml, content);

					if (template) {
						$(parentObj).append(template);
					}
				} catch (e) {
					console.error(e.stack);
									}
			//});
		}
	};

	return ContentLayout;
});
