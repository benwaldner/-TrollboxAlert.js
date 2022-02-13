// ==UserScript==
// @name         BitMEX Trollbox Alert
// @namespace    https://bitmex.com/
// @version      0.1
// @description  Alert on BitMEX trollbox posts by username and keyword
// @author       I love Ketchup (contact me in the BitMEX trollbox)
// @homepage     userinfo.servehttp.com
// @homepageURL  userinfo.servehttp.com
// @website      userinfo.servehttp.com
// @source       userinfo.servehttp.com
// @supportURL   userinfo.servehttp.com
// @match        https://www.bitmex.com/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==


// Tired of BitMEX fees? Get 10% discount on BitMEX fees by using this link to register:
// https://www.bitmex.com/register/Yq1b9D

(function() {
    'use strict';
    let keywordList = [];
    let userList = [];
    let lastMessage = "";
    let soundPlayedInForeground = 0;


    let isFirefox = typeof InstallTrigger !== 'undefined';

    // Bitmex delivered sounds (for Opera and Chrome):
    // click_hard, click_off, click_soft, click_toggle, pop
    let keywordSound = "pop";
    let usernameSound = "click_toggle";
    let rEKTSound = "click_toggle";
    let startSound = "pop";

    if(isFirefox){
        keywordSound = new Audio("http://soundbible.com/grab.php?id=1645&type=mp3");
        usernameSound = new Audio("http://soundbible.com/grab.php?id=1619&type=mp3");
        rEKTSound = new Audio("http://soundbible.com/grab.php?id=1948&type=mp3");
        //License: Attribution 3.0, Recorded by Mike Koenig:
        startSound = new Audio("http://soundbible.com/grab.php?id=1003&type=mp3");
    }

    const insertAlertButton = () => {
        $('.popUpChat .widget-controls .openIcon').before('<i id="ketchup_alertbutton" class="fa fa-volume-mute2"></i>');
        $('#ketchup_alertbutton' ).click(function() {
            if(soundPlayedInForeground == 0){
                if (!isFirefox){
                    window.BitMEX.playSound(startSound);
                }else{
                    startSound.play(); // Play sound once while in foreground because of firefox security settings
                }
                    $('#ketchup_alertbutton').removeClass("fa-volume-mute2");
                $('#ketchup_alertbutton').addClass("fa-volume-medium");
                soundPlayedInForeground = 1;
            }
            if ($('#ketchup_alertlistwidget').length){
                $('#ketchup_alertlistwidget').remove();
                $('#ketchup_keywordtextarea').remove();
                $('#ketchup_usernametextarea').remove();
            }else{
                showAlertList();
            }
        });
    };

    const showAlertList = () => {

        $('.chatInput').after('<span id="ketchup_alertlistwidget" class="emojiPicker"><div class="emojiPickerTabs"><span id="ketchup_alertcounter">Alerts (' + (keywordList.length + userList.length)  + ')</span><span id="ketchup_alertlistwidgetclose" class="close emojiPickerEmoji">✖️</span></div><span id="ketchup_alertlistsection" class="emojiPickerBody webkit-scrollbars"></span></span>')

        $('#ketchup_alertlistsection').append('<div class="body"><div class="chatWidget"><div id="ketchup_alertlist" class="resizesensor-wrapper"></div></div></div>');

        for (var j = 0; j < userList.length; j++) {
            $('#ketchup_alertlist').append('<div class="chatSection ketchup_username" style="border-color: rgb(242, 157, 157);"><span class="chatMessage showUsername"><span class="userName">Username: </span><span class="userName">' + userList[j] + '</span><a class="user" title=""><i class="fa fa-close ketchup_delete_alert" data-username="' + userList[j] + '" style="background: #F2304E; float: right; padding: 1px 3px 5px 3px;"></i></a></span></div>');
        }

        for (var i = 0; i < keywordList.length; i++) {
            $('#ketchup_alertlist').append('<div class="chatSection ketchup_keyword" style="border-color: rgb(242, 157, 157);"><span class="chatMessage showUsername"><span class="userName">Keyword: </span><span class="userName">' + keywordList[i] + '</span><a class="user" title=""><i class="fa fa-close ketchup_delete_alert" data-username="' + keywordList[i] + '" style="background: #F2304E; float: right; padding: 1px 3px 5px 3px;"></i></a></span></div>');
        }

        $('#ketchup_alertlistwidgetclose').click(function() {
            $('#ketchup_alertlistwidget').remove();
            $('#ketchup_keywordtextarea').remove();
            $('#ketchup_usernametextarea').remove();
        });

        applyDeleteAlertClickListener();

        $('#ketchup_alertlistwidget').after('<textarea id="ketchup_keywordtextarea" class="form-control" placeholder="Type keywords. Enter to save." rows="1" autocomplete="false"></textarea>');
        $('#ketchup_keywordtextarea').after('<textarea id="ketchup_usernametextarea" class="form-control" placeholder="Type username. Enter to save." rows="1" autocomplete="false"></textarea>');

        $('#ketchup_usernametextarea').keydown(function(event) {

            let input = $('#ketchup_usernametextarea').val(); // needed because of reactjs
            let keycode = event.keyCode || event.which;
            if(keycode == '13' && input != "") {
                $("#ketchup_usernametextarea").attr("placeholder", "Type username. Enter to save.").val("").focus().blur(); // thank reactjs
                userList.push( input );
                localStorage.setItem('userList', userList);
                if (userList.length >= 2){
                    $('#ketchup_alertlist .ketchup_username.chatSection:contains("' + userList[userList.length-2] + '")').after('<div class="ketchup_username chatSection" style="border-color: rgb(242, 157, 157);"><span class="chatMessage showUsername"><span class="userName">Username: </span><span class="userName">' + userList[userList.length-1] + '</span><a class="user" title=""><span class="fa fa-close ketchup_delete_alert" data-username="' + userList[userList.length-1] + '" style="background: #F2304E; float: right; padding: 1px 3px 5px 3px;"></span></a></span></div>');
                }else{
                    $('#ketchup_alertlist').append('<div class="ketchup_username chatSection" style="border-color: rgb(242, 157, 157);"><span class="chatMessage showUsername"><span class="userName">Username: </span><span class="userName">' + userList[userList.length-1] + '</span><a class="user" title=""><span class="fa fa-close ketchup_delete_alert" data-username="' + userList[userList.length-1] + '" style="background: #F2304E; float: right; padding: 1px 3px 5px 3px;"></span></a></span></div>');
                }
            }
            $('#ketchup_alertcounter').text('Alerts (' + (keywordList.length + userList.length) + ')' );
            applyDeleteAlertClickListener();
        });

        $('#ketchup_keywordtextarea').keydown(function(event) {
            let input = $('#ketchup_keywordtextarea').val(); // needed because of reactjs
            let keycode = event.keyCode || event.which;
            if(keycode == '13' && input != "") {

                $("#ketchup_keywordtextarea").attr("placeholder", "Type keywords. Enter to save.").val("").focus().blur(); // thank reactjs
                keywordList.push( input );
                localStorage.setItem('keywordList', keywordList);
                if (keywordList.length >= 2){
                    $('#ketchup_alertlist .ketchup_keyword.chatSection:contains("' + keywordList[keywordList.length-2] + '")').after('<div class="ketchup_keyword chatSection" style="border-color: rgb(242, 157, 157);"><span class="chatMessage showUsername"><span class="userName">Keyword: </span><span class="userName">' + keywordList[keywordList.length-1] + '</span><a class="user" title=""><span class="fa fa-close ketchup_delete_alert" data-username="' + keywordList[keywordList.length-1] + '" style="background: #F2304E; float: right; padding: 1px 3px 5px 3px;"></span></a></span></div>');
                }else{
                    $('#ketchup_alertlist').append('<div class="ketchup_keyword chatSection" style="border-color: rgb(242, 157, 157);"><span class="chatMessage showUsername"><span class="userName">Keyword: </span><span class="userName">' + keywordList[keywordList.length-1] + '</span><a class="user" title=""><span class="fa fa-close ketchup_delete_alert" data-username="' + keywordList[keywordList.length-1] + '" style="background: #F2304E; float: right; padding: 1px 3px 5px 3px;"></span></a></span></div>');
                }

            }
            $('#ketchup_alertcounter').text('Alerts (' + (keywordList.length + userList.length) + ')' );
            applyDeleteAlertClickListener();
        });

    };

    // Apply click listener to the delete alert buttons
    const applyDeleteAlertClickListener = () => {

        $('.ketchup_delete_alert').click(function() {
            $('#ketchup_alertlist .ketchup_keyword.chatSection:contains("' + $(this).attr("data-username") + '")').remove();
            $('#ketchup_alertlist .ketchup_username.chatSection:contains("' + $(this).attr("data-username") + '")').remove();


            let keywordIndex = keywordList.indexOf($(this).attr("data-username"));
            if (keywordIndex !== -1) {
                keywordList.splice(keywordIndex, 1);
                localStorage.setItem('keywordList', keywordList);
            }
            let userIndex = userList.indexOf($(this).attr("data-username"));
            if (userIndex !== -1) {
                userList.splice(userIndex, 1);
                localStorage.setItem('userList', userList);
            }
            $('#ketchup_alertcounter').text('Alerts (' + (keywordList.length + userList.length) + ')' );
        });
    };

    Array.prototype.diff = function(a) {
        return this.filter(function(i) {return a.indexOf(i) < 0;});
    };

     const onNewChatMessage = (user, message) => {

         user = user.split(" ")[1].split(":")[0];
         if ( userList.indexOf(user) != -1 ){
             $('.chatWidget .chats .chatSection .chatMessage').last().css("background-color","rgba(255, 128, 128, 0.4)");
             if (user == "REKT"){
                if (!isFirefox){
                    window.BitMEX.playSound(rEKTSound);
                }else{
                    rEKTSound.play();
                }
             }else{
                 if (!isFirefox){
                    window.BitMEX.playSound(usernameSound);
                }else{
                    usernameSound.play();
                }
             }
         }

         for (var i = 0; i < keywordList.length; i++){
             if ( message.search(keywordList[i]) != -1){
               $('.chatWidget .chats .chatSection .chatMessage').last().css("background-color","rgba(97, 143, 176,0.4)");

                if (!isFirefox){
                    window.BitMEX.playSound(keywordSound);
                }else{
                    keywordSound.play();
                }
                break;
             }
         }

     };

     const initChatListener = () => {
         lastMessage = $('.chatWidget .chats .chatSection').last().text();
         $(".chatWidget .chats").on('DOMSubtreeModified', function() {
             let chatMsg = $('.chatWidget .chats .chatSection .chatMessage').last().text();
             let user = $('.chatWidget .chats .chatSection .chatMessage .user').last().text();
             let msg = $('.chatWidget .chats .chatSection .chatMessage .message').last().text();
             if (lastMessage == chatMsg){
                 return;
             }
             onNewChatMessage(user, msg);
             lastMessage = $('.chatWidget .chats .chatSection').last().text();
         });

     };

    // Wait for the page to load completely
    $(document).ready(function() {
        // Wait for the page to REALLY load completely
        setTimeout(function() {
            if (localStorage.getItem('keywordList') != null ){
                keywordList = localStorage.getItem('keywordList').split(",");
                if (keywordList[0] == "") {keywordList = []} //wtf empty string?
            }
            if (localStorage.getItem('userList') != null ){
                userList = localStorage.getItem('userList').split(",");
                if (userList[0] == "") {userList = ["REKT"]} //wtf empty string?
            }
            // For Opera
            $('head').append('<meta http-equiv="Content-Security-Policy" content="media-src \'self\' http://soundbible.com">');
            insertAlertButton();
            initChatListener();
        }, 10000);
    });
})();
