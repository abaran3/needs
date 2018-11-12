var latestNeed;
function getNeeds() {
  alert(`your needs have been submitted to ${randomCountry()}`);
  latestNeed = $(this).val();
}

function randomCountry() {
  let index = Math.floor(Math.random() * countries_list.length);
  return countries_list[index].name;
}
