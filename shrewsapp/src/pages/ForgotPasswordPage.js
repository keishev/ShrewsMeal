import React from "react";

const ForgotPasswordPage = () => {
    const [values, setValues] = useState ({
        username: '',
        oldPassword: '',
        newPassword: ''
    })

    const handleReset = async (event) => {
        event.preventDefault ();
    }

    return (
        <div className="main-container">
            <form onSubmit={ handleReset } className="form">
                <h1 className="heading">Reset Password</h1>

                <div className="user-pass-container">
                <label className="label">username</label>
                <input
                    value={values.username}
                    onChange= { e => setValues ({...values, username: e.target.value}) }    // we only update the name value
                    className="input"
                    placeholder="Enter your username"
                    required
                />

                <label className="label">password</label>
                <div class="password-container">
                    <input
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={ e => setValues ({...values, password: e.target.value}) }    // we only update the password value
                    className="password-input"
                    placeholder="Enter your password"
                    required
                    />
                    <span onClick={ toggleShowPassword } className='icon'>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                </div>

                <div>
                {error && <p className="error">{ error }</p>}
                </div>

                <button className="button">
                LOG IN
                </button>
            </form>
        </div>
    )
}

export default ForgotPasswordPage;