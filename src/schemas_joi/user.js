import Joi from 'joi'

// object schema definition
export default Joi.object().keys({
  email: Joi.string().email().required().label('Email'),
  username: Joi.string().alphanum().min(3).max(50).required().label('Username'),
  name: Joi.string().max(254).required().label('Name'),
  password: Joi.string().min(8).max(30).regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,30}$/).label('Password').options({
    language: {
      string: {
        regex: {
          base: 'Must have at least one lowercase letter, one uppercase letter, one digit and one special character'
        }
      }
    }
  })
})
