import loginImg from "../../public/wanderon-new-logo.webp";
import Template from "../Auth/Template";

function Login() {
  return (
    <Template
      title="Welcome To WanderOn, Please Login"
      description1="Global Community for Travelers"
      description2="Connecting People,
      Creating Memories"
      image={loginImg}
      formType="login"
    />
  );
}

export default Login;
