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
    $('#results').show();
    $('#error').hide();
  } else if (response["error-type"] === "unsupported-code")  {
    $('.showError').text(`${target} is an unsupported currency code, or the currency does not exist.`);
    $('#error').show();
    $('#results').hide();
  } else {
    $('.showError').text(`This is an invalid search: ${response.message}`);
    $('#error').show();
    $('#results').hide();
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

