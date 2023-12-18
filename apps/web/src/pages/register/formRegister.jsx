import {
	Flex,
	Text,
	Input,
	FormControl,
	FormLabel,
	InputGroup,
	InputLeftElement,
	FormErrorMessage
} from "@chakra-ui/react";
import { MyButton } from "../../components/Button";
import { CiMail, CiUser } from "react-icons/ci";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const registerSchema = Yup.object().shape({
	username: Yup.string()
	.matches(
		/^\S{5,}$/,
		"username is invalid"
	)
	.required("username is required"),
		email: Yup.string()
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"email is invalid"
		)
		.required("Email is required"),
});

export const FormRegister = () => {

	const Register = async (username, email, password) => {
		try {
			await axios.post("http://localhost:8000/api/auth/register", {
				username,
				email,
				password,
				fullname: username
			})
			alert(`Email vierification sudah terkirim ke email ${email}, sialhakan cek email anda`)
		} catch (err) {
			alert(err.response?.data)
		}
	}

	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "pass12345",
		},
		validationSchema: registerSchema,
		onSubmit: (values) => {
			Register(values.username, values.email, values.password)
		}
	})


	return (
		<form style={{ width: "100%", height: "fit-content" }} onSubmit={formik.handleSubmit}>
			<Flex direction={"column"} gap={10} h={"fit-content"}>
				<Flex direction={"column"} gap={"40px"}>
					<FormControl
						bgColor={"#F3F4F6FF"}
						borderRadius={"4px"}
						pt={"5px"}
						isInvalid={formik.touched.username && formik.errors.username}
					>
						<FormLabel m={" 0 0 0 13px"}>Username</FormLabel>
						<InputGroup>
							<InputLeftElement fontSize={"20px"}>
								<CiUser />
							</InputLeftElement>
							<Input
								placeholder="Enter username"
								variant={"unstyled"}
								h={"40px"}
								name="username"
								value={formik.values.username}
								onChange={formik.handleChange}
							/>
						</InputGroup>
						{formik.touched.username && formik.errors.username && (
              <FormErrorMessage position={"absolute"}>{formik.errors.username}</FormErrorMessage>
            )}
					</FormControl>

					<FormControl
						bgColor={"#F3F4F6FF"}
						borderRadius={"4px"}
						pt={"5px"}
						isInvalid={formik.touched.email && formik.errors.email}
					>
						<FormLabel m={" 0 0 0 13px"}>Email</FormLabel>
						<InputGroup>
							<InputLeftElement fontSize={"20px"}>
								<CiMail />
							</InputLeftElement>
							<Input
								placeholder="Enter email"
								variant={"unstyled"}
								h={"40px"}
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
							/>
						</InputGroup>
						{formik.touched.email && formik.errors.email && (
              <FormErrorMessage position={"absolute"}>{formik.errors.email}</FormErrorMessage>
            )}
					</FormControl>
				</Flex>

				<MyButton type="submit" value={<Text>Sign up</Text>} />
			</Flex>
		</form>
	);
};
