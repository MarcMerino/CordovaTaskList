/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

let liList = [];
let addTaskButton = $(".buttonTask").click(function(){addTask();});
let inputField = $(".inputTask");

inputField.on('keyup', function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function getStructure() {
    if (localStorage.getItem("listEntries") != null) {
        JSON.parse(localStorage.getItem("listEntries")).li.forEach(i => {
            addTask(i);
        });
    }

    $("ul").listview().listview('refresh');

    saveActualList();
}

function addOnClickListeners() {
    $(".close").click(function(){
        $(this).parent().remove();
        $("ul").listview().listview('refresh');
        saveActualList();
    });
}

function addTask(element = null) {
    let value = inputField[0].value;
    if (element === null && value !== "") {
        $("ul").append('<li class="hoverEffect">' + value + '<span class="close">x</span></li>')
    } else if (element !== null) {
        $("ul").append('<li class="hoverEffect">' + element + '<span class="close">x</span></li>')
    }

    inputField[0].value = "";
    saveActualList();
   
    $("ul").listview().listview('refresh');

    addOnClickListeners();
}

function saveActualList() {
    liList = [];
    $("ul").children().toArray().forEach(i => {
        liList.push(i.firstChild.data);
    });

    localStorage.setItem("listEntries", JSON.stringify({"li": liList}))
}

getStructure();
addOnClickListeners();