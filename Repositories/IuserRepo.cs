using MyWebApi.Models;

namespace MyWebApi.Repositories
{
    public interface IUserRepo{
        
        Task <User> GetUserByUserName(string username);
        Task Register(string username,string password);
    }
}