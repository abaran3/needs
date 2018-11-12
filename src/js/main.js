let fader = null;
$('#popup').hide();
function getNeeds() {
  if (fader) clearTimeout(fader);
  let latestNeed = $('#textbox').val();
  let message = `Your need ${latestNeed} has been submitted to ${randomCountry()}`;
  $('#popup')
    .text(message)
    .fadeIn();
  fader = window.setTimeout(() => $('#popup').fadeOut(), 2000);
}

function randomCountry() {
  let index = Math.floor(Math.random() * countries_list.length);
  return countries_list[index].name;
}
