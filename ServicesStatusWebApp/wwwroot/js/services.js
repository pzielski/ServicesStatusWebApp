"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/servicesHub").build();

connection.on("ReloadServices", function (message) {
    var myTable = document.getElementById("servicesTable");
    console.log(myTable);
    //clearTable(mytable);
    console.log(message);
    //console.log(message.length);
    //populateTable(mytable, message);

    //var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //var encodedmsg = msg;
    //var li = document.createelement("li");
    //li.textcontent = encodedmsg;
    //document.getelementbyid("messageslist").appendchild(li);
});
connection.start();
function gator() {
    console.log("foo");
    connection.invoke("ReloadServices").catch(function (err) {
        return console.error(err.toString());
    });
}
function clearTable(myNode) {
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}
function populateTable(parent, restaurants) {
    var len = restaurants.length;
    var i = 0;
    for (i = 0; i < len; i++) {
        var tr = document.createElement("tr");
        var name = document.createElement("td");
        var location = document.createElement("td");
        var cusine = document.createElement("td");
        name.textContent = restaurants[i].name;
        location.textContent = restaurants[i].location;
        cusine.textContent = restaurants[i].cusine;
        tr.appendChild(name);
        tr.appendChild(location);
        tr.appendChild(cusine);
        parent.appendChild(tr);

    }
}
setInterval(gator, 1500);