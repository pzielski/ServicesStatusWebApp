"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/servicesHub").build();

connection.on("ReloadServices", function (message) {
    var myTable = document.getElementById("servicesTable");
    populateTable(myTable, message);
});
connection.start();
function gator() {
    connection.invoke("ReloadServices").catch(function (err) {
        return console.error(err.toString());
    });
}
function populateTable(parent, categories) {
    var len = categories.length;
    for (var i = 0; i < len; i++) {
        console.log(categories[i]);
        var categoryRow = document.getElementById(categories[i].name);
        console.log("category")
        console.log(categoryRow);
        if (categories[i].status == 0) {
            categoryRow.className = "category-row ok";
        }
        else {
            categoryRow.className = "category-row problem";
        }
        var services = categories[i].services;
        var servicesLen = services.length;
        for (var j = 0; j < servicesLen; j++) {
            var serviceRow = document.getElementById(services[j].serviceDeskId);
            console.log("sevice");
            console.log(serviceRow);
            if (services[j].status == 0) {
                serviceRow.className = "service-row ok";
            }
            else {
                serviceRow.className = "service-row problem";
            }
        }
    }
}
//var elements = document.getElementsByClassName("category-row");
//for (int i = 0; i < elements.length; i++)
//{
//    var element = elements[i];
//    element.addEventListener('click', event => {
//        // get td elements of element
//        document.
//        element.innerHTML = `Click count: ${event.detail}`;
//    });
//}
var tables = document.getElementsByClassName("category-table");
for (var i = 0; i < tables.length; i++) {
    var element = tables[i].getElementsByTagName("th")[0];
    element.addEventListener('click', event => {
        var services = event.target.parentNode.parentNode.getElementsByTagName("td");
        for (var j = 0; j < services.length; j++) {
            services[j].classList.toggle("hidden");
        }
    }
    );
}
setTimeout(gator, 1500);
//setInterval(gator, 1500);

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