using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyWebApi.Models;
using MyWebApi.Repositories;

namespace MyWebApi.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _UserRepo;
        private readonly IConfiguration _config;


        public UserController(IUserRepo userRepo, IConfiguration config)
        {
            _UserRepo = userRepo;
            _config=config;
        }
       
        [HttpPost("login")]
        public async Task<ActionResult<List<User>>> Login([FromBody] LoginModel model){
            var user= await _UserRepo.GetUserByUserName(model.Username);
            if(user==null){
              return  Unauthorized(new {message="Invalid username or password"});
            }
            var PasswordHasher=new PasswordHasher<IdentityUser>();
            var result=PasswordHasher.VerifyHashedPassword(null,user.Password,model.Password);
            if( result== PasswordVerificationResult.Failed){
              return  Unauthorized();

            }
            var token= GenerateToken(model.Username);
            return Ok(new {token});
        }

        [HttpPost("register")]
        public async Task<ActionResult> Regieter([FromBody]LoginModel model ){
            await _UserRepo.Register(model.Username,model.Password);
            var token=GenerateToken(model.Username);
            return Ok(new {message="Registration completed successfully.", token});
        }
         private string GenerateToken(string username)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username)
        };

        var token = new JwtSecurityToken(
            expires: DateTime.Now.AddMinutes(60), 
            claims: claims,
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    }
     public class LoginModel
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
