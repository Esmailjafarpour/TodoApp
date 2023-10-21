
const FormInput = ({label , name , type , value , onChange , placeholder}) => {
     return (
          <div className="form-input">
               <label htmlFor={name}>{label}</label>
               <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
               />
          </div>
     );
}

export default FormInput;
