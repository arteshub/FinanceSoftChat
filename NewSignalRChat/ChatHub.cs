using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using NewSignalRChatDB;
using NewSignalRChat.ServiceReference1 ;
using System.Runtime.InteropServices;

namespace SignalRMvc.Hubs
{
    public class ChatHub : Hub
    {
        public SignalRChatEntities chatDB = new SignalRChatEntities();

        // Отправка сообщений
        public void Send(string name, string message)
        {
            Clients.All.addMessage(name, message);
        }

        //Отправка уважения
        public void SendRespect(string name, string respectScore)
        {
            Console.WriteLine(name, respectScore);


            var chatUser = chatDB.Users
      
            .Where(c => c.Name == name)
            .FirstOrDefault();
            chatUser.RespectScore = Convert.ToInt32(respectScore);

            chatDB.SaveChanges();

        }


        // Подключение нового пользователя
        public void Connect(string userName)
        {
            var id = Context.ConnectionId;


            if (!chatDB.Users.Any(x => x.ConnectionId == id))
            {
                 chatDB.Users.Add(new Users { ConnectionId = id, Name = userName }); 
                //Добавление через Entity
               chatDB.SaveChanges();

                //добавление данных через WCF

                //NewSignalRChat.ServiceReference1.Service1Client client = new NewSignalRChat.ServiceReference1.Service1Client ();

                //InsertUser u = new InsertUser();
                //u.ConnectionId = id;
                //u.Name = userName;
                //string r = client.Insert(u);

                // Посылаем сообщение текущему пользователю
                Clients.Caller.onConnected(id, userName, chatDB.Users);

                // Посылаем сообщение всем пользователям, кроме текущего
                Clients.AllExcept(id).onNewUserConnected(id, userName);
            }
        }

        // Отключение пользователя
        public override System.Threading.Tasks.Task OnDisconnected(bool stopCalled)
        {
            var item = chatDB.Users.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);
            if (item != null)
            {
                chatDB.Users.Remove(item);
                var id = Context.ConnectionId;
                Clients.All.onUserDisconnected(id, item.Name);
            }

            return base.OnDisconnected(stopCalled);
        }
    }
}