using System.Data.SqlClient;
using Dapper;
using MyWebApi.Models;
namespace MyWebApi.Repositories
{
    public class ExamRepo : IExamRepo
    {
        private readonly IConfiguration _configuration;

        public ExamRepo(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        private SqlConnection GetConnection(){
            return new SqlConnection(_configuration.GetConnectionString("DefaultConnection"));
        }
       
        

        public async Task<List<Exam>> GetAllExam()
        {
            using var connection=GetConnection();
            var Exams = await connection.QueryAsync<Exam>("select * from exams ");
            return Exams.ToList();
        }

        public async Task<List<Exam>> GetExamBysearch(string? id,string? name,string? date)
        {
            using var connection=GetConnection();
            var query= "select * from exams where 1=1 ";
            if(!string.IsNullOrEmpty(id)){
                query+=" and PatientId=@id";
            }
            if(!string.IsNullOrEmpty(name)){
                query+=" and Name=@name";
            }
            if(!string.IsNullOrEmpty(date)){
                query+=" and Date=@date";
                    
            }
            var exams = await connection.QueryAsync<Exam>(query,new {id=id,name=name,date=date} );
            return exams.ToList();
        }
        public async Task addExam(Exam exam){
             using var connection=GetConnection();
             await connection.ExecuteAsync("insert into exams ( patientId , name , gender , birthdate , email , type , date , time , comments , status, img) values (@PatientId , @Name , @Gender , @BirthDate , @Email , @Type , @Date , @Time , @Comments , @Status , @Img) ",exam);              

        }
    }
}