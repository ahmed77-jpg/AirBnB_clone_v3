$(document).ready(() => {
    const checkedAmen = {};
    $('input').change(function () {
      const amenityId = $(this).attr('data-id');
      const amenityName = $(this).attr('data-name');
      const checked = $(this).is(':checked');
      checkedAmen[amenityId] = (checked && amenityName) || null;
  
      const selected = `${Object.values(checkedAmen).filter((element) => element !== null).join(', ')}`;
      $('.amenities h4').text(selected);
    });
  
    const url = 'http://0.0.0.0:5001/api/v1/status/';
    $.get(url, (data) => {
      const cls = 'available';
      const apiStatus = $('div#api_status');
      if (data.status === 'OK') {
        apiStatus.addClass(cls);
      } else {
        apiStatus.removeClass(cls);
      }
    });
    /* When the button tag is clicked, a new POST request to places_search should be made with the list of Amenities checked */
    $('.container .filters button').click(() => {
      $.ajax({
        url: url,
        type: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify({amenities: Object.values(checkedAmen)}),
        success: (response) => {
          $('SECTION.places').empty();
          for (const res of response) {
            const article = [
              '<article>',
              '<div class="title_box">',
            `<h2>${res.name}</h2>`,
            `<div class="price_by_night">$${res.price_by_night}</div>`,
            '</div>',
            '<div class="information">',
            `<div class="max_guest">${res.max_guest} Guest(s)</div>`,
            `<div class="number_rooms">${res.number_rooms} Bedroom(s)</div>`,
            `<div class="number_bathrooms">${res.number_bathrooms} Bathroom(s)</div>`,
            '</div>',
            '<div class="description">',
            `${res.description}`,
            '</div>',
            '</article>'
            ];
            $('SECTION.places').append(article.join(''));
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
    });
  });