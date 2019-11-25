"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/servicesHub").build();

connection.on("ReloadServices", function (message) {
    var myTable = document.getElementById("servicesTable");
    updateTable(myTable, message);
});
connection.start();
function realTimeReload() {
    connection.invoke("ReloadServices").catch(function (err) {
        return console.error(err.toString());
    });
}
function updateTable(parent, categories) {
    var len = categories.length;
    for (var i = 0; i < len; i++) {
        var categoryRow = document.getElementById(categories[i].name);
        if (categories[i].status == 0) {
            categoryRow.className = "glyphicon glyphicon-ok";
        }
        else {
            categoryRow.className = "glyphicon glyphicon-remove";
        }
        var services = categories[i].services;
        var servicesLen = services.length;
        for (var j = 0; j < servicesLen; j++) {
            var serviceRow = document.getElementById(services[j].serviceDeskId);
            if (services[j].status == 0) {
                serviceRow.classList.remove("status-problem");
                serviceRow.innerText = "Operational";
            }
            else {
                serviceRow.classList.add("status-problem");
                serviceRow.innerText = "Problematic";
            }
        }
    }
}
var tables = document.getElementsByClassName("category-table");
for (var i = 0; i < tables.length; i++) {
    var element = tables[i].getElementsByClassName("category-row")[0];
    element.addEventListener('click', event => {
        var services = event.target.parentNode.parentNode.getElementsByTagName("td");
        for (var j = 0; j < services.length; j++) {
            services[j].classList.toggle("hidden");
        }
    }
    );
}
setInterval(realTimeReload, 1500);
setTimeout(realTimeReload, 10);

function hideAll() {
    var categories = document.getElementsByClassName("category-table");
    var categories_length = categories.length;
    for (var i = 0; i < categories_length; i++) {


        var service = categories[i].getElementsByTagName("td")
        var service_length = service.length;
        for (var j = 0; j < service_length; j++) {
            service[j].classList.add("hidden");
        }
    }
}

function showAll() {
    var categories = document.getElementsByClassName("category-table");
    var categories_length = categories.length;
    for (var i = 0; i < categories_length; i++) {


        var service = categories[i].getElementsByTagName("td")
        var service_length = service.length;
        for (var j = 0; j < service_length; j++) {
            service[j].classList.remove("hidden");
        }
    }
}