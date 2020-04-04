export default class AuthValidation {
	constructor() {
		this.emailRegexp = /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u;
		this.loginRegexp = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i;
	}
	validateEmail(email) {
		const { emailRegexp } = this;
		if (!email.match(emailRegexp)) {
			return 'Email is invalid';
		} else {
			return null;
		}
	}
	validateLogin(login) {
		const { loginRegexp } = this;
		if (login.length > 20) {
			return 'Login is too long';
		} else if (login.length < 5) {
			return 'Login is too short';
		} else if (!loginRegexp.test(login)) {
			return 'Login contains forbidden characters';
		} else {
			return null;
		}
	}
	validatePassword(password) {
		const isPasswordContainsNumbers = password.split('').some((letter) => /^[0-9]$/.test(letter));
		const isPasswordContainsLetters = password
			.split('')
			.some((letter) => /^[A-Za-z]$/.test(letter));
		if (password.length > 26) {
			return 'Password is too long';
		} else if (password.length < 8) {
			return 'Password is too short';
		} else if (!isPasswordContainsNumbers) {
			return 'Password must contains numbers';
		} else if (!isPasswordContainsLetters) {
			return 'Password must contains latin letters';
		} else {
			return null;
		}
	}
	validateRepeatPassword(password, repeatPassword) {
		if (password !== repeatPassword) {
			return 'Passwords are not match';
		} else {
			return null;
		}
	}
}
