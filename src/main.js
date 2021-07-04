import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currency-exchange.js';


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

function getElements(response) {
  let target = $('#targetCurrency').val();
  let amount = $('#amount').val();
  if (response.result === "success") {
    $('.showAmount').text(`$${amount} is ${response.conversion_result} in ${target}`);
  } else {
    $('.showError').text(`This is an invalid search: ${response.statusText}`);
    $('.showError').text(`${target} is not a valid currency`);
  }
}