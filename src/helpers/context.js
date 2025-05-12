const APP_SESSION_KEY = 'SESSION_V1';
const contextListeners = {};
let context = new Proxy({
  session: null,
  env: null,
}, {
    get: function(target, prop, receiver) {
      if(prop == 'session') {
        return target[prop];
      } else {
        return null;
      }
    },
    set: function(target, prop, value) {
      if(prop == 'session') {
        target[prop] = value;
        window.localStorage.setItem(APP_SESSION_KEY, JSON.stringify(value));
        if (contextListeners[prop]) {
          contextListeners[prop].forEach((callback) => callback(value));
        }
        return true;
      } else {
        return true;
      }
    }
  }
);


/**
 * 
 * @param {'session' | ''} prop 
 * @param {function} callback 
*/
function contextListener(prop, callback) {
  if(!contextListeners[prop]) {
    contextListeners[prop] = [];
  } else {
    contextListeners[prop].pop();
  }
  contextListeners[prop].push(callback);
}


const rawSession = window.localStorage.getItem(APP_SESSION_KEY);
if(rawSession) {
  context['session'] = JSON.parse(rawSession);
}


function getContext() {
  return context;
}


export {
  getContext,
  contextListener,
};