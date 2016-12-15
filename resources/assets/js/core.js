$(function() {

  function showSidebar () {
    $('.sidebar').addClass('active')
    $('body').addClass('active-sidebar')
  }

  function hideSidebar () {
    $('.sidebar').removeClass('active')
    $('body').removeClass('active-sidebar')
  }

  $('.hamburger').click(showSidebar)
  $('.overlay').click(hideSidebar)
  $(window).keyup(function (e) {
    if (e.which === 27) {
      hideSidebar()
    }
  })

  $('#version').on('change', function () {
    console.log('hp');
    window.location = '/docs/' + $(this).val() + '/{{meta.permalink}}'
  })

  // waypoints
  if ( $('.switcher').length ) {

    var sticky = new Waypoint.Sticky({
      element: $('.switcher')[0],
      offset: $('.topbar').outerHeight()
    });

  }

});
