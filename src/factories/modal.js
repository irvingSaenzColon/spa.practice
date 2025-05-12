export default class Modal {
  static opnAnimDrtn = 2500; //miliseconds
  static clsAnimDrtn = 2500; //miliseconds
  static dlgContainer = document.getElementById('modal-container');
  static modals = [];
  

  static {}

  /**
   * @param {string} template 
   * @param {function} dialogController 
   * @param {object} options 
   */
  static async open(dialogOption) {
    let {template, controller, height, width, closeBtn} = dialogOption;
    return new Promise(async (res, rej) => {
      try {
        this.dlgContainer.classList.add('modal--open')
        const htmlData = await this.init(template, height, width, closeBtn, res);
        this.dlgContainer.appendChild(htmlData.htmlElement);
        delete htmlData.htmlElement
        if(!this.modals.find(m => m.template === template)) {
          this.modals.push(htmlData);
        }
      } catch(e) {
        console.error('Failing to open up a modal');
        console.error(e.message);
        rej(false)
      }
    });
  }
  
  
  static async init(template, height, width, closeBtn, res) {
    const cachedModal = this.modals.find(m => m.template === template);
    let mdlCntntHTML = "";
    if(cachedModal) {
      mdlCntntHTML = cachedModal.modalHTML;
    } else {
      mdlCntntHTML = await fetch(template).then(data => data.text());
    }
    const idGnrc = Math.random().toString().replace('.', '');
    const htmlData = {
      idMdl: 'mdl-' + idGnrc,
      template: template,
      htmlElement: null,
      modalHTML: mdlCntntHTML,
      clsMdlEvent : null,
    }
    const mdlWrppr = this.createModalWrapper(); 
    const mdl = this.createModal(height, width); 
    const mdlContent = this.createModalContent();
    mdlWrppr.id = htmlData.idMdl;
    if(closeBtn) {
      const btn = this.createCloseButton();
      btn.id = 'btn-' + idGnrc;
      htmlData.clsMdlEvent = function (modalId, res) {
        const mdlId = 'mdl-' + modalId;
        const btnId = 'btn-' + modalId;
        const mdlElem = document.getElementById(mdlId);
        const mdlContainer = document.getElementById('modal-container');
        if(mdlElem) {
          const btnCls = document.getElementById(btnId);
          if(btnCls) {
            btnCls.removeEventListener('click', this.clsMdlEvent);
          }
          mdlElem.parentElement.removeChild(mdlElem);
        }
        if(mdlContainer && mdlContainer.classList.contains("modal--open")) {
          mdlContainer.classList.remove("modal--open");
        }
        res(true);
      }; 
      btn.addEventListener('click', () => { 
        htmlData.clsMdlEvent(idGnrc, res);
      }, false);
      mdl.appendChild(btn);
    }
    mdlContent.innerHTML = mdlCntntHTML;
    mdl.appendChild(mdlContent);
    mdlWrppr.appendChild(mdl);
    htmlData.htmlElement = mdlWrppr;
    return htmlData;
  }


  static createModalWrapper() {
    const mdlWrppr = document.createElement('dialog');
    mdlWrppr.classList.add('modal__wrapper');
    mdlWrppr.style.zIndex = 1000 + this.modals.length;
    return mdlWrppr;
  }


  static createModal(height, width) {
    const mdlCntnt = document.createElement('section');
    mdlCntnt.classList.add('modal__content');
    mdlCntnt.style.width = width;
    mdlCntnt.style.height = height;
    return mdlCntnt;
  }


  static createModalContent() {
    const mdlCnt = document.createElement('section');
    return mdlCnt;
  }


  static createCloseButton() {
    const clsBttn = document.createElement('button');
    clsBttn.type = 'button';
    clsBttn.classList.add('modal__close');

    const svgIcon= document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgIcon.setAttribute('width', '15');
    svgIcon.setAttribute('height', '15');
    svgIcon.setAttribute('viewBox', '0 0 19 19');
    svgIcon.setAttribute('fill', 'none');

    const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    svgPath.setAttribute('d', 'M2 17L17 2M17 17L2 2');
    svgPath.setAttribute('stroke', '#011023');
    svgPath.setAttribute('stroke-width', '4');
    svgPath.setAttribute('stroke-linecap', 'round');

    svgIcon.appendChild(svgPath);
    clsBttn.appendChild(svgIcon);
    return clsBttn;
  }
}