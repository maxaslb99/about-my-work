$( document ).ready(function() {
  let menu_items = $( ".menu-item" ),
   // section_1 = $( "#section_1" ),
   // offset_1 = section_1.offset().top,
   // section_2 = $( "#section_2" ),
   // offset_2 = section_2.offset().top,
   // section_3 = $( "#section_3" ),
   // offset_3 = section_3.offset().top,
   // section_4 = $( "#section_4" ),
   // offset_4 = section_4.offset().top,
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
    if (scroll < fitst_offset){
      menu.addClass( "menu-hidden" );
    } else {
      menu.removeClass( "menu-hidden" );
    }

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

    // if (scroll >= offset_1){
    //   menu.removeClass( "menu-hidden" );
    //
    //   if(scroll >= offset_4){
    //     menu_items.removeClass( "active" );
    //     $( "#item_4" ).addClass( "active" );
    //   }
    //   else if(scroll >= offset_3){
    //     menu_items.removeClass( "active" );
    //     $( "#item_3" ).addClass( "active" );
    //   }
    //   else if(scroll >= offset_2){
    //     menu_items.removeClass( "active" );
    //     $( "#item_2" ).addClass( "active" );
    //   }
    //   else if(scroll >= offset_1){
    //     menu_items.removeClass( "active" );
    //     $( "#item_1" ).addClass( "active" );
    //   }
    //   else {
    //     menu_items.removeClass( "active" );
    //   }
    // }
    // else {
    //   menu.addClass( "menu-hidden" );
    // }


  $("#hamburger").on("click", function (event) {
    $("#hamburger").toggleClass("is-active");
  });

  // $("#menu").on("click","a", function (event) {
  $(".slow-link").on("click", function (event) {
  event.preventDefault();
  let id = $(this).attr('href');
  let top = $(id).offset().top - 50;
  $('body,html').animate({scrollTop: top}, 1000);
  });

});
