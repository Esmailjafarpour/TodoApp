const RadioButton = ({title , value , state , setAllState , children}) => {
  return (
    <div className={value}>
      <label htmlFor={value}>
          {children}
          {title}
     </label>
      <input
        type="radio"
        id={value}
        value={value}
        onChange={(e) =>{
          setAllState({...state , status : e.target.value})}
        } 
        checked={state.status === value}
      />
    </div>
  );
};

export default RadioButton;
