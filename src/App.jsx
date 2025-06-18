import "./App.css";
import { useState } from "react";
import { useStore } from "./hooks/useStore";

const sendFormData = (formData) => {
  console.log(formData);
};

function App() {
  const { getState, updateState } = useStore();
  const { email, password, repeated_password } = getState();
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    repeated_password: null,
  });

  const submitForm = (event) => {
    event.preventDefault();
    const { email, password, repeated_password } = getState();
    const newErrors = {};

    if (!email.trim()) newErrors.email = "Поле не может быть пустым!";
    if (!password.trim()) newErrors.password = "Поле не может быть пустым!";
    if (!repeated_password.trim())
      newErrors.repeated_password = "Поле не может быть пустым!";

    const hasErrors = Object.values(newErrors).some((err) => err !== null);

    if (hasErrors) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    sendFormData(getState());
  };

  const setInputValue = (event) => {
    const { name, value } = event.target;
    const currentState = getState();

    const updatedState = {
      ...currentState,
      [name]: value,
    };

    let newErrors = { ...errors };

    if (
      name === "email" &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(value)
    ) {
      newErrors.email = "Неверный формат почты!";
    } else if (name === "email") {
      newErrors.email = null;
    }

    if (
      updatedState.password &&
      updatedState.repeated_password &&
      updatedState.password !== updatedState.repeated_password
    ) {
      newErrors.password = "Пароли не совпадают!";
      newErrors.repeated_password = "Пароли не совпадают!";
    } else {
      newErrors.password = null;
      newErrors.repeated_password = null;
    }

    updateState(name, value);
    setErrors(newErrors);
  };

  const onInputBlur = ({ target }) => {
    const { name, value } = target;
    let blurErrors = { ...errors };

    if (!value.trim()) {
      blurErrors[name] = "Поле не может быть пустым!";
    } else {
      blurErrors[name] = null;
    }

    setErrors(blurErrors);
  };

  const hasErrors = Object.values(errors).some((error) => error !== null);

  return (
    <>
      <h1 className="text-3xl font-bold mb-10">Регистрация</h1>
      <form className="flex flex-col gap-5" onSubmit={submitForm}>
        <div className="form-item flex flex-col items-start gap-2">
          <p className="label-form font-bold">Email</p>
          <input
            className="border-1 w-full p-1 rounded-md"
            type="email"
            name="email"
            onChange={setInputValue}
            onBlur={onInputBlur}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="form-item flex flex-col items-start gap-2">
          <p className="label-form font-bold">Password</p>
          <input
            className="border-1 w-full p-1 rounded-md"
            type="password"
            name="password"
            onChange={setInputValue}
            onBlur={onInputBlur}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="form-item flex flex-col items-start gap-2">
          <p className="label-form font-bold">Repeat password</p>
          <input
            className="border-1 w-full p-1 rounded-md"
            type="password"
            name="repeated_password"
            onChange={setInputValue}
            onBlur={onInputBlur}
          />
          {errors.repeated_password && (
            <p className="text-xs text-red-500">{errors.repeated_password}</p>
          )}
        </div>
        <button
          disabled={hasErrors}
          className={`p-2 rounded bg-blue-500 text-white ${
            hasErrors ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
          }`}
        >
          Зарегистрироваться
        </button>
      </form>
    </>
  );
}

export default App;
