import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Employees = new Mongo.Collection('employees');

if (Meteor.isServer) {
  //this code only runs on the server
  // only published employees that a public or belong to current user
  Meteor.publish('employees', function employeesPublication() {
    return Employees.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods ({
  'employees.insert' (emplId) {
    check(emplId, String);

    // Make sure the user is Logged in before inserting a employees
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    Employees.insert ({
      emplId,
      emplName,
      salary,
      title,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'employees.remove'(employeeId) {
    check(employeeId, String);

    const employee = Employees.findOne(employeeId);

    Employees.remove(employeeId);
  },
  'employees.setChecked'(employeeId, setChecked) {
    check(employeeId, String);
    check(setChecked, Boolean);

    const employee = Employees.findOne(employeeId);

    Employees.update(employeeId,{ $set: { checked: setChecked} });
  },
});
