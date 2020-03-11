'use strict';
let user = new UserForm();
function loginFormCallback (data) {
  ApiConnector.login({login: data.login, password: data.password}, param => {
    console.log(param);
    if (param.success == false) {
      console.error('Error');
    } else {
      location.reload();
    }
  });
}

function registerFormCallback (data) {
  ApiConnector.register({login: data.login, password: data.password}, param => {
    console.log(param);
    if (param.success == false) {
      console.error('Error');
    } else {
      location.reload();
    }
  });
}

user.loginFormCallback = (data => {
  loginFormCallback(data);
});

user.registerFormCallback = (data => {
  registerFormCallback(data);
});
