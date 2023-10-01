
//validates the body of the requests
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";


const signUpBodyValidation = (body) => {
    const schema = Joi.object({
      userName: Joi.string().required().label("User Name"),
      email: Joi.string().email().required().label("Email"),
      password: passwordComplexity().required().label("Password"),
      firstName: Joi.string().required().label("First Name"),
      lastName: Joi.string().required().label("Last Name"),
      age: Joi.string().required().label("Age"),
      city: Joi.string().required().label("City"),
      speciality: Joi.string().optional().label("Speciality"),
      servicesOffered: Joi.string().optional().label("Services Offered"),
      hourlyRate: Joi.string().optional().label("Hourly Rate"),
      
    });
  
    return schema.validate(body);
  };


const loginBodyValidation = (body) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    return schema.validate(body);
};

const refreshTokenBodyValidation = (body)=>{
    const schema = Joi.object({
        refreshToken: Joi.string().required().label("Refresh Token"),
    });
    return schema.validate(body);
};

export { signUpBodyValidation, loginBodyValidation, refreshTokenBodyValidation };