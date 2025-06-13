// import { useState } from "react";
import { useAuth } from "../customHooks/useAuth";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // connects yup to useForm

// const LoginPage = () => {
// states for login form input for manual state handling, removed when useForm() used
// const [email, setEmail] = useState("");
// const [password, setPassword] = useState("")
// --------------------------------------------
// const { login, loading, error } = useAuth();

// const navigate = useNavigate();

//-----------maunal state handling -------------
// const handleLogin = async () => {
//     if (!email || !password)
//         alert("Please enter email or password");
//     try {
//         await login(email, password);
//         navigate("/dashboard")
//     } catch (error) {
//         console.error(error);

//     }
// }------------------------------------------------
// return (
//     <>
//         <div style={{ textAlign: "center", padding: "20px" }}>
//             <h2>Login</h2>
//             <input
//                 type="email"
//                 placeholder="Enter e-mail"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)} />
//             <br />

//             <input type="password" placeholder="Enter password" value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             /> <br />

//             <button onClick={handleLogin} disabled={loading}>
//                 {loading ? "Logging in..." : "Login"}</button>

//             {error && <p style={{ color: "red" }}>{error}</p>}
//         </div>
//     </>


// );

// }
// ---------------------------------------------------------

type LoginFormInputs = {
    email: string;
    password: string;
}

const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("password is required"),
});

const LoginPage = () => {
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const {
        register,       // connects each input to the form
        handleSubmit,   // tells the form what to do when submitted
        formState: { errors }, // holds any validation error messages
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(schema), // Tells the form to use the validation schema
    });

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            await login(data.email, data.password);
            navigate("/dashboard")
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <>
            <div style={{ textAlign: "center", padding: "20px" }}>
                <h2>Enter credentials</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <input
                            type="email"
                            placeholder="email"
                            {...register("email")}
                        />
                        <p style={{ color: "red" }}>{errors.email?.message}</p>
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="password"
                            {...register("password")}
                        />
                        <p style={{ color: "red" }}>{errors.password?.message}</p>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        </>
    )
}
export default LoginPage