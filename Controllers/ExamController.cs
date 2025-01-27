using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MyWebApi.Models;
using MyWebApi.Repositories;

namespace MyWebApi.Controllers
{
    [Route("api/exams")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        private readonly IExamRepo _ExamRepo;

        public ExamController(IExamRepo examRepo)
        {
            _ExamRepo = examRepo;
        }
       
        [HttpGet]
        public async Task<ActionResult<List<Exam>>> GetAllExams(){
            var exams= await _ExamRepo.GetAllExam(); 
            if(exams==null){
              return  NotFound();
            }
            return Ok(exams);
        }
        [Route("search")]
        [HttpGet]
        public async Task<ActionResult<List<Exam>>> GetExamBySearch(string? id,string? name,string? date){
            
            
            
            var exams= await _ExamRepo.GetExamBysearch(id,name,date); 
            if(exams==null){
              return  NotFound();
            }
            return Ok(exams);
        }
        [Route("addExam")]
        [HttpPost]
        public async Task<ActionResult> AddExam([FromBody] JsonElement jsonElement){
            var tempExam = JsonSerializer.Deserialize<TempExam>(jsonElement);
             byte[] imageBytes = null;
        if (!string.IsNullOrEmpty(tempExam.Img))
        {
            imageBytes = Convert.FromBase64String(tempExam.Img);
        }
                    var exam = new Exam
        {
            PatientId = tempExam.Id,
            Name = tempExam.Name,
            Gender = tempExam.Gender,
            BirthDate = tempExam.BirthDate,
            Email = tempExam.Email,
            Type = tempExam.Type,
            Date = tempExam.Date,
            Time = tempExam.Time,
            Comments = tempExam.Comments,
            Status = tempExam.Status,
            Img = imageBytes // Assign the byte array
        };

            await _ExamRepo.addExam(exam);
            return Ok("Added");
        }
       
    }
    public class TempExam
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Gender { get; set; }
    public string BirthDate { get; set; }
    public string Email { get; set; }
    public string Type { get; set; }
    public string Date { get; set; }
    public TimeSpan Time { get; set; }
    public string Comments { get; set; }
    public string Status { get; set; }
    public string Img { get; set; } // Img as Base64 string
}    
}