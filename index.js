// функция формата времени
function zero_first_format(value){
    if (value < 10) {
        value='0'+value;
    }
    return value;
}

// Fetch API javascript
fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(response => {
  return response.json();
}).then(data => {
  // Секлектор с названием
  let selector = "";
  for (var i in data.Valute) {
    selector += "<option value=" + i + ">" + data.Valute[i].ID + " - " + data.Valute[i].Name + "</option>"
  }
  document.getElementById("currency").innerHTML = selector;
  // Добавление информации о каждой валюте блок currencyData
  var current_datetime = new Date();
  var day = zero_first_format(current_datetime.getDate());
  var month = zero_first_format(current_datetime.getMonth()+1);
  var year = current_datetime.getFullYear();
  var hours = zero_first_format(current_datetime.getHours());
  var minutes = zero_first_format(current_datetime.getMinutes());
  var seconds = zero_first_format(current_datetime.getSeconds());

  currency.onchange = function () {
    for (var i in data.Valute) {
      if (data.Valute[i].CharCode == document.getElementById("currency").value) {
        document.getElementById("currencyFullName").innerText = data.Valute[i].ID + " - " + data.Valute[i].Name + " (" + data.Valute[i].CharCode + ")";
        document.getElementById("currencyDataToday").innerText = day + "/" + month + "/" + year + ", " + hours + ":" + minutes + ":" + seconds + " - " + data.Valute[i].Value;
        document.getElementById("currencyDataYesterday").innerText = day - 1 + "/" + month + "/" + year + ", " + hours + ":" + minutes + ":" + seconds + " - " + data.Valute[i].Previous;
      }
    }
  }
  //
  
}).catch(err => {
  console.log(err);
});

