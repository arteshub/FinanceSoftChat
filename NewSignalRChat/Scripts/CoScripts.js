






function CounterViewModel() {
    var self = this;
    self.userName = ko.observable("Пользователь");
    self.count = ko.observable(0);

    self.increase = function () {
        var currentValue = self.count();
        if (currentValue < 10) {
            self.count(currentValue + 1);   
        }
    }

    self.decrease = function () {
        var currentValue = self.count();
        if (currentValue > 0) {
            self.count(currentValue - 1);
        }
    }
    self.alert = function () {

        if (document.getElementById('txtUserName').value !== "") {
             var element = document.getElementById("card");
        element.classList.add("nonHidden");
        }
       
       
    }

    self.respect = function () {
        $('#respectSend').click(function () {
            // Вызываем у хаба метод SendRespect
            chat.server.sendRespect($('#txtUserName1').val(), ('#counter').text());
            
        });
        console.log("Уважение в размере", document.getElementById('counter').innerHTML, document.getElementById('txtUserName1').value);
    }

    self.collegeStatus = ko.computed(function () {
        if (self.count() === 1) {
            return "НЕ В ВОСТОРГЕ."
        }
        if (self.count() === 5) {
            return "СЛАБО РАД..."
        }
        if (self.count() > 5) {
            return "СИЛЬНО РАД!"
        }
        if (self.count() === 5) {
            return "СЛАБО РАД..."
        }
        return "ЗОЛ!"
    });


};

const knockoutApp = document.querySelector("#knockout-app");
ko.applyBindings(new CounterViewModel(), knockoutApp);



