import { useForm } from "react-hook-form";
import http from "../../utils/http";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    http()
      .post("user/login", data)
      .then((response) => {
        const { token } = response.data
        if (token) {
          localStorage.setItem("token", token);
          window.location.reload();
        }
      });
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("userName")}
        className="px-1 placeholder-black text-black"
        placeholder="Nom d'utilisateur"
      />
      <input
        type="text"
        {...register("userPassword")}
        className="px-1 placeholder-black text-black"
        placeholder="Mot de passe"
      />
      <button type="submit">Se connecter </button>
    </form>
  );
}
