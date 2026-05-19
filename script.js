const ADMIN_PASSWORD = "12121234"; // Hidden behind the admin page; not linked in main navigation.

function money(n){
  return "LKR " + Number(n).toLocaleString("en-LK");
}

function initPricing(){
  document.querySelectorAll("[data-price]").forEach(el => {
    const v = el.getAttribute("data-price");
    el.textContent = money(v);
  });
}

function initAdmin(){
  const gate = document.getElementById("gate");
  const panel = document.getElementById("panel");
  const password = document.getElementById("password");
  const status = document.getElementById("status");
  const unlock = () => {
    if (password.value === ADMIN_PASSWORD) {
      gate.classList.add("hidden");
      panel.classList.remove("hidden");
      status.textContent = "Access granted.";
    } else {
      status.textContent = "Incorrect password.";
    }
  };
  document.getElementById("unlockBtn").addEventListener("click", unlock);
  password.addEventListener("keydown", e => { if(e.key === "Enter") unlock(); });

  const fields = {
    p1: document.getElementById("p1"),
    p2: document.getElementById("p2"),
    p3: document.getElementById("p3"),
    p4: document.getElementById("p4"),
  };

  const save = () => {
    const data = {
      logoText: document.getElementById("logoText").value,
      heroTitle: document.getElementById("heroTitle").value,
      heroLead: document.getElementById("heroLead").value,
      p1: fields.p1.value, p2: fields.p2.value, p3: fields.p3.value, p4: fields.p4.value
    };
    localStorage.setItem("ice_phoenix_admin", JSON.stringify(data));
    status.textContent = "Saved locally in this browser.";
  };

  const load = () => {
    const data = JSON.parse(localStorage.getItem("ice_phoenix_admin") || "{}");
    if (data.logoText) document.getElementById("logoText").value = data.logoText;
    if (data.heroTitle) document.getElementById("heroTitle").value = data.heroTitle;
    if (data.heroLead) document.getElementById("heroLead").value = data.heroLead;
    ["p1","p2","p3","p4"].forEach(k => { if (data[k]) fields[k].value = data[k]; });
  };

  document.getElementById("saveBtn").addEventListener("click", save);
  document.getElementById("resetBtn").addEventListener("click", () => {
    localStorage.removeItem("ice_phoenix_admin");
    location.reload();
  });

  load();
}

window.addEventListener("DOMContentLoaded", () => {
  initPricing();
  if (document.body.dataset.page === "admin") initAdmin();
});