$( document ).ready(function() {

  let interiors = $(".interior");
  let floors = $( ".floor" );
  floors.click(function(event) {
    let floor_id = "#" + event.target.id;
    let floor_num = floor_id.split("_")[1];
    let floor = $(floor_id);

    let interior_id = "#interior_"+floor_num;
    let interior = $(interior_id);
    interiors.removeClass( "interior-on" );
    interior.addClass( "interior-on" );

    floors.removeClass( "floor-on" );
    floor.addClass( "floor-on" );
  });


});
