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
    $.get(url, function (data) {
      const cls = 'available';
      const apiStatus = $('div#api_status');
      if (data.status === 'OK') {
        apiStatus.addClass(cls);
      } else {
        apiStatus.removeClass(cls);
      }
    });
  
    function createArticle (place) {
      return `
      <article>
      <div class="title_box">
        <h2>${place.name}</h2>
        <div class="price_by_night">$ ${place.price_by_night}</div>
      </div>
      <div class="information">
        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
      </div>
      <div class="user">
      </div>
      <div class="description">
        ${place.description}
      </div>
      </article>
    `;
    }
  
    const urlPlaces = 'http://0.0.0.0:5001/api/v1/places_search/';
    $.ajax({
  
      method: 'POST',
      url: urlPlaces,
      data: JSON.stringify({}),
      success: function (data) {
        data.forEach((place) => {
          $('section.places').append(createArticle(place));
        });
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });