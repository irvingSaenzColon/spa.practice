import Modal from "../factories/modal.js";
import { getContext } from "../helpers/context.js";


export default function SignInController() {
  const context = getContext();
  const btnOpnMdl = document.getElementById('btn-opnmdl');
  const loginForm = document.getElementById('loginForm');
  let modelData = {};
  

  btnOpnMdl.addEventListener('click', function(e) {
    const modal = Modal.open({
      template: '../modals/test.html',
      controller: function() {},
      height: '500px',
      width: '500px',
      closeBtn: true,
    });
    modal.then(data => console.log('Se cerró el modal'));
  }, false);
  
  loginForm.addEventListener('submit', OnSignIn);
  
  /**
   * 
   * @param {SubmitEvent} event 
   */
  function OnSignIn(event) {
    event.preventDefault();
    context.session = {'user': 'irving'};   
  }
  
  
  function loadEventListeners() {
    //Buscar una manera que por default al cambiar de página cargue los eventlisteners y que se guarden las referencias para poder eliminarlos al cambiar de página
  }
  
  
  function createModelObj(str, head, tail) {
    let propsQue = str.split('.');
    if(!str.length || !propsQue.length) {
      return head;
    }
    if(!tail) {
      tail = head;
    }
    let tmp = tail;
    let prop = propsQue.shift();
    if(tmp && !tmp.hasOwnProperty(prop)) {
      tmp[prop] = propsQue.length ? {} : null;
    }
    tail = tmp[prop];
    str = propsQue.join('.');
    return createModelObj(str, head, tail);
  }
  
  
  function bindModels() {
    const inputs = document.querySelectorAll('[model]');
    for(let i = 0; i < inputs.length; i++) {
      const modelAttr = inputs[i].getAttribute('model');
      if(modelAttr) {
        modelData = createModelObj(modelAttr, modelData, null);
      }
    }
    /*
    inputs[i].addEventListener('input', (event) => {
      const modelName = inputs[i].getAttribute('model');
      
      modelData[modelName] = event.target.value;
    });
    */
  }
  //bindModels();
}