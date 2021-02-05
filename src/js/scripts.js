//
// Bootstrap offcanvas navbar slide in for mobile
//
(function () {
  'use strict';

  document.querySelector('[data-bs-toggle="offcanvas"]').addEventListener('click', function () {
    document.querySelector('.offcanvas-collapse').classList.toggle('open');
    document.querySelector('.navbar-toggler-icon').classList.toggle('active');
    document.querySelector('.navbar').classList.toggle('active');
  });
})();

//
// Populating the main navigation Oracle CEC method
//
function renderNode(id, navBar) {
  if (id >= 0) {
    var navNode = SCS.structureMap[id];
    if (navNode && ((typeof navNode.hideInNavigation != "boolean" ) || (navNode.hideInNavigation === false ))) {
      var navItem = document.createElement("li");
      var navLink = document.createElement("a");
      var navText = document.createTextNode(navNode.name);
      var linkData = SCSRenderAPI.getPageLinkData(navNode.id) || {};

      if (linkData.href) {
        navLink.href = linkData.href;
      }

      if (linkData.target) {
        navLink.target = linkData.target;
      }

      navLink.appendChild(navText);
      navItem.appendChild(navLink);

      if (navNode.children.length > 0) {
        var navSub = document.createElement("ul");

        for (var c = 0; c < navNode.children.length; c++) {
          renderNode(navNode.children[c], navSub);
        }

        navItem.appendChild(navSub);
      }
      navBar.appendChild(navItem);
    }
  }
}

function renderNav() {
  var topnav = document.getElementById("mainNav");

  if (topnav) {
    var navBar = document.createElement("ul");
    renderNode(SCS.navigationRoot, navBar);
    topnav.appendChild(navBar);

    // Append correct bootstrap styling to main nav ul
    navBar.classList.add('navbar-nav');

    // Append correct bootstrap styling to nav li
    var navItems = document.querySelectorAll('#mainNav li');
    navItems.forEach(function (item, index) {
      item.classList.add('nav-item');
    });

    // Append correct bootstrap styling to nav a
    var navLinks = document.querySelectorAll('#mainNav a');
    navLinks.forEach(function (link, index) {
      link.classList.add('nav-link');
    });

    // Grab and append Home child nav nodes to the top level
    const childUl = document.querySelector('#mainNav > ul > li > ul');
    const childNodes = document.querySelectorAll('#mainNav > ul > li > ul > li');
    const childHtml = childNodes.innerHTML;
    childUl.remove();

    for (let i = 0; i <= childNodes.length - 1; i++) {
      navBar.appendChild(childNodes[i]);
    }
  }
}

// Must wait for all our script to be ready...
if (document.addEventListener) {
  document.addEventListener('scsrenderstart', renderNav, false); 
} else if (document.attachEvent) {
  document.documentElement.scsrenderstart = 0;
  document.documentElement.attachEvent("onpropertychange", function(event) {
    if (event && (event.propertyName == "scsrenderstart")) {
      renderNav();
    }
  });
}

// Nav active class
window.onload = function() { 
  var all_links = document.querySelectorAll('.nav-link'),
    i=0, len=all_links.length,
    full_path = location.href.split('#')[0]; // Ignore hashes

  // Loop through each link.
  for(; i<len; i++) {
    if(all_links[i].href.split("#")[0] == full_path) {
      all_links[i].className += " active";
    }
  }
};
