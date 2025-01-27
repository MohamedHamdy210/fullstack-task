
/* eslint-disable react/prop-types */
const Model = ({ model, setIsvisiable }) => {
 
 

  
  return (
    <div className="overlay" onClick={() => setIsvisiable((prev) => !prev)}>
      <div
        className="model"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img src={`data:image/jpeg;base64,${model.img}`} alt="poster" />
        <button
          className="modal-close"
          onClick={() => setIsvisiable((prev) => !prev)}
        >
          ×
        </button>
      </div>

      <div
        className="patientInfo"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h1>Name: {model.name}</h1>
        <h3>Gender: {model.gender}</h3>

        <h3>Email: {model.email}</h3>
        <h3>Exam Type: {model.type}</h3>
        <h3>Exam Date: {model.date.split(" ")[0]}</h3>
        <h3>Comments: {model.comments}</h3>
        <h3>Status: {model.status}</h3>
      </div>
    </div>
  );
};

export default Model;
