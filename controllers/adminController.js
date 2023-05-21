import Model from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();
import generateToken from "./authController.js";

// this function is to fetch all the admins
export async function getAdmin(req, res, next) {
  Model.find({})
    .then((response) => {
      res.status(200).send({ status: 200, response });
    })
    .catch((err) => {
      next(err);
    });
}

// this function is to create a new admin
export async function Add(req, res, next) {
  const model = new Model(req.body);
  await model
    .save()
    .then((data) => {
      return res.status(201).send({ status: 201, data });
    })
    .catch((err) => {
      next(err);
    });
}

// this function is to get one admin by id
export function getAdminById(req, res, next) {
  let { id } = req.params;
  Model.findOne({ _id: id })
    .then((response) => {
      if (!response) {
        res.status(404).send({ status: 404, message: "Admin not found" });
      } else {
        res.status(200).send({ status: 200, response });
      }
    })
    .catch((err) => {
      next(err);
    });
}

// this function is to update one admin by id
export function updateAdmin(req, res, next) {
  let { id } = req.params;
  const Name = req.body.username;
  const Email = req.body.email;
  const password = req.body.password;
  Model.findById({ _id: id }).then((model) => {
    if (!model)
      return res.status(404).send({ status: 404, message: "Admin not found" });

    if (Name && password && Email) {
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashPassword) =>
          Model.updateMany(
            { _id: id },
            {
              $set: { username: Name },
            },
            {
              $set: { email: Email },
            },
            { $set: { password: hashPassword } }
          )
        )
        .then((model) => {
          res.status(200).send({ status: 200, message: "success" });
        })
        .catch((err) => next(err));
    }
    if (Name && !password) {
      Model.updateOne({ _id: id }, { $set: { username: Name } })
        .then((model) => {
          res
            .status(200)
            .send({ status: 200, message: "edit name successfully" });
        })
        .catch((err) => next(err));
    }
    if (!Name && password) {
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashPassword) =>
          Model.updateOne({ _id: id }, { $set: { password: hashPassword } })
        )
        .then((model) => {
          res
            .status(200)
            .send({ status: 200, message: "edit password successfully" });
        })
        .catch((err) => next(err));
    }
    if (!Name && !password && Email) {
      Model.updateOne({ _id: id }, { $set: { email: Email } })
        .then((model) => {
          res
            .status(200)
            .send({ status: 200, message: "edit email successfully" });
        })
        .catch((err) => next(err));
    }
  });
}

export function deleteAdmin(req, res, next) {
  let { id } = req.params;
  console.log(id);
  Model.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ status: 404, message: "Admin not found" });
      } else {
        res
          .status(200)
          .send({ status: 200, message: "Admin deleted successfully" });
      }
    })
    .catch((err) => next(err));
}

// export function login(req, res, next) {
//   const { password, email } = req.body;
//   console.log(req.body);
//   Model.findOne({ email })
//     .then((model) => {
//       if (!(password && email)) {
//         res.status(400).send({ status: 400, message: "All input is required" });
//       } else if (model) {
//         bcrypt
//           .compare(password, model.password)
//           .then((isMatch) => {
//             if (isMatch) {
//               const token = jwt.sign(    console.log(loginForm.)

//                 { model_id: model._id },
//                 process.env.TOKEN_KEY,
//                 { expiresIn: "5h" }
//               );
//               model.token = token;
//               res.status(200).send({
//                 status: 200,
//                 message: "logged in successfully",
//                 token,
//               });
//             } else {
//               res
//                 .status(401)
//                 .send({ status: 400, message: "Invalid Credentials" });
//             }
//           })
//           .catch((err) => next(err));
//       } else {
//         res.status(400).send({ status: 400, message: "Invalid Credentials" });
//       }
//     })
//     .catch((err) => {
//       next(err);
//     });
// }

export async function login(req, res, next) {
  try {
    // Check if email and password are provided
    const { email, password } = req.body;

    // Check if email exists in database
    const admin = await Model.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if password is correct#bcrypt
    const isValidPassword = await admin.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    // const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",
    // });


    // Generate and send authentication token
    const token = generateToken({
      id: admin._id,
      email: admin.email,
    }); // Customize token payload as needed
    res.cookie("userToken", token); // Set the token as a cookie, or send it in the response body as needed
    res.json({ id: admin._id, email: admin.email, token });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res, next) {
  res
    .clearCookie("auth")
    .status(200)
    .send({ status: 200, message: "logged out successfully" });
}
const adminController = {
  getAdmin,
  Add,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  login,
  logout,
};
export default adminController;
