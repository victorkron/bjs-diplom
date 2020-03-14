'use strict';

let buttonOut = new LogoutButton();
buttonOut.action = (() => {
  ApiConnector.logout(demo => {
    if (demo.success == true) {
      location.reload();
    } else {
      console.error('Error');
    }
  });
});

ApiConnector.current(d => {

  if (d.success) {
    ProfileWidget.showProfile(d.data);
  } else {
    console.error('ErrorCurrent');
  }
});

let rate = new RatesBoard();

function addCourse () {
  ApiConnector.getStocks(d => {
    if (d.success) {
      rate.clearTable();
      rate.fillTable(d.data);
    } else {
      console.error('ErrorRate');
    }
  });
}

setInterval(addCourse, 100);

let widget = new FavoritesWidget();
let moneyManager = new MoneyManager();


moneyManager.addMoneyCallback = (data => {
  console.log(data);
  ApiConnector.addMoney( data, param => {
    //console.log(param);
    if (param.success) {
      widget.setMessage(true, 'SuccessAddMoney');
      ProfileWidget.showProfile(param.data);
    } else {
      widget.setMessage(true, 'ErrorAddMoney');
    }
  });
});

moneyManager.conversionMoneyCallback = (data => {
  ApiConnector.convertMoney(data, param => {
    //console.log(param);
    if (param.success) {
      widget.setMessage(true, 'SuccessConvertMoney');
      ProfileWidget.showProfile(param.data);
    } else {
      widget.setMessage(true, 'ErrorConvertMoney');
    }
  });
});

moneyManager.sendMoneyCallback = (data => {
  ApiConnector.transferMoney(data, param => {
    console.log(param);
    if (param.success) {
      widget.setMessage(true, 'SuccessSendMoney');
      ProfileWidget.showProfile(param.data);
    } else {
      widget.setMessage(true, 'ErrorSendMoney');
    }
  });
});

ApiConnector.getFavorites(param => {
  //console.log(param);
  if (param.success) {
    widget.clearTable();
    widget.fillTable(param.data);
    moneyManager.updateUsersList(param.data);
  } else {

  }
});

widget.addUserCallback = (data => {
  //console.log(data);
  ApiConnector.addUserToFavorites(data, param => {
    //console.log(param);
    if (param.success) {
      widget.clearTable();
      widget.fillTable(param.data);
      moneyManager.updateUsersList(param.data);
      widget.setMessage(true, 'SuccessAddUser');
    } else {
      widget.setMessage(true, 'ErrorAddUser');
    }
  });
});

widget.removeUserCallback = (data => {
  //console.log(data);
  ApiConnector.removeUserFromFavorites(data, param => {
    console.log(param);
    if (param.success) {
      widget.clearTable();
      widget.fillTable(param.data);
      moneyManager.updateUsersList(param.data);
      widget.setMessage(true, 'SuccessRemoveUser');
    } else {
      widget.setMessage(true, 'ErrorRemoveUser');
    }
  });
});
