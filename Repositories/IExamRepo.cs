using MyWebApi.Models;

namespace MyWebApi.Repositories
{
    public interface IExamRepo{
        
        Task <List<Exam>> GetAllExam();
        Task <List<Exam>> GetExamBysearch(string? id,string? name,string? date);
        Task addExam(Exam exam);

    }
}