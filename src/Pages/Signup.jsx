import signupImg from "../../public/wanderon-new-logo.webp";
import Template from "../Auth/Template";

function Signup() {
  return (
    <Template
      title="Welcome To WanderOn, Please Create Your Account To Get Access"
      description1="Global Community for Travelers"
      description2="Connecting People,
      Creating Memories"
      image={signupImg}
      formType="signup"
    />
  );
}

export default Signup;
