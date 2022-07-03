using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace WCF
{
    // ПРИМЕЧАНИЕ. Команду "Переименовать" в меню "Рефакторинг" можно использовать для одновременного изменения имени класса "Service1" в коде, SVC-файле и файле конфигурации.
    // ПРИМЕЧАНИЕ. Чтобы запустить клиент проверки WCF для тестирования службы, выберите элементы Service1.svc или Service1.svc.cs в обозревателе решений и начните отладку.
    public class Service1 : IService1
    {
        public string Insert(InsertUser user)
        {
            string msg;
            SqlConnection con = new SqlConnection(@"Data Source=(localdb)\MSSQLLocalDb;Initial Catalog=SignalRChat;Persist Security Info=False") ;
            con.Open();
            SqlCommand cmd = new SqlCommand("Insert into Users (ConnectionId,Name) values (@ConnectionId,@Name)",con);

            cmd.Parameters.AddWithValue("@ConnectionId", user.ConnectionId);
            cmd.Parameters.AddWithValue("@Name", user.Name);

            int g = cmd.ExecuteNonQuery();
            if (g == 1)
            {
                msg = "Succes";
            }
            else
            {
                msg = "Error";
            }

            return msg;
        }

      
    }
}
