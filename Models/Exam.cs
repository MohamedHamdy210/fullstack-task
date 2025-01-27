namespace MyWebApi.Models
{
    public class Exam{
        public  int  ExamId { get; set; }        
        public  int  PatientId { get; set; }        
        public  string Name { get; set; }
        public   string Gender { get; set; }
        public   string BirthDate { get; set; }
        public  string Email { get; set; }
        public   string Type { get; set; }
        
        public  string Date { get; set; }
        public   TimeSpan Time { get; set; }
        public  string Comments { get; set; }
        public  string Status { get; set; }
        public  byte[] Img { get; set; }
    }
}