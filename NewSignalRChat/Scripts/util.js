


    $(function () {

        $('#chatBody').hide();
        $('#knockout - app').hide();

        $('#loginBlock').show();

        // Ссылка на автоматически-сгенерированный прокси хаба
        var chat = $.connection.chatHub;
        // Объявление функции, которая хаб вызывает при получении сообщений
        chat.client.addMessage = function (name, message) {
            // Добавление сообщений на веб-страницу 
            $('#chatroom').append('<p><b>' + htmlEncode(name)
                + '</b> : ' + htmlEncode(message) + '</p>');
            $('#chatroom').children('p').toggleClass('messageSize');
            $('.messageSize').children('b').toggleClass('messageSizeB');
        };

        // Функция, вызываемая при подключении нового пользователя
        chat.client.onConnected = function (id, userName, allUsers) {

            $('#loginBlock').hide();
            $('#chatBody').show();
            $('input').removeClass('hide');

            // установка в скрытых полях имени и id текущего пользователя
            $('#hdId').val(id);
            $('#username').val(userName);
            $('#header').html('<h3>Добро пожаловать, ' + userName + '</h3>');
            $('h4').html('<span>Здравствуйте, ' + userName + '</span>');

            // Добавление всех пользователей
            for (i = 0; i < allUsers.length; i++) {

                AddUser(allUsers[i].ConnectionId, allUsers[i].Name);
            }
        }

        // Добавляем нового пользователя
        chat.client.onNewUserConnected = function (id, name) {

            AddUser(id, name);
        }

        // Удаляем пользователя
        chat.client.onUserDisconnected = function (id, userName) {

            $('#' + id).remove();
        }

        // Открываем соединение
        $.connection.hub.start().done(function () {

            $('#sendmessage').click(function () {
                // Вызываем у хаба метод Send
                chat.server.send($('#username').val(), $('#message').val());
                $('#message').val('');
            });

            // обработка логина
            $("#btnLogin").click(function () {

                var name = $("#txtUserName").val();
                if (name.length > 0) {
                    chat.server.connect(name);
                }
                else {
                    alert("Введите имя");
                }
            });

            $(".btnLogin11").click(function () {
                var name = $("#txtUserName1").val();
                var respectScore = $("#counter").text();
                
                if (name.length > 0) {
                    chat.server.sendRespect(name,respectScore);
                }
                else {
                    alert("Введите имя коллеги для уважения");
                }
            })
        });


    });


    // Кодирование тегов
    function htmlEncode(value) {
        var encodedValue = $('<div />').text(value).html();
        return encodedValue;
    }
    //Добавление нового пользователя
    function AddUser(id, name) {

        var userId = $('#hdId').val();

        if (userId != id) {

            $("#chatusers").append('<p id="' + id + '"><b>' + name + '</b></p>');
            $('#chatroom').children('p').toggleClass('messageSize');
            $('.messageSize').children('b').toggleClass('messageSizeB');
        }
    }



