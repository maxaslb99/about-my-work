$( document ).ready(function() {
  let menu_items = $( ".menu-item" ),
   window_height = $(window).height(),
   menu = $( "#menu" );

   let sections = $("div[id*='section_']"),
   count = sections.length,
   fitst_offset = sections.offset().top + window_height/3 - 100;


   // console.log(fitst_offset);

  $(window).scroll(function(){
    let scroll = $(window).scrollTop() + window_height/3;

    // console.log(scroll);
    // console.log(scroll < fitst_offset);
    if ($(window).width()>=1440){
      if (scroll < fitst_offset){
        menu.addClass( "menu-hidden" );
      } else {
        menu.removeClass( "menu-hidden" );
      }
    };

    for (let i = 0; i < count; i++) {
      let index = count-(i+1),
       offset = sections[index].offsetTop,
       id = "#item_" + (index+1);

      if (scroll >= offset){
        menu_items.removeClass( "active" );
        $( id ).addClass( "active" );
        break;
      }
    }
  });

  $("#hamburger").on("click", function (event) {
    $("#hamburger").toggleClass( "is-active" );
    menu.toggleClass( "menu-hidden" )
  });

  $("#menu .slow-link").on("click", function (event) {
    if ($(window).width()<1440){
      menu.addClass( "menu-hidden" );
      $("#hamburger").removeClass( "is-active" );
    };
  });


  // $("#menu").on("click","a", function (event) {
  $(".slow-link").on("click", function (event) {
    event.preventDefault();
    let id = $(this).attr('href');
    let top = $(id).offset().top - 50;
    $('body,html').animate({scrollTop: top}, 1000);
  });

});
