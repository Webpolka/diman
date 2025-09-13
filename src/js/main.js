import { BaseHelpers } from './helpers/base-helpers';
BaseHelpers.addLoadedClass();
BaseHelpers.calcScrollbarWidth();
BaseHelpers.addTouchClass();


/* -------------------------------------------------------------------------------------------------------------------------------------------------
Transfer elements
-----------------------------------------------------------------------------------------------------------------------------------------------------*/
import TransferElements from './modules/transfer-elements';

const headerTransferEl = document.querySelector('[data-id="transfer-element"]');
const headerTransferPlace = document.querySelector('[data-id="transfer-place"]');

if (headerTransferEl && headerTransferPlace) {
  new TransferElements(  
    {
      sourceElement: headerTransferEl,
      breakpoints: {
        768: {
          targetElement: headerTransferPlace,
          targetPosition: 1          
        }
      }
    }   
  )
}

/* -------------------------------------------------------------------------------------------------------------------------------------------------
Burger menu
-----------------------------------------------------------------------------------------------------------------------------------------------------*/
document.addEventListener('DOMContentLoaded', ()=>{
  const burgerBtn = document.querySelector('#burger');
  const burgerClose = document.querySelector('#burger-close');
  const mobileNav = document.querySelector('.header__nav');

  burgerBtn.onclick = openMobile;
  burgerClose.onclick = closeMobile;

  function openMobile(){        
    mobileNav.classList.add('active');
    document.documentElement.classList.add('no-scroll')
  }
  function closeMobile(){
    mobileNav.classList.remove('active');
    document.documentElement.classList.remove('no-scroll')        
  }
})
