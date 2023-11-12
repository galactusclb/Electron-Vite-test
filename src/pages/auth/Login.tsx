import { LoginForm } from "features/authentication";
import React from "react";

const Login = () => {
	return (
		<div className="container py-5">
			<div className="row">
				<div className="col-lg-5 mx-auto">
					<LoginForm />
				</div>
			</div>
		</div>
	);
};

export default Login;
