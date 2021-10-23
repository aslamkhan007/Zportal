var User = require("../../models/User");
// var Licence = require("../../models/extra/Licence");
// var Category = require("../../models/extra/Category");
var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
var auth = require("../../settings/auth");
var md5 = require("md5");
const timestamp = require("time-stamp");
created_date = timestamp.utc("YYYY-MM-DD HH:mm:ss");
var randomstring = require("randomstring");
const ejs = require("ejs");
var Mail = require("../../utilities/mail");
var fs = require("fs");
var path = require("path");
const uniqid = require("uniqid");
const bcrypt = require("bcrypt");
const CONFIG = require("../../config.json")


const GetClient = async (req, res) => {
  try {
    var decoded = req.jwtUser;
    let user = await User.find({
      _id: { $ne: decoded.id },
      created_by: decoded.id,
      role: 2,
    })
      .select("-password");
    if (user) {
      return res.send({ status: 200, data: user });
    } else {
      return res.send({ status: 400, message: "No Data found!" });
    }
  } catch (err) {
    return res.send({
      status: 500,
      message: "Something went wrong, please try again later!",
    });
  }
};

const GetSingleClient = async (req, res) => {
  var decoded = req.jwtUser;
 // console.log("req==",req)
 let id= decoded.id
 if(req.params.id)
 {
 id= req.params.id
 }
  try {
    let user = await User.findOne({ _id: id });
  if (user) {
      return res.send({
        status: 200,
        data: user
      });
    } else {
      return res.send({ status: 400, message: "No Data found!" });
    }
  } catch (err) {
    console.log("err==",err)
    return res.send({
      status: 500,
      message: "Something went wrong, please try again later!",
    });
  }
};

const loginClient = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email.toLowerCase(),
      role: 1,
    });
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (user && validPassword) {
      let response = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone:user.phone,
        email: user.email,
        profile_img: user.profile_img,
        role: user.role,
        status: user.status,
        jwt: jwt.sign(
          { id: user._id, subdomain: user.subdomain, role: user.role },
          auth.jwtSecret,
          { expiresIn: "24h" }
        ),
      };
      return res.send({ status: 200, data: response });
    } else {
      return res.send({
        status: 400,
        message: "Either email or password wrong",
      });
    }
  } catch (err) {
    return res.send({
      status: 500,
      message: "Something went wrong, please try again later!",
    });
  }
};



const GetTeam = async (req, res) => {
  try {
    var decoded = req.jwtUser;
    let user = await User.find({
      _id: { $ne: decoded.id },
      $or: [{ role: 2 }, { role: 3 }],
    })
      .select("-password");
    if (user) {
      return res.send({ status: 200, data: user });
    } else {
      return res.send({ status: 400, message: "No Data found!" });
    }
  } catch (err) {
    return res.send({
      status: 500,
      message: "Something went wrong, please try again later!",
    });
  }
};

const addTeam = async (req, res) => {
  try {
    var decoded = req.jwtUser;
    if (!req.body) {
      return res.send({
        status: 500,
        message: "Note content can not be empty",
      });
    }
    
    var user_data = await User.find({
      email: req.body.email.toLowerCase(),
    }).exec();

    if (user_data.length > 0) {
      return res.json({
        status: 400,
        message: "Email already exist!",
      });
    } else {
    
        let string = randomstring.generate(8);
        let password = string.toLowerCase();

        // Create a User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const Users = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email.toLowerCase(),
          created_by: decoded.id,
          role: 2,
          status: 0,
          password:hashedPassword,
          profile_img: "user.png",
          created_at: created_date,
          updated_at: created_date,
        });
        // Save User in the database
        await Users.save()
          .then(async (data) => {
            let templatePath = path.join("./mail_template/");
            var compiled = ejs.compile(
              fs.readFileSync(path.resolve(templatePath + "mail.html"), "utf8")
            );
            var html = compiled({
              email: req.body.email.toLowerCase(),
              password: password,
              site_url: CONFIG.FRONT_BASE_URL,
            });
            Mail.sendMailer({
              email: req.body.email.toLowerCase(),
              body: html,
              subject: "User Registration successfully",
            });
            return res.send({
              status: 200,
              message: "User added successfully",
            });
          })
          .catch((err) => {
            console.log("error=========================>", err);
            return res.send({ status: 500, message: err.message });
          });
    }    
  }catch (error) {
    return res.send({ status: 500, message: error.message });
  }
};
//Controller for signup
const addClient = async (req, res) => {
  try {
    if (!req.body) {
      return res.send({
        status: 500,
        message: "Note content can not be empty",
      });
    }
    var user_data = await User.find({
      email: req.body.email.toLowerCase(),
    }).exec();

    if (user_data.length > 0) {
      return res.json({
        status: 400,
        message: "Email already exist!",
      });
    } else {
      // Create a User
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const Users = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email.toLowerCase(),
        role: 1,
        status: 0,
        password: hashedPassword,
        profile_img: "user.png"
      });
      // Save User in the database
      await Users.save()
        .then(async (data) => {
          let templatePath = path.join("./mail_template/");
          var compiled = ejs.compile(
            fs.readFileSync(path.resolve(templatePath + "mail.html"), "utf8")
          );
          var html = compiled({
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            site_url: "abc.com",
          });
          Mail.sendMailer({
            email: req.body.email.toLowerCase(),
            body: html,
            subject: "User added successfully",
          });
          return res.send({ status: 200, message: "User added successfully" });
        })
        .catch((err) => {
          console.log("error=========================>", err);
          return res.send({ status: 500, message: err.message });
        });
    }
  } catch (error) {
    return res.send({ status: 500, message: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    if (!req.body) {
      return res.send({
        status: 500,
        message: "Note content can not be empty",
      });
    }

    var update_data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      updated_at: created_date,
    };

    await User.updateOne({ _id: req.params.id }, update_data)
      .then(async (data) => {
        return res.send({
          data: data,
          status: 200,
          message: "User updated successfully",
        });
      })
      .catch((err) => {
        console.log("error=========================>", err);
        return res.send({ status: 500, message: err.message });
      });
  } catch (error) {
    return res.send({ status: 500, message: error.message });
  }
};

//Controller for signup
const updateClient = async (req, res) => {
  var decoded = req.jwtUser;
  try {
    if (!req.body) {
      return res.send({
        status: 500,
        message: "Note content can not be empty",
      });
    }

    var user_data = await User.find({
      email: req.body.email.toLowerCase(),
      _id : {$ne: decoded.id}
    }).exec();

    if (user_data.length > 0) {
      return res.json({
        status: 400,
        message: "Email already exist!",
      });
    } else {
    var update_data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      updated_at: created_date,
    };

   await User.updateOne({ _id: decoded.id }, update_data)
      .then(async (data) => {
       
        return res.send({
          data: data,
          status: 200,
          message: "Updated successfully",
        });
      })
      .catch((err) => {
        console.log("error=========================>", err);
        return res.send({ status: 500, message: err.message });
      });
    }   
  } catch (error) {
    return res.send({ status: 500, message: error.message });
  }
};

const uploadImage = async (req, res, next) => {
  var update_data = {
    profile_img: req.files[0].filename,
  };

  await User.updateOne({ _id: req.params.id }, update_data)
    .then(async (data) => {
      return res.json({
        status: 200,
        data: req.files,

        message: "Image uploaded sucessfully",
      });
    })
    .catch((err) => {
      console.log("error=========================>", err);
      return res.send({ status: 500, message: err.message });
    });
};

const changepassword = async (req, res) => {
  var decoded = req.jwtUser
  try {
    if (!req.body) {
      return res.send({
        status: 500,
        message: "Note content can not be empty",
      });
    }



    let user = await User.findOne({
      _id: decoded.id,
    });
    const validPassword = await bcrypt.compare(req.body.current_password, user.password)

    if (user && validPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.current_password, salt);
      var update_data = {
        password: hashedPassword,
        updated_at: created_date,
      };

      await User.updateOne({ _id: decoded.id }, update_data)
        .then(async (data) => {
          return res.send({
            data: data,
            status: 200,
            message: "Password changed successfully",
          });
        })
        .catch((err) => {
          console.log("error=========================>", err);
          return res.send({ status: 500, message: err.message });
        });
    } else {
      return res.json({
        status: 400,
        message: "Current password you have entered is incorrect!",
      });
    }
  } catch (error) {
    return res.send({ status: 500, message: error.message });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    if (!req.body) {
      return res.send({
        status: 500,
        message: "Note content can not be empty",
      });
    }

    let hash = uniqid();
    var update_data = {
      pw_token: hash,
      updated_at: created_date,
    };
    await User.updateOne({ email: req.body.email }, update_data)
      .then(async (data) => {
        let user_data = await User.findOne({ email: req.body.email });

        let templatePath = path.join("./mail_template/");
        var compiled = ejs.compile(
          fs.readFileSync(
            path.resolve(templatePath + "resetPassword.html"),
            "utf8"
          )
        );
        var html = compiled({
          email: req.body.email.toLowerCase(),
          name: user_data.first_name + " " + user_data.last_name,
          site_url:
            user_data.role == 1
              ? CONFIG.ADMIN_BASE_URL +
                "/reset/" +
                user_data._id +
                "/" +
                hash
              : CONFIG.FRONT_BASE_URL +
                "/reset/" +
                user_data._id +
                "/" +
                hash,
        });
        Mail.sendMailer({
          email: req.body.email.toLowerCase(),
          body: html,
          subject: "Forgot Password",
        });
        return res.send({
          data: data,
          status: 200,
          message: "Please check email!",
        });
      })
      .catch((err) => {
        console.log("error=========================>", err);
        return res.send({ status: 500, message: err.message });
      });
  } catch (error) {
    return res.send({ status: 500, message: error.message });
  }
};

const ResetPassword = async (req, res) => {
  try {
    if (!req.body) {
      return res.send({
        status: 500,
        message: "Note content can not be empty",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.new_password, salt);
    
    var update_data = {
      password:hashedPassword,
      pw_token: "",
      updated_at: created_date,
    };
    let user_data = await User.findOne({ _id: req.body.user_id });

    await User.updateOne(
      { _id: req.body.user_id, pw_token: req.body.pw_token },
      update_data
    )
      .then(async (data) => {
        if (user_data && user_data.pw_token) {
          return res.send({
            data: data,
            status: 200,
            message: "Password reset successfully",
          });
        } else {
          return res.send({
            data: data,
            status: 400,
            message: "Link has been expired!",
          });
        }
      })
      .catch((err) => {
        return res.send({ status: 500, message: err.message });
      });
  } catch (error) {
    return res.send({ status: 500, message: error.message });
  }
};

module.exports = {
  loginClient,
  addClient,
  addTeam,
  //addClientData,
  GetClient,
  GetSingleClient,
  updateClient,
  updateTeam,
  uploadImage,
  GetTeam,
  changepassword,
  ForgotPassword,
  ResetPassword,
};
