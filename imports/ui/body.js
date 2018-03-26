import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Employee } from '../api/employees.js';

import './employee.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('employee');
});

Template.body.helpers({
  employee() {
    const instance = Template.instance();
    // return all of the employees
    return Employee.find({}, {sort: {createdAt: -1} });
  },
});

Template.body.events({
  'submit .new-employee'(event) {
    // Prevent default browser form submit (no clue what this does)
    event.preventDefault();

    // Get value from form element (pull data from form)
    const target = event.target;
    const emplId = target.emplId.value;
    const emplName = target.emplName.value;
    const salary = target.salary.value;
    const title = target.title.value;
    console.log(event)
    // Insert an employee into the collection (the database)
    Meteor.call('employee.insert', emplId);
    Meteor.call('employee.insert', emplName);
    Meteor.call('employee.insert', salary);
    Meteor.call('employee.insert', title);

    // Clear form
    target.emplId.value = '';
    target.emplName.value = '';
    target.salary.value = '';
    target.title.value = '';
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
