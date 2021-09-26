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
  });