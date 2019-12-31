const Users = require('./user.model');
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

exports.registration = async (req, res, next) => {
	try {
		const user_email = await Users.findOne({ email: req.body.email });
		if (user_email) {
			res.send('Email already exist');
		} else {
			const user = new Users({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				city: req.body.city,
				dob: req.body.dob,
				gender: req.body.gender,
				hobbies: req.body.hobbies,
				notes: req.body.notes,
				mobno: req.body.mobno
			});
			user.save(function (err) {
				if (err) {
					return next(err);
				}
				res.send('User Registeration Done successfully');
			});
		}
	} catch (error) {
		console.log('error =>', error);
	}
};

exports.authenticate = (req, res, next) => {
	const user = Users.findOne({ email: req.body.email, password: req.body.password }).lean()
		.then((data) => {
			if (data) {
				console.log(' 1 => ');
				const token = jwt.sign({ data: data._id }, "demo_token");
				delete data.password;
				res.status(200).json({
					message: 'Login successfully',
					status: 1,
					data,
					token: token
				});
			} else {
				console.log('2 => ', res);
				res.status(500).json({
					message: 'Login Failed',
					status: 0,
					data: null
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				message: 'Login Failed',
				status: 0,
				data: null
			});
			console.log('error => ', error);
		});
};

exports.sendMail = async (req, res, next) => {
	try {
		// create transporter object
		let transporter = nodemailer.createTransport({
			host: "smtp.1and1.com",
			port: 587,
			auth: {
				user: "av@narola.email",
				pass: "jDr05063J7f0mDb"
			}
		});

		const emailData = {
			from: req.body.fromEmail,
			to: req.body.ToEmail,
			subject: req.body.Subject,
			html: req.body.Message
		};
		let info = await transporter.sendMail({
			from: emailData.from,
			to: emailData.to,
			subject: emailData.subject,
			html: emailData.html
		});
		res.send(`An email successfully sent to ${emailData.to}`);
	} catch (e) {
		console.log(e);
		res.send(`An error occurred while sending email`);
	}
}
exports.getData = (req, res, next) => {
	Users.find() //fetches all the posts
		.then(result => {
			console.log('result => ', result);
			res.send(result);
		}).catch(err => {
			console.log('err => ', err);
			res.status(400).send(err);
		})
}

exports.updateUser = (req, res, next) => {
	const user = new Users({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		city: req.body.city,
		dob: req.body.dob,
		gender: req.body.gender,
		hobbies: req.body.hobbies,
		notes: req.body.notes,
		mobno: req.body.mobno
	});
	Users.findByIdAndUpdate(req.params._id, user, { new: true })
		.then(() => {
			res.send('User Updated successfully');
		})
		.catch((error) => {
			console.log('error => ', error);
		})
}
exports.getSingleUser = (req, res, next) => {
	Users.findById(req.params.id).lean() //fetches all the posts
		.then(result => {
			delete result.password
			res.send({ status: 1, message: "Recod Found", data: result });
		}).catch(err => {
			console.log('err => ', err);
			res.status(400).send(err);
		})
}

exports.deleteUser = (req, res, next) => {
	Users.findOneAndDelete(req.params.id) //fetches all the posts
		.then(result => {
			res.send({ status: 1, message: "Recod Deletes" });
		}).catch(err => {
			console.log('err => ', err);
			res.status(400).send(err);
		})
}
