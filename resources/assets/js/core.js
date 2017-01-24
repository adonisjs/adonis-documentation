$(function() {

  function showSidebar (e) {
    if ($('.sidebar').length) {
      $('.sidebar').addClass('active')
      $('body').addClass('active-sidebar')
      e.stopPropagation()
    }
  }

  function hideSidebar () {
    $('.sidebar').removeClass('active')
    $('body').removeClass('active-sidebar')
  }

  $('.dropdown').click(function () {
    $(this).toggleClass('active')
  })

  $('.dropdown a').click(function (e) {
    e.stopPropagation()
  })

  $('.hamburger').click(showSidebar)
  $('.overlay').click(hideSidebar)

  $(window).keyup(function (e) {
    if (e.which === 27) {
      hideSidebar()
    }
  })

  $('#version').on('change', function () {
    const toUrl = window.location.pathname.split('/')
    toUrl[2] = $(this).val()
    window.location = toUrl.join('/')
  })

  // waypoints
  if ( $('.switcher').length ) {
    var sticky = new Waypoint.Sticky({
      element: $('.switcher')[0],
      offset: $('.topbar').outerHeight()
    });
  }

});
