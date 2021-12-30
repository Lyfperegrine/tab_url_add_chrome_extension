let myLeads = [];
const inputEl = document.getElementById("input");
const inpuBtn = document.getElementById("input-btn");
const ulList = document.getElementById("input-list");
const deleteBtn = document.getElementById("delete-btn");
const saveBtn = document.getElementById("save-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

saveBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

function render(leads) {
  let listItems = "";
  for (let x = 0; x < leads.length; x++) {
    listItems += `<li>  <a target='_blank' href='${leads[x]}'>${leads[x]}
       </a> </li>`;
  }
  ulList.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inpuBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});
