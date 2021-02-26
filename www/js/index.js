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

let list = $("ul")[0];
let addTaskButton = $(".buttonTask").click(function(){
    addTask();
});

// getStructure();

addTask();

addOnClickListeners();

function getStructure() {
    if (localStorage.getItem("listEntries") != null) {
        localStorage.getItem("listEntries").li.forEach(i => {
            addTask(i);
        });
    }
}

function addOnClickListeners() {
    $(".close").click(function(){
        $(this).parent().remove()
        $("ul").listview('refresh');
    });
}

function addTask(element = null) {
    let value = $(".inputTask")[0].value;

    if (element === null && value !== "") {
        $("ul").append('<li>' + value + '<span class="close">x</span></li>')
    } else if (element !== null) {
        $("ul").append('<li>' + element + '<span class="close">x</span></li>')
    }

    $("ul").listview('refresh');

    // localStorage.setItem("listEntries", JSON.stringify({"li": $("ul").children().toArray().firstChild.data}))

    addOnClickListeners();
}