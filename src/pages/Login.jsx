import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import law from "../public/assets/images/law.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };
  return (
    <div className="min-h-screen flex">
      <form
        onSubmit={handleSubmit}
        className="flex px-5 justify-center items-center w-full"
      >
        <div className="flex flex-col bg-white rounded-2xl w-[430px] shadow-2xl p-6">
          <div className="flex gap-1 mt-4 justify-center items-center">
            <img src={law} alt="logo" />
          </div>
          <h1 className="mt-6 font-semibold text-4xl">Login</h1>
          <label className="mt-4">Email:</label>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-10 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <input
              className={error ? "p-2 w-full rounded-lg border border-red-500 placeholder-red-500 mt-1" : "p-2 w-full rounded-lg border mt-1"}
              type="email"
              placeholder="user01@google.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <label className="mt-4">Password:</label>
          <div className="flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-10 text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
            <input
              className={error ? "p-2 w-full rounded-lg border border-red-500 placeholder-red-500 mt-1" : "p-2 w-full rounded-lg border mt-1"}
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button disabled={isLoading} className="mt-8 mb-4 primary-btn">Log in now</button>
          {error && <div className="text-red-500 text-lg text-center">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default Login;
