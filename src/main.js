import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currency-exchange.js';
import Codes from './codes.js';

Codes.getCodes()
.then(function(response)  {
  listCodes(response)
})
function listCodes(response) { 
  $('#target').append($(`<option value="${response.supported_codes[[0]]}>${response.supported_codes[[1]]}</option>`));
}
//Probably needs a loop of some sort

  // .val(response.supported_codes[[0]]).html(response.supported_codes[[1]]));
  // console.log("The codes came through")


function getElements(response) {
  let code = $('#code').val();
  let target = $('#target').val();
  let amount = $('#amount').val();
  if (response.result === "success") {
    $('.showAmount').text(`${amount} ${code} is ${response.conversion_result} ${target}`);
    
  } else if (response["error-type"] === "unsupported-code")  {
    $('.showError').text(`${target} is an unsupported currency code, or the currency does not exist.`)
  } else {
    $('.showError').text(`This is an invalid search: ${response.message}`);
  }
  $('form#currencyEx').trigger("reset");
}


$(document).ready(function () {
  $('form#currencyEx').submit(function () {
    event.preventDefault();
    let code = $('#code').val();
    let target = $('#target').val();
    let amount = $('#amount').val();

    CurrencyExchange.getRates(code, target, amount)
      .then(function (response) {
        console.log("move into getElements")
        getElements(response);
      })
      // .catch(function()  {
      //   console.log("This is a 404")
      // })
      

  });
});

