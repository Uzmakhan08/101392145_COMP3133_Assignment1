const User = require('../models/user');
const Employee = require('../models/employee');
const bcrypt = require('bcryptjs');


const resolvers = {
    Query: {
        async login(_, { username, password }) {
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Incorrect password');
            }
            return user;


        },

        async getAllEmployees() {
            return await Employee.find({});
        },

        async searchEmployeeById(_, { id }) {
            return await Employee.findById(id);
        },
    },
    Mutation: {
        async signup(_, { username, email, password }) {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ username, email, password: hashedPassword });
            await user.save();

            return user;
        },

        async addNewEmployee(_, { firstName, lastName, email, gender, salary, id }) {
            const employee = new Employee({  firstName, lastName, email, gender, salary, id });
            await employee.save();

            return employee;
        },

        async updateEmployeeById(_, { id, firstName, lastName, email, gender, salary }) {
            const employee = await Employee.findById(id);
            if (!employee) {
                throw new Error('Employee not found');
            }

            employee.firstName = firstName || employee.firstName;
            employee.lastName = lastName || employee.lastName;
            employee.email = email || employee.email;
            employee.gender = gender || employee.gender;
            employee.salary = salary || employee.salary;

            await employee.save();
            return employee;
        },

        async deleteEmployeeById(_, { id }) {
            const employee = await Employee.findById(id);
            if (!employee) {
                throw new Error('Employee not found');
            }

            await Employee.findByIdAndDelete(id);
            return employee;
        },
    },
};

module.exports = { resolvers };
