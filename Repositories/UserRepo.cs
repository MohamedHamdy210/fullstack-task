using System.Data.SqlClient;
using Dapper;
using Microsoft.AspNetCore.Identity;
using MyWebApi.Models;
namespace MyWebApi.Repositories
{
    public class UserRepo : IUserRepo
    {
        private readonly IConfiguration _configuration;

        public UserRepo(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        private SqlConnection GetConnection(){
            return new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        }
       
        
        
        public async Task<User> GetUserByUserName(string username)
        {
            using var connection=GetConnection();
            var user = await connection.QueryFirstOrDefaultAsync<User>("select * from Users where username=@Username",new {Username=username});
            return user;
        }

        public async Task Register(string Username, string Password)
        {   var passwordHasher=new PasswordHasher<IdentityUser>();

            string HashedPassword=passwordHasher.HashPassword(null,Password);
            using var connection=GetConnection();
             await connection.ExecuteAsync("insert into Users  ( Username , Password ) values ( @Username , @HashedPassword ) ",new {Username,HashedPassword});              
        }
    }
}