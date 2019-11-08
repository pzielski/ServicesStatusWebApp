"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/servicesHub").build();

connection.on("ReloadServices", function (message) {
    var myTable = document.getElementById("servicesTable");
    clearTable(myTable);
    populateTable(myTable, message);
});
connection.start();
function gator() {
    connection.invoke("ReloadServices").catch(function (err) {
        return console.error(err.toString());
    });
}
function clearTable(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}
function populateTable(parent, categories) {
    var len = categories.length;
    for (var i = 0; i < len; i++) {
        console.log(categories[i]);
        var categoryRow = document.createElement("tr");
        var categoryName = document.createElement("td");
        var categoryStatus = document.createElement("td");
        var categoryStatusIcon = document.createElement("i");
        categoryName.textContent = categories[i].name;
        if (categories[i].status == 0) {
            categoryStatusIcon.className = "glyphicon glyphicon-ok";
            categoryRow.className = "category-row ok";
        }
        else {
            categoryStatusIcon.className = "glyphicon glyphicon-remove";
            categoryRow.className = "category-row problem";
        }
        categoryStatus.appendChild(categoryStatusIcon);
        categoryRow.appendChild(categoryName);
        categoryRow.appendChild(categoryStatus);
        parent.appendChild(categoryRow);
        var services = categories[i].services;
        var servicesLen = services.length;
        for (var j = 0; j < servicesLen; j++) {
            var serviceRow = document.createElement("tr");
            var serviceName = document.createElement("td");
            var serviceStatus = document.createElement("td");
            var serviceStatusIcon = document.createElement("i");
            
            serviceName.textContent = " \t\t" + services[j].name;
            console.log(serviceName.textContent);
            if (services[j].status == 0) {
                serviceStatusIcon.className = "glyphicon glyphicon-ok";
                serviceRow.className = "service-row ok";
            }
            else {
                serviceStatusIcon.className = "glyphicon glyphicon-remove";
                serviceRow.className = "service-row problem";
            }
            serviceStatus.appendChild(serviceStatusIcon);
            serviceRow.appendChild(serviceName);
            serviceRow.appendChild(serviceStatus);
            parent.appendChild(serviceRow);
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
//setTimeout(gator, 1500);
//setInterval(gator, 1500);