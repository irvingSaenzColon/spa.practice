import { getContext } from "../helpers/context.js";

export default function homeController() {
  const context  = getContext();
  const logoutBtn = document.getElementById('logoutBtn');
  
  logoutBtn.addEventListener('click', function(e) {
    context.session = null;
  })
}