import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currency-exchange.js';

function getElements(response) {
  let code = $('#code').val();
  let target = $('#target').val();
  let amount = $('#amount').val();
  if (response.result === "success") {
    $('.showAmount').text(`${amount} ${code} is ${response.conversion_result} ${target}`);
    
  } else if (response.result === "error" && response["error-type"] === "unsupported_code")  {
    $('.showError').text(`${target} is an unsupported currency code, or the currency does not exist.`)
  } 
  
  else {
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
        getElements(response);
      });

  });
});

