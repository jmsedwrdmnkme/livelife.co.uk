//
// Navigation elements - main and footer
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
  var footernav = document.getElementById("footerNav");

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
    var childNodes = document.querySelectorAll('#mainNav > ul > li > ul > li');
    var childHtml = childNodes.innerHTML;

    for (let i = 0; i <= childNodes.length - 1; i++) {
      navBar.appendChild(childNodes[i]);
    }

    // Cloning main navigation items to footer nav
    var navNodes = document.querySelectorAll('#mainNav > ul > li');
    for (let i = 0; i <= navNodes.length - 1; i++) {
      footernav.appendChild(navNodes[i].cloneNode(true));
    }

    // Appending onbaording modal button to end of nav
    navNodes[navNodes.length- 1].insertAdjacentHTML('afterend', '<li class="nav-item"><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#onboardingModal">Get started</button></li>');

    // Appending /home to /
    var homeNavItem = topnav.querySelector('a[href^="/home"]');
    if (homeNavItem) {
      homeNavItem.setAttribute('href','/');
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

// Bootstrap offcanvas navbar slide in for mobile
(function () {
  'use strict';

  document.querySelector('[data-bs-toggle="offcanvas"]').addEventListener('click', function () {
    document.querySelector('.offcanvas-collapse').classList.toggle('open');
    document.querySelector('.navbar-toggler-icon').classList.toggle('active');
    document.querySelector('.navbar').classList.toggle('active');
  });
})();

// Nav active class based on page URL
window.onload = function() { 
  var url = location.href.split("/"); //replace string with location.href
  var navLinks = document.querySelectorAll('.nav-link');
  var i=0;
  var currentPage = url[url.length - 1];
  for(i;i<navLinks.length;i++){
    var lb = navLinks[i].href.split("/");
    if(lb[lb.length-1] == currentPage) {
      navLinks[i].className = "active";
    }
  }
};

// Onboarding piece load
var el = document.getElementById("onboarding");
var webDeterminationsUrl = "https://tp-opa--tst2.custhelp.com/web-determinations";
var deploymentName = "Livelife Contact Us plus Assessment1 Rev2";
OraclePolicyAutomationInterview.StartInterview(el, webDeterminationsUrl, deploymentName);
