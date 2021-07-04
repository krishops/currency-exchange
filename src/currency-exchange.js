export default class CurrencyExchange {
  static getRates(code, target, amount) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${code}/${target}/${amount}`)
      .then(function (response) {
        console.log(response);
        // if (!response.ok) {
        //   throw Error(response.status);
        // }
        return response.json();
      })
      .catch(function (error) {
        console.log("This is a 404")
        
        return error;
      });
  }
}