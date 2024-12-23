import React from "react";
import axios from "axios";
import AuthIcon from "pages/AuthenticationInner/AuthIcon";
import { Facebook, Github, Mail, Twitter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik as useFormic } from "formik";

// Image
// import logoLight from "assets/images/logo-light.png";
// import logoDark from "assets/images/logo-dark.png";
import offiQuick from "assets/images/offiQuick.png";

const Register = () => {
    document.title = "Register | OffiQuick";

    const navigate = useNavigate(); // Use the useNavigate hook

    const validation = useFormic({
        enableReinitialize: true,

        initialValues: {
            email: "",
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required("Please Enter Your Email"),
            username: Yup.string().required("Please Enter Your Username"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: async (values) => {
            try {
                // Make API POST request
                const response = await axios.post("http://localhost:5000/api/users",{
                    name: values.username,
                    email: values.email,
                    password: values.password,
                });

                // Log the success response
                console.log("User registered:", response.data);

                // Navigate to another page after successful registration
                navigate("/master-dashboard");
            } catch (error) {
                // Handle errors
                console.error("Registration error:", error.response?.data || error.message);
                alert(error.response?.data.error || "Registration failed.");
            }
        },
    });

    React.useEffect(() => {
        const bodyElement = document.body;

        bodyElement.classList.add(
            'flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10',
            'bg-slate-50', 'dark:bg-zink-800', 'dark:text-zink-100', 'font-public'
        );

        return () => {
            bodyElement.classList.remove(
                'flex', 'items-center', 'justify-center', 'min-h-screen', 'py-16', 'lg:py-10',
                'bg-slate-50', 'dark:bg-zink-800', 'dark:text-zink-100', 'font-public'
            );
        };
    }, []);

    return (
        <React.Fragment>
            <div className="relative">

                <AuthIcon />

                <div className="mb-0 w-screen lg:w-[500px] card shadow-lg border-none shadow-slate-100 relative">
                    <div className="!px-10 !py-12 card-body">
                        <Link to="/">
                            <img src={offiQuick} alt="" className="hidden h-6 mx-auto dark:block" />
                            <img src={offiQuick} alt="" className="block h-6 mx-auto dark:hidden" />
                        </Link>

                        <div className="mt-8 text-center">
                            <h4 className="mb-1 text-custom-500 dark:text-custom-500">Create your free account</h4>
                            <p className="text-slate-500 dark:text-zink-200">Get your OffiQuick account now</p>
                        </div>

                        <form action="/" className="mt-10" id="registerForm"
                            onSubmit={(event) => {
                                event.preventDefault();
                                validation.handleSubmit();
                            }}>
                            <div className="mb-3">
                                <label htmlFor="email-field" className="inline-block mb-2 text-base font-medium">Email</label>
                                <input
                                    type="text"
                                    id="email-field"
                                    name="email"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    placeholder="Enter email"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.email || ""} />
                                {validation.touched.email && validation.errors.email ? (
                                    <div id="email-error" className="mt-1 text-sm text-red-500">{validation.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username-field" className="inline-block mb-2 text-base font-medium">UserName</label>
                                <input
                                    type="text"
                                    id="username-field"
                                    name="username"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    placeholder="Enter username"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.username || ""} />
                                {validation.touched.username && validation.errors.username ? (
                                    <div id="username-error" className="mt-1 text-sm text-red-500">{validation.errors.username}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="inline-block mb-2 text-base font-medium">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-input border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
                                    placeholder="Enter password"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.password || ""} />
                                {validation.touched.password && validation.errors.password ? (
                                    <div id="password-error" className="mt-1 text-sm text-red-500">{validation.errors.password}</div>
                                ) : null}
                            </div>
                            <p className="italic text-15 text-slate-500 dark:text-zink-200">By registering you agree to the OffiQuick <a href="#!" className="underline">Terms of Use</a></p>
                            <div className="mt-10">
                                <button type="submit" className="w-full text-white transition-all duration-200 ease-linear btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20">Register</button>
                            </div>

                            <div className="mt-10 text-center">
                                <p className="mb-0 text-slate-500 dark:text-zink-200">Already have an account? <Link to="/master-dashboard" className="font-semibold underline transition-all duration-150 ease-linear text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500">Login</Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Register;
