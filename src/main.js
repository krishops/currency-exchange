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
        console.log("THIS IS WORKING");
        getElements(response);
      });
  });
});

function getElements(response) {
  if (response.result === "success")
    return response.conversion_rate;
  console.log("THIS WAS A GOOD FUNCITON" + response.conversion_rate);
}