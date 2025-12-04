import "./formfielderror.css";
interface FormFieldError {
  error?: string;
  id?: string;
}

const FormFieldError = ({ error, id }: FormFieldError) => {
  return (
    <span className="form-field-error" id={id} role="alert">
      {error}
    </span>
  );
};

export default FormFieldError;
