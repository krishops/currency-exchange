import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currency-exchange.js';

function getElements(response) {
  let target = $('#targetCurrency').val();
  let amount = $('#amount').val();
  if (response.result === "success") {
    $('.showAmount').text(`$${amount} is ${response.conversion_result} in ${target}`);
    $('form#currencyEx').trigger("reset");
  } else if (response.error-type === "unsupported-code")  {
    $('.showError').text(`${target} is an unsupported currency code, or the currency does not exist.`)
  } 
  
  else {
    $('.showError').text(`This is an invalid search: ${response.message}`);
  }
}


$(document).ready(function () {
  $('form#currencyEx').submit(function () {
    event.preventDefault();
    let target = $('#targetCurrency').val();
    let amount = $('#amount').val();

    CurrencyExchange.getRates(target, amount)
      .then(function (response) {
        getElements(response);
      });

  });
});

